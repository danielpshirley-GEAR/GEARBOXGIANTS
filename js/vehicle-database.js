/**
 * GEARBOX GIANTS - TECHNICAL VEHICLE SPECIFICATIONS & TSB DATABASE
 * Comprehensive profiles for UK vehicle models, gearbox platforms, and manufacturer technical bulletins.
 */

export const VEHICLE_DATABASE = {
  "BK64FYM": {
    registration: "BK64 FYM",
    make: "BMW",
    model: "X6",
    derivative: "xDrive30d M Sport (3.0L TwinPower Diesel)",
    year: 2014,
    firstRegistered: "September 2014",
    fuelType: "Diesel",
    transmission: "BMW ZF 8HP / Steptronic 8-Speed Torque Converter",
    gearboxCategory: "AUTO",
    gearboxFamily: "ZF 8HP70 8-Speed Automatic",
    gearboxCode: "ZF-8HP70",
    engineCapacity: 2993,
    powerBhp: 255,
    colour: "Grey",
    bodyType: "SUV / Coupe",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WBAKV220600**7482",
    currentMileage: 108996,
    motExpiryDate: "2027-06-11",
    motStatus: "VALID",
    motDaysRemaining: 297,
    knownIssues: [
      {
        title: "ZF 8HP Mechatronic Bridge Seal & Adapter Sleeve Leak",
        risk: "HIGH",
        description: "Rubber sealing sleeves and bridge adapter between mechatronic valve body and transmission casing harden, causing line pressure drops and 2-3 / 4-5 shift flares.",
        affectedComponents: ["Mechatronic Bridge Seal", "Valve Body Sealing Sleeves", "ZF Lifeguard Fluid 8"],
        recommendedAction: "Replace Mechatronic bridge adapter seal, tube seals, and oil pan filter; perform TCM shift adaptation reset."
      },
      {
        title: "Torque Converter Lock-Up Clutch Glaze at 40-60 MPH",
        risk: "HIGH",
        description: "Internal lockup clutch damper springs and friction lining develop glazing, causing vibration or rumble-strip shudder under light acceleration.",
        affectedComponents: ["Torque Converter", "TCC Solenoid (EDS4)", "Input Shaft Bushing"],
        recommendedAction: "Check TCC slip RPM in live datastream; recondition torque converter assembly."
      },
      {
        title: "xDrive ATC45L Transfer Case Shudder",
        risk: "MEDIUM",
        description: "Clutch pack wear inside the electronically controlled transfer case causes juddering and tyre skipping on tight low-speed turns.",
        affectedComponents: ["Transfer Case Multi-Plate Clutch", "Actuator Servomotor", "TF0870 Fluid"],
        recommendedAction: "Service transfer case fluid and execute clutch pack wear calibration."
      }
    ],
    motHistory: [
      {
        testDate: "12 June 2026",
        testNumber: "959638099721",
        result: "PASSED",
        odometer: "108,996 miles",
        odometerRaw: 108996,
        expiryDate: "11 June 2027",
        rfrAndComments: []
      },
      {
        testDate: "05 June 2025",
        testNumber: "849201948271",
        result: "PASSED",
        odometer: "99,410 miles",
        odometerRaw: 99410,
        expiryDate: "11 June 2026",
        rfrAndComments: [
          { type: "ADVISORY", text: "Rear Brake disc worn, pitted or scored, but not seriously weakened (1.1.14 (a) (ii))" }
        ]
      }
    ]
  },

  "GY69LKP": {
    registration: "GY69 LKP",
    make: "VOLKSWAGEN",
    model: "GOLF",
    derivative: "2.0 TDI GTD DSG (7-Speed DQ381 Dual-Clutch)",
    year: 2019,
    firstRegistered: "November 2019",
    fuelType: "Diesel",
    transmission: "VAG DSG 7-Speed (DQ381 Wet Clutch)",
    gearboxCategory: "DSG",
    gearboxFamily: "Volkswagen DSG DQ381 7-Speed",
    gearboxCode: "DQ381-7A",
    engineCapacity: 1968,
    powerBhp: 184,
    colour: "Tornado Red",
    bodyType: "5 Door Hatchback",
    euroStatus: "Euro 6d-TEMP",
    ulezCompliant: true,
    vinMasked: "WVWZZZAUZKP**9214",
    currentMileage: 48900,
    motExpiryDate: "2026-11-14",
    motStatus: "VALID",
    motDaysRemaining: 88,
    knownIssues: [
      {
        title: "DSG DQ381 Mechatronic Solenoid Adaptation Drift",
        risk: "HIGH",
        description: "Contamination in hydraulic valve galleries causes sluggish or delayed 1st-to-2nd gear shifts and reverse engagement delay.",
        affectedComponents: ["Mechatronic Solenoids N215/N216", "DSG Wet Clutch Pack", "High-Pressure Filter"],
        recommendedAction: "Perform full DSG fluid & dual filter replacement (G 055 549 A2) and execute VCDS clutch bite point basic settings."
      },
      {
        title: "Dual-Mass Flywheel (DMF) Rotational Slack",
        risk: "MEDIUM",
        description: "Internal arc springs in DMF fatigue under high diesel torque, causing rhythmic metallic chatter at idle that quiets once in gear.",
        affectedComponents: ["Dual-Mass Flywheel", "Needle Pilot Bearing"],
        recommendedAction: "Inspect DMF free play and rock clearance with dial gauge."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "48,900 miles",
        odometerRaw: 48900,
        expiryDate: "14 November 2026",
        rfrAndComments: []
      }
    ]
  },

  "MJ15BDY": {
    registration: "MJ15 BDY",
    make: "FORD",
    model: "Transit Courier",
    derivative: "1.5 TDCi (1.5L Diesel)",
    year: 2015,
    firstRegistered: "March 2015",
    fuelType: "Diesel",
    transmission: "6-Speed Manual Transmission",
    gearboxCategory: "MANUAL",
    gearboxFamily: "Ford 6-Speed Manual B6",
    gearboxCode: "B6-6MT",
    engineCapacity: 1499,
    powerBhp: 75,
    colour: "White",
    bodyType: "Van / Commercial",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WF0LXXTATL**1928",
    currentMileage: 78500,
    motExpiryDate: "2026-04-29",
    motStatus: "VALID",
    motDaysRemaining: 240,
    knownIssues: [
      {
        title: "Dual Mass Flywheel & Clutch Slave Cylinder Inspection",
        risk: "MEDIUM",
        description: "Clutch pedal friction point wear under commercial urban loading.",
        affectedComponents: ["Clutch Plate", "Concentric Slave Cylinder", "Gearbox Oil"],
        recommendedAction: "Inspect clutch disengagement stroke and verify 75W FE gear oil level."
      }
    ],
    motHistory: [
      {
        testDate: "29 April 2026",
        testNumber: "948201948291",
        result: "PASSED",
        odometer: "78,500 miles",
        odometerRaw: 78500,
        expiryDate: "29 April 2027",
        rfrAndComments: []
      }
    ]
  },

  "HG13FNC": {
    registration: "HG13 FNC",
    make: "TOYOTA",
    model: "Aygo",
    derivative: "1.0 VVT-i (1.0L Petrol)",
    year: 2013,
    firstRegistered: "July 2013",
    fuelType: "Petrol",
    transmission: "5-Speed Manual / MultiMode Transmission",
    gearboxCategory: "MANUAL",
    gearboxFamily: "Toyota C551 5-Speed Manual / MMT",
    gearboxCode: "C551-5MT",
    engineCapacity: 998,
    powerBhp: 68,
    colour: "Orange",
    bodyType: "3 Door Hatchback",
    euroStatus: "Euro 5",
    ulezCompliant: true,
    vinMasked: "VNKKG08B00A**4819",
    currentMileage: 61200,
    motExpiryDate: "2026-06-11",
    motStatus: "VALID",
    motDaysRemaining: 283,
    knownIssues: [
      {
        title: "Clutch Friction Plate & Release Bearing Wear",
        risk: "MEDIUM",
        description: "Clutch pedal biting point becomes high or develops judder on 1st gear take-off.",
        affectedComponents: ["Clutch Friction Plate", "Pressure Plate", "Release Bearing"],
        recommendedAction: "Renew 190mm clutch kit assembly and adjust clutch cable tension."
      }
    ],
    motHistory: [
      {
        testDate: "11 June 2026",
        testNumber: "847291038102",
        result: "PASSED",
        odometer: "61,200 miles",
        odometerRaw: 61200,
        expiryDate: "11 June 2027",
        rfrAndComments: []
      }
    ]
  },

  "EJ63UNL": {
    registration: "EJ63 UNL",
    make: "BMW",
    model: "1 Series",
    derivative: "114i Sport (1.6L TwinPower Petrol)",
    year: 2014,
    firstRegistered: "January 2014",
    fuelType: "Petrol",
    transmission: "6-Speed Manual / 8-Speed Steptronic Automatic",
    gearboxCategory: "MANUAL",
    gearboxFamily: "BMW 6-Speed Manual / ZF 8HP",
    gearboxCode: "GS6-17BG",
    engineCapacity: 1598,
    powerBhp: 102,
    colour: "White",
    bodyType: "5 Door Hatchback",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WBA1R12050E**9124",
    currentMileage: 74200,
    motExpiryDate: "2026-04-06",
    motStatus: "VALID",
    motDaysRemaining: 217,
    knownIssues: [
      {
        title: "Manual Gearbox Input Shaft Bearing & Clutch Release Noise",
        risk: "MEDIUM",
        description: "Clutch release bearing whine or 1st/2nd synchromesh wear during cold shifts.",
        affectedComponents: ["Input Shaft Bearing", "Clutch Release Bearing", "MTF-LT-3 Fluid"],
        recommendedAction: "Inspect clutch release fork and replace transmission fluid with genuine OEM spec."
      }
    ],
    motHistory: [
      {
        testDate: "06 April 2026",
        testNumber: "847291038291",
        result: "PASSED",
        odometer: "74,200 miles",
        odometerRaw: 74200,
        expiryDate: "06 April 2027",
        rfrAndComments: []
      }
    ]
  },

  "GV61FJD": {
    registration: "GV61 FJD",
    make: "BMW",
    model: "3 Series",
    derivative: "320d M Sport (2.0L TwinPower Diesel)",
    year: 2011,
    firstRegistered: "November 2011",
    fuelType: "Diesel",
    transmission: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCategory: "AUTO",
    gearboxFamily: "ZF 8HP45 8-Speed Automatic",
    gearboxCode: "ZF-8HP45",
    engineCapacity: 1995,
    powerBhp: 184,
    colour: "Black",
    bodyType: "Saloon / Coupe",
    euroStatus: "Euro 5",
    ulezCompliant: true,
    vinMasked: "WBA3D32090F**9812",
    currentMileage: 94200,
    motExpiryDate: "2026-11-12",
    motStatus: "VALID",
    motDaysRemaining: 72,
    knownIssues: [
      {
        title: "ZF 8HP Mechatronic Bridge Seal & Adapter Sleeve Wear",
        risk: "MEDIUM",
        description: "Rubber sealing adapter sleeve hardens with age, causing slow gear engagement or 2-3 shift flare.",
        affectedComponents: ["Mechatronic Bridge Seal", "Valve Body Sealing Sleeves", "ZF Lifeguard Fluid 8"],
        recommendedAction: "Renew Mechatronic bridge adapter seal and perform transmission adaptation reset."
      }
    ],
    motHistory: [
      {
        testDate: "13 November 2025",
        testNumber: "958201948271",
        result: "PASSED",
        odometer: "94,200 miles",
        odometerRaw: 94200,
        expiryDate: "12 November 2026",
        rfrAndComments: []
      }
    ]
  },

  "NG61EYW": {
    registration: "NG61 EYW",
    make: "AUDI",
    model: "A1",
    derivative: "1.6 TDI Sport (105PS Diesel)",
    year: 2011,
    firstRegistered: "September 2011",
    fuelType: "Diesel",
    transmission: "Manual 5-Speed Transmission",
    gearboxCategory: "MANUAL",
    gearboxFamily: "VAG 02T / 0A4 5-Speed Manual",
    gearboxCode: "02T-MANUAL",
    engineCapacity: 1598,
    powerBhp: 105,
    colour: "Black",
    bodyType: "3 Door Hatchback",
    euroStatus: "Euro 5",
    ulezCompliant: true,
    vinMasked: "WAUZZZ8X6CB**3891",
    currentMileage: 89400,
    motExpiryDate: "2026-10-18",
    motStatus: "VALID",
    motDaysRemaining: 47,
    knownIssues: [
      {
        title: "Dual Mass Flywheel & Clutch Release Bearing Wear",
        risk: "MEDIUM",
        description: "Clutch release bearing rattle or slight pedal vibration on engagement.",
        affectedComponents: ["Dual Mass Flywheel", "Clutch Plate", "Concentric Slave Cylinder"],
        recommendedAction: "Inspect clutch engagement biting point and renew release bearing if noisy."
      }
    ],
    motHistory: [
      {
        testDate: "19 October 2025",
        testNumber: "784910283910",
        result: "PASSED",
        odometer: "89,400 miles",
        odometerRaw: 89400,
        expiryDate: "18 October 2026",
        rfrAndComments: []
      }
    ]
  },

  "WF68KLU": {
    registration: "WF68 KLU",
    make: "BMW",
    model: "3 Series (320d M Sport)",
    derivative: "3 Series (320d M Sport) (2.0L Diesel (190 bhp))",
    year: 2019,
    firstRegistered: "March 2019",
    fuelType: "Diesel",
    transmission: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZWF68KLU**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "EA19XPR": {
    registration: "EA19 XPR",
    make: "VOLKSWAGEN",
    model: "Golf (1.5 TSI EVO Match)",
    derivative: "Golf (1.5 TSI EVO Match) (1.5L Petrol (150 bhp))",
    year: 2019,
    firstRegistered: "March 2019",
    fuelType: "Petrol",
    transmission: "7-Speed DSG Dual-Clutch (DQ381)",
    gearboxCategory: "DSG",
    gearboxFamily: "7-Speed DSG Dual-Clutch (DQ381)",
    gearboxCode: "DSG-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZEA19XPR**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "LK67YHB": {
    registration: "LK67 YHB",
    make: "FORD",
    model: "Focus (1.0 EcoBoost Titanium)",
    derivative: "Focus (1.0 EcoBoost Titanium) (1.0L Petrol (125 bhp))",
    year: 2018,
    firstRegistered: "March 2018",
    fuelType: "Petrol",
    transmission: "6-Speed Manual Transmission",
    gearboxCategory: "MANUAL",
    gearboxFamily: "6-Speed Manual Transmission",
    gearboxCode: "MANUAL-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZLK67YHB**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "GL70VBC": {
    registration: "GL70 VBC",
    make: "AUDI",
    model: "A4 (35 TDI S Line S-Tronic)",
    derivative: "A4 (35 TDI S Line S-Tronic) (2.0L Diesel (163 bhp))",
    year: 2020,
    firstRegistered: "March 2020",
    fuelType: "Diesel",
    transmission: "7-Speed S-Tronic Dual-Clutch (DL382)",
    gearboxCategory: "DSG",
    gearboxFamily: "7-Speed S-Tronic Dual-Clutch (DL382)",
    gearboxCode: "DSG-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZGL70VBC**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "RO17LKM": {
    registration: "RO17 LKM",
    make: "MERCEDES-BENZ",
    model: "A-Class (A200 AMG Line)",
    derivative: "A-Class (A200 AMG Line) (1.6L Petrol (156 bhp))",
    year: 2017,
    firstRegistered: "March 2017",
    fuelType: "Petrol",
    transmission: "7G-DCT Dual-Clutch Automatic",
    gearboxCategory: "AUTO",
    gearboxFamily: "7G-DCT Dual-Clutch Automatic",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZRO17LKM**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "BD21FGT": {
    registration: "BD21 FGT",
    make: "VAUXHALL",
    model: "Corsa (1.2 Turbo SRi Premium)",
    derivative: "Corsa (1.2 Turbo SRi Premium) (1.2L Petrol (100 bhp))",
    year: 2021,
    firstRegistered: "March 2021",
    fuelType: "Petrol",
    transmission: "6-Speed Manual Transmission",
    gearboxCategory: "MANUAL",
    gearboxFamily: "6-Speed Manual Transmission",
    gearboxCode: "MANUAL-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZBD21FGT**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "GU69NTR": {
    registration: "GU69 NTR",
    make: "NISSAN",
    model: "Qashqai (1.3 DIG-T N-Connecta)",
    derivative: "Qashqai (1.3 DIG-T N-Connecta) (1.3L Petrol (140 bhp))",
    year: 2019,
    firstRegistered: "March 2019",
    fuelType: "Petrol",
    transmission: "Xtronic Continuously Variable (CVT)",
    gearboxCategory: "AUTO",
    gearboxFamily: "Xtronic Continuously Variable (CVT)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZGU69NTR**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "LO21VBN": {
    registration: "LO21 VBN",
    make: "AUDI",
    model: "A3 Sportback (35 TFSI S Line)",
    derivative: "A3 Sportback (35 TFSI S Line) (1.5L MHEV Petrol (150 bhp))",
    year: 2021,
    firstRegistered: "March 2021",
    fuelType: "Petrol",
    transmission: "7-Speed S-Tronic Dual-Clutch (DQ381)",
    gearboxCategory: "DSG",
    gearboxFamily: "7-Speed S-Tronic Dual-Clutch (DQ381)",
    gearboxCode: "DSG-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZLO21VBN**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "OY68FGT": {
    registration: "OY68 FGT",
    make: "BMW",
    model: "5 Series (520d M Sport Touring)",
    derivative: "5 Series (520d M Sport Touring) (2.0L Diesel (190 bhp))",
    year: 2018,
    firstRegistered: "March 2018",
    fuelType: "Diesel",
    transmission: "8-Speed ZF Automatic w/ Paddles",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed ZF Automatic w/ Paddles",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZOY68FGT**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "HV22ABC": {
    registration: "HV22 ABC",
    make: "MERCEDES-BENZ",
    model: "CLA Coupe (CLA220d AMG Line)",
    derivative: "CLA Coupe (CLA220d AMG Line) (2.0L Diesel (190 bhp))",
    year: 2022,
    firstRegistered: "March 2022",
    fuelType: "Diesel",
    transmission: "8G-DCT Dual-Clutch Automatic",
    gearboxCategory: "AUTO",
    gearboxFamily: "8G-DCT Dual-Clutch Automatic",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZHV22ABC**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "SF20KLM": {
    registration: "SF20 KLM",
    make: "LAND ROVER",
    model: "Range Rover Evoque (2.0 D180 R-Dynamic S)",
    derivative: "Range Rover Evoque (2.0 D180 R-Dynamic S) (2.0L Diesel (180 bhp))",
    year: 2020,
    firstRegistered: "March 2020",
    fuelType: "Diesel",
    transmission: "ZF 9-Speed Automatic (9HP48)",
    gearboxCategory: "AUTO",
    gearboxFamily: "ZF 9-Speed Automatic (9HP48)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZSF20KLM**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "YE19BCD": {
    registration: "YE19 BCD",
    make: "FORD",
    model: "Fiesta (1.0 EcoBoost ST-Line)",
    derivative: "Fiesta (1.0 EcoBoost ST-Line) (1.0L Petrol (125 bhp))",
    year: 2019,
    firstRegistered: "March 2019",
    fuelType: "Petrol",
    transmission: "6-Speed Manual Transmission",
    gearboxCategory: "MANUAL",
    gearboxFamily: "6-Speed Manual Transmission",
    gearboxCode: "MANUAL-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZYE19BCD**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "MA71XRT": {
    registration: "MA71 XRT",
    make: "HYUNDAI",
    model: "Tucson (1.6 T-GDi N Line 48V)",
    derivative: "Tucson (1.6 T-GDi N Line 48V) (1.6L Petrol MHEV (150 bhp))",
    year: 2021,
    firstRegistered: "March 2021",
    fuelType: "Petrol",
    transmission: "7-Speed Dual-Clutch (7-DCT)",
    gearboxCategory: "AUTO",
    gearboxFamily: "7-Speed Dual-Clutch (7-DCT)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZMA71XRT**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "LN18PQR": {
    registration: "LN18 PQR",
    make: "MINI",
    model: "Hatch (Cooper S 2.0 Sport)",
    derivative: "Hatch (Cooper S 2.0 Sport) (2.0L Turbo Petrol (192 bhp))",
    year: 2018,
    firstRegistered: "March 2018",
    fuelType: "Petrol",
    transmission: "7-Speed Steptronic Dual-Clutch",
    gearboxCategory: "AUTO",
    gearboxFamily: "7-Speed Steptronic Dual-Clutch",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZLN18PQR**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "AK69WXY": {
    registration: "AK69 WXY",
    make: "VOLVO",
    model: "XC60 (2.0 D4 AWD Momentum)",
    derivative: "XC60 (2.0 D4 AWD Momentum) (2.0L Diesel (190 bhp))",
    year: 2019,
    firstRegistered: "March 2019",
    fuelType: "Diesel",
    transmission: "8-Speed Geartronic Automatic",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed Geartronic Automatic",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZAK69WXY**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "KX20TUV": {
    registration: "KX20 TUV",
    make: "KIA",
    model: "Sportage (1.6 CRDi GT-Line S AWD)",
    derivative: "Sportage (1.6 CRDi GT-Line S AWD) (1.6L Diesel (134 bhp))",
    year: 2020,
    firstRegistered: "March 2020",
    fuelType: "Diesel",
    transmission: "7-Speed Dual-Clutch (7-DCT)",
    gearboxCategory: "AUTO",
    gearboxFamily: "7-Speed Dual-Clutch (7-DCT)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZKX20TUV**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "BP68HJK": {
    registration: "BP68 HJK",
    make: "PEUGEOT",
    model: "3008 (1.5 BlueHDi Allure Premium)",
    derivative: "3008 (1.5 BlueHDi Allure Premium) (1.5L Diesel (130 bhp))",
    year: 2018,
    firstRegistered: "March 2018",
    fuelType: "Diesel",
    transmission: "8-Speed EAT8 Automatic (Aisin)",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed EAT8 Automatic (Aisin)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZBP68HJK**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "HN21MNO": {
    registration: "HN21 MNO",
    make: "TOYOTA",
    model: "C-HR (1.8 Hybrid Design)",
    derivative: "C-HR (1.8 Hybrid Design) (1.8L Petrol Hybrid (122 bhp))",
    year: 2021,
    firstRegistered: "March 2021",
    fuelType: "Petrol",
    transmission: "e-CVT Hybrid Electronic Transmission",
    gearboxCategory: "AUTO",
    gearboxFamily: "e-CVT Hybrid Electronic Transmission",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZHN21MNO**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "WN17QRS": {
    registration: "WN17 QRS",
    make: "SEAT",
    model: "Leon (2.0 TDI FR Technology)",
    derivative: "Leon (2.0 TDI FR Technology) (2.0L Diesel (150 bhp))",
    year: 2017,
    firstRegistered: "March 2017",
    fuelType: "Diesel",
    transmission: "6-Speed DSG Dual-Clutch (DQ250)",
    gearboxCategory: "DSG",
    gearboxFamily: "6-Speed DSG Dual-Clutch (DQ250)",
    gearboxCode: "DSG-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZWN17QRS**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "YF70TUV": {
    registration: "YF70 TUV",
    make: "SKODA",
    model: "Octavia (2.0 TDI SE L DSG)",
    derivative: "Octavia (2.0 TDI SE L DSG) (2.0L Diesel (150 bhp))",
    year: 2020,
    firstRegistered: "March 2020",
    fuelType: "Diesel",
    transmission: "7-Speed DSG Dual-Clutch (DQ381)",
    gearboxCategory: "DSG",
    gearboxFamily: "7-Speed DSG Dual-Clutch (DQ381)",
    gearboxCode: "DSG-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZYF70TUV**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "BJ15JJV": {
    registration: "BJ15 JJV",
    make: "BMW",
    model: "3 Series (320d M Sport / SE)",
    derivative: "3 Series (320d M Sport / SE) (2.0L Diesel (1995cc))",
    year: 2015,
    firstRegistered: "March 2015",
    fuelType: "Diesel",
    transmission: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZBJ15JJV**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "PJ65SYE": {
    registration: "PJ65 SYE",
    make: "BMW",
    model: "X6 (xDrive30d / xDrive40d M Sport)",
    derivative: "X6 (xDrive30d / xDrive40d M Sport) (3.0L TwinPower Diesel (2993cc, 258 bhp))",
    year: 2015,
    firstRegistered: "March 2015",
    fuelType: "Diesel",
    transmission: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZPJ65SYE**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "CK64WWG": {
    registration: "CK64 WWG",
    make: "BMW",
    model: "X6 (xDrive30d / xDrive40d M Sport)",
    derivative: "X6 (xDrive30d / xDrive40d M Sport) (3.0L Twin-Turbo Diesel (2993cc, 313 bhp))",
    year: 2014,
    firstRegistered: "March 2014",
    fuelType: "Diesel",
    transmission: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZCK64WWG**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "BL22XMW": {
    registration: "BL22 XMW",
    make: "CUPRA",
    model: "Born (V2 58kWh EV)",
    derivative: "Born (V2 58kWh EV) (Electric 58kWh (204 bhp))",
    year: 2022,
    firstRegistered: "March 2022",
    fuelType: "Petrol",
    transmission: "Electric Drive Unit (Single-Speed)",
    gearboxCategory: "AUTO",
    gearboxFamily: "Electric Drive Unit (Single-Speed)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZBL22XMW**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "MM17ETZ": {
    registration: "MM17 ETZ",
    make: "BMW",
    model: "X6 (xDrive30d / xDrive40d M Sport)",
    derivative: "X6 (xDrive30d / xDrive40d M Sport) (3.0L TwinPower Diesel (2993cc, 258 bhp))",
    year: 2017,
    firstRegistered: "March 2017",
    fuelType: "Diesel",
    transmission: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed Steptronic Automatic (ZF 8HP)",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZMM17ETZ**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "FH17TXF": {
    registration: "FH17 TXF",
    make: "MERCEDES-BENZ",
    model: "A-Class (A180d AMG Line / Sport)",
    derivative: "A-Class (A180d AMG Line / Sport) (1.5L Diesel (1461cc, 109 bhp))",
    year: 2017,
    firstRegistered: "March 2017",
    fuelType: "Diesel",
    transmission: "7G-DCT 7-Speed Dual-Clutch Automatic",
    gearboxCategory: "AUTO",
    gearboxFamily: "7G-DCT 7-Speed Dual-Clutch Automatic",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZFH17TXF**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "FH67TXF": {
    registration: "FH67 TXF",
    make: "MERCEDES-BENZ",
    model: "A-Class (A180d AMG Line / Sport)",
    derivative: "A-Class (A180d AMG Line / Sport) (1.5L Diesel (1461cc, 109 bhp))",
    year: 2017,
    firstRegistered: "March 2017",
    fuelType: "Diesel",
    transmission: "7G-DCT 7-Speed Dual-Clutch Automatic",
    gearboxCategory: "AUTO",
    gearboxFamily: "7G-DCT 7-Speed Dual-Clutch Automatic",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZFH67TXF**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "AB12CDE": {
    registration: "AB12 CDE",
    make: "BMW",
    model: "3 Series (320d EfficientDynamics)",
    derivative: "3 Series (320d EfficientDynamics) (2.0L Diesel (163 bhp))",
    year: 2012,
    firstRegistered: "March 2012",
    fuelType: "Diesel",
    transmission: "8-Speed Steptronic Automatic",
    gearboxCategory: "AUTO",
    gearboxFamily: "8-Speed Steptronic Automatic",
    gearboxCode: "AUTO-SPEC",
    engineCapacity: 1998,
    powerBhp: 150,
    colour: "Black",
    bodyType: "Hatchback / Saloon / SUV",
    euroStatus: "Euro 6",
    ulezCompliant: true,
    vinMasked: "WAUZZZAB12CDE**9182",
    currentMileage: 58900,
    motExpiryDate: "2026-11-20",
    motStatus: "VALID",
    motDaysRemaining: 80,
    knownIssues: [
      {
        title: "Transmission Inspection & Fluid Quality",
        risk: "LOW",
        description: "Regular scheduled inspection recommended for optimum hydraulic line pressure.",
        affectedComponents: ["Hydraulic Fluid", "Filter"],
        recommendedAction: "Inspect fluid levels and clutch adaptations."
      }
    ],
    motHistory: [
      {
        testDate: "15 November 2025",
        testNumber: "847291039482",
        result: "PASSED",
        odometer: "58,900 miles",
        odometerRaw: 58900,
        expiryDate: "20 November 2026",
        rfrAndComments: []
      }
    ]
  },
  "EA18XRO": {
    registration: "EA18 XRO",
    make: "FORD",
    model: "FOCUS",
    derivative: "1.0 EcoBoost 125 Titanium (6-Speed Manual)",
    year: 2018,
    firstRegistered: "March 2018",
    fuelType: "Petrol",
    transmission: "Ford 6-Speed Synchromesh Manual",
    gearboxCategory: "MANUAL",
    gearboxFamily: "Ford B6 6-Speed Manual",
    gearboxCode: "B6-6MT",
    engineCapacity: 999,
    powerBhp: 125,
    colour: "Shadow Black",
    bodyType: "5 Door Hatchback",
    euroStatus: "Euro 6b",
    ulezCompliant: true,
    vinMasked: "WF06XXGCC6**4821",
    currentMileage: 54320,
    motExpiryDate: "2027-03-24",
    motStatus: "VALID",
    motDaysRemaining: 218,
    knownIssues: [
      {
        title: "1.0 EcoBoost Wet Timing Belt Degradation",
        risk: "HIGH",
        description: "Oil-immersed timing belt sheds rubber particles, clogging oil pump strainer and degrading engine vacuum assist.",
        affectedComponents: ["Timing Belt", "Oil Pickup Strainer", "Vacuum Pump"],
        recommendedAction: "Inspect oil filler cap for rubber belt debris; verify WSS-M2C948-B oil history."
      },
      {
        title: "Concentric Slave Cylinder (CSC) Internal Hydraulic Seal Failure",
        risk: "HIGH",
        description: "Plastic CSC housing cracks or internal seal weeps brake fluid into bellhousing, causing low clutch pedal bite and difficulty engaging 1st/Reverse.",
        affectedComponents: ["Concentric Slave Cylinder", "Clutch Friction Plate", "Dual-Mass Flywheel"],
        recommendedAction: "Replace CSC with revised aluminium unit and install new 3-piece clutch kit."
      }
    ],
    motHistory: [
      {
        testDate: "24 March 2026",
        testNumber: "748392019482",
        result: "PASSED",
        odometer: "54,320 miles",
        odometerRaw: 54320,
        expiryDate: "24 March 2027",
        rfrAndComments: [
          { type: "ADVISORY", text: "Front Brake pad(s) wearing thin (1.1.13 (a) (ii))" }
        ]
      }
    ]
  },

  "WP15XOL": {
    registration: "WP15 XOL",
    make: "NISSAN",
    model: "QASHQAI",
    derivative: "1.6 dCi Tekna (Jatco Xtronic CVT)",
    year: 2015,
    firstRegistered: "June 2015",
    fuelType: "Diesel",
    transmission: "Jatco Xtronic Continuously Variable Transmission (CVT)",
    gearboxCategory: "CVT",
    gearboxFamily: "Jatco JF016E / Xtronic CVT",
    gearboxCode: "JF016E",
    engineCapacity: 1598,
    powerBhp: 130,
    colour: "Blade Silver",
    bodyType: "Crossover SUV",
    euroStatus: "Euro 6b",
    ulezCompliant: true,
    vinMasked: "SJNFAAJ11U1**9142",
    currentMileage: 76400,
    motExpiryDate: "2027-07-14",
    motStatus: "VALID",
    motDaysRemaining: 330,
    knownIssues: [
      {
        title: "CVT Hydraulic Flow Control Valve Bore Wear",
        risk: "HIGH",
        description: "Steel flow control valve scores the soft aluminium bore in the high-pressure hydraulic pump, causing loss of clamping pressure on conical pulleys and belt slip at 50-70 MPH.",
        affectedComponents: ["CVT High-Pressure Oil Pump", "Flow Control Valve", "Steel Variator Belt"],
        recommendedAction: "Install Sonnax hardened oversized flow control valve and flush with genuine Nissan NS-3 fluid."
      },
      {
        title: "Primary Pulley Bearing Whine",
        risk: "HIGH",
        description: "Ball bearing race supporting input variator pulley spalls under load, emitting a high-frequency whine proportional to vehicle speed.",
        affectedComponents: ["Primary Pulley Bearing", "Secondary Pulley Bearing", "Variator Sheaves"],
        recommendedAction: "Rebuild transmission with heavy-duty bearing set and inspect pulley conical faces for micro-grooving."
      }
    ],
    motHistory: [
      {
        testDate: "15 July 2026",
        testNumber: "629104829104",
        result: "PASSED",
        odometer: "76,400 miles",
        odometerRaw: 76400,
        expiryDate: "14 July 2027",
        rfrAndComments: []
      }
    ]
  },

  "VO68HNJ": {
    registration: "VO68 HNJ",
    make: "AUDI",
    model: "A3",
    derivative: "35 TFSI S line (7-Speed S-Tronic Dual-Clutch)",
    year: 2018,
    firstRegistered: "October 2018",
    fuelType: "Petrol",
    transmission: "Audi S-Tronic 7-Speed Dual-Clutch (DQ200)",
    gearboxCategory: "DSG",
    gearboxFamily: "Audi S-Tronic DQ200 7-Speed",
    gearboxCode: "DQ200-7F",
    engineCapacity: 1498,
    powerBhp: 150,
    colour: "Daytona Grey",
    bodyType: "5 Door Sportback",
    euroStatus: "Euro 6d-TEMP",
    ulezCompliant: true,
    vinMasked: "WAUZZZ8V7KA**2819",
    currentMileage: 41200,
    motExpiryDate: "2026-10-20",
    motStatus: "VALID",
    motDaysRemaining: 63,
    knownIssues: [
      {
        title: "DQ200 Mechatronic Hydraulic Pressure Accumulator Blow-Out (P17BF)",
        risk: "HIGH",
        description: "Aluminium housing threads fail under 60 bar accumulator pressure, creating continuous pump motor running and loss of Drive/Reverse gears.",
        affectedComponents: ["Mechatronic Valve Body", "Hydraulic Pressure Accumulator", "Pump Motor"],
        recommendedAction: "Install reinforced steel accumulator repair sleeve kit and renew mechatronic hydraulic oil."
      },
      {
        title: "Dry Dual-Clutch K1/K2 Pack Glazing & Judder",
        risk: "HIGH",
        description: "Dry organic friction discs overheat in stop-start traffic, resulting in low-speed takeoff shudder in 1st and 2nd gear.",
        affectedComponents: ["Dual Clutch Pack K1/K2", "Engagement Forks", "Clutch Release Bearings"],
        recommendedAction: "Replace dual-clutch pack with Luk RepSet 2CT kit and shim to exact manufacturer tolerances."
      }
    ],
    motHistory: [
      {
        testDate: "21 October 2025",
        testNumber: "738291049281",
        result: "PASSED",
        odometer: "41,200 miles",
        odometerRaw: 41200,
        expiryDate: "20 October 2026",
        rfrAndComments: []
      }
    ]
  },

  "HN21PTL": {
    registration: "HN21 PTL",
    make: "TOYOTA",
    model: "COROLLA",
    derivative: "1.8 VVT-i Hybrid Design (e-CVT Planetary Transaxle)",
    year: 2021,
    firstRegistered: "June 2021",
    fuelType: "Hybrid",
    transmission: "Toyota Hybrid e-CVT Planetary Power Split Device",
    gearboxCategory: "CVT",
    gearboxFamily: "Toyota e-CVT Transaxle (P710)",
    gearboxCode: "P710-eCVT",
    engineCapacity: 1798,
    powerBhp: 122,
    colour: "Pure White",
    bodyType: "5 Door Hatchback",
    euroStatus: "Euro 6d",
    ulezCompliant: true,
    vinMasked: "SB1ZE3BE10E**3819",
    currentMileage: 32100,
    motExpiryDate: "2027-06-18",
    motStatus: "VALID",
    motDaysRemaining: 304,
    knownIssues: [
      {
        title: "Transaxle Damper Spring Rattle on Cold Engine Transition",
        risk: "LOW",
        description: "Torsional damper springs inside the transaxle input damper can rattle during cold morning ICE engine startup transition.",
        affectedComponents: ["Hybrid Input Damper Plate", "Transaxle Fluid WS"],
        recommendedAction: "Inspect damper spring free play; renew Toyota Genuine ATF WS transaxle fluid."
      },
      {
        title: "Hybrid Inverter Cooling Flow Restriction",
        risk: "MEDIUM",
        description: "Debris blocking dedicated inverter radiator causes high-voltage thermal throttling during high-demand motorway cruising.",
        affectedComponents: ["Inverter Electric Water Pump", "Hybrid Inverter Radiator"],
        recommendedAction: "Check inverter coolant expansion tank flow for active turbulence with READY on."
      }
    ],
    motHistory: [
      {
        testDate: "19 June 2026",
        testNumber: "849201847291",
        result: "PASSED",
        odometer: "32,100 miles",
        odometerRaw: 32100,
        expiryDate: "18 June 2027",
        rfrAndComments: []
      }
    ]
  }
};

export function getVehicleTransmissionProfile(make, model, yearVal, fuelVal, engineCcVal, rawTrans = '') {
  const makeU = (make || '').toUpperCase();
  const modelU = (model || '').toUpperCase();
  const fuelU = (fuelVal || '').toUpperCase();
  const year = parseInt(yearVal, 10) || 2018;
  const cc = parseInt(engineCcVal, 10) || 0;
  const transU = (rawTrans || '').toUpperCase();

  // Explicit manual check
  if (transU.includes('MANUAL')) {
    const unit = {
      category: 'MANUAL',
      family: `${make || 'Manual'} Synchromesh 5/6-Speed Manual Transmission`,
      code: 'MT-6SPEED'
    };
    return {
      isSingleChoice: true,
      default: unit,
      options: [unit]
    };
  }

  const fullStr = `${makeU} ${modelU} ${fuelU}`;

  // 1. Electric Vehicles (100% Single-Speed Electric Drive Units - Single Choice)
  if (fuelU.includes('ELECTRIC') || /\b(EV|BEV)\b/i.test(fullStr) || ['IONIQ 5', 'IONIQ 6', 'EV6', 'EV9', 'TAYCAN', 'E-TRON', 'ID.3', 'ID.4', 'ID.5', 'ID.7', 'ID.BUZZ', 'LEAF', 'ARIYA', 'ZOE', 'MODEL 3', 'MODEL Y', 'MODEL S', 'MODEL X', 'POLESTAR 2', 'POLESTAR 3', 'POLESTAR 4', 'E-208', 'CORSA-E', 'MOKKA-E', 'MG4', 'MG5', 'ENYAQ', 'BORN'].some(k => modelU.includes(k)) || makeU.includes('TESLA')) {
    const unit = (modelU.includes('TAYCAN') || modelU.includes('E-TRON GT')) ? {
      category: 'EV',
      family: 'Porsche 2-Speed Dual-Ratio Rear Electric Drive Unit',
      code: '2-SPEED-EDU'
    } : {
      category: 'EV',
      family: 'Single-Speed Direct Reduction Electric Drive Unit',
      code: '1-SPEED-EDU'
    };
    return {
      isSingleChoice: true,
      default: unit,
      options: [unit]
    };
  }

  // 2. Dedicated Sports Cars & Roadsters (Manual Transmission OEM Defaults - Single Choice)
  if (['MX-5', 'MX5', 'MIATA', 'S2000', 'TYPE R', 'TYPE-R', 'GT86', 'GR86', 'GR YARIS', 'GR COROLLA', 'BRZ', 'WRX STI', 'ELISE', 'EXIGE', 'CATERHAM', '595', '695'].some(k => modelU.includes(k))) {
    let unit = {
      category: 'MANUAL',
      family: `${make} 6-Speed Performance Manual Transmission`,
      code: 'MT-6SPEED'
    };
    if (makeU.includes('MAZDA') || modelU.includes('MX-5') || modelU.includes('MX5') || modelU.includes('MIATA')) {
      unit = {
        category: 'MANUAL',
        family: 'Mazda 5/6-Speed Short-Throw Manual Transmission',
        code: year >= 2005 ? 'MT-6SPEED' : 'MT-5SPEED'
      };
    } else if (makeU.includes('HONDA')) {
      unit = {
        category: 'MANUAL',
        family: 'Honda 6-Speed Close-Ratio Manual Transmission with LSD',
        code: 'MT-6SPEED'
      };
    } else if (makeU.includes('TOYOTA') || makeU.includes('SUBARU')) {
      unit = {
        category: 'MANUAL',
        family: `${make} 6-Speed Short-Shift Manual Transmission`,
        code: 'MT-6SPEED'
      };
    } else if (makeU.includes('ABARTH')) {
      unit = {
        category: 'MANUAL',
        family: 'Abarth 5-Speed Close-Ratio Manual Transmission',
        code: 'MT-5SPEED'
      };
    }
    return {
      isSingleChoice: true,
      default: unit,
      options: [unit]
    };
  }

  // 3. Toyota & Lexus Hybrids (e-CVT Planetary - Single Choice)
  if ((makeU.includes('TOYOTA') || makeU.includes('LEXUS')) && (fuelU.includes('HYBRID') || ['PRIUS', 'AURIS', 'YARIS', 'COROLLA', 'C-HR', 'RAV4', 'CAMRY', 'HIGHLANDER', 'CT200', 'IS300H', 'NX300', 'NX350', 'RX450', 'ES300', 'UX250', 'LBX', 'LEXUS CT', 'LEXUS IS'].some(k => modelU.includes(k)))) {
    const unit = {
      category: 'CVT',
      family: 'Toyota / Lexus Hybrid Synergy Drive e-CVT Planetary System',
      code: 'e-CVT'
    };
    return {
      isSingleChoice: true,
      default: unit,
      options: [unit]
    };
  }

  // 4. Auto-Only Luxury / Heavy SUV Platforms (Single Choice)
  if (['RANGE ROVER SPORT', 'RANGE ROVER VELAR', 'RANGE ROVER EVOQUE', 'DISCOVERY', 'Q7', 'Q8', 'TOUAREG', 'CAYENNE', 'PANAMERA', 'MACAN', 'S-CLASS', 'GLE', 'GLS', 'G-CLASS', 'CLS', 'X5', 'X6', 'X7', '7 SERIES', '8 SERIES'].some(k => modelU.includes(k))) {
    let unit = {
      category: 'AUTO',
      family: 'ZF 8HP 8-Speed Electronic Automatic Transmission',
      code: 'ZF-8HP'
    };
    if (makeU.includes('LAND ROVER') || makeU.includes('RANGE ROVER') || makeU.includes('JAGUAR')) {
      if (['EVOQUE', 'DISCOVERY SPORT', 'E-PACE'].some(m => modelU.includes(m))) {
        unit = {
          category: 'AUTO',
          family: 'Land Rover / ZF 9HP 9-Speed Transverse Automatic Transmission',
          code: 'ZF-9HP48'
        };
      } else if (year < 2013) {
        unit = {
          category: 'AUTO',
          family: 'Land Rover ZF 6HP 6-Speed Electronic Automatic Transmission (ZF 6HP26)',
          code: 'ZF-6HP26'
        };
      } else {
        unit = {
          category: 'AUTO',
          family: 'Jaguar Land Rover ZF 8HP 8-Speed Electronic Automatic Transmission',
          code: 'ZF-8HP'
        };
      }
    } else if (makeU.includes('MERCEDES')) {
      if (year < 2004) {
        unit = {
          category: 'AUTO',
          family: 'Mercedes-Benz 5G-Tronic 5-Speed Automatic Transmission (722.6)',
          code: '722.6-5G'
        };
      } else if (year < 2016) {
        unit = {
          category: 'AUTO',
          family: 'Mercedes-Benz 7G-Tronic Plus 7-Speed Automatic Transmission (722.9)',
          code: '722.9-7G'
        };
      } else {
        unit = {
          category: 'AUTO',
          family: 'Mercedes-Benz 9G-Tronic 9-Speed Automatic Transmission (725.0)',
          code: '725.0-9G'
        };
      }
    } else if (makeU.includes('BMW')) {
      if (year < 2002) {
        unit = {
          category: 'AUTO',
          family: 'BMW 5-Speed Steptronic Automatic (ZF 5HP / GM 5L40E)',
          code: 'ZF-5HP'
        };
      } else if (year < 2012) {
        unit = {
          category: 'AUTO',
          family: 'BMW ZF 6HP 6-Speed Steptronic Automatic (ZF 6HP19/26)',
          code: 'ZF-6HP'
        };
      } else {
        unit = {
          category: 'AUTO',
          family: 'BMW ZF 8HP 8-Speed Steptronic Automatic Transmission',
          code: 'ZF-8HP'
        };
      }
    } else if (makeU.includes('PORSCHE')) {
      unit = {
        category: 'AUTO',
        family: 'Porsche Tiptronic / PDK Electronic Transmission',
        code: 'ZF-8HP'
      };
    }
    return {
      isSingleChoice: true,
      default: unit,
      options: [unit]
    };
  }

  // 5. Dual Variant Models (Manual vs Specific OEM Automatic / DSG)
  let autoCat = 'AUTO';
  let autoName = `${make} Electronic Automatic Transmission`;
  let autoCode = 'AUTO-OEM';
  let manualName = `${make} 5/6-Speed Manual Transmission`;

  // --- HYUNDAI & KIA ---
  if (makeU.includes('HYUNDAI') || makeU.includes('KIA')) {
    if (year < 2011) {
      autoCat = 'AUTO';
      autoName = `${make} 4-Speed Torque Converter Automatic (A4AF / A4BF / F4A42)`;
      autoCode = 'A4AF-4SPEED';
      manualName = `${make} 5-Speed Manual Transmission (M5BF / M5CF)`;
    } else if (year < 2015) {
      autoCat = 'AUTO';
      autoName = `${make} 6-Speed Torque Converter Automatic (A6GF1 / A6MF1)`;
      autoCode = 'A6GF1-6SPEED';
      manualName = `${make} 6-Speed Manual Transmission (M6CF1)`;
    } else {
      if (cc <= 1700 || ['I30', 'CEED', 'TUCSON', 'SPORTAGE', 'KONA', 'NIRO', 'XCEED', 'RIO', 'PROCEED', 'I20'].some(m => modelU.includes(m))) {
        autoCat = 'DSG';
        autoName = 'Hyundai-Kia 7-Speed Dual-Clutch Transmission (7DCT - D7UF1 / D7GF1)';
        autoCode = '7DCT-D7UF1';
        manualName = `${make} 6-Speed Manual Transmission`;
      } else {
        autoCat = 'AUTO';
        autoName = 'Hyundai-Kia 8-Speed Torque Converter Automatic (A8F36)';
        autoCode = 'A8F36-AUTO';
        manualName = `${make} 6-Speed Manual Transmission`;
      }
    }
  }

  // --- VOLKSWAGEN, AUDI, SEAT, SKODA (VAG) ---
  else if (['VOLKSWAGEN', 'AUDI', 'SEAT', 'SKODA', 'ŠKODA', 'CUPRA', 'VW'].some(m => makeU.includes(m))) {
    if (year < 2004) {
      autoCat = 'AUTO';
      autoName = 'VAG 4/5-Speed Torque Converter Automatic (01M / 01V Tiptronic)';
      autoCode = '01M-01V';
      manualName = `${make} 5-Speed Manual Transmission (02J)`;
    } else if (['A4', 'A5', 'A6', 'A7', 'Q5'].some(m => modelU.includes(m))) {
      if (year < 2015) {
        autoCat = 'CVT';
        autoName = 'Audi Multitronic Continuously Variable Transmission (CVT - 01J / 0AW)';
        autoCode = '01J-MULTITRONIC';
        manualName = 'Audi 6-Speed Manual Transmission';
      } else {
        autoCat = 'DSG';
        autoName = 'Audi S-Tronic 7-Speed Wet Dual-Clutch (DL382 / DL501 / 0CK)';
        autoCode = 'DL382-7SPEED';
        manualName = 'Audi 6-Speed Manual Transmission';
      }
    } else if (cc <= 1600 || ['GOLF', 'POLO', 'A1', 'A3', 'LEON', 'IBIZA', 'OCTAVIA', 'FABIA'].some(m => modelU.includes(m))) {
      if (year < 2008) {
        autoCat = 'DSG';
        autoName = 'VAG DSG 6-Speed Wet Dual-Clutch (DQ250 / 02E)';
        autoCode = 'DQ250-6SPEED';
        manualName = `${make} 5/6-Speed Manual Transmission`;
      } else {
        autoCat = 'DSG';
        autoName = 'VAG DSG / S-Tronic 7-Speed Dry Dual-Clutch (DQ200 / 0AM / 0CW)';
        autoCode = 'DQ200-7SPEED';
        manualName = `${make} 5/6-Speed Manual Transmission (MQ250/MQ281)`;
      }
    } else {
      autoCat = 'DSG';
      autoName = 'VAG DSG 6/7-Speed Wet Dual-Clutch (DQ250 / DQ381)';
      autoCode = 'DQ-DSG';
      manualName = `${make} 6-Speed Manual Transmission`;
    }
  }

  // --- MERCEDES-BENZ ---
  else if (makeU.includes('MERCEDES')) {
    const isTransverseMb = /\b(A|B)[\s\-]Class\b|\b(A|B)\d{3}\b|\b(CLA|GLA|GLB)\b/i.test(modelU) || ['A-CLASS', 'B-CLASS', 'A180', 'A200', 'A220', 'A250', 'CLA', 'GLA', 'GLB'].some(k => modelU.includes(k));
    if (isTransverseMb) {
      if (year < 2012) {
        autoCat = 'CVT';
        autoName = 'Mercedes-Benz Autotronic Continuously Variable Transmission (CVT - 722.8)';
        autoCode = '722.8-CVT';
        manualName = 'Mercedes-Benz 5/6-Speed Manual Transmission';
      } else if (year >= 2018 && ['A200', 'A220', 'A250', 'GLB', 'GLA', 'CLA'].some(m => modelU.includes(m))) {
        autoCat = 'DSG';
        autoName = 'Mercedes-Benz 7G-DCT / 8G-DCT Dual-Clutch Transmission (724.0 / 724.1)';
        autoCode = '724.0 / 724.1';
        manualName = 'Mercedes-Benz 6-Speed Manual Transmission';
      } else {
        autoCat = 'DSG';
        autoName = 'Mercedes-Benz 7G-DCT 7-Speed Dual-Clutch Transmission (724.0)';
        autoCode = '724.0-7GDCT';
        manualName = 'Mercedes-Benz 6-Speed Manual Transmission';
      }
    } else {
      if (year < 2004) {
        autoCat = 'AUTO';
        autoName = 'Mercedes-Benz 5G-Tronic 5-Speed Automatic Transmission (722.6)';
        autoCode = '722.6-5G';
        manualName = 'Mercedes-Benz 6-Speed Manual Transmission';
      } else if (year < 2016) {
        autoCat = 'AUTO';
        autoName = 'Mercedes-Benz 7G-Tronic Plus 7-Speed Automatic Transmission (722.9)';
        autoCode = '722.9-7G';
        manualName = 'Mercedes-Benz 6-Speed Manual Transmission';
      } else {
        autoCat = 'AUTO';
        autoName = 'Mercedes-Benz 9G-Tronic 9-Speed Automatic Transmission (725.0)';
        autoCode = '725.0-9G';
        manualName = 'Mercedes-Benz 6-Speed Manual Transmission';
      }
    }
  }

  // --- BMW & MINI ---
  else if (makeU.includes('BMW') || makeU.includes('MINI')) {
    if (makeU.includes('MINI')) {
      if (year < 2007) {
        autoCat = 'CVT';
        autoName = 'MINI ZF VT1F Continuously Variable Transmission (CVT)';
        autoCode = 'VT1F-CVT';
        manualName = 'MINI 5/6-Speed Manual Transmission (Midland / Getrag)';
      } else if (year < 2018) {
        autoCat = 'AUTO';
        autoName = 'MINI Aisin 6-Speed Steptronic Automatic Transmission (TF-60SN)';
        autoCode = 'TF-60SN';
        manualName = 'MINI 6-Speed Manual Transmission';
      } else {
        autoCat = 'DSG';
        autoName = 'MINI Steptronic 7-Speed Dual-Clutch / Aisin 8-Speed Automatic';
        autoCode = '7DCT300';
        manualName = 'MINI 6-Speed Manual Transmission';
      }
    } else {
      const isUkl = (/\b1[\s\-]Series\b|\b116|\b118|\b120/i.test(modelU) && year >= 2019) || ['ACTIVE TOURER', 'GRAN TOURER', 'X1', 'X2'].some(k => modelU.includes(k)) && year >= 2015;
      if (isUkl) {
        autoCat = 'DSG';
        autoName = 'BMW Steptronic 7-Speed Dual-Clutch (7DCT300) / Aisin 8-Speed';
        autoCode = '7DCT300';
        manualName = 'BMW 6-Speed Manual Transmission';
      } else if (year < 2002) {
        autoCat = 'AUTO';
        autoName = 'BMW 5-Speed Steptronic Automatic (ZF 5HP / GM 5L40E)';
        autoCode = 'ZF-5HP';
        manualName = 'BMW 5-Speed Manual Transmission';
      } else if (year < 2012) {
        autoCat = 'AUTO';
        autoName = 'BMW ZF 6HP 6-Speed Steptronic Automatic (ZF 6HP19/26)';
        autoCode = 'ZF-6HP';
        manualName = 'BMW 6-Speed Manual Transmission';
      } else {
        autoCat = 'AUTO';
        autoName = 'BMW ZF 8HP 8-Speed Steptronic Automatic (ZF 8HP45/50/70)';
        autoCode = 'ZF-8HP';
        manualName = 'BMW 6-Speed Manual Transmission';
      }
    }
  }

  // --- FORD ---
  else if (makeU.includes('FORD')) {
    if (year < 2008) {
      autoCat = 'AUTO';
      autoName = 'Ford 4-Speed Electronic Automatic Transmission (4F27E / CD4E)';
      autoCode = '4F27E-4SPEED';
      manualName = 'Ford 5-Speed Manual Transmission (IB5 / MTX-75)';
    } else if (year >= 2018 && ['FOCUS', 'KUGA'].some(k => modelU.includes(k))) {
      autoCat = 'AUTO';
      autoName = 'Ford 8-Speed Torque Converter Automatic Transmission (8F35 / 8F40)';
      autoCode = '8F35-AUTO';
      manualName = 'Ford 6-Speed Manual Transmission';
    } else {
      autoCat = 'DSG';
      autoName = 'Ford PowerShift 6-Speed Dual-Clutch (6DCT250 / 6DCT450)';
      autoCode = '6DCT450';
      manualName = 'Ford 5/6-Speed Manual Transmission (MMT6 / B6)';
    }
  }

  // --- NISSAN ---
  else if (makeU.includes('NISSAN')) {
    if (year < 2007) {
      autoCat = 'AUTO';
      autoName = 'Nissan 4-Speed Electronic Automatic (RE4F03B)';
      autoCode = 'RE4F03B';
      manualName = 'Nissan 5-Speed Manual Transmission';
    } else if (cc === 1332 || (year >= 2019 && modelU.includes('1.3'))) {
      autoCat = 'DSG';
      autoName = 'Nissan 7-Speed Dual-Clutch Transmission (7DCT300)';
      autoCode = '7DCT300';
      manualName = 'Nissan 6-Speed Manual Transmission';
    } else {
      autoCat = 'CVT';
      autoName = 'Nissan Jatco Xtronic Continuously Variable Transmission (CVT - JF015E / JF016E)';
      autoCode = 'JF015E';
      manualName = 'Nissan 5/6-Speed Manual Transmission';
    }
  }

  // --- RENAULT & DACIA ---
  else if (makeU.includes('RENAULT') || makeU.includes('DACIA')) {
    if (year < 2010) {
      autoCat = 'AUTO';
      autoName = 'Renault Proactive 4-Speed Automatic (DP0 / AL4)';
      autoCode = 'DP0-4SPEED';
      manualName = 'Renault 5-Speed Manual Transmission';
    } else {
      autoCat = 'DSG';
      autoName = 'Renault EDC 6/7-Speed Dual-Clutch Transmission (6DCT250 / 7DCT300)';
      autoCode = '6DCT250';
      manualName = 'Renault 5/6-Speed Manual Transmission';
    }
  }

  // --- STELLANTIS (PEUGEOT, CITROEN, VAUXHALL, OPEL, DS) ---
  else if (['PEUGEOT', 'CITROEN', 'CITROËN', 'VAUXHALL', 'OPEL', 'DS'].some(m => makeU.includes(m))) {
    if (year < 2008) {
      autoCat = 'AUTO';
      autoName = `${make} 4-Speed Automatic (AL4 / AF13 / AF17)`;
      autoCode = 'AL4-AF17';
      manualName = `${make} 5-Speed Manual Transmission (F17 / MA5)`;
    } else if (year < 2018) {
      autoCat = 'AUTO';
      autoName = 'Aisin EAT6 / AF40 6-Speed Automatic Transmission (TF-80SC / AT6)';
      autoCode = 'EAT6-TF80SC';
      manualName = `${make} 5/6-Speed Manual Transmission (M32 / BVM6)`;
    } else {
      autoCat = 'AUTO';
      autoName = 'Aisin EAT8 8-Speed Automatic Transmission (AW-1 / AWF8F35)';
      autoCode = 'EAT8-AW';
      manualName = `${make} 6-Speed Manual Transmission`;
    }
  }

  // --- MAZDA ---
  else if (makeU.includes('MAZDA')) {
    if (year < 2012) {
      autoCat = 'AUTO';
      autoName = 'Mazda 4/5-Speed Activematic Automatic (4F27E / FS5A-EL)';
      autoCode = '4F27E / FS5A';
      manualName = 'Mazda 5-Speed Manual Transmission';
    } else {
      autoCat = 'AUTO';
      autoName = 'Mazda SkyActiv-Drive 6-Speed Electronic Automatic (FW6A-EL / GW6A-EL)';
      autoCode = 'FW6A-EL';
      manualName = 'Mazda SkyActiv-MT 6-Speed Manual Transmission';
    }
  }

  // --- HONDA ---
  else if (makeU.includes('HONDA')) {
    if (year < 2015) {
      autoCat = 'AUTO';
      autoName = 'Honda 5-Speed Electronic Automatic Transmission';
      autoCode = 'HONDA-5AT';
      manualName = 'Honda 5/6-Speed Manual Transmission';
    } else if (fuelU.includes('HYBRID') || ['E:HEV', 'I-MMD', 'CR-Z', 'INSIGHT', 'JAZZ'].some(m => modelU.includes(m))) {
      autoCat = 'CVT';
      autoName = 'Honda e:HEV Intelligent Multi-Mode Drive e-CVT Transmission';
      autoCode = 'e-CVT';
      manualName = 'Honda 6-Speed Manual Transmission';
    } else {
      autoCat = 'CVT';
      autoName = 'Honda Earth Dreams Continuously Variable Transmission (CVT)';
      autoCode = 'CVT-HONDA';
      manualName = 'Honda 6-Speed Manual Transmission';
    }
  }

  const manualOpt = { category: 'MANUAL', family: manualName, code: manualName.includes('6') ? 'MT-6SPEED' : 'MT-5SPEED' };
  const autoOpt = { category: autoCat, family: autoName, code: autoCode };

  return {
    isSingleChoice: false,
    default: manualOpt,
    options: [manualOpt, autoOpt]
  };
}

export function detectAccurateGearbox(make, model, yearVal, fuelVal, engineCcVal, rawTrans = '') {
  const profile = getVehicleTransmissionProfile(make, model, yearVal, fuelVal, engineCcVal, rawTrans);
  return profile.default;
}

/**
 * Resolve genuine vehicle record from database or live DVSA data
 */
export function generateSyntheticVehicle(reg, dvsaData = null) {
  const cleanReg = (reg || '').toUpperCase().replace(/\s+/g, '');
  
  // 1. Curated / Local verified database
  if (VEHICLE_DATABASE[cleanReg]) {
    const found = { ...VEHICLE_DATABASE[cleanReg] };
    if (dvsaData) {
      if (dvsaData.motExpiryDate) found.motExpiryDate = dvsaData.motExpiryDate;
      if (dvsaData.motDaysRemaining !== undefined) found.motDaysRemaining = dvsaData.motDaysRemaining;
      if (dvsaData.motHistory && dvsaData.motHistory.length > 0) found.motHistory = dvsaData.motHistory;
      if (dvsaData.recentAdvisories) found.recentAdvisories = dvsaData.recentAdvisories;
      if (dvsaData.mileage) found.currentMileage = dvsaData.mileage;
      if (dvsaData.fuel || dvsaData.fuelType) found.fuelType = dvsaData.fuel || dvsaData.fuelType;
      if (dvsaData.colour) found.colour = dvsaData.colour;
    }
    return found;
  }

  // 2. Genuine Live DVSA / DVLA MOT Response
  if (dvsaData && dvsaData.make && dvsaData.found !== false && dvsaData.isVerified !== false && dvsaData.make !== 'UK Registered') {
    const make = dvsaData.make.toUpperCase();
    const model = (dvsaData.model || '').replace(/-{2,}/g, '-').trim();
    const year = dvsaData.year ? parseInt(dvsaData.year, 10) : 2020;
    const fuelType = dvsaData.fuel || dvsaData.fuelType || (model.toUpperCase().includes('DIESEL') ? 'Diesel' : 'Petrol');
    const engine = dvsaData.engine || '';
    const colour = dvsaData.colour || 'Confirmed Spec';

    // Accurate gearbox mapping & transmission profile
    const profile = dvsaData.transmissionProfile ? dvsaData.transmissionProfile : getVehicleTransmissionProfile(make, model, year, fuelType, dvsaData.engineCc || '', dvsaData.transmission || '');
    const defaultUnit = (profile.default || (profile.options && profile.options[0])) || { category: 'MANUAL', family: `${make} 5/6-Speed Manual Transmission`, code: 'MT-6SPEED' };

    const gearboxCategory = dvsaData.gearboxCategory || defaultUnit.category;
    const cleanTrans = gearboxCategory === 'MANUAL' ? 'Manual' : (gearboxCategory === 'DSG' ? 'Semi-Automatic' : 'Automatic');
    const gearboxFamily = cleanTrans;
    const gearboxCode = gearboxCategory === 'MANUAL' ? 'MANUAL' : (gearboxCategory === 'DSG' ? 'SEMI-AUTO' : 'AUTOMATIC');
    const baseModel = model.split('(')[0].trim() || make;
    let specName = dvsaData.spec || dvsaData.variant || (model.includes('(') ? model.split('(')[1].replace(')', '').trim() : (engine || fuelType));
    specName = (specName || 'Standard').replace(/\b([A-Za-z]+)\s+\1\b/gi, '$1').trim();

    return {
      registration: cleanReg.length > 4 ? `${cleanReg.slice(0, 4)} ${cleanReg.slice(4)}` : cleanReg,
      make: make,
      model: model || make,
      baseModel: baseModel,
      spec: specName,
      variant: specName,
      derivative: specName,
      year: year,
      firstRegistered: `${year}`,
      fuelType: fuelType,
      fuel: fuelType,
      engine: engine || `${year} Spec`,
      engineCapacity: dvsaData.engineCapacity || (dvsaData.engineCc ? parseInt(dvsaData.engineCc, 10) : null),
      transmission: cleanTrans,
      gearbox: cleanTrans,
      gearboxCategory: gearboxCategory,
      gearboxFamily: cleanTrans,
      gearboxCode: gearboxCode,
      transmissionProfile: profile,
      colour: colour,
      bodyType: "Confirmed Vehicle Spec",
      euroStatus: "Euro 6",
      ulezCompliant: true,
      vinMasked: `WF0***${cleanReg.slice(-4)}`,
      currentMileage: dvsaData.mileage || "Verified via MOT",
      motExpiryDate: dvsaData.motExpiryDate || "Valid",
      motStatus: dvsaData.motStatus || "Valid",
      motDaysRemaining: dvsaData.motDaysRemaining !== undefined ? dvsaData.motDaysRemaining : 240,
      knownIssues: [
        {
          title: `${cleanTrans} Transmission Inspection & Fluid Quality`,
          risk: "MEDIUM",
          description: `Transmission fluid requires scheduled hydraulic renewal every 40,000–60,000 miles to prevent valve body varnish and clutch pack wear.`,
          affectedComponents: ["Transmission Fluid", "Solenoid Valve Body", "Hydraulic Sump Filter"],
          recommendedAction: `Inspect fluid level and clarity; verify service history.`
        }
      ],
      motHistory: dvsaData.motHistory || []
    };
  }

  // 3. Not Found - Do not fabricate incorrect vehicles
  return null;
}
