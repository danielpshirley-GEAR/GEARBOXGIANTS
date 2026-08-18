/**
 * GEARBOX GIANTS - AUTOMOTIVE OBD-II & TRANSMISSION DTC DATABASE
 * Comprehensive mapping of OBD-II powertrain, transmission, mechatronic, and chassis trouble codes.
 */

export const DTC_DATABASE = {
  // Transmission & Drivetrain Diagnostic Codes
  "P0700": {
    code: "P0700",
    name: "Transmission Control System (MIL Request)",
    system: "Automatic / Dual-Clutch Transmission",
    severity: "HIGH",
    description: "The Transmission Control Module (TCM) has detected a critical internal fault and commanded the Engine Control Module to illuminate the Malfunction Indicator Lamp.",
    possibleCauses: ["TCM internal electronic failure", "Wiring harness CAN bus communication fault", "Hydraulic pressure sensor deviation", "Solenoid circuit failure"],
    garageAction: "Perform a dedicated TCM module deep scan with dealer-level diagnostic tool to retrieve underlying manufacturer sub-codes."
  },
  "P0730": {
    code: "P0730",
    name: "Incorrect Gear Ratio Detected",
    system: "Transmission Mechanical / Hydraulic",
    severity: "CRITICAL",
    description: "The input and output shaft speed sensor readings do not match the expected gear ratio for the commanded gear, indicating internal clutch slip or band slippage.",
    possibleCauses: ["Severely worn clutch friction plates", "Burnt or degraded transmission fluid", "Low hydraulic line pressure", "Defective valve body shift solenoid"],
    garageAction: "Sample transmission fluid for burnt smell and metallic particles; check line pressure with pressure gauge port."
  },
  "P0741": {
    code: "P0741",
    name: "Torque Converter Clutch (TCC) Circuit Performance / Stuck Off",
    system: "Torque Converter / Lock-Up Mechanism",
    severity: "HIGH",
    description: "The torque converter lock-up clutch is failing to mechanically lock during cruising speeds, causing elevated transmission temperatures and reduced fuel economy.",
    possibleCauses: ["Glazed or worn TCC friction lining", "Blocked TCC solenoid fluid passage in valve body", "Defective torque converter clutch solenoid", "Damaged turbine input shaft seal"],
    garageAction: "Monitor live TCC slip RPM in ECU datastream during a 50 MPH road test; expect 0-20 RPM slip when locked."
  },
  "P0841": {
    code: "P0841",
    name: "Transmission Fluid Pressure Sensor/Switch 'A' Circuit Range/Performance",
    system: "Mechatronics / Hydraulic Pressure Circuit",
    severity: "HIGH",
    description: "The hydraulic pressure sensor is reading a pressure value outside the calibrated operational envelope for the current driving state.",
    possibleCauses: ["Failing hydraulic pressure sensor", "Pressure accumulator cracked/leaking", "Debris clogging the solenoid valve screen", "Weak hydraulic high-pressure pump"],
    garageAction: "Log live hydraulic rail pressure (bar); check for rapid pressure decay at idle."
  },
  "P17BF": {
    code: "P17BF",
    name: "Hydraulic Pump Protection / Loss of Pressure (VAG DSG DQ200)",
    system: "VAG DSG Mechatronics (7-Speed Dry Clutch)",
    severity: "CRITICAL",
    description: "Classic VAG DQ200 mechatronic fault. The hydraulic pump motor is running continuously because the pressure accumulator housing has cracked or blown its threaded boss, causing hydraulic pressure collapse.",
    possibleCauses: ["Cracked mechatronic accumulator housing wall", "Blown accumulator seal ring", "Worn electric hydraulic pump motor", "Blown 30A mechatronic fuse"],
    garageAction: "Inspect mechatronic bottom cover for hydraulic fluid weeping; replace accumulator with reinforced steel housing and test system prime."
  },
  "P189C": {
    code: "P189C",
    name: "Function Restriction Due to Pressure Drop (DSG / S-Tronic)",
    system: "Dual-Clutch Transmission Hydraulic Circuit",
    severity: "CRITICAL",
    description: "The transmission has entered emergency limp mode because hydraulic pressure has dropped below the threshold required to safely actuate the clutch packs and shift forks.",
    possibleCauses: ["Hydraulic pump failure", "Internal valve body blow-by leak", "Severely low hydraulic fluid level", "Contaminated hydraulic valve body"],
    garageAction: "Check TCM pressure adaptation values; test hydraulic prime time on ignition on."
  },
  "P2714": {
    code: "P2714",
    name: "Pressure Control Solenoid 'D' Performance or Stuck Off",
    system: "Automatic Valve Body",
    severity: "HIGH",
    description: "A shift pressure control solenoid in the transmission valve body is sticking mechanically, resulting in harsh gear shifts, gear hunting, or delayed engagement.",
    possibleCauses: ["Varnished or worn solenoid spool valve", "Metal particle contamination in ATF", "Damaged valve body casting bore", "TCM driver circuit degradation"],
    garageAction: "Perform solenoid resistance check (ohms) and execute active bidirectional solenoid click test."
  },
  "P0715": {
    code: "P0715",
    name: "Input / Turbine Speed Sensor 'A' Circuit Malfunction",
    system: "Speed Sensors / TCM Electronics",
    severity: "HIGH",
    description: "The TCM is not receiving a reliable speed pulse signal from the gearbox input shaft, preventing proper calculation of shift timing and clutch slip.",
    possibleCauses: ["Defective Hall-effect input speed sensor", "Metal filings covering magnetic sensor tip", "Corroded wiring harness plug", "Conductor plate electronic failure (Mercedes 7G)"],
    garageAction: "Check input speed sensor signal with oscilloscope; inspect conductor plate sensor solder joints."
  },
  "P0810": {
    code: "P0810",
    name: "Clutch Position Control Error (Automated Manual / DCT)",
    system: "Clutch Actuator / Electronics",
    severity: "CRITICAL",
    description: "The clutch actuator cannot reach or maintain the commanded clutch bite point position.",
    possibleCauses: ["Worn clutch actuator electric motor", "Dry clutch pack wear beyond travel limit", "Defective clutch position potentiometer", "Binding release fork mechanism"],
    garageAction: "Perform clutch actuator basic setting calibration; check clutch touch point adaptation limit."
  },
  "P0942": {
    code: "P0942",
    name: "Hydraulic Pressure Generating Unit Fault",
    system: "Dual-Clutch / Automated Hydraulic Pump",
    severity: "HIGH",
    description: "The high-pressure hydraulic pump unit is failing to maintain system operating pressure (40–60 bar).",
    possibleCauses: ["Pump motor thermal overload", "Hydraulic fluid cavitation / foam", "Failed one-way check valve", "Low fluid level in mechatronic reservoir"],
    garageAction: "Check hydraulic fluid level and inspect high-pressure pump relay."
  },

  // Engine Performance & Powertrain Codes
  "P0300": {
    code: "P0300",
    name: "Random/Multiple Cylinder Misfire Detected",
    system: "Ignition / Fuel Delivery",
    severity: "HIGH",
    description: "The engine ECU has detected that multiple cylinders are not firing correctly, leading to unburned fuel entering the exhaust and potential transmission shudder.",
    possibleCauses: ["Failing ignition coils or spark plugs", "Vacuum / intake manifold leak", "Low fuel pressure / clogged injectors", "EGR valve stuck open"],
    garageAction: "Check live misfire counters per cylinder, smoke test intake tract, and measure fuel rail pressure."
  },
  "P0301": {
    code: "P0301",
    name: "Cylinder 1 Misfire Detected",
    system: "Ignition / Fuel Delivery",
    severity: "HIGH",
    description: "Specific misfire detected in cylinder 1.",
    possibleCauses: ["Faulty ignition coil #1", "Fouled or worn spark plug #1", "Clogged fuel injector #1", "Low compression in cylinder 1"],
    garageAction: "Swap coil #1 to coil #2 to see if fault follows; test compression if misfire persists."
  },
  "P0302": {
    code: "P0302",
    name: "Cylinder 2 Misfire Detected",
    system: "Ignition / Fuel Delivery",
    severity: "HIGH",
    description: "Specific misfire detected in cylinder 2.",
    possibleCauses: ["Faulty ignition coil #2", "Fouled spark plug #2", "Injector failure", "Valvetrain wear"],
    garageAction: "Inspect plug #2 condition and swap coil pack."
  },
  "P0303": {
    code: "P0303",
    name: "Cylinder 3 Misfire Detected",
    system: "Ignition / Fuel Delivery",
    severity: "HIGH",
    description: "Specific misfire detected in cylinder 3.",
    possibleCauses: ["Faulty ignition coil #3", "Fouled spark plug #3", "Injector failure"],
    garageAction: "Test coil pulse and spark plug gap."
  },
  "P0304": {
    code: "P0304",
    name: "Cylinder 4 Misfire Detected",
    system: "Ignition / Fuel Delivery",
    severity: "HIGH",
    description: "Specific misfire detected in cylinder 4.",
    possibleCauses: ["Faulty ignition coil #4", "Spark plug gap out of spec", "Wiring harness chafing"],
    garageAction: "Inspect coil and plug #4."
  },
  "P0171": {
    code: "P0171",
    name: "System Too Lean (Bank 1)",
    system: "Fuel Trim / Air Induction",
    severity: "MEDIUM",
    description: "ECU is adding maximum allowable fuel (+25% STFT/LTFT) because excess unmetered air or insufficient fuel is entering the engine.",
    possibleCauses: ["Split vacuum hose or PCV breather pipe", "Dirty/faulty Mass Air Flow (MAF) sensor", "Weak fuel pump or clogged fuel filter", "Exhaust leak before upstream O2 sensor"],
    garageAction: "Smoke test induction system for post-MAF vacuum leaks; clean MAF sensor element with specialized solvent."
  },
  "P0420": {
    code: "P0420",
    name: "Catalyst System Efficiency Below Threshold (Bank 1)",
    system: "Exhaust / Emissions",
    severity: "MEDIUM",
    description: "Downstream oxygen sensor signal closely mirrors upstream sensor, indicating catalytic converter is not efficiently storing/reducing oxygen.",
    possibleCauses: ["Aged or contaminated catalytic converter", "Degraded downstream O2 sensor", "Exhaust manifold gasket leak", "Previous engine misfire burning out catalyst substrate"],
    garageAction: "Graph upstream vs downstream O2 sensor waveforms with engine at operating temperature."
  },

  // Diesel & Emissions
  "P0401": {
    code: "P0401",
    name: "Exhaust Gas Recirculation (EGR) Flow Insufficient Detected",
    system: "Diesel / Petrol Emissions",
    severity: "MEDIUM",
    description: "The EGR system is not recirculating the expected volume of inert exhaust gases back into the intake.",
    possibleCauses: ["Carbon soot buildup in EGR valve", "Blocked EGR cooler passageways", "Faulty EGR differential pressure sensor or vacuum actuator"],
    garageAction: "Remove EGR valve and inspect for heavy soot crusting; test valve stepper motor activation."
  },
  "P2002": {
    code: "P2002",
    name: "Diesel Particulate Filter (DPF) Efficiency Below Threshold",
    system: "Diesel Exhaust Aftertreatment",
    severity: "HIGH",
    description: "Differential pressure across the DPF indicates excessive soot accumulation or cracked silicon carbide filter substrate.",
    possibleCauses: ["Repeated short urban journeys preventing passive regeneration", "Faulty DPF differential pressure sensor pipes (melted/split)", "EGR stuck open causing excessive soot generation"],
    garageAction: "Read DPF soot and ash mass in grams; check differential pressure at idle and 2500 RPM; initiate forced workshop regeneration."
  },
  "P2463": {
    code: "P2463",
    name: "DPF Soot Accumulation - Restriction Level High",
    system: "Diesel Exhaust Aftertreatment",
    severity: "CRITICAL",
    description: "DPF is overloaded with soot. Engine is likely in Limp Home mode with reduced power to prevent catastrophic thermal runaway.",
    possibleCauses: ["Blocked DPF core", "Failed regeneration cycles", "Thermostat stuck open preventing 85°C regeneration trigger"],
    garageAction: "Chemical DPF flush / off-car ultrasonic clean; verify engine coolant reaches minimum operating temperature."
  },

  // Boost & Turbocharger
  "P0299": {
    code: "P0299",
    name: "Turbocharger / Supercharger Underboost Condition",
    system: "Forced Induction / Boost Control",
    severity: "HIGH",
    description: "Manifold absolute pressure (MAP) is significantly lower than requested target boost pressure.",
    possibleCauses: ["Split boost hose / intercooler puncture", "Stuck open turbo wastegate or defective vacuum solenoid (N75)", "Variable turbine geometry (VNT) vanes carbon-locked", "Worn turbo compressor/turbine shaft play"],
    garageAction: "Pressure test intercooler and boost charge pipes with smoke machine; inspect turbo compressor wheel for contact marks."
  },
  "P0234": {
    code: "P0234",
    name: "Turbocharger Overboost Condition",
    system: "Forced Induction / Boost Control",
    severity: "HIGH",
    description: "Boost pressure exceeded safe design limits. ECU cuts fuel/boost to protect engine internals.",
    possibleCauses: ["Stuck closed wastegate", "VNT vanes seized in high-boost position", "Failed boost control solenoid", "Pinched vacuum line to actuator"],
    garageAction: "Manually cycle turbo wastegate / VNT actuator arm; verify smooth travel without binding."
  },

  // Chassis, ABS & Wheel Speed
  "C0035": {
    code: "C0035",
    name: "Left Front Wheel Speed Sensor Circuit",
    system: "ABS / ESP / Transmission Integration",
    severity: "MEDIUM",
    description: "Missing or erratic wheel speed signal affecting ABS, traction control, and automatic gearbox shift adaptations.",
    possibleCauses: ["Damaged ABS sensor wiring harness", "Cracked/corroded magnetic reluctor ring on wheel bearing", "Debris covering sensor face"],
    garageAction: "Inspect reluctor ring for missing teeth/cracks; check live wheel speed telemetry on road test."
  },
  "U0100": {
    code: "U0100",
    name: "Lost Communication with ECM/PCM 'A'",
    system: "CAN Bus High-Speed Network",
    severity: "CRITICAL",
    description: "Transmission Control Module or ABS module has lost communication with the main Engine Control Module over the high-speed CAN bus.",
    possibleCauses: ["Blown main ECU power relay or fuse", "Corroded multi-pin CAN bus connector", "Chafed twisted-pair CAN wires (CAN-H / CAN-L)", "Water ingress in engine ECU connector"],
    garageAction: "Measure CAN bus terminating resistance (60 ohms expected across pin 6 and 14 of OBD port)."
  },
  "U0101": {
    code: "U0101",
    name: "Lost Communication with Transmission Control Module (TCM)",
    system: "CAN Bus Network / TCM Power",
    severity: "CRITICAL",
    description: "The engine ECU and instrument cluster are unable to establish communication with the Transmission Control Module.",
    possibleCauses: ["Blown TCM power supply fuse", "Water ingress into transmission harness plug", "Internal TCM microprocessor failure", "Corroded main ground strap"],
    garageAction: "Verify 12V power supply and ground pins at transmission multi-plug connector."
  }
};

/**
 * Look up a DTC trouble code
 */
export function lookupDtcCode(code) {
  if (!code) return null;
  const clean = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  
  if (DTC_DATABASE[clean]) {
    return DTC_DATABASE[clean];
  }
  
  // Generic fallback if standard format (Pxxxx, Cxxxx, Bxxxx, Uxxxx)
  if (/^[PCBU]\d{4}$/.test(clean)) {
    const typeMap = {
      P: 'Powertrain / Engine / Transmission',
      C: 'Chassis / ABS / Suspension',
      B: 'Body / Climate / Lighting',
      U: 'Network Communication / CAN Bus'
    };
    return {
      code: clean,
      name: `Diagnostic Trouble Code ${clean}`,
      system: typeMap[clean[0]] || 'Vehicle Electronic Control System',
      severity: 'MEDIUM',
      description: `Official OBD-II diagnostic fault registered in ${typeMap[clean[0]] || 'ECU'} module.`,
      possibleCauses: ['Sensor voltage out of expected operating range', 'Wiring harness signal degradation', 'Mechanical component wear affecting calibration'],
      garageAction: 'Connect manufacturer diagnostic scan tool and read live sensor parameters; execute component functional test.'
    };
  }
  
  return null;
}
