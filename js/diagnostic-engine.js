/**
 * GEARBOX GIANTS - EXPERT TRANSMISSION & VEHICLE DIAGNOSTIC ENGINE
 * Intelligent triage algorithm that correlates vehicle model specs, transmission architecture,
 * questionnaire responses, MOT advisory history, and OBD-II fault codes.
 */

import { lookupDtcCode } from './dtc-database.js';

export class DiagnosticEngine {
  /**
   * Main analysis function
   * @param {Object} vehicle - Full vehicle record from MotService / database
   * @param {Object} answers - Questionnaire response map
   * @returns {Object} Comprehensive diagnostic assessment
   */
  static analyze(vehicle, answers) {
    const findings = [];
    let urgencyLevel = 'MODERATE';
    let urgencyColor = '#f59e0b';
    let healthScore = 78;
    const mechanicChecklist = [];
    let estimatedCost = { partsMin: 150, partsMax: 450, laborMin: 120, laborMax: 280 };

    const { symptomOption, condition, sensory, dtcCode } = answers;
    const make = (vehicle.make || '').toUpperCase();
    const model = (vehicle.model || '').toUpperCase();
    const year = vehicle.year || 2018;
    const gearbox = vehicle.gearboxFamily || vehicle.transmission || 'Transmission';

    let componentScores = {
      hydraulic: 25,
      clutch: 25,
      mechanical: 20,
      electronic: 15
    };

    // 1. DTC OBD-II Trouble Code Analysis (Highest Precision)
    let dtcResult = null;
    if (dtcCode) {
      dtcResult = lookupDtcCode(dtcCode);
      if (dtcResult) {
        findings.push({
          title: `DTC ${dtcResult.code}: ${dtcResult.name}`,
          probability: 95,
          severity: dtcResult.severity,
          affectedComponents: dtcResult.possibleCauses.slice(0, 3),
          explanation: dtcResult.description,
          source: 'ECU Trouble Code Scan'
        });
        mechanicChecklist.push(dtcResult.garageAction);

        if (dtcResult.severity === 'CRITICAL') {
          healthScore -= 35;
          urgencyLevel = 'CRITICAL HAZARD';
          urgencyColor = '#ef4444';
          componentScores.electronic += 40;
          componentScores.hydraulic += 30;
        } else if (dtcResult.severity === 'HIGH') {
          healthScore -= 25;
          urgencyLevel = 'HIGH URGENCY';
          urgencyColor = '#f97316';
          componentScores.electronic += 30;
        }
      }
    }

    // 2. Model-Specific Symptom Analysis
    if (symptomOption) {
      const { title, desc, component, weights } = symptomOption;
      
      if (weights) {
        componentScores.clutch += weights.clutch || 0;
        componentScores.hydraulic += weights.hydraulic || 0;
        componentScores.mechanical += weights.mechanical || 0;
        componentScores.electronic += weights.electronic || 0;
      }

      findings.push({
        title: component || title,
        probability: 91,
        severity: (weights && (weights.clutch > 80 || weights.hydraulic > 80 || weights.mechanical > 80)) ? 'HIGH' : 'MEDIUM',
        affectedComponents: [component || 'Transmission Sub-Assembly', 'Hydraulic Solenoid Pack', 'Friction Linings'],
        explanation: `In your ${year} ${make} ${model} (${gearbox}), ${desc.toLowerCase()}`,
        source: 'Model-Specific Symptom Isolation'
      });

      // Triage repair recommendations
      if (component.includes('Mechatronic') || component.includes('Accumulator') || component.includes('P17BF')) {
        mechanicChecklist.push(`Perform mechatronic high-pressure accumulator test; verify 40–60 bar pressure retention.`);
        estimatedCost = { partsMin: 280, partsMax: 650, laborMin: 180, laborMax: 350 };
        healthScore -= 28;
      } else if (component.includes('Dual-Clutch') || component.includes('Clutch Pack') || component.includes('DPS6')) {
        mechanicChecklist.push(`Measure clutch pack K1/K2 clearance shims; inspect input shaft oil seal for fluid contamination.`);
        estimatedCost = { partsMin: 350, partsMax: 780, laborMin: 220, laborMax: 450 };
        healthScore -= 25;
      } else if (component.includes('Torque Converter') || component.includes('TCC')) {
        mechanicChecklist.push(`Log live TCC slip RPM at 50 MPH in 7th/8th gear; inspect transmission oil pan magnets for clutch glazing slurry.`);
        estimatedCost = { partsMin: 290, partsMax: 620, laborMin: 200, laborMax: 380 };
        healthScore -= 22;
      } else if (component.includes('Variator') || component.includes('Pulley') || component.includes('Flow Control')) {
        mechanicChecklist.push(`Inspect CVT high-pressure pump flow control valve bore for scoring; sample NS-3 fluid for metallic particles.`);
        estimatedCost = { partsMin: 320, partsMax: 750, laborMin: 200, laborMax: 420 };
        healthScore -= 26;
      } else if (component.includes('Synchromesh') || component.includes('Bearing')) {
        mechanicChecklist.push(`Inspect gearbox drain plug magnet for brass synchro filings; test input shaft end-float.`);
        estimatedCost = { partsMin: 180, partsMax: 450, laborMin: 180, laborMax: 320 };
        healthScore -= 20;
      }
    }

    // 3. Operating Trigger Condition Adjustments
    if (condition) {
      if (condition === 'cold_start') {
        componentScores.hydraulic += 25;
        findings.push({
          title: 'Cold Fluid Viscosity / Solenoid Valve Sticking',
          probability: 78,
          severity: 'MEDIUM',
          affectedComponents: ['Hydraulic Valve Galleries', 'Solenoid Spool Valves', 'Cold Line Pressure Regulator'],
          explanation: `Symptom occurring predominantly on cold start indicates thickened fluid or varnish deposits on delicate spool valves that free up as fluid warms.`,
          source: 'Operating Condition Correlation'
        });
      } else if (condition === 'hot_operating_temp') {
        componentScores.hydraulic += 30;
        componentScores.clutch += 25;
        findings.push({
          title: 'Thermal Fluid Thinning & Internal Hydraulic Pressure Leakage',
          probability: 84,
          severity: 'HIGH',
          affectedComponents: ['Mechatronic Bridge Seal', 'Clutch Piston Rubber Lip Seals', 'Transmission Oil Cooler'],
          explanation: `Faults worsening once hot indicate fluid thinning and internal blow-by past worn hydraulic seals when line pressure is demanded.`,
          source: 'Operating Condition Correlation'
        });
        healthScore -= 10;
      } else if (condition === 'heavy_acceleration') {
        componentScores.clutch += 35;
        healthScore -= 12;
      }
    }

    // 4. Sensory Clue Correlations
    if (sensory) {
      if (sensory === 'dashboard_warning') {
        componentScores.electronic += 35;
        urgencyLevel = 'CRITICAL HAZARD';
        urgencyColor = '#ef4444';
        healthScore -= 15;
      } else if (sensory === 'metallic_grind') {
        componentScores.mechanical += 40;
        urgencyLevel = 'CRITICAL HAZARD';
        urgencyColor = '#ef4444';
        healthScore -= 25;
      } else if (sensory === 'burning_smell') {
        componentScores.clutch += 40;
        healthScore -= 18;
      }
    }

    // 5. MOT History & Advisory Integration
    if (vehicle.recentAdvisories && vehicle.recentAdvisories.length > 0) {
      vehicle.recentAdvisories.forEach(adv => {
        const text = (adv.text || '').toLowerCase();
        if (text.includes('oil leak') || text.includes('fluid')) {
          findings.push({
            title: 'Recorded Fluid Leak from Transmission / Engine Undertray',
            probability: 88,
            severity: 'HIGH',
            affectedComponents: ['Transmission Pan Gasket', 'Input/Output Shaft Seals', 'Mechatronic Mezzanine Seal'],
            explanation: `Official MOT advisory recorded on ${adv.date || 'recent test'}: "${adv.text}". Low fluid levels accelerate clutch friction wear.`,
            source: 'Official DVSA MOT History'
          });
          healthScore -= 12;
        }
      });
    }

    // Normalize Component Wear Scores (0 - 100%)
    const maxScore = Math.max(componentScores.clutch, componentScores.hydraulic, componentScores.mechanical, componentScores.electronic, 1);
    const normScores = {
      clutch: Math.min(Math.round((componentScores.clutch / maxScore) * 94), 98),
      hydraulic: Math.min(Math.round((componentScores.hydraulic / maxScore) * 95), 98),
      mechanical: Math.min(Math.round((componentScores.mechanical / maxScore) * 90), 98),
      electronic: Math.min(Math.round((componentScores.electronic / maxScore) * 92), 98)
    };

    // Ensure Health Score is within safe bounds (15 - 95)
    healthScore = Math.max(Math.min(healthScore, 95), 18);

    if (healthScore < 45) {
      urgencyLevel = 'CRITICAL HAZARD';
      urgencyColor = '#ef4444';
    } else if (healthScore < 70) {
      urgencyLevel = 'CAUTION - REPAIR NEEDED';
      urgencyColor = '#f59e0b';
    } else {
      urgencyLevel = 'MODERATE WEAR DETECTED';
      urgencyColor = '#22c55e';
    }

    return {
      healthScore,
      urgencyLevel,
      urgencyColor,
      findings,
      componentScores: normScores,
      mechanicChecklist,
      estimatedCost
    };
  }
}
