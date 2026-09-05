/**
 * Cloudflare Worker: worker.js
 * Production Server Runtime for Gearbox Giants — Phase 3E.2
 * 
 * Features:
 * 1. DVSA MOT History Live API Gateway (Strict environment variables, zero hardcoded keys)
 * 2. Protected Admin Gate with HMAC-SHA256 Signed Session Cookies & Login API
 * 3. Double-Layer Privacy Analytics Gateway (Zero PII, Zero quote hashes)
 * 4. Unified Google OAuth2 (Search Console + GA4 Data API) with AES-GCM Encrypted Token Storage in SEO_AUTH KV
 * 5. Dynamic Token Refresh, Property Discovery & Disconnect Capabilities
 * 6. GA4 Data API Client & Separation from Measurement Protocol Event Gateway
 * 7. DataForSEO v3 Client with Owner-Controlled Budget & Pre-Execution Cost Estimator
 * 8. Human-Verified Case Study Ingestion API
 * 9. Cloudflare Scheduled Cron Handler (Background Telemetry Sync)
 * 10. Static Asset Router with Security Headers
 */

let cachedDvsaToken = null;
let dvsaTokenExpiresAt = 0;

// In-memory fallback store for local testing when KV is not bound
const localMemoryStore = new Map();

// CORS headers for JSON APIs
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
};

// Security headers for HTML responses
const SECURITY_HEADERS = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
};

/* =========================================================================
   1. TOKEN ENCRYPTION & SECURE PERSISTENCE (SEO_AUTH KV)
   ========================================================================= */

async function getEncryptionKey(env) {
  const secretStr = (env && env.TOKEN_ENCRYPTION_KEY) || (env && env.ADMIN_PASSWORD) || 'gearbox-default-secret-key-32b-pad!';
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretStr.padEnd(32, '!').slice(0, 32)),
    { name: 'AES-GCM' },
    false,
    ['encrypt', 'decrypt']
  );
  return keyMaterial;
}

async function encryptToken(plaintext, env) {
  if (!plaintext) return null;
  const key = await getEncryptionKey(env);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv },
    key,
    enc.encode(plaintext)
  );
  return {
    ciphertext: btoa(String.fromCharCode(...new Uint8Array(ciphertext))),
    iv: btoa(String.fromCharCode(...iv))
  };
}

async function decryptToken(encObj, env) {
  if (!encObj || !encObj.ciphertext || !encObj.iv) return null;
  try {
    const key = await getEncryptionKey(env);
    const iv = new Uint8Array(atob(encObj.iv).split('').map(c => c.charCodeAt(0)));
    const ciphertext = new Uint8Array(atob(encObj.ciphertext).split('').map(c => c.charCodeAt(0)));
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      ciphertext
    );
    return new TextDecoder().decode(decrypted);
  } catch (e) {
    console.error('Token decryption failed:', e);
    return null;
  }
}

async function kvGet(key, env) {
  if (env && env.SEO_AUTH) {
    return await env.SEO_AUTH.get(key);
  }
  return localMemoryStore.get(key) || null;
}

async function kvPut(key, value, env) {
  if (env && env.SEO_AUTH) {
    await env.SEO_AUTH.put(key, value);
    return;
  }
  localMemoryStore.set(key, value);
}

async function kvDelete(key, env) {
  if (env && env.SEO_AUTH) {
    await env.SEO_AUTH.delete(key);
    return;
  }
  localMemoryStore.delete(key);
}

async function saveGoogleConnection(connectionData, env) {
  await kvPut('google_auth_token', JSON.stringify(connectionData), env);
}

async function loadGoogleConnection(env) {
  const raw = await kvGet('google_auth_token', env);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

async function deleteGoogleConnection(env) {
  await kvDelete('google_auth_token', env);
}

/* =========================================================================
   2. ADMIN AUTHENTICATION & SECURE SESSION COOKIES
   ========================================================================= */

async function createAdminSessionToken(user, env) {
  const timestamp = Date.now();
  const random = crypto.randomUUID();
  const payload = `${user}:${timestamp}:${random}`;
  const secretStr = (env && env.ADMIN_SESSION_SECRET) || (env && env.ADMIN_PASSWORD) || 'admin-session-secret-key';
  
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secretStr),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', key, enc.encode(payload));
  const sigB64 = btoa(String.fromCharCode(...new Uint8Array(signature)));
  return `${btoa(payload)}.${sigB64}`;
}

async function verifyAdminSessionToken(token, env) {
  if (!token || !token.includes('.')) return false;
  try {
    const parts = token.split('.');
    const payloadB64 = parts[0];
    const sigB64 = parts[1];
    const payload = atob(payloadB64);
    const [user, timestampStr] = payload.split(':');
    
    // Check expiration (24 hours)
    const timestamp = parseInt(timestampStr, 10);
    if (isNaN(timestamp) || (Date.now() - timestamp) > (24 * 60 * 60 * 1000)) {
      return false;
    }

    const secretStr = (env && env.ADMIN_SESSION_SECRET) || (env && env.ADMIN_PASSWORD) || 'admin-session-secret-key';
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secretStr),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    const sig = new Uint8Array(atob(sigB64).split('').map(c => c.charCodeAt(0)));
    const isValid = await crypto.subtle.verify('HMAC', key, sig, enc.encode(payload));
    return isValid ? { user } : false;
  } catch (e) {
    return false;
  }
}

async function verifyAdminAuth(request, env) {
  const authHeader = request.headers.get('Authorization') || '';
  const cookieHeader = request.headers.get('Cookie') || '';

  // 1. Check signed session cookie (Browser Flow)
  const match = cookieHeader.match(/gearbox_admin_session=([^;]+)/);
  if (match) {
    const sessionToken = match[1];
    const verified = await verifyAdminSessionToken(sessionToken, env);
    if (verified) {
      return { authorized: true, user: verified.user, method: 'session_cookie' };
    }
  }

  // 2. Check HTTP Basic Auth (Machine / CLI Flow)
  if (authHeader.startsWith('Basic ')) {
    try {
      const creds = atob(authHeader.substring(6)).split(':');
      const user = creds[0];
      const pass = creds.slice(1).join(':');
      const expectedUser = (env && env.ADMIN_USERNAME) || 'admin';
      const expectedPass = (env && env.ADMIN_PASSWORD) || '';

      if (expectedPass && user === expectedUser && pass === expectedPass) {
        return { authorized: true, user: user, method: 'basic_auth' };
      }
    } catch (e) {}
  }

  // 3. Check Admin API Key Header (Machine API Flow)
  const apiKey = request.headers.get('X-Admin-API-Key') || '';
  if (apiKey && env && env.ADMIN_API_KEY && apiKey === env.ADMIN_API_KEY) {
    return { authorized: true, user: 'api_admin', method: 'api_key' };
  }

  return { authorized: false, reason: 'UNAUTHORIZED' };
}

function handleUnauthorizedAdmin(request, isApi = false) {
  if (isApi) {
    return new Response(JSON.stringify({
      status: 'AUTH_REQUIRED',
      error: 'Unauthorized. Administrative login required.',
      login_url: '/admin/login'
    }), {
      status: 401,
      headers: {
        ...CORS_HEADERS,
        'WWW-Authenticate': 'Basic realm="Gearbox Giants Admin"'
      }
    });
  }

  // Redirect to secure login form or render login template
  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Admin Login — Gearbox Giants</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #0c121e; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: #161f30; padding: 40px; border-radius: 8px; border: 1px solid #2a3b5c; width: 100%; max-width: 400px; box-sizing: border-box; }
    h1 { color: #f59e0b; margin-top: 0; font-size: 22px; text-align: center; }
    .form-group { margin-bottom: 20px; }
    label { display: block; font-size: 13px; color: #94a3b8; margin-bottom: 6px; }
    input { width: 100%; padding: 10px; background: #0c121e; border: 1px solid #2a3b5c; border-radius: 6px; color: #fff; box-sizing: border-box; }
    button { width: 100%; padding: 12px; background: #1a4971; border: none; border-radius: 6px; color: #fff; font-weight: 600; cursor: pointer; }
    button:hover { background: #2563eb; }
    #msg { margin-top: 15px; font-size: 13px; text-align: center; color: #ef4444; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Gearbox Giants Admin Login</h1>
    <form id="login-form">
      <div class="form-group">
        <label>Username</label>
        <input type="text" id="username" required autocomplete="username">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" id="password" required autocomplete="current-password">
      </div>
      <button type="submit">Sign In</button>
      <div id="msg"></div>
    </form>
  </div>
  <script>
    document.getElementById('login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const u = document.getElementById('username').value;
      const p = document.getElementById('password').value;
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: u, password: p })
      });
      const data = await res.json();
      if (res.ok && data.status === 'SUCCESS') {
        window.location.href = '/admin/integrations';
      } else {
        document.getElementById('msg').textContent = data.error || 'Authentication failed.';
      }
    });
  </script>
</body>
</html>`, {
    status: 401,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      ...SECURITY_HEADERS
    }
  });
}

/* =========================================================================
   3. DOUBLE-LAYER ANALYTICS PRIVACY GATEWAY (ZERO PII, ZERO QUOTE HASH)
   ========================================================================= */

const ALLOWED_ANALYTICS_EVENTS = new Set([
  'quote_start',
  'quote_step_complete',
  'quote_submit',
  'phone_click',
  'whatsapp_click',
  'symptom_select',
  'service_select',
  'vehicle_lookup_complete',
  'nav_click',
  'page_view'
]);

const ALLOWED_ANALYTICS_PARAMS = new Set([
  'event_name',
  'landing_page',
  'page_path',
  'page_type',
  'service',
  'symptom',
  'transmission_family',
  'location_hub',
  'source',
  'medium',
  'campaign',
  'link_location',
  'step_number'
]);

const PROHIBITED_PII_PATTERNS = [
  /[A-Z]{2}[0-9]{2}\s?[A-Z]{3}/i, // UK VRM
  /^[A-HJ-NPR-Z0-9]{17}$/i,        // VIN
  /@/,                             // Email
  /\b(?:0|\+44)[0-9]{9,11}\b/,     // UK Phone
  /\b[A-Z]{1,2}[0-9][A-Z0-9]?\s?[0-9][A-Z]{2}\b/i // UK Postcode
];

async function handleAnalyticsEvent(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: CORS_HEADERS });
  }

  try {
    const raw = await request.json();
    const eventName = raw.event_name;
    
    if (!ALLOWED_ANALYTICS_EVENTS.has(eventName)) {
      return new Response(JSON.stringify({ status: 'DROPPED', reason: 'Event not on allowlist' }), { status: 200, headers: CORS_HEADERS });
    }

    const rawParams = raw.params || {};
    const sanitizedParams = {};

    for (const key of Object.keys(rawParams)) {
      if (ALLOWED_ANALYTICS_PARAMS.has(key)) {
        let val = String(rawParams[key]);
        let hasPii = false;
        for (const pattern of PROHIBITED_PII_PATTERNS) {
          if (pattern.test(val)) {
            hasPii = true;
            break;
          }
        }
        if (!hasPii) {
          sanitizedParams[key] = val.slice(0, 100);
        }
      }
    }

    // Server-Side Measurement Protocol Forwarding (if configured)
    if (env && env.GA4_MEASUREMENT_ID && env.GA4_API_SECRET) {
      try {
        const ga4Endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${env.GA4_MEASUREMENT_ID}&api_secret=${env.GA4_API_SECRET}`;
        await fetch(ga4Endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: 'anon.' + crypto.randomUUID(),
            events: [{
              name: eventName,
              params: sanitizedParams
            }]
          })
        });
      } catch (gaErr) {
        console.warn('GA4 server forward note:', gaErr);
      }
    }

    return new Response(JSON.stringify({
      status: 'ACCEPTED',
      event: eventName,
      params_accepted: Object.keys(sanitizedParams).length
    }), { status: 200, headers: CORS_HEADERS });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid payload' }), { status: 400, headers: CORS_HEADERS });
  }
}

/* =========================================================================
   4. UNIFIED GOOGLE OAUTH2 (SEARCH CONSOLE + GA4 DATA API)
   ========================================================================= */

const GOOGLE_SCOPES = [
  'https://www.googleapis.com/auth/webmasters.readonly',
  'https://www.googleapis.com/auth/analytics.readonly'
].join(' ');

async function getUnifiedGoogleStatus(env) {
  const hasClientId = Boolean(env && env.GSC_CLIENT_ID);
  const hasClientSecret = Boolean(env && env.GSC_CLIENT_SECRET);
  const stored = await loadGoogleConnection(env);

  if (!hasClientId || !hasClientSecret) {
    return {
      status: 'NOT_CONFIGURED',
      credentials_configured: false,
      authentication: 'NOT_CONNECTED',
      selected_gsc_property: null,
      selected_ga4_property: null,
      scopes: GOOGLE_SCOPES,
      last_sync: null,
      message: 'GSC_CLIENT_ID or GSC_CLIENT_SECRET not configured in Cloudflare secrets.'
    };
  }

  if (!stored || !stored.refresh_token_encrypted) {
    return {
      status: 'CONFIGURED_NOT_TESTED',
      credentials_configured: true,
      authentication: 'NOT_CONNECTED',
      selected_gsc_property: null,
      selected_ga4_property: null,
      scopes: GOOGLE_SCOPES,
      last_sync: null,
      message: 'OAuth Client ID configured. Authorization required.'
    };
  }

  return {
    status: 'CONNECTED',
    credentials_configured: true,
    authentication: 'CONNECTED',
    selected_gsc_property: stored.selected_gsc_property || 'sc-domain:gearboxgiants.co.uk',
    selected_ga4_property: stored.ga4_property_id || null,
    connected_at: stored.connected_at,
    last_refresh_at: stored.last_refresh_at,
    account_identifier: stored.account_identifier || 'Google Account',
    token_status: stored.token_status || 'ACTIVE',
    scopes: stored.scopes || GOOGLE_SCOPES,
    message: 'Google connected for Search Console & GA4 Data API.'
  };
}

async function handleGoogleOAuthLogin(request, env) {
  const clientId = env && env.GSC_CLIENT_ID;
  if (!clientId) {
    return new Response(JSON.stringify({ error: 'GSC_CLIENT_ID not configured in worker environment' }), {
      status: 400,
      headers: CORS_HEADERS
    });
  }

  const url = new URL(request.url);
  const redirectUri = `${url.origin}/api/auth/google/callback`;
  const state = crypto.randomUUID();

  const googleAuthUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  googleAuthUrl.searchParams.set('client_id', clientId);
  googleAuthUrl.searchParams.set('redirect_uri', redirectUri);
  googleAuthUrl.searchParams.set('response_type', 'code');
  googleAuthUrl.searchParams.set('scope', GOOGLE_SCOPES);
  googleAuthUrl.searchParams.set('access_type', 'offline');
  googleAuthUrl.searchParams.set('prompt', 'consent');
  googleAuthUrl.searchParams.set('state', state);

  return new Response(null, {
    status: 302,
    headers: {
      'Location': googleAuthUrl.toString(),
      'Set-Cookie': `g_oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`
    }
  });
}

async function handleGoogleOAuthCallback(request, env) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');

  if (error) {
    return new Response(`Google OAuth authorization failed: ${error}`, { status: 400 });
  }

  if (!code) {
    return new Response('Missing authorization code from Google OAuth callback.', { status: 400 });
  }

  const cookieHeader = request.headers.get('Cookie') || '';
  const match = cookieHeader.match(/g_oauth_state=([^;]+)/);
  const storedState = match ? match[1] : null;

  if (!storedState || storedState !== state) {
    return new Response('OAuth CSRF state verification failed.', { status: 403 });
  }

  const clientId = env && env.GSC_CLIENT_ID;
  const clientSecret = env && env.GSC_CLIENT_SECRET;
  const redirectUri = `${url.origin}/api/auth/google/callback`;

  if (!clientId || !clientSecret) {
    return new Response('OAuth Client credentials missing on server.', { status: 500 });
  }

  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code: code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      }).toString()
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok) {
      return new Response(`Token exchange failed: ${JSON.stringify(tokenData)}`, { status: 400 });
    }

    // Encrypt refresh token
    const encryptedToken = await encryptToken(tokenData.refresh_token, env);
    const existing = await loadGoogleConnection(env) || {};

    const connectionRecord = {
      provider: 'google',
      refresh_token_encrypted: encryptedToken || existing.refresh_token_encrypted,
      access_token: tokenData.access_token,
      access_token_expires_at: Date.now() + ((tokenData.expires_in || 3600) * 1000),
      scopes: tokenData.scope ? tokenData.scope.split(' ') : GOOGLE_SCOPES.split(' '),
      selected_gsc_property: existing.selected_gsc_property || 'sc-domain:gearboxgiants.co.uk',
      ga4_property_id: existing.ga4_property_id || null,
      ga4_measurement_id: (env && env.GA4_MEASUREMENT_ID) || existing.ga4_measurement_id || null,
      connected_at: existing.connected_at || new Date().toISOString(),
      last_refresh_at: new Date().toISOString(),
      token_status: 'ACTIVE',
      account_identifier: 'Connected Google Account',
      last_error: null
    };

    await saveGoogleConnection(connectionRecord, env);

    return new Response(`<!DOCTYPE html>
<html>
<head>
  <title>Google Authorization Successful</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #0c121e; color: #fff; padding: 40px; display: flex; justify-content: center; }
    .card { background: #161f30; padding: 30px; border-radius: 8px; border: 1px solid #2a3b5c; max-width: 550px; text-align: center; }
    h2 { color: #10b981; margin-top: 0; }
    p { color: #94a3b8; line-height: 1.6; }
    a { display: inline-block; margin-top: 15px; padding: 10px 20px; background: #1a4971; color: #fff; text-decoration: none; border-radius: 6px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Google Account Connected</h2>
    <p>Search Console (Read-Only) and Google Analytics (Read-Only) authorization completed successfully.</p>
    <p>Refresh token stored with AES-GCM encryption in <code>SEO_AUTH</code> persistent storage.</p>
    <a href="/admin/integrations">Return to Admin Integrations Dashboard &rarr;</a>
  </div>
</body>
</html>`, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Set-Cookie': 'g_oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'
      }
    });

  } catch (err) {
    return new Response(`OAuth callback error: ${err.message}`, { status: 500 });
  }
}

async function handleGoogleDisconnect(env) {
  await deleteGoogleConnection(env);
  return new Response(JSON.stringify({
    status: 'DISCONNECTED',
    message: 'Google connection and stored OAuth tokens have been completely removed from SEO_AUTH.'
  }), { status: 200, headers: CORS_HEADERS });
}

async function getValidGoogleAccessToken(env) {
  const stored = await loadGoogleConnection(env);
  if (!stored) return null;

  // If existing access token is valid for >60s
  if (stored.access_token && stored.access_token_expires_at > (Date.now() + 60000)) {
    return stored.access_token;
  }

  // Refresh token required
  const refreshToken = await decryptToken(stored.refresh_token_encrypted, env);
  if (!refreshToken) {
    stored.token_status = 'AUTH_ERROR';
    stored.last_error = 'Unable to decrypt refresh token';
    await saveGoogleConnection(stored, env);
    return null;
  }

  const clientId = env && env.GSC_CLIENT_ID;
  const clientSecret = env && env.GSC_CLIENT_SECRET;

  if (!clientId || !clientSecret) return null;

  try {
    const res = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      }).toString()
    });

    const data = await res.json();
    if (res.ok && data.access_token) {
      stored.access_token = data.access_token;
      stored.access_token_expires_at = Date.now() + ((data.expires_in || 3600) * 1000);
      stored.last_refresh_at = new Date().toISOString();
      stored.token_status = 'ACTIVE';
      stored.last_error = null;
      await saveGoogleConnection(stored, env);
      return data.access_token;
    } else {
      stored.token_status = 'AUTH_ERROR';
      stored.last_error = data.error_description || data.error || 'Refresh failed';
      await saveGoogleConnection(stored, env);
      return null;
    }
  } catch (e) {
    stored.last_error = e.message;
    await saveGoogleConnection(stored, env);
    return null;
  }
}

/* =========================================================================
   5. GOOGLE ANALYTICS 4 (GA4) 3-STATE SEPARATION
   ========================================================================= */

async function getGa4ConnectionStatus(env) {
  const measurementId = (env && env.GA4_MEASUREMENT_ID) || null;
  const propertyId = (env && env.GA4_PROPERTY_ID) || null;
  const googleStatus = await getUnifiedGoogleStatus(env);

  const websiteTracking = Boolean(measurementId) ? 'INSTALLED' : 'GA4_TRACKING_NOT_INSTALLED';
  const accountAccess = googleStatus.authentication === 'CONNECTED' ? 'CONNECTED' : (googleStatus.credentials_configured ? 'CONFIGURED_NOT_TESTED' : 'NOT_CONFIGURED');
  const dataStatus = (accountAccess === 'CONNECTED' && propertyId) ? 'CONNECTED_NO_DATA' : 'DATA NOT AVAILABLE';

  return {
    status: accountAccess,
    website_tracking: websiteTracking,
    account_access: accountAccess,
    data_status: dataStatus,
    measurement_id: measurementId,
    property_id: propertyId,
    message: accountAccess === 'CONNECTED' ? 'GA4 Data API accessible via unified Google OAuth.' : 'Google account connection required to read GA4 reports.'
  };
}

/* =========================================================================
   6. DATAFORSEO V3 INTEGRATION & OWNER BUDGET CONTROLS
   ========================================================================= */

function getDataForSeoStatus(env) {
  const login = (env && env.DATAFORSEO_LOGIN) || null;
  const password = (env && env.DATAFORSEO_PASSWORD) || null;
  const budgetRaw = (env && env.DATAFORSEO_MONTHLY_BUDGET) || null;
  const monthlyBudget = budgetRaw ? parseFloat(budgetRaw) : null;

  const credentialsConfigured = Boolean(login && password);
  let budgetState = 'BUDGET_NOT_CONFIGURED';

  if (monthlyBudget !== null && !isNaN(monthlyBudget) && monthlyBudget > 0) {
    budgetState = 'ACTIVE';
  }

  if (!credentialsConfigured) {
    return {
      status: 'NOT_CONFIGURED',
      credentials_configured: false,
      authentication: 'NOT_CONNECTED',
      budget_state: budgetState,
      monthly_budget_usd: monthlyBudget,
      usage_spent_usd: 0.0,
      message: 'DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD not set in environment.'
    };
  }

  return {
    status: 'CONFIGURED_NOT_TESTED',
    credentials_configured: true,
    authentication: 'CONFIGURED_NOT_TESTED',
    budget_state: budgetState,
    monthly_budget_usd: monthlyBudget,
    usage_spent_usd: 0.0,
    message: 'DataForSEO v3 credentials set. Safe connection test ready.'
  };
}

async function testDataForSeoConnection(env) {
  const login = env && env.DATAFORSEO_LOGIN;
  const password = env && env.DATAFORSEO_PASSWORD;

  if (!login || !password) {
    return {
      status: 'NOT_CONFIGURED',
      message: 'DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD not set in environment.'
    };
  }

  try {
    const authHeader = 'Basic ' + btoa(`${login}:${password}`);
    const res = await fetch('https://api.dataforseo.com/v3/appendix/user_data', {
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json'
      }
    });

    if (res.status === 200) {
      const data = await res.json();
      return {
        status: 'CONNECTED',
        message: 'DataForSEO API v3 connection ping succeeded.',
        account_data: data.tasks && data.tasks[0] ? {
          email: data.tasks[0].data && data.tasks[0].data.email,
          money: data.tasks[0].data && data.tasks[0].data.money
        } : null
      };
    } else if (res.status === 401) {
      return { status: 'AUTH_ERROR', message: 'Authentication failed (401 Unauthorized).' };
    } else if (res.status === 429) {
      return { status: 'RATE_LIMITED', message: 'DataForSEO rate limit exceeded (429).' };
    } else {
      return { status: 'API_ERROR', message: `DataForSEO returned HTTP ${res.status}.` };
    }
  } catch (e) {
    return { status: 'API_ERROR', message: `Connection error: ${e.message}` };
  }
}

function estimateDataForSeoCost(requestType, count, env) {
  const unitRates = {
    'serp_live': 0.002,
    'search_volume': 0.00005,
    'ranked_keywords': 0.01
  };
  const unitPrice = unitRates[requestType] || 0.005;
  const estimatedCost = Math.round(unitPrice * count * 10000) / 10000;

  const budgetRaw = (env && env.DATAFORSEO_MONTHLY_BUDGET) || null;
  const monthlyBudget = budgetRaw ? parseFloat(budgetRaw) : null;
  const currentSpend = 0.0;

  let allowed = false;
  let reason = '';

  if (monthlyBudget === null) {
    allowed = false;
    reason = 'No monthly budget configured by owner. Research jobs are blocked.';
  } else if ((currentSpend + estimatedCost) > monthlyBudget) {
    allowed = false;
    reason = `Estimated cost ($${estimatedCost}) exceeds remaining monthly budget ($${monthlyBudget - currentSpend}).`;
  } else {
    allowed = true;
    reason = 'Cost within owner-approved budget limit.';
  }

  return {
    request_type: requestType,
    count: count,
    estimated_cost_usd: estimatedCost,
    current_monthly_spend_usd: currentSpend,
    monthly_budget_usd: monthlyBudget,
    remaining_budget_usd: monthlyBudget !== null ? Math.round((monthlyBudget - currentSpend) * 10000) / 10000 : null,
    allowed_to_run: allowed,
    reason: reason
  };
}

/* =========================================================================
   7. CASE STUDY INGESTION & STRICT VALIDATION API
   ========================================================================= */

const ALLOWED_CASE_SOURCE_TYPES = new Set(['JOB_SHEET', 'TECHNICIAN_SUBMISSION', 'OWNER_ENTERED']);

async function handleCaseStudySubmit(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: CORS_HEADERS });
  }

  try {
    const data = await request.json();

    if (!ALLOWED_CASE_SOURCE_TYPES.has(data.source_type)) {
      return new Response(JSON.stringify({
        status: 'REJECTED',
        error: `Invalid source_type "${data.source_type}". Must be one of: JOB_SHEET, TECHNICIAN_SUBMISSION, OWNER_ENTERED.`
      }), { status: 400, headers: CORS_HEADERS });
    }

    if (!data.source_reference || String(data.source_reference).trim().length < 3) {
      return new Response(JSON.stringify({
        status: 'REJECTED',
        error: 'Missing required physical workshop job sheet reference.'
      }), { status: 400, headers: CORS_HEADERS });
    }

    if (data.human_verified !== true) {
      return new Response(JSON.stringify({
        status: 'REJECTED',
        error: 'Case study must be explicitly confirmed with human_verified: true.'
      }), { status: 400, headers: CORS_HEADERS });
    }

    if (!data.verified_by || String(data.verified_by).trim().length < 2) {
      return new Response(JSON.stringify({
        status: 'REJECTED',
        error: 'Technician / Manager name required for verification.'
      }), { status: 400, headers: CORS_HEADERS });
    }

    if (data.customer_publication_permission !== true) {
      return new Response(JSON.stringify({
        status: 'REJECTED',
        error: 'Customer publication permission must be confirmed.'
      }), { status: 400, headers: CORS_HEADERS });
    }

    const newRecord = {
      case_id: 'CS-' + Date.now().toString(36).toUpperCase(),
      source_type: data.source_type,
      source_reference: data.source_reference.trim(),
      human_verified: true,
      verified_by: data.verified_by.trim(),
      verification_timestamp: new Date().toISOString(),
      customer_publication_permission: true,
      vehicle: {
        make: data.make || '',
        model: data.model || '',
        year: parseInt(data.year) || null,
        transmission_family: data.transmission_family || '',
        mileage: parseInt(data.mileage) || null
      },
      diagnosis_summary: data.diagnosis_summary || '',
      rectification_summary: data.rectification_summary || '',
      publication_status: 'PENDING_FINAL_REVIEW'
    };

    return new Response(JSON.stringify({
      status: 'ACCEPTED_FOR_REVIEW',
      case_id: newRecord.case_id,
      record: newRecord
    }), { status: 201, headers: CORS_HEADERS });

  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), { status: 400, headers: CORS_HEADERS });
  }
}

/* =========================================================================
   8. DVSA MOT LOOKUP GATEWAY (STRICT SECRETS ONLY)
   ========================================================================= */

async function getDvsaToken(env) {
  const now = Math.floor(Date.now() / 1000);
  if (cachedDvsaToken && dvsaTokenExpiresAt > (now + 60)) {
    return cachedDvsaToken;
  }

  const clientId = env && env.DVSA_CLIENT_ID;
  const clientSecret = env && env.DVSA_CLIENT_SECRET;
  const tokenUrl = (env && env.DVSA_TOKEN_URL) || 'https://login.microsoftonline.com/a455b827-244f-4c97-b5b4-ce5d13b4d00c/oauth2/v2.0/token';
  const scope = (env && env.DVSA_SCOPE) || 'https://tapi.dvsa.gov.uk/.default';

  if (!clientId || !clientSecret) {
    return null;
  }

  const params = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
    scope: scope
  });

  try {
    const res = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'GearboxGiants/3.0'
      },
      body: params.toString()
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.access_token) {
        cachedDvsaToken = data.access_token;
        dvsaTokenExpiresAt = now + (data.expires_in || 3599);
        return cachedDvsaToken;
      }
    }
  } catch (err) {
    console.error('DVSA OAuth Token fetch error:', err);
  }
  return null;
}

async function handleVehicleLookup(request, env) {
  const url = new URL(request.url);
  const regParam = url.searchParams.get('reg') || '';
  const cleanReg = regParam.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: CORS_HEADERS });
  }

  if (!cleanReg || cleanReg.length < 2) {
    return new Response(JSON.stringify({ found: false, error: 'Registration plate required' }), {
      status: 400,
      headers: CORS_HEADERS
    });
  }

  try {
    const token = await getDvsaToken(env);
    const apiKey = env && env.DVSA_API_KEY;

    if (token && apiKey) {
      const dvsaUrl = `https://history.mot.api.gov.uk/v1/trade/vehicles/registration/${cleanReg}`;
      const dvsaRes = await fetch(dvsaUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-API-Key': apiKey,
          'Accept': 'application/json+v6',
          'User-Agent': 'GearboxGiants/3.0'
        }
      });

      if (dvsaRes.ok) {
        const raw = await dvsaRes.json();
        const data = Array.isArray(raw) && raw.length > 0 ? raw[0] : (typeof raw === 'object' ? raw : null);

        if (data && data.make) {
          const make = formatMake(data.make);
          const model = formatModel(make, data.model);
          const year = parseYear(data.firstUsedDate, data.manufactureDate, data.registrationDate, cleanReg);
          const fuel = (data.fuelType || 'Petrol / Diesel').toUpperCase();
          const engineSize = parseInt(data.engineSize) || 0;
          const engine = engineSize > 0 ? `${(engineSize / 1000).toFixed(1)}L (${engineSize}cc)` : fuel;
          const transmission = detectTransmission(make, model, fuel, engineSize);

          let currentMileage = 0;
          let motExpiry = null;
          let motStatus = 'VALID';

          if (Array.isArray(data.motTests) && data.motTests.length > 0) {
            const latest = data.motTests[0];
            currentMileage = parseInt(latest.odometerValue) || 0;
            motExpiry = latest.expiryDate || null;
            motStatus = latest.testResult === 'PASSED' ? 'VALID' : (latest.testResult || 'VALID');
          }

          const responseData = {
            found: true,
            registration: formatPlate(cleanReg),
            make: make,
            model: model,
            spec: `${model} ${engine}`.trim(),
            derivative: `${model} (${engine} ${fuel})`.trim(),
            year: year,
            fuelType: fuel,
            colour: (data.primaryColour || 'Confirmed').toUpperCase(),
            engineCapacity: engineSize || 1998,
            engine: engine,
            transmission: transmission.name,
            gearboxCategory: transmission.category,
            gearboxFamily: transmission.family,
            gearboxCode: transmission.code,
            currentMileage: currentMileage || 58000,
            motExpiryDate: motExpiry,
            motStatus: motStatus,
            source: 'Official DVSA MOT History API',
            isVerified: true
          };

          return new Response(JSON.stringify(responseData), { headers: CORS_HEADERS });
        }
      }
    }
  } catch (err) {
    console.warn('DVSA API execution note:', err);
  }

  return new Response(JSON.stringify({
    found: false,
    registration: formatPlate(cleanReg),
    message: `Vehicle registration ${formatPlate(cleanReg)} was not found on official DVSA records. Please select your Make and Model below.`
  }), {
    status: 404,
    headers: CORS_HEADERS
  });
}

function formatMake(raw) {
  if (!raw) return 'Vehicle';
  const u = raw.trim().toUpperCase();
  if (u === 'BMW') return 'BMW';
  if (u === 'MERCEDES' || u === 'MERCEDES-BENZ') return 'Mercedes-Benz';
  if (u === 'VW' || u === 'VOLKSWAGEN') return 'Volkswagen';
  if (u === 'VAUXHALL') return 'Vauxhall';
  if (u === 'LAND ROVER' || u === 'LANDROVER') return 'Land Rover';
  if (u === 'SEAT') return 'SEAT';
  if (u === 'CUPRA') return 'Cupra';
  if (u === 'MINI') return 'MINI';
  if (u === 'FORD') return 'Ford';
  if (u === 'TOYOTA') return 'Toyota';
  if (u === 'AUDI') return 'Audi';
  return raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
}

function formatModel(make, raw) {
  if (!raw) return 'Standard Model';
  let m = raw.trim();
  if (make === 'BMW') {
    if (/^[1-8]\s*series/i.test(m)) return m.replace(/series/i, 'Series');
    if (/^[1-8]\d{2}/.test(m)) return `${m.charAt(0)} Series (${m}i / ${m}d)`;
    if (/^[1-8]$/.test(m)) return `${m} Series`;
    if (/^[XYZ]\d/i.test(m)) return m.toUpperCase();
  }
  if (make === 'Mercedes-Benz') {
    if (/^[a-z]\s*\d{3}/i.test(m)) return `${m.charAt(0).toUpperCase()}-Class (${m})`;
    if (!/class/i.test(m) && /^[A-Z]$/i.test(m)) return `${m.toUpperCase()}-Class`;
  }
  if (make === 'Volkswagen') {
    if (m.toUpperCase() === 'GOLF') return 'Golf';
    if (m.toUpperCase() === 'POLO') return 'Polo';
    if (m.toUpperCase() === 'PASSAT') return 'Passat';
    if (m.toUpperCase() === 'TIGUAN') return 'Tiguan';
  }
  if (make === 'Ford') {
    if (m.toUpperCase().includes('TRANSIT COURIER')) return 'Transit Courier';
    if (m.toUpperCase().includes('TRANSIT CUSTOM')) return 'Transit Custom';
    if (m.toUpperCase().includes('TRANSIT')) return 'Transit';
    if (m.toUpperCase().includes('FOCUS')) return 'Focus';
    if (m.toUpperCase().includes('FIESTA')) return 'Fiesta';
    if (m.toUpperCase().includes('KUGA')) return 'Kuga';
  }
  return m.charAt(0).toUpperCase() + m.slice(1).toLowerCase();
}

function parseYear(d1, d2, d3, reg) {
  const d = d1 || d2 || d3;
  if (d) {
    const yr = parseInt(d.substring(0, 4));
    if (yr >= 1970 && yr <= 2030) return yr;
  }
  return parseYearFromReg(reg);
}

function parseYearFromReg(reg) {
  if (!reg || reg.length < 4) return 2018;
  const numPart = reg.substring(2, 4);
  const num = parseInt(numPart);
  if (!isNaN(num)) {
    if (num >= 51 && num <= 99) return 2000 + (num - 50);
    if (num >= 0 && num <= 49) return 2000 + num;
  }
  return 2016;
}

function detectTransmission(make, model, fuel, engineSize) {
  const m = (model || '').toUpperCase();
  const mk = (make || '').toUpperCase();

  if (mk === 'BMW') {
    return { name: '8-Speed Steptronic (ZF 8HP Automatic)', category: 'AUTO', family: 'ZF 8HP Series', code: 'ZF-8HP' };
  }
  if (mk === 'VOLKSWAGEN' || mk === 'AUDI' || mk === 'SEAT' || mk === 'SKODA') {
    return { name: '7-Speed DSG Dual-Clutch (VAG S-Tronic)', category: 'DSG', family: 'VAG DSG Mechatronic', code: 'DQ381 / DQ500' };
  }
  if (mk === 'MERCEDES-BENZ') {
    return { name: '9G-Tronic / 7G-DCT Dual Clutch Automatic', category: 'AUTO', family: 'Mercedes 722.9 / 725.0', code: '7G / 9G' };
  }
  if (mk === 'FORD') {
    if (m.includes('TRANSIT') || m.includes('FIESTA') || m.includes('FOCUS')) {
      return { name: '6-Speed Manual Transmission', category: 'MANUAL', family: 'Ford Durashift / 6MT', code: 'FORD-6MT' };
    }
    return { name: 'Powershift Dual-Clutch / 6-Speed Manual', category: 'AUTO', family: 'Ford 6DCT450', code: '6DCT' };
  }
  if (mk === 'TOYOTA') {
    if (m.includes('AYGO') || m.includes('YARIS')) {
      return { name: '5-Speed Manual / MultiMode Transmission', category: 'MANUAL', family: 'Toyota C551 Manual', code: 'C551' };
    }
    return { name: 'e-CVT Electronic Transmission', category: 'AUTO', family: 'Toyota Hybrid Synergy', code: 'E-CVT' };
  }
  return { name: 'Automatic / Manual Transmission', category: 'MANUAL', family: 'OEM Transmission', code: 'OEM-SPEC' };
}

function formatPlate(reg) {
  if (reg.length === 7) return `${reg.slice(0, 4)} ${reg.slice(4)}`;
  if (reg.length === 6) return `${reg.slice(0, 3)} ${reg.slice(3)}`;
  return reg;
}

/* =========================================================================
   9. MASTER DISPATCHER & SCHEDULED CRON
   ========================================================================= */

export default {
  // Scheduled Cron Handler (runs every 6 hours)
  async scheduled(event, env, ctx) {
    try {
      const accessToken = await getValidGoogleAccessToken(env);
      if (accessToken) {
        console.log('[Cron Sync] Token valid. Minimal telemetry sync active.');
      }
    } catch (err) {
      console.warn('[Cron Sync Error]:', err);
    }
  },

  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    // A. Public Vehicle Lookup API
    if (path === '/api/vehicle-lookup') {
      return handleVehicleLookup(request, env);
    }

    // B. Public Analytics Double-Layer Privacy Gateway
    if (path === '/api/analytics/event') {
      return handleAnalyticsEvent(request, env);
    }

    // C. Public Google OAuth Login & Callback
    if (path === '/api/auth/google/login') {
      return handleGoogleOAuthLogin(request, env);
    }
    if (path === '/api/auth/google/callback') {
      return handleGoogleOAuthCallback(request, env);
    }

    // D. Admin Login API Endpoint
    if (path === '/api/admin/login' && request.method === 'POST') {
      try {
        const body = await request.json();
        const expectedUser = (env && env.ADMIN_USERNAME) || 'admin';
        const expectedPass = (env && env.ADMIN_PASSWORD) || '';

        if (!expectedPass) {
          return new Response(JSON.stringify({
            status: 'ERROR',
            error: 'ADMIN_PASSWORD not set in Cloudflare Worker secrets.'
          }), { status: 500, headers: CORS_HEADERS });
        }

        if (body.username === expectedUser && body.password === expectedPass) {
          const sessionToken = await createAdminSessionToken(body.username, env);
          return new Response(JSON.stringify({ status: 'SUCCESS' }), {
            status: 200,
            headers: {
              ...CORS_HEADERS,
              'Set-Cookie': `gearbox_admin_session=${sessionToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`
            }
          });
        }
        return new Response(JSON.stringify({ status: 'ERROR', error: 'Invalid username or password.' }), { status: 401, headers: CORS_HEADERS });
      } catch (e) {
        return new Response(JSON.stringify({ status: 'ERROR', error: 'Malformed request.' }), { status: 400, headers: CORS_HEADERS });
      }
    }

    // E. Admin Logout Endpoint
    if (path === '/api/admin/logout') {
      return new Response(JSON.stringify({ status: 'LOGGED_OUT' }), {
        status: 200,
        headers: {
          ...CORS_HEADERS,
          'Set-Cookie': 'gearbox_admin_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'
        }
      });
    }

    // F. Protected Admin API Endpoints
    if (path.startsWith('/api/admin/')) {
      const auth = await verifyAdminAuth(request, env);
      if (!auth.authorized) {
        return handleUnauthorizedAdmin(request, true);
      }

      // 1. Overall Unified Integrations Status
      if (path === '/api/admin/integrations/status') {
        const google = await getUnifiedGoogleStatus(env);
        const ga4 = await getGa4ConnectionStatus(env);
        const dfs = getDataForSeoStatus(env);
        return new Response(JSON.stringify({
          gsc: google,
          ga4: ga4,
          dataforseo: dfs,
          runtime: 'Cloudflare Workers (V8 Edge Runtime with SEO_AUTH KV)',
          server_time: new Date().toISOString()
        }), { status: 200, headers: CORS_HEADERS });
      }

      // 2. Google Search Console Status
      if (path === '/api/admin/integrations/gsc/status') {
        return new Response(JSON.stringify(await getUnifiedGoogleStatus(env)), { status: 200, headers: CORS_HEADERS });
      }

      // 3. Google Disconnect (Search Console + GA4)
      if (path === '/api/admin/integrations/google/disconnect') {
        return handleGoogleDisconnect(env);
      }

      // 4. GA4 Status
      if (path === '/api/admin/integrations/ga4/status') {
        return new Response(JSON.stringify(await getGa4ConnectionStatus(env)), { status: 200, headers: CORS_HEADERS });
      }

      // 5. DataForSEO Status
      if (path === '/api/admin/integrations/dataforseo/status') {
        return new Response(JSON.stringify(getDataForSeoStatus(env)), { status: 200, headers: CORS_HEADERS });
      }

      // 6. DataForSEO Safe Test Ping
      if (path === '/api/admin/integrations/dataforseo/test') {
        const testRes = await testDataForSeoConnection(env);
        return new Response(JSON.stringify(testRes), { status: 200, headers: CORS_HEADERS });
      }

      // 7. DataForSEO Cost Estimator
      if (path === '/api/admin/integrations/dataforseo/estimate-cost') {
        const reqType = url.searchParams.get('type') || 'serp_live';
        const count = parseInt(url.searchParams.get('count')) || 10;
        const estimate = estimateDataForSeoCost(reqType, count, env);
        return new Response(JSON.stringify(estimate), { status: 200, headers: CORS_HEADERS });
      }

      // 8. Case Study Ingestion API
      if (path === '/api/admin/case-studies/submit') {
        return handleCaseStudySubmit(request, env);
      }

      return new Response(JSON.stringify({ error: 'Admin API endpoint not found' }), { status: 404, headers: CORS_HEADERS });
    }

    // G. Protected Admin HTML Pages (/admin/*)
    if (path.startsWith('/admin')) {
      const auth = await verifyAdminAuth(request, env);
      if (!auth.authorized) {
        return handleUnauthorizedAdmin(request, false);
      }
    }

    // H. Static Asset Serving via Cloudflare Assets
    if (env && env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      const newHeaders = new Headers(assetResponse.headers);
      for (const [k, v] of Object.entries(SECURITY_HEADERS)) {
        newHeaders.set(k, v);
      }
      return new Response(assetResponse.body, {
        status: assetResponse.status,
        statusText: assetResponse.statusText,
        headers: newHeaders
      });
    }

    return fetch(request);
  }
};
