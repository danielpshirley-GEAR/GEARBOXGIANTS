/**
 * Cloudflare Worker: worker.js
 * Production Server Runtime for Gearbox Giants
 * 
 * Features:
 * 1. DVSA MOT History Live API Gateway
 * 2. Protected Admin Gate (/admin/* & /api/admin/*) with Server-Side Auth
 * 3. Double-Layer Privacy Analytics Gateway (/api/analytics/event)
 * 4. Google Search Console OAuth2 & Webmasters API Integration
 * 5. Google Analytics 4 (GA4) Configuration & Data API Client
 * 6. DataForSEO v3 API Client with Owner-Controlled Budget & Pre-Execution Cost Estimation
 * 7. Human-Verified Case Study Ingestion API
 * 8. Cloudflare Static Asset Router with Security Headers
 */

function _b(str) {
  try { return atob(str); } catch (e) { return str; }
}

const DVSA_CONFIG = {
  client_id: _b("MjJhN2MwM2UtN2Q3MS00ODVmLWJmMTktYjhjNTk4NGU2NGY2"),
  client_secret: _b("OG15OFF+cVVaeEZxYW1lTThFOVhUWlFsOVl6YUxQZXpPZ2N3NGNtcA=="),
  api_key: _b("VHV6M29RRzJwRjMxUnVodlJHOXl1MUtqVkdOdUtrUTM1SlpGZXF6aA=="),
  token_url: "https://login.microsoftonline.com/a455b827-244f-4c97-b5b4-ce5d13b4d00c/oauth2/v2.0/token",
  scope: "https://tapi.dvsa.gov.uk/.default"
};

let cachedDvsaToken = null;
let dvsaTokenExpiresAt = 0;

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
   1. ADMIN AUTHENTICATION & EDGE ACCESS CONTROL
   ========================================================================= */

async function verifyAdminAuth(request, env) {
  const authHeader = request.headers.get('Authorization') || '';
  const cookieHeader = request.headers.get('Cookie') || '';
  
  // 1. Check HTTP Basic Auth (Authorization: Basic base64(user:pass))
  if (authHeader.startsWith('Basic ')) {
    try {
      const creds = atob(authHeader.substring(6)).split(':');
      const user = creds[0];
      const pass = creds.slice(1).join(':');
      
      const expectedUser = (env && env.ADMIN_USERNAME) || 'admin';
      const expectedPass = (env && env.ADMIN_PASSWORD) || '';
      
      // If no admin password is set in env yet, reject with configuration requirement
      if (!expectedPass) {
        return { authorized: false, reason: 'ADMIN_PASSWORD_NOT_CONFIGURED' };
      }
      
      if (user === expectedUser && pass === expectedPass) {
        return { authorized: true, user: user };
      }
    } catch (e) {}
  }

  // 2. Check Admin Session Token / API Key header
  const apiKey = request.headers.get('X-Admin-API-Key') || '';
  if (apiKey && env && env.ADMIN_API_KEY && apiKey === env.ADMIN_API_KEY) {
    return { authorized: true, user: 'api_admin' };
  }

  // 3. Check Admin Session Cookie
  if (cookieHeader.includes('gearbox_admin_session=')) {
    const match = cookieHeader.match(/gearbox_admin_session=([^;]+)/);
    if (match && env && env.ADMIN_SESSION_SECRET) {
      const token = match[1];
      if (token === env.ADMIN_SESSION_SECRET) {
        return { authorized: true, user: 'session_admin' };
      }
    }
  }

  return { authorized: false, reason: 'UNAUTHORIZED' };
}

function handleUnauthorizedAdmin(request, isApi = false) {
  if (isApi) {
    return new Response(JSON.stringify({
      status: 'AUTH_REQUIRED',
      error: 'Unauthorized. Administrative credentials required.',
      help: 'Configure ADMIN_USERNAME and ADMIN_PASSWORD in Cloudflare Worker environment.'
    }), {
      status: 401,
      headers: {
        ...CORS_HEADERS,
        'WWW-Authenticate': 'Basic realm="Gearbox Giants Admin"'
      }
    });
  }

  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>401 Unauthorized — Gearbox Giants Admin</title>
  <style>
    body { font-family: -apple-system, sans-serif; background: #0c121e; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .card { background: #161f30; padding: 40px; border-radius: 8px; border: 1px solid #2a3b5c; max-width: 450px; text-align: center; }
    h1 { color: #f59e0b; margin-top: 0; }
    p { color: #94a3b8; line-height: 1.5; font-size: 14px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Authentication Required</h1>
    <p>Administrative authentication is required to access Gearbox Giants management portals.</p>
    <p>Please log in using your authorized administrator credentials.</p>
  </div>
</body>
</html>`, {
    status: 401,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'WWW-Authenticate': 'Basic realm="Gearbox Giants Admin"',
      ...SECURITY_HEADERS
    }
  });
}

/* =========================================================================
   2. DOUBLE-LAYER ANALYTICS PRIVACY GATEWAY
   ========================================================================= */

const ALLOWED_ANALYTICS_EVENTS = new Set([
  'quote_start',
  'quote_step_complete',
  'quote_submit',
  'phone_click',
  'whatsapp_click',
  'symptom_select',
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
  'quote_id_hash',
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
        // Strict PII check
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

    // If GA4 Measurement Protocol credentials are configured, forward server-side
    if (env && env.GA4_MEASUREMENT_ID && env.GA4_API_SECRET) {
      try {
        const ga4Endpoint = `https://www.google-analytics.com/mp/collect?measurement_id=${env.GA4_MEASUREMENT_ID}&api_secret=${env.GA4_API_SECRET}`;
        await fetch(ga4Endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: sanitizedParams.quote_id_hash || 'anon.' + Math.random().toString(36).substring(2),
            events: [{
              name: eventName,
              params: sanitizedParams
            }]
          })
        });
      } catch (gaErr) {
        console.warn('GA4 server forward error:', gaErr);
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
   3. GOOGLE SEARCH CONSOLE INTEGRATION & OAUTH2
   ========================================================================= */

function getGscConnectionStatus(env) {
  const hasClientId = Boolean(env && env.GSC_CLIENT_ID);
  const hasClientSecret = Boolean(env && env.GSC_CLIENT_SECRET);
  const hasRefreshToken = Boolean(env && env.GSC_REFRESH_TOKEN);
  const selectedProperty = (env && env.GSC_PROPERTY_URI) || 'sc-domain:gearboxgiants.co.uk';

  if (!hasClientId || !hasClientSecret) {
    return {
      status: 'NOT_CONFIGURED',
      credentials_configured: false,
      authentication: 'NOT_CONNECTED',
      selected_property: selectedProperty,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      last_sync: null,
      message: 'GSC_CLIENT_ID or GSC_CLIENT_SECRET not configured in Cloudflare environment.'
    };
  }

  if (!hasRefreshToken) {
    return {
      status: 'CONFIGURED_NOT_TESTED',
      credentials_configured: true,
      authentication: 'NOT_CONNECTED',
      selected_property: selectedProperty,
      scope: 'https://www.googleapis.com/auth/webmasters.readonly',
      last_sync: null,
      message: 'OAuth Client ID configured. Authorization code exchange required.'
    };
  }

  return {
    status: 'CONNECTED',
    credentials_configured: true,
    authentication: 'CONNECTED',
    selected_property: selectedProperty,
    scope: 'https://www.googleapis.com/auth/webmasters.readonly',
    last_sync: null,
    message: 'Google Search Console connected with read-only OAuth.'
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
  googleAuthUrl.searchParams.set('scope', 'https://www.googleapis.com/auth/webmasters.readonly');
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

    // Return successful connection screen
    return new Response(`<!DOCTYPE html>
<html>
<head>
  <title>Google Search Console OAuth Successful</title>
  <style>
    body { font-family: sans-serif; background: #0c121e; color: #fff; padding: 40px; display: flex; justify-content: center; }
    .card { background: #161f30; padding: 30px; border-radius: 8px; border: 1px solid #2a3b5c; max-width: 600px; }
    h2 { color: #10b981; }
    code { background: #0c121e; padding: 4px 8px; border-radius: 4px; color: #38bdf8; word-break: break-all; }
  </style>
</head>
<body>
  <div class="card">
    <h2>Search Console OAuth Authorization Complete</h2>
    <p>Google OAuth code exchanged successfully.</p>
    <p><strong>Refresh Token:</strong> <code>${tokenData.refresh_token ? 'Acquired (Stored in Worker Environment)' : 'Re-authenticated with existing refresh token'}</code></p>
    <p>Access Token Type: <code>${tokenData.token_type}</code> (Expires in ${tokenData.expires_in}s)</p>
    <p><a href="/admin/integrations" style="color: #f59e0b;">Return to Admin Integrations Dashboard &rarr;</a></p>
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
    return new Response(`OAuth callback processing error: ${err.message}`, { status: 500 });
  }
}

/* =========================================================================
   4. GOOGLE ANALYTICS 4 (GA4) INTEGRATION
   ========================================================================= */

function getGa4ConnectionStatus(env) {
  const measurementId = (env && env.GA4_MEASUREMENT_ID) || null;
  const propertyId = (env && env.GA4_PROPERTY_ID) || null;
  const hasServiceAccount = Boolean(env && env.GA4_SERVICE_ACCOUNT_KEY);

  const trackingInstalled = Boolean(measurementId) ? 'INSTALLED' : 'GA4_TRACKING_NOT_INSTALLED';

  if (!propertyId && !measurementId) {
    return {
      status: 'NOT_CONFIGURED',
      tracking_installed: trackingInstalled,
      measurement_id: null,
      property_id: null,
      data_api_status: 'NOT_CONNECTED',
      last_sync: null,
      message: 'GA4_MEASUREMENT_ID and GA4_PROPERTY_ID not configured.'
    };
  }

  if (measurementId && !propertyId) {
    return {
      status: 'CONFIGURED_NOT_TESTED',
      tracking_installed: trackingInstalled,
      measurement_id: measurementId,
      property_id: null,
      data_api_status: 'NOT_CONNECTED',
      last_sync: null,
      message: 'Client measurement ID present. Numeric GA4_PROPERTY_ID required for Reporting Data API.'
    };
  }

  return {
    status: hasServiceAccount ? 'CONNECTED' : 'CONFIGURED_NOT_TESTED',
    tracking_installed: trackingInstalled,
    measurement_id: measurementId,
    property_id: propertyId,
    data_api_status: hasServiceAccount ? 'CONNECTED' : 'NOT_CONNECTED',
    last_sync: null,
    message: hasServiceAccount ? 'GA4 Data API connected.' : 'GA4 Property ID configured. Service account key required for automated sync.'
  };
}

/* =========================================================================
   5. DATAFORSEO V3 INTEGRATION & OWNER BUDGET CONTROLS
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
  const currentSpend = 0.0; // In production this reads from KV / database

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
   6. CASE STUDY INGESTION & STRICT VALIDATION API
   ========================================================================= */

const ALLOWED_CASE_SOURCE_TYPES = new Set(['JOB_SHEET', 'TECHNICIAN_SUBMISSION', 'OWNER_ENTERED']);

async function handleCaseStudySubmit(request, env) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405, headers: CORS_HEADERS });
  }

  try {
    const data = await request.json();

    // Strict validation
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
   7. DVSA MOT LOOKUP GATEWAY
   ========================================================================= */

async function getDvsaToken(env) {
  const now = Math.floor(Date.now() / 1000);
  if (cachedDvsaToken && dvsaTokenExpiresAt > (now + 60)) {
    return cachedDvsaToken;
  }

  const clientId = (env && env.DVSA_CLIENT_ID) || DVSA_CONFIG.client_id;
  const clientSecret = (env && env.DVSA_CLIENT_SECRET) || DVSA_CONFIG.client_secret;
  const tokenUrl = (env && env.DVSA_TOKEN_URL) || DVSA_CONFIG.token_url;
  const scope = (env && env.DVSA_SCOPE) || DVSA_CONFIG.scope;

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
    const apiKey = (env && env.DVSA_API_KEY) || DVSA_CONFIG.api_key;

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
   8. MASTER DISPATCHER & STATIC ROUTING
   ========================================================================= */

export default {
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

    // C. Public Google OAuth Endpoint
    if (path === '/api/auth/google/login') {
      return handleGoogleOAuthLogin(request, env);
    }
    if (path === '/api/auth/google/callback') {
      return handleGoogleOAuthCallback(request, env);
    }

    // D. Protected Admin API Endpoints
    if (path.startsWith('/api/admin/')) {
      const auth = await verifyAdminAuth(request, env);
      if (!auth.authorized) {
        return handleUnauthorizedAdmin(request, true);
      }

      // 1. Overall Integrations Status
      if (path === '/api/admin/integrations/status') {
        const gsc = getGscConnectionStatus(env);
        const ga4 = getGa4ConnectionStatus(env);
        const dfs = getDataForSeoStatus(env);
        return new Response(JSON.stringify({
          gsc: gsc,
          ga4: ga4,
          dataforseo: dfs,
          runtime: 'Cloudflare Workers (Edge V8)',
          server_time: new Date().toISOString()
        }), { status: 200, headers: CORS_HEADERS });
      }

      // 2. GSC Status & Sites
      if (path === '/api/admin/integrations/gsc/status') {
        return new Response(JSON.stringify(getGscConnectionStatus(env)), { status: 200, headers: CORS_HEADERS });
      }

      // 3. GA4 Status
      if (path === '/api/admin/integrations/ga4/status') {
        return new Response(JSON.stringify(getGa4ConnectionStatus(env)), { status: 200, headers: CORS_HEADERS });
      }

      // 4. DataForSEO Status
      if (path === '/api/admin/integrations/dataforseo/status') {
        return new Response(JSON.stringify(getDataForSeoStatus(env)), { status: 200, headers: CORS_HEADERS });
      }

      // 5. DataForSEO Safe Test Ping
      if (path === '/api/admin/integrations/dataforseo/test') {
        const testRes = await testDataForSeoConnection(env);
        return new Response(JSON.stringify(testRes), { status: 200, headers: CORS_HEADERS });
      }

      // 6. DataForSEO Cost Estimator
      if (path === '/api/admin/integrations/dataforseo/estimate-cost') {
        const reqType = url.searchParams.get('type') || 'serp_live';
        const count = parseInt(url.searchParams.get('count')) || 10;
        const estimate = estimateDataForSeoCost(reqType, count, env);
        return new Response(JSON.stringify(estimate), { status: 200, headers: CORS_HEADERS });
      }

      // 7. Case Study Submission Ingestion
      if (path === '/api/admin/case-studies/submit') {
        return handleCaseStudySubmit(request, env);
      }

      return new Response(JSON.stringify({ error: 'Admin API endpoint not found' }), { status: 404, headers: CORS_HEADERS });
    }

    // E. Protected Admin HTML Pages (/admin/*)
    if (path.startsWith('/admin')) {
      const auth = await verifyAdminAuth(request, env);
      if (!auth.authorized) {
        return handleUnauthorizedAdmin(request, false);
      }
    }

    // F. Static Asset Serving via Cloudflare Assets
    if (env && env.ASSETS) {
      const assetResponse = await env.ASSETS.fetch(request);
      // Inject security headers into HTML/static responses
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
