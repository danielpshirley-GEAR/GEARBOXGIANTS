/**
 * GEARBOX GIANTS - INTERACTIVE QUESTIONNAIRE WIZARD CONTROLLER
 * Drives the step-by-step diagnostic questionnaire customized to the customer's exact car model.
 */

import { ModelQuestionnaireEngine } from './model-questionnaires.js';

export class QuestionnaireWizard {
  constructor(container, vehicle, onComplete, onBack) {
    this.container = container;
    this.vehicle = vehicle;
    this.onComplete = onComplete;
    this.onBack = onBack;

    this.currentStepIndex = 0;
    this.answers = {
      symptomOption: null,
      condition: null,
      sensory: null,
      dtcCode: ''
    };

    this.config = ModelQuestionnaireEngine.getQuestionnaireForVehicle(vehicle);
    this.render();
  }

  render() {
    if (!this.container) return;

    const currentQuestion = this.config.questions[this.currentStepIndex];
    if (!currentQuestion) return;

    const totalSteps = this.config.questions.length;
    const progressPercent = Math.round(((this.currentStepIndex + 1) / totalSteps) * 100);

    this.container.innerHTML = `
      <div class="wizard-card animate-fade-in">
        
        <!-- Header & Progress Bar -->
        <div class="wizard-header">
          <div class="wizard-meta-row">
            <span class="wizard-stage-badge">${currentQuestion.badge}</span>
            <div class="wizard-vehicle-chip">
              <span class="vehicle-plate-mini">${this.vehicle.formattedReg || this.vehicle.registration}</span>
              <span class="vehicle-name-mini">${this.vehicle.year} ${this.vehicle.make} ${this.vehicle.model}</span>
            </div>
          </div>

          <h3 class="wizard-question-title">${currentQuestion.title}</h3>
          <p class="wizard-question-subtitle">${currentQuestion.subtitle}</p>

          <div class="wizard-progress-track">
            <div class="wizard-progress-fill" style="width: ${progressPercent}%;"></div>
          </div>
        </div>

        <!-- Question Body / Options -->
        <div class="wizard-body">
          ${currentQuestion.isDtcStep ? this.renderDtcInput() : this.renderOptionsGrid(currentQuestion)}
        </div>

        <!-- Navigation Action Buttons -->
        <div class="wizard-footer">
          <button type="button" class="btn btn-secondary" id="btn-wizard-prev">
            ← Back
          </button>
          
          <button 
            type="button" 
            class="btn btn-primary btn-lg" 
            id="btn-wizard-next"
            ${this.isNextDisabled(currentQuestion) ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
            ${this.currentStepIndex === totalSteps - 1 ? 'Generate Diagnostic Report →' : 'Next Step →'}
          </button>
        </div>

      </div>
    `;

    this.bindEvents(currentQuestion);
  }

  renderOptionsGrid(question) {
    let currentSelectedId = null;
    if (question.id === 'transmission_symptom') {
      currentSelectedId = this.answers.symptomOption ? this.answers.symptomOption.id : null;
    } else if (question.id === 'condition') {
      currentSelectedId = this.answers.condition;
    } else if (question.id === 'sensory') {
      currentSelectedId = this.answers.sensory;
    }

    return `
      <div class="wizard-options-list">
        ${question.options.map(opt => {
          const isSelected = currentSelectedId === opt.id;
          return `
            <div class="wizard-option-card ${isSelected ? 'selected' : ''}" data-opt-id="${opt.id}">
              <div class="opt-indicator">
                <span class="opt-check">${isSelected ? '✓' : ''}</span>
              </div>
              <div class="opt-content">
                <div class="opt-title">${opt.title}</div>
                <div class="opt-desc">${opt.desc}</div>
                ${opt.component ? `<div class="opt-component-tag">Target Assembly: <strong>${opt.component}</strong></div>` : ''}
                ${opt.clue ? `<div class="opt-clue-tag">${opt.clue}</div>` : ''}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderDtcInput() {
    return `
      <div class="dtc-input-wrapper">
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.25rem;">
          If your car was scanned using an OBD-II scanner, VCDS, or breakdown report, enter the fault code below for 100% accurate component triage.
        </p>

        <div class="form-group" style="max-width: 440px; margin: 0 auto 1.5rem auto;">
          <label class="form-label" for="wizard-dtc-input">OBD-II Fault Code (Optional):</label>
          <input 
            type="text" 
            id="wizard-dtc-input" 
            class="form-input text-center" 
            placeholder="e.g. P0700, P17BF, P0730, P0841"
            value="${this.answers.dtcCode || ''}"
            maxlength="6"
            style="font-family: var(--font-mono, monospace); font-size: 1.3rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;">
        </div>

        <div class="quick-dtc-chips">
          <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">Common Transmission Codes:</span>
          <button type="button" class="dtc-chip" onclick="document.getElementById('wizard-dtc-input').value='P0700'; document.getElementById('wizard-dtc-input').dispatchEvent(new Event('input'));">P0700</button>
          <button type="button" class="dtc-chip" onclick="document.getElementById('wizard-dtc-input').value='P17BF'; document.getElementById('wizard-dtc-input').dispatchEvent(new Event('input'));">P17BF</button>
          <button type="button" class="dtc-chip" onclick="document.getElementById('wizard-dtc-input').value='P0730'; document.getElementById('wizard-dtc-input').dispatchEvent(new Event('input'));">P0730</button>
          <button type="button" class="dtc-chip" onclick="document.getElementById('wizard-dtc-input').value='P0841'; document.getElementById('wizard-dtc-input').dispatchEvent(new Event('input'));">P0841</button>
        </div>
      </div>
    `;
  }

  isNextDisabled(question) {
    if (question.isDtcStep) return false;
    if (question.id === 'transmission_symptom') return !this.answers.symptomOption;
    if (question.id === 'condition') return !this.answers.condition;
    if (question.id === 'sensory') return !this.answers.sensory;
    return false;
  }

  bindEvents(question) {
    // Option Card Selection
    const cards = this.container.querySelectorAll('.wizard-option-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const optId = card.getAttribute('data-opt-id');
        const selectedOpt = question.options.find(o => o.id === optId);

        if (question.id === 'transmission_symptom') {
          this.answers.symptomOption = selectedOpt;
        } else if (question.id === 'condition') {
          this.answers.condition = optId;
        } else if (question.id === 'sensory') {
          this.answers.sensory = optId;
        }

        this.render();
      });
    });

    // DTC Input binding
    const dtcInput = this.container.querySelector('#wizard-dtc-input');
    if (dtcInput) {
      dtcInput.addEventListener('input', (e) => {
        this.answers.dtcCode = e.target.value.trim().toUpperCase();
      });
    }

    // Previous Button
    const btnPrev = this.container.querySelector('#btn-wizard-prev');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (this.currentStepIndex > 0) {
          this.currentStepIndex--;
          this.render();
        } else if (this.onBack) {
          this.onBack();
        }
      });
    }

    // Next Button
    const btnNext = this.container.querySelector('#btn-wizard-next');
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        if (this.currentStepIndex < this.config.questions.length - 1) {
          this.currentStepIndex++;
          this.render();
        } else if (this.onComplete) {
          this.onComplete(this.answers);
        }
      });
    }
  }
}
