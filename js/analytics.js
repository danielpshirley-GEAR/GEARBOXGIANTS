/**
 * Gearbox Giants Client-Side Conversion Tracking & Double-Layer Privacy Guardrail
 * 
 * STRICT PRIVACY AUDIT & ALLOWLIST ENFORCEMENT:
 * Zero Personally Identifiable Information (PII) is transmitted to public analytics tools.
 * Uses an explicit allowlist: any parameter not on the allowlist is dropped.
 * Prohibits: VRM, name, email, phone, postal address, notes, VIN, customer free text.
 */

(function() {
  'use strict';

  // Explicit Allowlist of Event Names
  var ALLOWED_EVENTS = [
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
  ];

  // Explicit Allowlist of Allowed Event Properties (Zero PII, Zero Lead Hashes)
  var ALLOWED_PROPERTIES = [
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
  ];

  function sanitizePayload(eventName, rawParams) {
    if (ALLOWED_EVENTS.indexOf(eventName) === -1) {
      console.warn('[Analytics Privacy] Event dropped (not on allowlist):', eventName);
      return null;
    }

    var clean = {};
    if (rawParams && typeof rawParams === 'object') {
      for (var i = 0; i < ALLOWED_PROPERTIES.length; i++) {
        var prop = ALLOWED_PROPERTIES[i];
        if (rawParams.hasOwnProperty(prop) && rawParams[prop] !== undefined && rawParams[prop] !== null) {
          var val = String(rawParams[prop]);
          // Strip any accidental phone/email/reg patterns if embedded
          if (/[A-Z]{2}[0-9]{2}\s?[A-Z]{3}/i.test(val) || /@/i.test(val) || /07\d{9}/.test(val)) {
            continue; // Drop value if it resembles PII
          }
          clean[prop] = val.slice(0, 100); // Enforce safe length
        }
      }
    }
    return clean;
  }

  function trackEvent(eventName, eventParams) {
    var sanitized = sanitizePayload(eventName, eventParams);
    if (!sanitized) return;

    // 1. Dispatch to client gtag if loaded
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, sanitized);
    }

    // 2. Dispatch to server-side privacy gateway for dual-layer logging
    try {
      if (typeof fetch === 'function') {
        fetch('/api/analytics/event', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: eventName,
            params: sanitized,
            timestamp: new Date().toISOString()
          }),
          keepalive: true
        }).catch(function() {});
      }
    } catch (e) {}
  }

  // Expose safe tracker to window
  window.GGAnalytics = {
    trackEvent: trackEvent
  };

  document.addEventListener('DOMContentLoaded', function() {
    // 1. Phone link click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(function(el) {
      el.addEventListener('click', function() {
        trackEvent('phone_click', {
          link_location: el.closest('header') ? 'header' : (el.closest('footer') ? 'footer' : 'body'),
          page_path: window.location.pathname
        });
      });
    });

    // 2. WhatsApp link click tracking
    document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(function(el) {
      el.addEventListener('click', function() {
        trackEvent('whatsapp_click', {
          link_location: el.closest('header') ? 'header' : (el.closest('footer') ? 'footer' : 'body'),
          page_path: window.location.pathname
        });
      });
    });

    // 3. Quote form interaction (Zero VRM passed)
    document.querySelectorAll('form[action="/quote"], .hero-reg-form').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        var symptomInput = form.querySelector('input[name="symptom"]');
        var familyInput = form.querySelector('input[name="transmission_family"]');
        var landingInput = form.querySelector('input[name="landing_page"]');
        
        trackEvent('quote_start', {
          symptom: symptomInput ? symptomInput.value : 'unspecified',
          transmission_family: familyInput ? familyInput.value : 'unspecified',
          landing_page: landingInput ? landingInput.value : window.location.pathname,
          page_path: window.location.pathname
        });
      });
    });
  });
})();
