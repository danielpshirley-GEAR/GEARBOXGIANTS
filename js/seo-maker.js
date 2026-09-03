/**
 * GEARBOX GIANTS - INTERACTIVE SEO MAKER & SCHEMA STUDIO
 */

(function () {
  'use strict';

  // State
  let seoState = {
    domain: 'https://gearboxgiants.co.uk',
    pagePath: 'index.html',
    title: 'Gearbox Giants | UK Specialist Gearbox Repair & Reconditioning',
    description: 'Specialist gearbox repair, replacement and reconditioning across 45 covered service areas. Free vehicle recovery on completed repairs, 12-Month / 12,000-Mile warranty.',
    canonicalUrl: 'https://gearboxgiants.co.uk/',
    ogImage: 'https://gearboxgiants.co.uk/assets/step_1_quote.jpg',
    locationName: 'London & South England',
    serviceName: 'Gearbox Repair & Reconditioning',
    schemaType: 'AutoRepair',
    phone: '0208 058 9668',
    rating: '4.9',
    reviewsCount: '128',
    faqs: [
      { q: "How long does a gearbox repair take?", a: "We operate a prompt turnaround from vehicle collection, including specialist teardown, precision component rebuilding, and return delivery." },
      { q: "Do you offer free vehicle collection?", a: "Yes, Gearbox Giants provides complimentary collection and return delivery on all completed repairs across London and South England." },
      { q: "What warranty is included with the gearbox repair?", a: "Qualifying full gearbox rebuilds include our 12-Month / 12,000-Mile warranty covering parts and labour." }
    ]
  };

  function initSeoMaker() {
    setupEventListeners();
    updateSerpPreview();
    updateSocialPreview();
    updateSchemaOutput();
    updateHeadCodeOutput();
  }

  function setupEventListeners() {
    // Inputs
    const inputs = [
      { id: 'input-page-title', key: 'title' },
      { id: 'input-meta-desc', key: 'description' },
      { id: 'input-canonical', key: 'canonicalUrl' },
      { id: 'input-location', key: 'locationName' },
      { id: 'input-service', key: 'serviceName' },
      { id: 'input-phone', key: 'phone' },
      { id: 'input-rating', key: 'rating' },
      { id: 'input-reviews', key: 'reviewsCount' }
    ];

    inputs.forEach(({ id, key }) => {
      const el = document.getElementById(id);
      if (el) {
        el.value = seoState[key];
        el.addEventListener('input', function () {
          seoState[key] = this.value;
          updateSerpPreview();
          updateSocialPreview();
          updateSchemaOutput();
          updateHeadCodeOutput();
        });
      }
    });

    // Device View Toggles (Desktop vs Mobile Google SERP)
    const btnDesktop = document.getElementById('btn-serp-desktop');
    const btnMobile = document.getElementById('btn-serp-mobile');
    const serpContainer = document.getElementById('serp-preview-box');

    if (btnDesktop && btnMobile && serpContainer) {
      btnDesktop.addEventListener('click', () => {
        btnDesktop.classList.add('active');
        btnMobile.classList.remove('active');
        serpContainer.classList.remove('serp-mobile');
      });
      btnMobile.addEventListener('click', () => {
        btnMobile.classList.add('active');
        btnDesktop.classList.remove('active');
        serpContainer.classList.add('serp-mobile');
      });
    }

    // Preset Location Quick Selector
    const presetSelect = document.getElementById('preset-location-select');
    if (presetSelect) {
      presetSelect.addEventListener('change', function () {
        const val = this.value;
        if (!val) return;
        applyLocationPreset(val);
      });
    }
  }

  function applyLocationPreset(location) {
    seoState.locationName = location;
    seoState.title = `${location} Gearbox Repair Specialist | Rebuilds & Replacement | Gearbox Giants`;
    seoState.description = `Expert gearbox repair & reconditioning in ${location}. Automatic & manual specialist with free vehicle recovery, warranty included. Up to 60% cheaper than main dealer.`;
    seoState.canonicalUrl = `https://gearboxgiants.co.uk/location-${location.toLowerCase().replace(/\s+/g, '-')}.html`;

    const titleEl = document.getElementById('input-page-title');
    const descEl = document.getElementById('input-meta-desc');
    const canonEl = document.getElementById('input-canonical');
    const locEl = document.getElementById('input-location');

    if (titleEl) titleEl.value = seoState.title;
    if (descEl) descEl.value = seoState.description;
    if (canonEl) canonEl.value = seoState.canonicalUrl;
    if (locEl) locEl.value = seoState.locationName;

    updateSerpPreview();
    updateSocialPreview();
    updateSchemaOutput();
    updateHeadCodeOutput();
  }

  function updateSerpPreview() {
    const serpTitle = document.getElementById('serp-title');
    const serpDesc = document.getElementById('serp-desc');
    const serpUrl = document.getElementById('serp-url');
    const titleCounter = document.getElementById('title-counter');
    const descCounter = document.getElementById('desc-counter');
    const titleProgress = document.getElementById('title-progress-bar');
    const descProgress = document.getElementById('desc-progress-bar');

    if (serpTitle) serpTitle.textContent = seoState.title || 'Page Title';
    if (serpDesc) serpDesc.textContent = seoState.description || 'Meta Description...';
    if (serpUrl) serpUrl.textContent = seoState.canonicalUrl || 'https://gearboxgiants.co.uk/';

    // Character Length calculations
    const titleLen = (seoState.title || '').length;
    const descLen = (seoState.description || '').length;

    if (titleCounter) {
      titleCounter.textContent = `${titleLen} / 60 chars`;
      titleCounter.style.color = (titleLen >= 45 && titleLen <= 65) ? 'var(--success)' : (titleLen > 65 ? 'var(--danger)' : 'var(--warning)');
    }
    if (titleProgress) {
      const pct = Math.min(100, (titleLen / 60) * 100);
      titleProgress.style.width = `${pct}%`;
      titleProgress.style.background = (titleLen >= 45 && titleLen <= 65) ? 'var(--success)' : (titleLen > 65 ? 'var(--danger)' : 'var(--warning)');
    }

    if (descCounter) {
      descCounter.textContent = `${descLen} / 160 chars`;
      descCounter.style.color = (descLen >= 120 && descLen <= 160) ? 'var(--success)' : (descLen > 160 ? 'var(--danger)' : 'var(--warning)');
    }
    if (descProgress) {
      const pct = Math.min(100, (descLen / 160) * 100);
      descProgress.style.width = `${pct}%`;
      descProgress.style.background = (descLen >= 120 && descLen <= 160) ? 'var(--success)' : (descLen > 160 ? 'var(--danger)' : 'var(--warning)');
    }
  }

  function updateSocialPreview() {
    const ogTitle = document.getElementById('og-preview-title');
    const ogDesc = document.getElementById('og-preview-desc');
    const ogDomain = document.getElementById('og-preview-domain');

    if (ogTitle) ogTitle.textContent = seoState.title;
    if (ogDesc) ogDesc.textContent = seoState.description;
    if (ogDomain) ogDomain.textContent = 'gearboxgiants.co.uk';
  }

  function generateJsonLd() {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "AutoRepair",
          "@id": `${seoState.canonicalUrl}#localbusiness`,
          "name": `Gearbox Giants - ${seoState.locationName}`,
          "url": seoState.canonicalUrl,
          "telephone": `+44 ${seoState.phone.replace(/^0/, '')}`,
          "priceRange": "££",
          "image": seoState.ogImage,
          "description": seoState.description,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": seoState.locationName,
            "addressCountry": "GB"
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              "opens": "09:00",
              "closes": "18:00"
            }
          ],
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": seoState.rating,
            "reviewCount": seoState.reviewsCount,
            "bestRating": "5",
            "worstRating": "1"
          }
        },
        {
          "@type": "FAQPage",
          "@id": `${seoState.canonicalUrl}#faq`,
          "mainEntity": seoState.faqs.map(f => ({
            "@type": "Question",
            "name": f.q,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": f.a
            }
          }))
        }
      ]
    };
  }

  function updateSchemaOutput() {
    const schemaOutput = document.getElementById('schema-code-output');
    if (schemaOutput) {
      const json = JSON.stringify(generateJsonLd(), null, 2);
      schemaOutput.textContent = `<script type="application/ld+json">\n${json}\n</script>`;
    }
  }

  function updateHeadCodeOutput() {
    const headOutput = document.getElementById('head-code-output');
    if (!headOutput) return;

    const json = JSON.stringify(generateJsonLd(), null, 2);
    const code = `<!-- Primary Meta Tags -->
<title>${seoState.title}</title>
<meta name="title" content="${seoState.title}">
<meta name="description" content="${seoState.description}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${seoState.canonicalUrl}">

<!-- Open Graph / Facebook / LinkedIn -->
<meta property="og:type" content="website">
<meta property="og:url" content="${seoState.canonicalUrl}">
<meta property="og:title" content="${seoState.title}">
<meta property="og:description" content="${seoState.description}">
<meta property="og:image" content="${seoState.ogImage}">

<!-- Twitter / X -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${seoState.canonicalUrl}">
<meta property="twitter:title" content="${seoState.title}">
<meta property="twitter:description" content="${seoState.description}">
<meta property="twitter:image" content="${seoState.ogImage}">

<!-- JSON-LD Structured Data Schema -->
<script type="application/ld+json">
${json}
</script>`;

    headOutput.textContent = code;
  }

  // Copy Helpers
  window.copySeoCode = function (elemId, btnElem) {
    const target = document.getElementById(elemId);
    if (!target) return;
    navigator.clipboard.writeText(target.textContent).then(() => {
      const originalText = btnElem.innerHTML;
      btnElem.innerHTML = '✓ Copied to Clipboard!';
      btnElem.style.background = 'var(--success)';
      btnElem.style.color = '#000';
      setTimeout(() => {
        btnElem.innerHTML = originalText;
        btnElem.style.background = '';
        btnElem.style.color = '';
      }, 2000);
    });
  };

  // Add FAQ Item to Schema
  window.addFaqItem = function () {
    const qInput = document.getElementById('new-faq-q');
    const aInput = document.getElementById('new-faq-a');
    if (!qInput || !aInput || !qInput.value.trim() || !aInput.value.trim()) return;

    seoState.faqs.push({ q: qInput.value.trim(), a: aInput.value.trim() });
    qInput.value = '';
    aInput.value = '';
    renderFaqList();
    updateSchemaOutput();
    updateHeadCodeOutput();
  };

  window.removeFaqItem = function (index) {
    seoState.faqs.splice(index, 1);
    renderFaqList();
    updateSchemaOutput();
    updateHeadCodeOutput();
  };

  function renderFaqList() {
    const container = document.getElementById('faq-items-list');
    if (!container) return;
    container.innerHTML = '';
    seoState.faqs.forEach((faq, idx) => {
      const item = document.createElement('div');
      item.style.cssText = 'background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:var(--border-radius-sm); padding:0.85rem; margin-bottom:0.6rem; display:flex; justify-content:space-between; align-items:flex-start; gap:0.75rem;';
      item.innerHTML = `
        <div style="flex:1;">
          <strong style="color:#ffffff; font-size:0.9rem; display:block; margin-bottom:0.25rem;">Q: ${faq.q}</strong>
          <span style="color:var(--text-muted); font-size:0.85rem;">A: ${faq.a}</span>
        </div>
        <button onclick="window.removeFaqItem(${idx})" style="color:var(--danger); cursor:pointer; background:none; border:none; padding:4px; font-weight:700;">✕</button>
      `;
      container.appendChild(item);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSeoMaker();
      renderFaqList();
    });
  } else {
    initSeoMaker();
    renderFaqList();
  }
})();
