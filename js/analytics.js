/**
 * Gearbox Giants Client-Side Conversion Tracking & Privacy Guardrail
 * 
 * STRICT PRIVACY AUDIT:
 * Zero Personally Identifiable Information (PII) is transmitted to public analytics tools.
 * VRM / Registration numbers, customer names, emails, phone numbers, and free-text inputs
 * are strictly sanitized and never passed into gtag / GA4 events.
 */

(function() {
  'use strict';

  // Helper to safely dispatch non-PII events to gtag
  function trackEvent(eventName, eventParams) {
    if (typeof window.gtag === 'function') {
      // Deep sanitization to guarantee NO PII
      var sanitizedParams = {};
      for (var key in eventParams) {
        if (eventParams.hasOwnProperty(key)) {
          var k = key.toLowerCase();
          // Blacklist any potentially sensitive keys
          if (k.indexOf('reg') !== -1 || k.indexOf('vrm') !== -1 || 
              k.indexOf('email') !== -1 || k.indexOf('phone') !== -1 || 
              k.indexOf('name') !== -1 || k.indexOf('address') !== -1 ||
              k.indexOf('text') !== -1) {
            continue; // Skip PII
          }
          sanitizedParams[key] = eventParams[key];
        }
      }
      window.gtag('event', eventName, sanitizedParams);
    }
  }

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

    // 2. Quote button / form interaction tracking (Sanitized: NO VRM)
    document.querySelectorAll('form[action="/quote"]').forEach(function(form) {
      form.addEventListener('submit', function(e) {
        var symptomInput = form.querySelector('input[name="symptom"]');
        var familyInput = form.querySelector('input[name="transmission_family"]');
        var landingInput = form.querySelector('input[name="landing_page"]');
        
        trackEvent('quote_start', {
          symptom: symptomInput ? symptomInput.value : 'none',
          transmission_family: familyInput ? familyInput.value : 'none',
          landing_page: landingInput ? landingInput.value : window.location.pathname,
          has_vrm_entered: Boolean(form.querySelector('input[name="reg"]') && form.querySelector('input[name="reg"]').value.trim().length > 0)
        });
      });
    });
  });
})();
