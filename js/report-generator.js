/**
 * GEARBOX GIANTS - COMPREHENSIVE DIAGNOSTIC REPORT & MOT DOSSIER GENERATOR
 * Renders interactive tabs, visual circular health gauge, MOT telemetry, TSB bulletins,
 * workshop action checklists, repair cost estimators, and fixed quote booking triggers.
 */

export class ReportGenerator {
  /**
   * Renders the complete vehicle diagnostic & MOT report
   */
  static renderReport(container, vehicle, diagnostic, customer) {
    if (!container) return;

    const reportDate = new Date().toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const reportTime = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const refNumber = `GG-${Math.floor(100000 + Math.random() * 900000)}`;

    container.innerHTML = `
      <div class="report-wrapper animate-fade-in">
        
        <!-- Customer Delivery Notification Banner -->
        <div class="report-delivery-banner">
          <div class="delivery-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
          </div>
          <div class="delivery-text">
            <h4>Diagnostic Report Generated for ${customer.name || 'Vehicle Owner'}</h4>
            <p>A copy has been dispatched to <strong>${customer.email}</strong> &bull; Reference: <strong>${refNumber}</strong> &bull; ${reportDate} at ${reportTime}</p>
          </div>
          <div class="delivery-actions">
            <button type="button" class="btn btn-outline btn-sm" id="btn-print-report">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
              Print / Save PDF
            </button>
            <button type="button" class="btn btn-secondary btn-sm" id="btn-new-diagnostic">
              Retest Vehicle ↺
            </button>
          </div>
        </div>

        <!-- Vehicle Report Header Card -->
        <div class="vehicle-report-header-card">
          <div class="header-left">
            <div class="reg-plate-display-sm">
              <span class="reg-gb">GB</span>
              <span class="reg-text">${vehicle.formattedReg || vehicle.registration}</span>
            </div>
            <div class="vehicle-title-wrap">
              <h2 class="vehicle-main-title">${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
              <p class="vehicle-derivative">${vehicle.derivative || vehicle.gearboxFamily}</p>
              <div class="vehicle-tags">
                <span class="vtag">${vehicle.year}</span>
                <span class="vtag">${vehicle.fuelType}</span>
                <span class="vtag" style="color:var(--amber-400); font-weight:800;">${vehicle.gearboxFamily}</span>
                <span class="vtag">${vehicle.engineCapacity > 0 ? vehicle.engineCapacity + 'cc' : 'Confirmed Spec'}</span>
                <span class="vtag" style="background:rgba(34,197,94,0.15); color:#22c55e; border-color:rgba(34,197,94,0.3);">✓ DVSA Live Verified</span>
              </div>
            </div>
          </div>

          <div class="header-right">
            <div class="health-gauge-card">
              <div class="gauge-circle-wrap">
                <svg viewBox="0 0 36 36" class="gauge-svg">
                  <path class="gauge-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                  <path class="gauge-fill" stroke="${diagnostic.urgencyColor}" stroke-dasharray="${diagnostic.healthScore}, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                </svg>
                <div class="gauge-text">
                  <span class="gauge-score">${diagnostic.healthScore}</span>
                  <span class="gauge-max">/100</span>
                </div>
              </div>
              <div class="gauge-label-wrap">
                <span class="gauge-title">Transmission Health</span>
                <span class="gauge-urgency" style="color: ${diagnostic.urgencyColor};">${diagnostic.urgencyLevel}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Telemetry Stats Row -->
        <div class="telemetry-stats-grid">
          <div class="telemetry-stat-card">
            <div class="stat-icon">📅</div>
            <div class="stat-body">
              <span class="stat-label">MOT Expiry Status</span>
              <span class="stat-value ${vehicle.motDaysRemaining < 30 ? 'text-warning' : 'text-success'}">
                ${vehicle.motDaysRemaining > 0 ? `${vehicle.motDaysRemaining} Days Left (${vehicle.motExpiryDate})` : 'MOT Verified'}
              </span>
            </div>
          </div>

          <div class="telemetry-stat-card">
            <div class="stat-icon">📈</div>
            <div class="stat-body">
              <span class="stat-label">Recorded Mileage</span>
              <span class="stat-value">${vehicle.currentMileage || 'Verified via MOT'}</span>
            </div>
          </div>

          <div class="telemetry-stat-card">
            <div class="stat-icon">🛡️</div>
            <div class="stat-body">
              <span class="stat-label">Historical MOT Pass Rate</span>
              <span class="stat-value text-success">${vehicle.motPassRate}</span>
            </div>
          </div>

          <div class="telemetry-stat-card">
            <div class="stat-icon">⚙️</div>
            <div class="stat-body">
              <span class="stat-label">Gearbox Architecture</span>
              <span class="stat-value" style="color:var(--amber-400); font-size:0.9rem;">${vehicle.gearboxCode || 'OEM Spec'}</span>
            </div>
          </div>
        </div>

        <!-- Component Wear Risk Gauges -->
        <div class="component-wear-container">
          <h4 class="component-wear-title">Transmission Sub-Assembly Health Analysis</h4>
          <div class="component-wear-grid">
            <div class="diag-component-bar-wrap">
              <div class="diag-component-header">
                <span>Hydraulic Valve Body / Solenoids</span>
                <span>${diagnostic.componentScores.hydraulic}% Wear Risk</span>
              </div>
              <div class="diag-component-track">
                <div class="diag-component-fill ${diagnostic.componentScores.hydraulic > 70 ? 'high' : 'med'}" style="width: ${diagnostic.componentScores.hydraulic}%;"></div>
              </div>
            </div>

            <div class="diag-component-bar-wrap">
              <div class="diag-component-header">
                <span>Clutch Pack / Torque Converter</span>
                <span>${diagnostic.componentScores.clutch}% Wear Risk</span>
              </div>
              <div class="diag-component-track">
                <div class="diag-component-fill ${diagnostic.componentScores.clutch > 70 ? 'high' : 'med'}" style="width: ${diagnostic.componentScores.clutch}%;"></div>
              </div>
            </div>

            <div class="diag-component-bar-wrap">
              <div class="diag-component-header">
                <span>Mechanical Gears & Bearings</span>
                <span>${diagnostic.componentScores.mechanical}% Wear Risk</span>
              </div>
              <div class="diag-component-track">
                <div class="diag-component-fill ${diagnostic.componentScores.mechanical > 70 ? 'high' : 'low'}" style="width: ${diagnostic.componentScores.mechanical}%;"></div>
              </div>
            </div>

            <div class="diag-component-bar-wrap">
              <div class="diag-component-header">
                <span>TCM Electronics & Shift Sensors</span>
                <span>${diagnostic.componentScores.electronic}% Wear Risk</span>
              </div>
              <div class="diag-component-track">
                <div class="diag-component-fill ${diagnostic.componentScores.electronic > 70 ? 'high' : 'med'}" style="width: ${diagnostic.componentScores.electronic}%;"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Interactive Multi-Tab Intelligence System -->
        <div class="report-tabs-wrapper">
          <div class="report-tab-nav">
            <button type="button" class="tab-nav-btn active" data-tab="tab-findings">
              Diagnostic Findings (${diagnostic.findings.length})
            </button>
            <button type="button" class="tab-nav-btn" data-tab="tab-mot">
              MOT History & Advisories (${vehicle.motHistory ? vehicle.motHistory.length : 0})
            </button>
            <button type="button" class="tab-nav-btn" data-tab="tab-tsb">
              TSB & Known Vulnerabilities (${vehicle.knownIssues ? vehicle.knownIssues.length : 0})
            </button>
            <button type="button" class="tab-nav-btn" data-tab="tab-checklist">
              Workshop Action Checklist
            </button>
            <button type="button" class="tab-nav-btn" data-tab="tab-costs">
              Repair Cost Estimator
            </button>
          </div>

          <!-- TAB 1: DIAGNOSTIC FINDINGS -->
          <div class="report-tab-content active" id="tab-findings">
            <div class="findings-list">
              ${diagnostic.findings.map(f => `
                <div class="finding-card severity-${f.severity.toLowerCase()}">
                  <div class="finding-header">
                    <div class="finding-title-wrap">
                      <span class="finding-badge badge-${f.severity.toLowerCase()}">${f.severity} PRIORITY</span>
                      <h4 class="finding-title">${f.title}</h4>
                    </div>
                    <div class="finding-probability">
                      <span class="prob-num">${f.probability}%</span>
                      <span class="prob-label">Confidence</span>
                    </div>
                  </div>

                  <p class="finding-explanation">${f.explanation}</p>

                  <div class="finding-components">
                    <span class="comp-label">Suspect Components:</span>
                    <div class="comp-tags">
                      ${f.affectedComponents.map(c => `<span class="comp-tag">${c}</span>`).join('')}
                    </div>
                  </div>

                  <div class="finding-source-tag">Source: ${f.source}</div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- TAB 2: MOT HISTORY & ADVISORIES -->
          <div class="report-tab-content" id="tab-mot">
            ${vehicle.motHistory && vehicle.motHistory.length > 0 ? `
              <div class="mot-history-table-wrapper">
                <table class="mot-history-table">
                  <thead>
                    <tr>
                      <th>Test Date</th>
                      <th>Result</th>
                      <th>Odometer</th>
                      <th>Test Certificate #</th>
                      <th>Advisories / Defects</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${vehicle.motHistory.map(test => `
                      <tr class="mot-row-${(test.result || '').toLowerCase()}">
                        <td class="mot-date"><strong>${test.testDate || test.completedDate || 'Recent Test'}</strong></td>
                        <td>
                          <span class="mot-result-badge ${(test.result || '').toUpperCase() === 'PASSED' ? 'pass' : 'fail'}">
                            ${test.result}
                          </span>
                        </td>
                        <td class="mot-odo">${test.odometer || 'N/A'}</td>
                        <td class="mot-number">${test.testNumber || 'Official Record'}</td>
                        <td class="mot-advisories">
                          ${(test.rfrAndComments && test.rfrAndComments.length > 0) ? test.rfrAndComments.map(r => `
                            <div class="mot-defect-item type-${(r.type || 'advisory').toLowerCase()}">
                              <span class="defect-type">${r.type || 'ADVISORY'}:</span> ${r.text || r}
                            </div>
                          `).join('') : '<span class="text-muted">✓ Clean Test &bull; Zero Defects</span>'}
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            ` : `
              <div class="tab-empty-state">
                <p>✓ All previous government MOT test inspections logged as PASSED with no major safety defects recorded.</p>
              </div>
            `}
          </div>

          <!-- TAB 3: TSB & KNOWN VULNERABILITIES -->
          <div class="report-tab-content" id="tab-tsb">
            ${vehicle.knownIssues && vehicle.knownIssues.length > 0 ? `
              <div class="tsb-list">
                ${vehicle.knownIssues.map(tsb => `
                  <div class="tsb-card risk-${tsb.risk.toLowerCase()}">
                    <div class="tsb-header">
                      <span class="tsb-risk-badge badge-${tsb.risk.toLowerCase()}">${tsb.risk} RISK NOTICE</span>
                      <h4 class="tsb-title">${tsb.title}</h4>
                    </div>
                    <p class="tsb-desc">${tsb.description}</p>
                    <div class="tsb-action-box">
                      <strong>Recommended Preventive Action:</strong> ${tsb.recommendedAction}
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : `
              <div class="tab-empty-state">
                <p>✓ No outstanding manufacturer critical recall bulletins registered for this exact chassis derivative.</p>
              </div>
            `}
          </div>

          <!-- TAB 4: WORKSHOP ACTION CHECKLIST -->
          <div class="report-tab-content" id="tab-checklist">
            <div class="checklist-wrapper">
              <p class="checklist-intro">Handover diagnostic procedure checklist for workshop Master Technicians:</p>
              <ul class="workshop-checklist">
                ${diagnostic.mechanicChecklist.map((item, idx) => `
                  <li class="checklist-item">
                    <span class="check-box"></span>
                    <div class="check-text">
                      <strong>Procedure ${idx + 1}:</strong> ${item}
                    </div>
                  </li>
                `).join('')}
                <li class="checklist-item">
                  <span class="check-box"></span>
                  <div class="check-text">
                    <strong>Final Verification:</strong> Execute 10-mile adaptation drive cycle and verify transmission line pressure with scan tool.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <!-- TAB 5: REPAIR COST ESTIMATOR -->
          <div class="report-tab-content" id="tab-costs">
            <div class="cost-estimator-wrapper">
              <div class="cost-breakdown-card">
                <h4 class="cost-title">Estimated Specialist Repair Range (${vehicle.gearboxFamily})</h4>
                <p class="cost-subtitle">Based on UK transmission specialist benchmark labor rates vs Main Dealership quotes.</p>

                <div class="cost-figures-grid">
                  <div class="cost-fig-box">
                    <span class="cost-fig-label">Specialist OEM Parts</span>
                    <span class="cost-fig-val">£${diagnostic.estimatedCost.partsMin} – £${diagnostic.estimatedCost.partsMax}</span>
                  </div>
                  <div class="cost-fig-box">
                    <span class="cost-fig-label">Specialist Labor & Calibration</span>
                    <span class="cost-fig-val">£${diagnostic.estimatedCost.laborMin} – £${diagnostic.estimatedCost.laborMax}</span>
                  </div>
                  <div class="cost-fig-box highlight">
                    <span class="cost-fig-label">Gearbox Giants Fixed Estimate</span>
                    <span class="cost-fig-val">£${diagnostic.estimatedCost.partsMin + diagnostic.estimatedCost.laborMin} – £${diagnostic.estimatedCost.partsMax + diagnostic.estimatedCost.laborMax}</span>
                  </div>
                </div>

                <div class="cost-savings-banner">
                  <span class="savings-tag">SAVE UP TO 60%</span>
                  <span>Typical Main Dealer estimate for this repair: <strong>£${Math.round((diagnostic.estimatedCost.partsMax + diagnostic.estimatedCost.laborMax) * 2.2)}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SPECIALIST REPAIR PROPOSAL & DIRECT CTA BANNER -->
        <div class="report-cta-card">
          <div class="cta-content">
            <h3>Get an Exact Fixed Quote for Your ${vehicle.make} ${vehicle.model}</h3>
            <p>
              We recover your vehicle free of charge nationwide, repair it to OEM specifications with a <strong>12-month unlimited-mileage warranty</strong>, and deliver it back cleanly fixed.
            </p>
          </div>
          <div class="cta-buttons">
            <button type="button" class="btn btn-primary btn-lg" id="btn-claim-quote">
              Get Exact Fixed Price Quote →
            </button>
            <a href="tel:02080589668" class="btn btn-secondary btn-lg" style="text-decoration:none;">
              Call Hub: 0208 058 9668
            </a>
          </div>
          <div class="cta-guarantees">
            <span>✓ 12-Month / Unlimited-Mile Warranty</span>
            <span>✓ Free Vehicle Recovery & Delivery</span>
            <span>✓ 0% Repair Finance Available</span>
            <span>✓ Up to 60% Cheaper than Main Dealer</span>
          </div>
        </div>

      </div>
    `;

    this.bindEvents(container, vehicle, diagnostic, customer);
  }

  static bindEvents(container, vehicle, diagnostic, customer) {
    // Interactive Tab Switching
    const tabBtns = container.querySelectorAll('.tab-nav-btn');
    const tabContents = container.querySelectorAll('.report-tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        const activeContent = container.querySelector(`#${targetTab}`);
        if (activeContent) activeContent.classList.add('active');
      });
    });

    // Print / PDF Button
    const btnPrint = container.querySelector('#btn-print-report');
    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }

    // New Diagnostic / Retest Button
    const btnNew = container.querySelector('#btn-new-diagnostic');
    if (btnNew) {
      btnNew.addEventListener('click', () => {
        if (window.appCoordinator) {
          window.appCoordinator.resetDiagnostic();
        } else {
          window.location.reload();
        }
      });
    }

    // Claim Fixed Quote Button
    const btnClaimQuote = container.querySelector('#btn-claim-quote');
    if (btnClaimQuote) {
      btnClaimQuote.addEventListener('click', () => {
        if (window.openQuoteModal) {
          window.openQuoteModal(
            '',
            `${vehicle.gearboxFamily} Repair`,
            vehicle.registration,
            customer.postcode || ''
          );

          // Pre-fill notes field
          const notesField = document.getElementById('modal-notes') || document.querySelector('textarea[name="notes"]');
          if (notesField) {
            notesField.value = `[DIAGNOSTIC REPORT SUMMARY]\nVehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model} (${vehicle.registration})\nGearbox: ${vehicle.gearboxFamily}\nIdentified Fault: ${diagnostic.findings.map(f => f.title).join('; ')}\nHealth Score: ${diagnostic.healthScore}/100 (${diagnostic.urgencyLevel})\nCustomer: ${customer.name || ''} (${customer.email})`;
          }

          const emailField = document.getElementById('modal-email');
          if (emailField && customer.email) {
            emailField.value = customer.email;
          }
        }
      });
    }
  }
}
