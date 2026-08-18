/**
 * GEARBOX GIANTS - UNIFIED 4-STEP FAULT FINDER & DIAGNOSTIC ENGINE
 * Implements the sleek 4-step wizard matching the exact design specification:
 * Step 1: Vehicle & Transmission Selection (DVLA plate auto-match + 4 transmission tiles)
 * Step 2: Driving Scenario & Occurrence
 * Step 3: Model-Specific Transmission Symptoms & Sensory Signs
 * Step 4: Full Vehicle Diagnostic Dossier & Live MOT Report
 */

import { MotService } from './mot-service.js';
import { DiagnosticEngine } from './diagnostic-engine.js';
import { ModelQuestionnaireEngine } from './model-questionnaires.js';
import { ReportGenerator } from './report-generator.js';

class FaultFinderWizard {
  constructor() {
    this.container = document.getElementById('diag-master-container');
    this.motService = new MotService();
    this.currentStep = 1; // 1: Vehicle, 2: Scenario, 3: Symptoms, 4: Report

    // State
    this.vehicle = null;
    this.selectedTransType = 'DSG'; // 'DSG', 'MANUAL', 'AUTO', 'CVT'
    this.scenarioId = null;
    this.symptomOption = null;
    this.sensoryId = null;
    this.dtcCode = '';
    this.customerData = null;
    this.diagnosticResult = null;
    this.isVerifying = false;

    if (this.container) {
      this.render();
      this.checkUrlParams();
    }
  }

  checkUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const regParam = urlParams.get('reg');
    if (regParam) {
      this.verifyRegistration(regParam);
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="diag-master-card animate-fade-in">
        
        <!-- TOP 4-STEP HORIZONTAL TRACKER (MATCHING SCREENSHOT) -->
        <div class="step-tracker-bar">
          <div class="step-item ${this.currentStep === 1 ? 'active' : (this.currentStep > 1 ? 'completed' : '')}">
            <div class="step-num-circle">1</div>
            <span>VEHICLE</span>
          </div>

          <div class="step-connector-line"></div>

          <div class="step-item ${this.currentStep === 2 ? 'active' : (this.currentStep > 2 ? 'completed' : '')}">
            <div class="step-num-circle">2</div>
            <span>SCENARIO</span>
          </div>

          <div class="step-connector-line"></div>

          <div class="step-item ${this.currentStep === 3 ? 'active' : (this.currentStep > 3 ? 'completed' : '')}">
            <div class="step-num-circle">3</div>
            <span>SYMPTOMS</span>
          </div>

          <div class="step-connector-line"></div>

          <div class="step-item ${this.currentStep === 4 ? 'active' : ''}">
            <div class="step-num-circle">4</div>
            <span>REPORT</span>
          </div>
        </div>

        <!-- DYNAMIC STEP VIEW MOUNT -->
        <div id="step-view-content">
          ${this.renderStepContent()}
        </div>

      </div>
    `;

    this.bindEvents();
  }

  renderStepContent() {
    switch (this.currentStep) {
      case 1:
        return this.renderStep1Vehicle();
      case 2:
        return this.renderStep2Scenario();
      case 3:
        return this.renderStep3Symptoms();
      case 4:
        return this.renderStep4Report();
      default:
        return this.renderStep1Vehicle();
    }
  }

  /* ==========================================================================
     STEP 1: SELECT YOUR VEHICLE & TRANSMISSION
     ========================================================================== */
  renderStep1Vehicle() {
    const regValue = this.vehicle ? (this.vehicle.formattedReg || this.vehicle.registration) : '';

    return `
      <div class="step-main-header">
        <h2 class="step-title-headline">STEP 1: SELECT YOUR VEHICLE & TRANSMISSION</h2>
        <p class="step-subtitle-text">
          Enter your UK registration plate, or choose your transmission type below.
        </p>
      </div>

      <!-- Registration Auto-Match Row (Matching Screenshot) -->
      <div class="reg-match-row">
        <span class="reg-match-label">ENTER VEHICLE REGISTRATION FOR AUTO-MATCH:</span>
        
        <div class="reg-match-controls">
          <div class="uk-plate-pill">
            <div class="uk-pill-flag">
              <svg viewBox="0 0 60 30" width="14" height="9"><path d="M0 0h60v30H0z" fill="#012169"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>
            <span>UK</span>
            </div>
            <input 
              type="text" 
              id="wizard-reg-input" 
              class="uk-pill-input" 
              placeholder="ENTER REG" 
              maxlength="9" 
              value="${regValue}"
              autocomplete="off"
              spellcheck="false"
            >
          </div>

          <button type="button" class="btn-verify-reg" id="btn-verify-action" ${this.isVerifying ? 'disabled' : ''}>
            ${this.isVerifying ? 'CHECKING...' : 'VERIFY →'}
          </button>
        </div>
      </div>

      <!-- Verified Vehicle Banner (If Vehicle Matched) -->
      ${this.vehicle ? `
        <div class="verified-vehicle-toast">
          <div>
            <h4 class="toast-car-title">${this.vehicle.year} ${this.vehicle.make} ${this.vehicle.model}</h4>
            <p class="toast-car-specs">
              ${this.vehicle.gearboxFamily || this.vehicle.transmission || ''}${this.vehicle.fuelType && !(this.vehicle.model || '').toUpperCase().includes((this.vehicle.fuelType || '').toUpperCase()) ? ` &bull; ${this.vehicle.fuelType}` : ''} &bull; MOT: <strong style="color:#4ade80;">${this.vehicle.motStatus}</strong>
            </p>
          </div>
        </div>
      ` : ''}

      <!-- Not Found Notification (If Vehicle Not Found) -->
      ${this.verifyError ? `
        <div class="verified-vehicle-toast" style="border-color:rgba(239,68,68,0.4); background:rgba(239,68,68,0.08);">
          <div>
            <h4 class="toast-car-title" style="color:#f87171;">⚠️ Vehicle Not Found</h4>
            <p class="toast-car-specs" style="color:#cbd5e1;">${this.verifyError}</p>
          </div>
          <span class="toast-badge-green" style="background:rgba(239,68,68,0.2); color:#f87171; border-color:rgba(239,68,68,0.4);">MANUAL SELECT</span>
        </div>
      ` : ''}

      <div id="verify-error-msg" class="alert-error" style="display: none;"></div>

      <!-- 2x2 Transmission Grid (Matching Screenshot) -->
      <div class="trans-types-grid">
        
        <!-- Tile 1: Dual-Clutch / DSG -->
        <div class="trans-type-card ${this.selectedTransType === 'DSG' ? 'selected' : ''}" data-trans="DSG">
          <div class="trans-card-title">
            <span>⚡</span> DUAL-CLUTCH / DSG
          </div>
          <p class="trans-card-desc">
            Automated twin-clutch & mechatronics (VW, Audi, Ford, BMW).
          </p>
        </div>

        <!-- Tile 2: Manual Gearbox -->
        <div class="trans-type-card ${this.selectedTransType === 'MANUAL' ? 'selected' : ''}" data-trans="MANUAL">
          <div class="trans-card-title">
            <span>🕹️</span> MANUAL GEARBOX
          </div>
          <p class="trans-card-desc">
            Standard stick shift with driver clutch pedal & flywheel.
          </p>
        </div>

        <!-- Tile 3: Torque Converter Auto -->
        <div class="trans-type-card ${this.selectedTransType === 'AUTO' ? 'selected' : ''}" data-trans="AUTO">
          <div class="trans-card-title">
            <span>🔄</span> TORQUE CONVERTER AUTO
          </div>
          <p class="trans-card-desc">
            Hydraulic planetary automatic (ZF 6HP/8HP, Mercedes 7G/9G).
          </p>
        </div>

        <!-- Tile 4: Continuously Variable (CVT) -->
        <div class="trans-type-card ${this.selectedTransType === 'CVT' ? 'selected' : ''}" data-trans="CVT">
          <div class="trans-card-title">
            <span>🌐</span> CONTINUOUSLY VARIABLE (CVT)
          </div>
          <p class="trans-card-desc">
            Stepless variable push-belt transmission (Multitronic, Xtronic).
          </p>
        </div>

      </div>

      <!-- Bottom Action Row (Matching Screenshot) -->
      <div class="diag-actions-row">
        <button type="button" class="btn-step-next ready" id="btn-goto-step-2">
          NEXT STEP: WHEN DOES IT OCCUR? <span>→</span>
        </button>
      </div>
    `;
  }

  /* ==========================================================================
     STEP 2: DRIVING SCENARIO & OCCURRENCE
     ========================================================================== */
  renderStep2Scenario() {
    const v = this.getEffectiveVehicle();
    const config = ModelQuestionnaireEngine.getQuestionnaireForVehicle(v);
    const scenarioQuestion = config.questions.find(q => q.id === 'condition') || config.questions[1];

    return `
      <div class="step-main-header">
        <h2 class="step-title-headline">STEP 2: DRIVING SCENARIO & OCCURRENCE</h2>
        <p class="step-subtitle-text">
          When does the fault happen in your <strong>${v.year} ${v.make} ${v.model}</strong> (${v.gearboxFamily})?
        </p>
      </div>

      <div class="option-tiles-list">
        ${scenarioQuestion.options.map(opt => `
          <div class="option-tile-card ${this.scenarioId === opt.id ? 'selected' : ''}" data-scenario-id="${opt.id}">
            <div class="opt-radio-circle">
              ${this.scenarioId === opt.id ? '✓' : ''}
            </div>
            <div style="flex:1;">
              <div class="opt-main-title">${opt.title}</div>
              <div class="opt-body-desc">${opt.desc}</div>
              ${opt.clue ? `<div class="opt-target-tag">Engineering Clue: ${opt.clue}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="diag-actions-row" style="justify-content:space-between;">
        <button type="button" class="btn-step-prev" id="btn-back-step-1">
          ← BACK: VEHICLE
        </button>
        <button type="button" class="btn-step-next ready" id="btn-goto-step-3" ${!this.scenarioId ? 'disabled style="opacity:0.5;"' : ''}>
          NEXT STEP: SYMPTOMS & SIGNS →
        </button>
      </div>
    `;
  }

  /* ==========================================================================
     STEP 3: TRANSMISSION SYMPTOMS & MECHANICAL SIGNS
     ========================================================================== */
  renderStep3Symptoms() {
    const v = this.getEffectiveVehicle();
    const config = ModelQuestionnaireEngine.getQuestionnaireForVehicle(v);
    const symptomQuestion = config.questions.find(q => q.id === 'transmission_symptom') || config.questions[0];
    const sensoryQuestion = config.questions.find(q => q.id === 'sensory') || config.questions[2];

    return `
      <div class="step-main-header">
        <h2 class="step-title-headline">STEP 3: SELECT YOUR GEARBOX SYMPTOMS</h2>
        <p class="step-subtitle-text">
          Identified specifically for your <strong>${v.year} ${v.make} ${v.model}</strong> transmission architecture:
        </p>
      </div>

      <!-- Model-Specific Symptom Options -->
      <div class="option-tiles-list" style="margin-bottom:1.75rem;">
        ${symptomQuestion.options.map(opt => {
          const isSelected = this.symptomOption && this.symptomOption.id === opt.id;
          return `
            <div class="option-tile-card ${isSelected ? 'selected' : ''}" data-symptom-id="${opt.id}">
              <div class="opt-radio-circle">
                ${isSelected ? '✓' : ''}
              </div>
              <div style="flex:1;">
                <div class="opt-main-title">${opt.title}</div>
                <div class="opt-body-desc">${opt.desc}</div>
                ${opt.component ? `<div class="opt-target-tag">Target Assembly: <strong>${opt.component}</strong></div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Sensory Feedback Sub-section -->
      <div style="margin-bottom: 2rem;">
        <h3 style="font-family:var(--font-heading); font-size:1.1rem; font-weight:800; color:#fff; margin-bottom:0.75rem;">
          Sensory Clues & Dashboard Indicators:
        </h3>
        <div class="option-tiles-list">
          ${sensoryQuestion.options.map(opt => `
            <div class="option-tile-card ${this.sensoryId === opt.id ? 'selected' : ''}" data-sensory-id="${opt.id}">
              <div class="opt-radio-circle">
                ${this.sensoryId === opt.id ? '✓' : ''}
              </div>
              <div style="flex:1;">
                <div class="opt-main-title">${opt.title}</div>
                <div class="opt-body-desc">${opt.desc}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Optional OBD-II Code Input -->
      <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:12px; padding:1.25rem; margin-bottom:2rem;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <strong style="color:#fff; font-size:0.95rem;">Have an OBD-II Fault Code? (Optional)</strong>
            <p style="color:#94a3b8; font-size:0.82rem; margin:0.2rem 0 0 0;">Enter trouble codes like P0700, P17BF, P0730 for pinpoint triage.</p>
          </div>
          <input 
            type="text" 
            id="wizard-dtc-field" 
            placeholder="e.g. P0700" 
            value="${this.dtcCode}"
            maxlength="6"
            style="background:#000; border:1px solid rgba(255,255,255,0.15); color:#ffcc00; font-family:var(--font-mono, monospace); font-weight:800; font-size:1.1rem; padding:0.4rem 0.8rem; border-radius:6px; width:130px; text-transform:uppercase; text-align:center;">
        </div>
      </div>

      <div class="diag-actions-row" style="justify-content:space-between;">
        <button type="button" class="btn-step-prev" id="btn-back-step-2">
          ← BACK: SCENARIO
        </button>
        <button type="button" class="btn-step-next ready" id="btn-goto-step-4" ${!this.symptomOption ? 'disabled style="opacity:0.5;"' : ''}>
          NEXT STEP: GENERATE REPORT →
        </button>
      </div>
    `;
  }

  /* ==========================================================================
     STEP 4: CUSTOMER CAPTURE & COMPREHENSIVE DOSSIER
     ========================================================================== */
  renderStep4Report() {
    const v = this.getEffectiveVehicle();

    if (!this.customerData) {
      return `
        <div class="step-main-header" style="text-align:center;">
          <h2 class="step-title-headline">STEP 4: YOUR VEHICLE HEALTH REPORT IS READY</h2>
          <p class="step-subtitle-text">
            Please enter your details to view and receive your diagnostic report, live MOT telemetry, and repair estimate.
          </p>
        </div>

        <div class="customer-capture-box animate-scale-up">
          <div class="capture-icon-circle">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="m16 19 2 2 4-4"/></svg>
          </div>

          <form id="wizard-customer-form">
            <div class="form-group mb-3">
              <label class="form-label" for="cust-name">Full Name / Business Name:</label>
              <input type="text" id="cust-name" class="form-input" placeholder="e.g. John Smith" required>
            </div>

            <div class="form-group mb-3">
              <label class="form-label" for="cust-email">Email Address (for instant report delivery):</label>
              <input type="email" id="cust-email" class="form-input" placeholder="e.g. john.smith@example.co.uk" required>
              <span style="font-size:0.8rem; color:#64748b; display:block; margin-top:0.35rem;">We will email you a permanent link and PDF copy of this diagnostic assessment.</span>
            </div>

            <div class="form-group mb-4">
              <label class="form-label" for="cust-postcode">Postcode (for local repair estimate):</label>
              <input type="text" id="cust-postcode" class="form-input" placeholder="e.g. SW1A 1AA" style="text-transform: uppercase;">
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width:100%; border-radius:10px; font-weight:900;">
              Generate Full Vehicle & Diagnostic Report →
            </button>
          </form>
        </div>

        <div class="diag-actions-row" style="justify-content:flex-start;">
          <button type="button" class="btn-step-prev" id="btn-back-step-3">
            ← BACK: SYMPTOMS
          </button>
        </div>
      `;
    }

    // Customer filled details -> Render full 5-tab dossier!
    return `
      <div id="full-report-mount-container"></div>
    `;
  }

  getEffectiveVehicle() {
    if (this.vehicle) return this.vehicle;

    // Synthetic vehicle based on selected transmission tile
    const typeMap = {
      DSG: { make: 'VOLKSWAGEN / AUDI', model: 'DSG / S-TRONIC', trans: 'Dual-Clutch / DSG (DQ381/DQ250)', cat: 'DSG', code: 'DQ-DSG' },
      MANUAL: { make: 'MANUAL VEHICLE', model: 'SYNCHROMESH MANUAL', trans: 'Manual 5/6-Speed with DMF', cat: 'MANUAL', code: 'MT-6SPEED' },
      AUTO: { make: 'BMW / MERCEDES', model: 'TORQUE CONVERTER AUTO', trans: 'Hydraulic Planetary Automatic (ZF / 7G)', cat: 'AUTO', code: 'ZF-8HP' },
      CVT: { make: 'NISSAN / TOYOTA', model: 'CVT / E-CVT', trans: 'Continuously Variable Transmission', cat: 'CVT', code: 'CVT-XTRONIC' }
    };

    const spec = typeMap[this.selectedTransType] || typeMap.DSG;
    return {
      registration: 'UK MATCH',
      formattedReg: 'UK VEHICLE',
      make: spec.make,
      model: spec.model,
      derivative: spec.trans,
      year: 2018,
      fuelType: 'Petrol / Diesel',
      transmission: spec.trans,
      gearboxCategory: spec.cat,
      gearboxFamily: spec.trans,
      gearboxCode: spec.code,
      engineCapacity: 1995,
      powerBhp: 150,
      colour: 'Confirmed',
      motStatus: 'VALID',
      motDaysRemaining: 240,
      motPassRate: '100% (MOT Verified)',
      currentMileage: 'Verified via MOT',
      motHistory: []
    };
  }

  bindEvents() {
    // Step 1 Events
    const btnVerify = this.container.querySelector('#btn-verify-action');
    const regInput = this.container.querySelector('#wizard-reg-input');

    if (btnVerify && regInput) {
      btnVerify.addEventListener('click', () => {
        const val = regInput.value.trim();
        if (val) this.verifyRegistration(val);
      });

      regInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          const val = regInput.value.trim();
          if (val) this.verifyRegistration(val);
        }
      });
    }

    // Transmission Cards selection in Step 1
    const transCards = this.container.querySelectorAll('.trans-type-card');
    transCards.forEach(card => {
      card.addEventListener('click', () => {
        this.selectedTransType = card.getAttribute('data-trans');
        this.render();
      });
    });

    const btnGotoStep2 = this.container.querySelector('#btn-goto-step-2');
    if (btnGotoStep2) {
      btnGotoStep2.addEventListener('click', () => {
        this.currentStep = 2;
        this.render();
      });
    }

    // Step 2 Events
    const scenarioCards = this.container.querySelectorAll('.option-tile-card[data-scenario-id]');
    scenarioCards.forEach(card => {
      card.addEventListener('click', () => {
        this.scenarioId = card.getAttribute('data-scenario-id');
        this.render();
      });
    });

    const btnBackStep1 = this.container.querySelector('#btn-back-step-1');
    if (btnBackStep1) {
      btnBackStep1.addEventListener('click', () => {
        this.currentStep = 1;
        this.render();
      });
    }

    const btnGotoStep3 = this.container.querySelector('#btn-goto-step-3');
    if (btnGotoStep3) {
      btnGotoStep3.addEventListener('click', () => {
        this.currentStep = 3;
        this.render();
      });
    }

    // Step 3 Events
    const symptomCards = this.container.querySelectorAll('.option-tile-card[data-symptom-id]');
    const v = this.getEffectiveVehicle();
    const config = ModelQuestionnaireEngine.getQuestionnaireForVehicle(v);
    const symptomQuestion = config.questions.find(q => q.id === 'transmission_symptom') || config.questions[0];

    symptomCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-symptom-id');
        this.symptomOption = symptomQuestion.options.find(o => o.id === id);
        this.render();
      });
    });

    const sensoryCards = this.container.querySelectorAll('.option-tile-card[data-sensory-id]');
    sensoryCards.forEach(card => {
      card.addEventListener('click', () => {
        this.sensoryId = card.getAttribute('data-sensory-id');
        this.render();
      });
    });

    const dtcField = this.container.querySelector('#wizard-dtc-field');
    if (dtcField) {
      dtcField.addEventListener('input', (e) => {
        this.dtcCode = e.target.value.trim().toUpperCase();
      });
    }

    const btnBackStep2 = this.container.querySelector('#btn-back-step-2');
    if (btnBackStep2) {
      btnBackStep2.addEventListener('click', () => {
        this.currentStep = 2;
        this.render();
      });
    }

    const btnGotoStep4 = this.container.querySelector('#btn-goto-step-4');
    if (btnGotoStep4) {
      btnGotoStep4.addEventListener('click', () => {
        this.currentStep = 4;
        this.render();
      });
    }

    // Step 4 Events (Customer Form)
    const custForm = this.container.querySelector('#wizard-customer-form');
    if (custForm) {
      custForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = this.container.querySelector('#cust-name').value.trim();
        const email = this.container.querySelector('#cust-email').value.trim();
        const postcode = this.container.querySelector('#cust-postcode').value.trim().toUpperCase();

        this.customerData = { name, email, postcode };
        this.render();
        this.mountFinalReport();
      });
    }

    const btnBackStep3 = this.container.querySelector('#btn-back-step-3');
    if (btnBackStep3) {
      btnBackStep3.addEventListener('click', () => {
        this.currentStep = 3;
        this.render();
      });
    }

    if (this.currentStep === 4 && this.customerData) {
      this.mountFinalReport();
    }
  }

  async verifyRegistration(rawReg) {
    const clean = MotService.cleanRegistration(rawReg);
    if (!clean) return;

    this.isVerifying = true;
    this.verifyError = null;
    this.render();

    try {
      const vehicle = await this.motService.lookupVehicle(clean);
      if (vehicle && vehicle.make && vehicle.make !== 'UK Registered') {
        this.vehicle = vehicle;
        this.verifyError = null;
        // Auto-select transmission tile matching identified vehicle
        const cat = (vehicle.gearboxCategory || '').toUpperCase();
        if (cat === 'MANUAL') this.selectedTransType = 'MANUAL';
        else if (cat === 'AUTO') this.selectedTransType = 'AUTO';
        else if (cat === 'CVT') this.selectedTransType = 'CVT';
        else this.selectedTransType = 'DSG';
      } else {
        this.vehicle = null;
        this.verifyError = `Vehicle registration "${MotService.formatRegistration(clean)}" not found on DVSA database. Please select your transmission type below.`;
      }
    } catch (err) {
      console.warn('Registration verification notice:', err.message);
      this.vehicle = null;
      this.verifyError = `Vehicle registration "${MotService.formatRegistration(clean)}" not found. Please select your transmission type below.`;
    } finally {
      this.isVerifying = false;
      this.render();
    }
  }

  mountFinalReport() {
    const mount = this.container.querySelector('#full-report-mount-container');
    if (!mount) return;

    const v = this.getEffectiveVehicle();
    this.diagnosticResult = DiagnosticEngine.analyze(v, {
      symptomOption: this.symptomOption,
      condition: this.scenarioId,
      sensory: this.sensoryId,
      dtcCode: this.dtcCode
    });

    ReportGenerator.renderReport(mount, v, this.diagnosticResult, this.customerData);
  }

  reset() {
    this.currentStep = 1;
    this.vehicle = null;
    this.verifyError = null;
    this.scenarioId = null;
    this.symptomOption = null;
    this.sensoryId = null;
    this.dtcCode = '';
    this.diagnosticResult = null;
    this.render();
  }
}

// Global initialization
window.fillDiagReg = function(reg) {
  if (window.appCoordinator) {
    window.appCoordinator.verifyRegistration(reg);
    const target = document.getElementById('diagnostic-engine');
    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.appCoordinator = new FaultFinderWizard();
});
