/**
 * GEARBOX GIANTS - CAR-MODEL-SPECIFIC QUESTIONNAIRE ENGINE
 * Generates dynamic questions, symptoms, trigger conditions, and sensory checks
 * customized explicitly to the identified vehicle's exact make, model, and transmission architecture.
 */

export class ModelQuestionnaireEngine {
  /**
   * Builds model-specific questionnaire configuration
   * @param {Object} vehicle - Identified vehicle profile
   * @returns {Object} Complete customized questionnaire structure
   */
  static getQuestionnaireForVehicle(vehicle) {
    const make = (vehicle.make || '').toUpperCase();
    const model = (vehicle.model || '').toUpperCase();
    const year = vehicle.year || 2018;
    const cat = (vehicle.gearboxCategory || 'DSG').toUpperCase();
    const gearbox = vehicle.gearboxFamily || vehicle.transmission || 'Transmission System';
    const fuel = (vehicle.fuelType || '').toLowerCase();
    const isDiesel = fuel.includes('diesel');
    const isHybrid = fuel.includes('hybrid');
    const isElectric = fuel.includes('electric') || fuel.includes('ev');

    // 1. Determine Model Profile Strategy
    let modelProfile = 'GENERIC';
    if (make.includes('VOLKSWAGEN') || make.includes('AUDI') || make.includes('SEAT') || make.includes('SKODA') || gearbox.includes('DSG') || gearbox.includes('S-Tronic')) {
      modelProfile = 'VAG_DSG';
    } else if (make.includes('BMW') || make.includes('JAGUAR') || make.includes('LAND ROVER') || gearbox.includes('ZF') || gearbox.includes('Steptronic')) {
      modelProfile = 'BMW_ZF';
    } else if (make.includes('MERCEDES') || gearbox.includes('7G') || gearbox.includes('9G')) {
      modelProfile = 'MERCEDES_TRONIC';
    } else if (make.includes('FORD') || gearbox.includes('PowerShift') || gearbox.includes('EcoBoost')) {
      modelProfile = 'FORD_POWERSHIFT';
    } else if (make.includes('NISSAN') || make.includes('RENAULT') || gearbox.includes('Xtronic') || gearbox.includes('Jatco')) {
      modelProfile = 'NISSAN_CVT';
    } else if (isHybrid || gearbox.includes('e-CVT') || make.includes('TOYOTA') || make.includes('LEXUS')) {
      modelProfile = 'HYBRID_ECVT';
    } else if (cat === 'MANUAL' || gearbox.includes('Manual')) {
      modelProfile = 'MANUAL_DMF';
    }

    // 2. Build Model-Specific Questions & Symptom Options
    const questions = [];

    // Question 1: Transmission Core Symptom (Deep Model Specificity)
    questions.push(this.getTransmissionSymptomQuestion(modelProfile, make, model, year, gearbox));

    // Question 2: Operating Trigger & Load Condition
    questions.push({
      id: 'condition',
      step: 2,
      badge: 'STAGE 2 OF 4',
      title: `When does the fault happen in your ${year} ${make} ${model}?`,
      subtitle: `Select the precise driving situation when your ${gearbox} misbehaves.`,
      options: [
        {
          id: 'cold_start',
          title: 'Cold Engine Start (First 5–10 Minutes)',
          desc: 'Happens immediately upon starting on cold mornings; gradually improves as transmission fluid warms to 80°C.',
          clue: 'Indicates cold hydraulic fluid viscosity / sticking solenoid valves.'
        },
        {
          id: 'hot_operating_temp',
          title: 'Fully Warmed Up / After 20+ Mins of Driving',
          desc: 'Drives normally when cold, but shudders, slips, or hesitates once the transmission reaches peak operating temperature.',
          clue: 'Indicates fluid thinning, internal hydraulic seal leakage, or TCM thermal degradation.'
        },
        {
          id: 'heavy_acceleration',
          title: 'Under Heavy Acceleration / Incline Load',
          desc: 'Occurs when overtaking, pressing the kickdown switch, or climbing steep motorway hills.',
          clue: 'Indicates clutch pack slip, torque converter bypass, or boost pressure surge.'
        },
        {
          id: 'specific_shifts',
          title: 'During Specific Gear Changes (e.g. 2nd→3rd or into Reverse)',
          desc: 'Only occurs during a specific upshift or downshift transition, or when selecting Drive/Reverse from Park.',
          clue: 'Pinpoints specific shift fork, synchromesh ring, or solenoid valve circuit.'
        },
        {
          id: 'constant_all_speeds',
          title: 'Constant at All Speeds / Continuous Sensation',
          desc: 'Noise, whine, vibration, or dashboard warning is present continuously while the vehicle is moving.',
          clue: 'Indicates mechanical bearing wear, planetary gear damage, or active ECU lock.'
        }
      ]
    });

    // Question 3: Sensory Clues & Mechanical Feedback
    questions.push({
      id: 'sensory',
      step: 3,
      badge: 'STAGE 3 OF 4',
      title: `What physical sensations or sounds does your ${model} exhibit?`,
      subtitle: `Identify the primary sound, vibration, or warning indicators you notice.`,
      options: [
        {
          id: 'dashboard_warning',
          title: 'Dashboard Warning Light / PRNDS Flashing',
          desc: 'Instrument cluster displays "Transmission Malfunction", yellow engine light, spanner icon, or flashing gear selector letters.',
          severity: 'HIGH'
        },
        {
          id: 'metallic_grind',
          title: 'Metallic Grating / Grinding Noise',
          desc: 'Audible metal-on-metal grinding or crunching during gear shifts or deceleration.',
          severity: 'CRITICAL'
        },
        {
          id: 'chassis_shudder',
          title: 'Vibration / Shudder Felt Through Floorpan & Seat',
          desc: 'Rumble-strip vibration through the cabin floor at 40–60 MPH or during low-speed takeoff.',
          severity: 'HIGH'
        },
        {
          id: 'whining_noise',
          title: 'High-Pitched Whine / Droning Proportional to Road Speed',
          desc: 'Electric-like or aircraft-like whining from transmission tunnel that changes pitch with vehicle speed.',
          severity: 'MEDIUM'
        },
        {
          id: 'burning_smell',
          title: 'Burnt Oil / Acrid Clutch Odour After Driving',
          desc: 'Pungent burning oil or friction material smell detectable when stepping out of the vehicle.',
          severity: 'HIGH'
        }
      ]
    });

    // Question 4: Optional OBD-II Trouble Code (DTC)
    questions.push({
      id: 'dtc_code',
      step: 4,
      badge: 'STAGE 4 OF 4 • OPTIONAL',
      title: `Do you have an OBD-II Fault Code from a diagnostic scan?`,
      subtitle: `If your garage or breakdown service scanned your ${make} ${model}, enter the code (e.g. P0700, P17BF, P0730, P0841).`,
      isDtcStep: true
    });

    return {
      modelProfile,
      vehicleSummary: `${year} ${make} ${model}`,
      gearboxFamily: gearbox,
      questions
    };
  }

  static getTransmissionSymptomQuestion(profile, make, model, year, gearbox) {
    let title = `What specific transmission symptom is your ${year} ${make} ${model} experiencing?`;
    let subtitle = `Select the primary issue observed in your ${gearbox}.`;
    let options = [];

    switch (profile) {
      case 'VAG_DSG':
        subtitle = `Customized diagnostic checks for the ${make} ${model} dual-clutch (DSG / S-Tronic) platform.`;
        options = [
          {
            id: 'dsg_takeoff_judder',
            title: 'Stop-Start 1st/2nd Gear Judder & Shudder',
            desc: `Your ${model} shudders and violently shakes when pulling away from standstill in 1st gear or reverse, particularly in hot traffic.`,
            component: 'Dual-Clutch Pack (K1/K2) Friction Glaze / Clutch Travel Drift',
            weights: { clutch: 95, hydraulic: 55, mechanical: 20, electronic: 15 }
          },
          {
            id: 'dsg_flashing_prnds',
            title: 'Flashing PRNDS / Spanner Light / Loss of Drive',
            desc: `The gear selector letters flash on the dashboard, or a yellow transmission alert appears with intermittent loss of power.`,
            component: 'Mechatronic TCU / Hydraulic High-Pressure Pump Failure (P17BF)',
            weights: { clutch: 20, hydraulic: 90, mechanical: 10, electronic: 95 }
          },
          {
            id: 'dsg_missing_alternate_gears',
            title: 'Missing Alternate Gears (Only 1-3-5-7 or 2-4-6-R Work)',
            desc: `The gearbox skips every other gear, refuses to shift into even gears, or completely loses Reverse gear.`,
            component: 'Mechatronic Shift Fork Sensor / Sub-Transmission Hydraulic Valve',
            weights: { clutch: 30, hydraulic: 90, mechanical: 40, electronic: 85 }
          },
          {
            id: 'dsg_delayed_drive_bang',
            title: '2–3 Second Hesitation Then Violent Clunk into Drive',
            desc: `Engine revs freely before the transmission abruptly 'clunks' and engages gear after moving lever to D or R.`,
            component: 'Mechatronic Hydraulic Accumulator Pressure Collapse / Blow-by Leak',
            weights: { clutch: 40, hydraulic: 95, mechanical: 30, electronic: 50 }
          },
          {
            id: 'dsg_idle_rattle',
            title: 'Metallic Clatter at Idle (Stops in Gear)',
            desc: `Rattling or marbles-in-a-tin-can sound coming from bellhousing while idling in Park/Neutral.`,
            component: 'Dual-Mass Flywheel (DMF) Internal Spring Slack',
            weights: { clutch: 90, hydraulic: 10, mechanical: 75, electronic: 0 }
          }
        ];
        break;

      case 'BMW_ZF':
        subtitle = `Customized diagnostic checks for the ${make} ${model} ZF 8HP Steptronic transmission.`;
        options = [
          {
            id: 'zf_rpm_flare',
            title: 'RPM Flare / Surge Between 2nd→3rd or 4th→5th Shifts',
            desc: `Engine RPM flares upwards by 400–800 RPM during gear transitions without vehicle acceleration, then thuds into gear.`,
            component: 'Mechatronic Valve Body Solenoid Wear / Degraded ZF Lifeguard Fluid',
            weights: { clutch: 85, hydraulic: 95, mechanical: 30, electronic: 45 }
          },
          {
            id: 'zf_cruising_shudder',
            title: 'Rumble-Strip Shudder at 40–60 MPH Under Light Throttle',
            desc: `Noticeable cabin vibration and ripple through the floorpan at steady cruising speeds in 7th/8th gear.`,
            component: 'Torque Converter Lock-Up Clutch (TCC) Damper Lining Glaze',
            weights: { clutch: 90, hydraulic: 75, mechanical: 25, electronic: 20 }
          },
          {
            id: 'zf_harsh_engagement_thud',
            title: 'Harsh Kick / Jolt When Engaging Drive or Coming to a Stop',
            desc: `Heavy clunk through the drivetrain when coming to a halt at traffic lights (2nd→1st downshift) or selecting D.`,
            component: 'Mechatronic Bridge Seal & Adapter Sleeve Hydraulic Pressure Loss',
            weights: { clutch: 25, hydraulic: 95, mechanical: 60, electronic: 55 }
          },
          {
            id: 'zf_drivetrain_malfunction',
            title: 'Drivetrain Malfunction - Locked in 3rd Gear Limp Mode',
            desc: `Dashboard warns "Drivetrain Malfunction - Drive Moderately" and car remains locked in a single forward gear.`,
            component: 'E-Clutch Circuit / Transmission Control Module Protection Protocol',
            weights: { clutch: 30, hydraulic: 85, mechanical: 20, electronic: 95 }
          },
          {
            id: 'zf_high_speed_whine',
            title: 'Whining / Droning Pitch Proportional to Road Speed',
            desc: `Whine rising in frequency from the transmission tunnel as speed increases.`,
            component: 'Planetary Gearset / Input Bearing / Differential Pinion Wear',
            weights: { clutch: 10, hydraulic: 20, mechanical: 95, electronic: 5 }
          }
        ];
        break;

      case 'MERCEDES_TRONIC':
        subtitle = `Customized diagnostic checks for the ${make} ${model} 7G/9G-Tronic / 7G-DCT transmission.`;
        options = [
          {
            id: 'merc_conductor_speed_sensor',
            title: 'Stuck in 1st/2nd Gear / Conductor Plate Sensor Fault',
            desc: `Your ${model} refuses to upshift out of low gears, and cruise control / ESP becomes unavailable.`,
            component: 'VGS Conductor Plate Speed Sensors (Y3/8n1 & Y3/8n2)',
            weights: { clutch: 15, hydraulic: 60, mechanical: 10, electronic: 98 }
          },
          {
            id: 'merc_harsh_downshift',
            title: 'Harsh 2nd-to-1st Downshift Clunk on Braking',
            desc: `Abrupt jerk or forward thud as the car comes to a standstill at junctions.`,
            component: 'Valve Body Working Pressure Solenoid & Adaptation Drift',
            weights: { clutch: 30, hydraulic: 95, mechanical: 50, electronic: 60 }
          },
          {
            id: 'merc_delay_throttle',
            title: 'Takeoff Hesitation / Sluggish Throttle Response',
            desc: `Delay between pressing accelerator and vehicle moving forward, followed by a sudden surge.`,
            component: 'DCT Hydraulic Pressure Accumulator / Torque Converter Clutch',
            weights: { clutch: 75, hydraulic: 85, mechanical: 30, electronic: 40 }
          },
          {
            id: 'merc_trans_overheat',
            title: 'Transmission Temperature Warning / Limp Mode',
            desc: `Warning alert indicating transmission oil over-temperature after sustained driving.`,
            component: 'Auxiliary Oil Cooler Thermostat / Degraded ATF 134-FE',
            weights: { clutch: 40, hydraulic: 80, mechanical: 40, electronic: 70 }
          }
        ];
        break;

      case 'FORD_POWERSHIFT':
        subtitle = `Customized diagnostic checks for the ${make} ${model} PowerShift 6DCT / EcoBoost transmission.`;
        options = [
          {
            id: 'ford_powershift_judder',
            title: 'DPS6 Dual-Clutch Violent Takeoff Judder & Shaking',
            desc: `Heavy shuddering and vibration when pulling away from standstill in 1st gear or reverse.`,
            component: 'Input Shaft Seal Leak Contaminating Dry Clutch Friction Discs',
            weights: { clutch: 98, hydraulic: 40, mechanical: 30, electronic: 20 }
          },
          {
            id: 'ford_tcm_failure',
            title: 'Transmission Fault Message / Intermittent No-Crank',
            desc: `Dashboard warns "Transmission Malfunction" with loss of reverse gear and refusal of starter motor to crank.`,
            component: 'Transmission Control Module (TCM) Circuit Board Thermal Failure',
            weights: { clutch: 20, hydraulic: 50, mechanical: 10, electronic: 98 }
          },
          {
            id: 'ford_clutch_slip_boost',
            title: 'Clutch Slipping Under Turbo Boost in 4th/5th Gear',
            desc: `Engine RPM flares rapidly under load on the motorway without vehicle gaining speed.`,
            component: 'Worn Clutch Friction Disc / Weak Diaphragm Pressure Plate',
            weights: { clutch: 95, hydraulic: 20, mechanical: 40, electronic: 0 }
          },
          {
            id: 'ford_hard_gear_shift',
            title: 'Stiff Gear Lever / Hard to Select 1st or Reverse',
            desc: `Heavy resistance pushing gear lever into 1st gear when stationary with engine running.`,
            component: 'Concentric Slave Cylinder (CSC) Internal Hydraulic Seal Failure',
            weights: { clutch: 80, hydraulic: 90, mechanical: 45, electronic: 0 }
          }
        ];
        break;

      case 'NISSAN_CVT':
        subtitle = `Customized diagnostic checks for the ${make} ${model} Jatco Xtronic Continuously Variable Transmission.`;
        options = [
          {
            id: 'nissan_rubber_band_lag',
            title: 'Rubber-Band Effect / High Engine Revs with Slow Speed',
            desc: `Engine revs soar to 4000+ RPM while vehicle accelerates sluggishly with a disconnect feeling.`,
            component: 'Steel Variator Drive Belt Slipping on Conical Pulley Sheaves',
            weights: { clutch: 40, hydraulic: 90, mechanical: 85, electronic: 30 }
          },
          {
            id: 'nissan_pulley_whine',
            title: 'Electric-Like High-Pitched Whine from Engine Bay',
            desc: `Continuous whining or whistling noise that rises in pitch as vehicle speed increases.`,
            component: 'Primary / Secondary Variator Pulley Bearings Spalling',
            weights: { clutch: 10, hydraulic: 30, mechanical: 98, electronic: 10 }
          },
          {
            id: 'nissan_motorway_surging',
            title: 'Hesitation & Surging at Constant 50–70 MPH Cruising',
            desc: `Vehicle rhythmically hesitates and jerks forward/backwards while maintaining steady accelerator on motorway.`,
            component: 'Hydraulic Flow Control Valve Bore Scoring in High-Pressure Pump',
            weights: { clutch: 20, hydraulic: 98, mechanical: 60, electronic: 65 }
          },
          {
            id: 'nissan_cvt_overheat',
            title: 'CVT Fluid Overheat Warning / Sluggish Limp Mode',
            desc: `Car enters safe mode with limited top speed after sustained motorway cruising or hill climbs.`,
            component: 'Degraded CVT NS-3 Fluid / Restricted Transmission Oil Cooler',
            weights: { clutch: 50, hydraulic: 85, mechanical: 40, electronic: 75 }
          }
        ];
        break;

      case 'HYBRID_ECVT':
        subtitle = `Customized diagnostic checks for the ${make} ${model} Hybrid e-CVT Power Split Transaxle.`;
        options = [
          {
            id: 'hybrid_inverter_thermal',
            title: 'Power Output Limited / Hybrid System Warning',
            desc: `Dashboard warns "Check Hybrid System" with reduced electric assist and high engine revs.`,
            component: 'Hybrid Inverter Cooling Flow Restriction / MG2 Motor Thermal Limit',
            weights: { clutch: 10, hydraulic: 20, mechanical: 40, electronic: 95 }
          },
          {
            id: 'hybrid_damper_chatter',
            title: 'Cold Engine Startup Transaxle Clatter & Vibration',
            desc: `Mechanical clatter from transaxle when the petrol engine starts and stops on cold mornings.`,
            component: 'Transaxle Torsional Input Damper Spring Fatigue',
            weights: { clutch: 85, hydraulic: 10, mechanical: 80, electronic: 10 }
          },
          {
            id: 'hybrid_park_lock_error',
            title: 'Transmission P Lock Mechanism Malfunction Alert',
            desc: `Vehicle warns "Shift to P Before Leaving" or electronic park actuator is slow to release.`,
            component: 'Electric Park Pawl Actuator / 12V Auxiliary Battery Low Voltage',
            weights: { clutch: 0, hydraulic: 10, mechanical: 50, electronic: 90 }
          }
        ];
        break;

      default: // MANUAL_DMF & General Manual
        subtitle = `Customized diagnostic checks for the ${make} ${model} Synchromesh Manual Transmission.`;
        options = [
          {
            id: 'manual_synchro_crunch',
            title: 'Metallic Crunch / Grind in 2nd or 3rd Gear',
            desc: `Audible gear crunch when shifting quickly or downshifting under engine braking.`,
            component: 'Worn Brass Synchromesh Friction Ring & Hub Dog Teeth',
            weights: { clutch: 25, hydraulic: 15, mechanical: 98, electronic: 0 }
          },
          {
            id: 'manual_clutch_slip',
            title: 'Clutch Slipping Under Acceleration on Hills',
            desc: `Engine revs flare upwards in 4th/5th gear when accelerating without speed gain.`,
            component: 'Worn Clutch Friction Disc / Weak Diaphragm Spring',
            weights: { clutch: 100, hydraulic: 20, mechanical: 30, electronic: 0 }
          },
          {
            id: 'manual_dmf_idle_rattle',
            title: 'Idle Rattle That Stops When Clutch Pedal is Pressed',
            desc: `Loud mechanical chatter at idle that disappears completely when clutch pedal is pushed to the floor.`,
            component: 'Dual-Mass Flywheel (DMF) Slack / Clutch Release Bearing',
            weights: { clutch: 90, hydraulic: 15, mechanical: 70, electronic: 0 }
          },
          {
            id: 'manual_spongy_sinking_pedal',
            title: 'Clutch Pedal Sinking / Low Bite Point Near Floor',
            desc: `Clutch pedal feels soft, spongy, or fails to return fully to the top of its travel.`,
            component: 'Concentric Slave Cylinder (CSC) / Master Cylinder Hydraulic Seal Leak',
            weights: { clutch: 75, hydraulic: 95, mechanical: 40, electronic: 0 }
          },
          {
            id: 'manual_gear_pop_out',
            title: 'Gear Pops Out into Neutral Under Throttle',
            desc: `Gear lever jumps out of gear into neutral when accelerating or lifting off throttle.`,
            component: 'Worn Selector Fork / Damaged Detent Springs / Tapered Gear Dog Teeth',
            weights: { clutch: 10, hydraulic: 10, mechanical: 95, electronic: 0 }
          }
        ];
        break;
    }

    return {
      id: 'transmission_symptom',
      step: 1,
      badge: 'STAGE 1 OF 4 • MODEL SPECIFIC',
      title,
      subtitle,
      options
    };
  }
}
