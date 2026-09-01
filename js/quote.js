/**
 * GEARBOX GIANTS - ADVANCED DVLA VEHICLE LOOKUP & QUOTE ENGINE
 * Supports ALL 39 Automotive Manufacturers, 400+ Models, Live API Proxy & Custom Overrides
 */

(function () {
  'use strict';

  // ==========================================================================
  // 1. COMPREHENSIVE CAR DATABASE (ALL UK MAKES & MODELS)
  // ==========================================================================
  const CAR_DATABASE = {
    'Audi': {
      models: ['A1', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'Q2', 'Q3', 'Q4 e-tron', 'Q5', 'Q7', 'Q8', 'TT', 'R8', 'RS3', 'RS4', 'RS5', 'RS6', 'S3', 'S4', 'S5', 'S6', 'e-tron', 'Other Audi Model'],
      variants: ['35 TFSI S Line (1.5L Petrol)', '30 TFSI Sport (1.0L Petrol)', '35 TDI S Line (2.0L Diesel)', '40 TDI Quattro (2.0L Diesel)', '45 TFSI Quattro (2.0L Petrol)', '50 TDI V6 Quattro (3.0L Diesel)', 'S3 2.0 TFSI Quattro (310PS)', 'RS3 2.5 TFSI Quattro (400PS)', 'Black Edition 2.0 TDI'],
      transmissions: ['7-Speed S-Tronic Dual-Clutch (DQ381 / DL382)', '8-Speed Tiptronic ZF Automatic', '6-Speed S-Tronic Wet Clutch (DQ250)', '6-Speed Manual Transmission', 'Multitronic Continuously Variable (CVT)']
    },
    'BMW': {
      models: ['1 Series (116d/118i/120d/M135i)', '2 Series (218i/220d/M240i)', '2 Series Active Tourer', '3 Series (320d/330e/335d/M340i)', '4 Series (420d/430i/435d/M440i)', '5 Series (520d/530e/530d/540i)', '6 Series Gran Turismo', '7 Series (730d/745e/750i)', '8 Series Gran Coupe', 'X1 (sDrive18d/xDrive20d)', 'X2 (sDrive18i/xDrive20d)', 'X3 (xDrive20d/xDrive30e/M40i)', 'X4 (xDrive20d/xDrive30d/M40i)', 'X5 (xDrive30d/xDrive45e/M50d)', 'X6 (xDrive30d/xDrive40i/M50i)', 'X7 (xDrive30d/M50d)', 'Z4 (sDrive20i/M40i)', 'M2 Competition', 'M3 Competition', 'M4 Competition', 'M5 Competition', 'i3', 'i4', 'iX', 'iX3', 'Other BMW Model'],
      variants: ['320d M Sport (2.0L Diesel 190PS)', '330e M Sport PHEV (2.0L Petrol Plug-In Hybrid)', '118i M Sport (1.5L Petrol 140PS)', '120d xDrive M Sport (2.0L Diesel)', '520d M Sport Touring (2.0L Diesel 190PS)', '530d xDrive M Sport (3.0L Diesel 265PS)', 'X3 xDrive20d M Sport (2.0L Diesel)', 'X5 xDrive30d M Sport (3.0L Diesel)', 'M340i xDrive (3.0L Turbo 374PS)', 'M135i xDrive (2.0L Turbo 306PS)', '420d M Sport Coupe (2.0L Diesel)'],
      transmissions: ['8-Speed Steptronic Automatic (ZF 8HP)', '6-Speed Steptronic Automatic (ZF 6HP)', '7-Speed Dual-Clutch (Getrag DKG)', '6-Speed Manual Transmission', '8-Speed Sport Steptronic w/ Paddle Shift']
    },
    'Mercedes-Benz': {
      models: ['A-Class (A180/A200/A220d/A250/A35/A45 AMG)', 'B-Class (B180/B200d)', 'C-Class (C200/C220d/C300/C300e/C43/C63 AMG)', 'CLA (CLA180/CLA200/CLA220d/CLA250/CLA45)', 'CLS (CLS300d/CLS400d/CLS53 AMG)', 'E-Class (E220d/E300de/E350d/E400d/E53/E63 AMG)', 'S-Class (S350d/S400d/S500/S580e)', 'GLA (GLA200/GLA220d/GLA250/GLA35)', 'GLB (GLB200/GLB220d/GLB35)', 'GLC (GLC220d/GLC300d/GLC300e/GLC43 AMG)', 'GLE (GLE300d/GLE350de/GLE400d/GLE450/GLE53)', 'GLS (GLS400d/GLS580)', 'G-Class (G400d/G63 AMG)', 'SLC / SLK (SLK200/SLC250d/SLC43)', 'SL (SL400/SL500/SL55 AMG)', 'Vito / V-Class (V220d/V250d/V300d)', 'Sprinter (314/316/319 CDI)', 'EQA', 'EQB', 'EQC', 'EQE', 'EQS', 'AMG GT Coupe / 4-Door', 'Other Mercedes Model'],
      variants: ['A200 AMG Line Executive (1.3L Petrol 163PS)', 'A180 Sport (1.3L Petrol 136PS)', 'A220d AMG Line (2.0L Diesel 190PS)', 'C220d AMG Line Edition (2.0L Diesel 194PS)', 'C200 Sport (1.5L EQ Boost Petrol)', 'E220d AMG Line Night Edition (2.0L Diesel 194PS)', 'CLA200 AMG Line Premium (1.3L Petrol)', 'GLC220d 4MATIC AMG Line (2.0L Diesel)', 'GLE400d 4MATIC AMG Line Premium Plus (3.0L Diesel 330PS)'],
      transmissions: ['9G-Tronic 9-Speed Automatic', '7G-Tronic Plus 7-Speed Automatic', '7G-DCT 7-Speed Dual-Clutch', '8G-DCT 8-Speed Dual-Clutch', '6-Speed Manual Transmission']
    },
    'Volkswagen': {
      models: ['Golf (1.5 TSI / 2.0 TDI / GTI / GTD / GTE / Golf R)', 'Polo (1.0 TSI / 1.2 TSI / GTI)', 'Passat (1.6 TDI / 2.0 TDI / GTE / R-Line)', 'Tiguan (1.5 TSI / 2.0 TDI / 2.0 BiTDI / R)', 'T-Roc (1.0 TSI / 1.5 TSI / 2.0 TSI / R)', 'T-Cross (1.0 TSI / 1.5 TSI)', 'Touareg (3.0 V6 TDI / 3.0 V6 TSI / Black Edition)', 'Arteon (2.0 TDI / 2.0 TSI / R / Shooting Brake)', 'Scirocco (1.4 TSI / 2.0 TSI / 2.0 TDI / R)', 'Touran (1.6 TDI / 2.0 TDI)', 'Sharan (2.0 TDI)', 'Up! (1.0 / GTI)', 'CC (2.0 TDI)', 'Caddy (1.6 TDI / 2.0 TDI)', 'Transporter (T5 / T6 / T6.1 / Caravelle / Kombi)', 'Crafter (2.0 TDI)', 'Amarok (3.0 V6 TDI)', 'ID.3', 'ID.4', 'ID.5', 'ID.Buzz', 'Other Volkswagen Model'],
      variants: ['Golf 1.5 TSI EVO Match (130PS / 150PS Petrol)', 'Golf 2.0 TDI GTD (184PS / 200PS Diesel)', 'Golf GTI 2.0 TSI Performance (245PS Petrol)', 'Golf R 2.0 TSI 4Motion (300PS / 320PS)', 'Polo 1.0 TSI Match (95PS Petrol)', 'Tiguan 2.0 TDI R-Line 4Motion (150PS / 190PS)', 'T-Roc 1.5 TSI EVO Design (150PS)', 'Passat 2.0 TDI R-Line (150PS Diesel)', 'Transporter T6 2.0 TDI Highline (150PS / 204PS)'],
      transmissions: ['7-Speed DSG Dual-Clutch (DQ381)', '7-Speed DSG Dry-Clutch (DQ200)', '6-Speed DSG Wet-Clutch (DQ250)', '7-Speed DSG Heavy-Duty (DQ500)', '6-Speed Manual Transmission', '8-Speed Torque Converter (Touareg/Amarok)']
    },
    'Ford': {
      models: ['Fiesta (1.0 EcoBoost / 1.5 TDCi / ST)', 'Focus (1.0 EcoBoost / 1.5 EcoBlue / 2.0 EcoBlue / ST / RS)', 'Kuga (1.5 EcoBoost / 2.0 TDCi / 2.5 PHEV / ST-Line)', 'Puma (1.0 EcoBoost mHEV / ST)', 'Mondeo (2.0 TDCi / 2.0 EcoBlue / Hybrid / Titanium)', 'EcoSport (1.0 EcoBoost / 1.5 TDCi)', 'Galaxy (2.0 TDCi / 2.0 EcoBlue)', 'S-Max (2.0 TDCi / 2.0 EcoBlue / Titanium)', 'B-Max / C-Max / Grand C-Max', 'Ranger (2.0 EcoBlue BiTurbo / 3.2 TDCi / Raptor / Wildtrak)', 'Transit Custom (2.0 EcoBlue 130/170/185)', 'Transit Van (2.0 EcoBlue / 2.2 TDCi)', 'Transit Connect (1.5 EcoBlue / 1.6 TDCi)', 'Transit Courier', 'Mustang (5.0 V8 GT / 2.3 EcoBoost)', 'Mustang Mach-E', 'Other Ford Model'],
      variants: ['Focus 1.0 EcoBoost Titanium X (125PS Petrol)', 'Focus 2.0 EcoBlue ST-Line (150PS Diesel)', 'Fiesta 1.0 EcoBoost Titanium (100PS Petrol)', 'Fiesta ST-Line Edition 1.0 EcoBoost (125PS)', 'Kuga 2.0 EcoBlue ST-Line X 4WD (190PS)', 'Puma 1.0 EcoBoost mHEV ST-Line X (155PS)', 'Transit Custom 2.0 EcoBlue 300 Limited (130PS / 170PS)', 'Ranger Wildtrak 2.0 EcoBlue Bi-Turbo 4x4 (213PS)'],
      transmissions: ['6-Speed Manual Transmission', '6-Speed Powershift Dual-Clutch (6DCT250/450)', '8-Speed SelectShift Automatic', '10-Speed Automatic (Ranger/Mustang)', 'CVT Hybrid Direct-Drive (Kuga/Mondeo)']
    },
    'Vauxhall': {
      models: ['Corsa (1.2 Turbo / 1.4 / 1.3 CDTi / VXR / SRi / Elite)', 'Astra (1.4 Turbo / 1.6 CDTi / 1.2 Turbo / SRi / Elite Nav)', 'Insignia (2.0 CDTi / 1.6 CDTi / 2.0 Turbo / Grand Sport)', 'Mokka / Mokka-X (1.4 Turbo / 1.6 CDTi / 1.2 Turbo)', 'Grandland / Grandland X (1.2 Turbo / 1.5 Turbo D / Hybrid4)', 'Crossland / Crossland X (1.2 Turbo / 1.5 Turbo D)', 'Zafira Tourer (2.0 CDTi / 1.4 Turbo)', 'Meriva (1.4 Turbo / 1.7 CDTi)', 'Adam (1.2 / 1.4 / S)', 'Viva (1.0)', 'Vivaro (1.6 CDTi BiTurbo / 2.0 Turbo D)', 'Movano (2.3 CDTi / 2.2 Turbo D)', 'Combo Life / Cargo (1.5 Turbo D / 1.6 CDTi)', 'Other Vauxhall Model'],
      variants: ['Corsa 1.2 Turbo SRi Premium (100PS Petrol)', 'Corsa 1.4 Design (75PS / 90PS Petrol)', 'Astra 1.6 CDTi 16V SRi (136PS Whisper Diesel)', 'Astra 1.4T Elite Nav (150PS Petrol)', 'Insignia Grand Sport 2.0 CDTi Tech Line Nav (170PS)', 'Mokka X 1.4T Elite Nav 4x4 (140PS)', 'Grandland X 1.2 Turbo Sport Nav (130PS)', 'Vivaro 2900 1.6 CDTi 125 Sportive L2H1'],
      transmissions: ['6-Speed Manual Transmission (M32 / F40)', '8-Speed EAT8 Automatic', '6-Speed Torque Converter Automatic', '5-Speed Manual (F17)', 'Easytronic Robotized Manual']
    },
    'Nissan': {
      models: ['Qashqai (1.2 DIG-T / 1.3 DIG-T / 1.5 dCi / 1.6 dCi / e-POWER / N-Connecta / Tekna)', 'Juke (1.0 DIG-T / 1.2 DIG-T / 1.5 dCi / 1.6 Hybrid / Tekna)', 'X-Trail (1.6 dCi / 1.7 dCi / 2.0 dCi / 1.3 DIG-T / e-POWER)', 'Micra (0.9 IG-T / 1.0 IG-T / 1.2 / 1.5 dCi)', 'Note (1.2 / 1.5 dCi)', 'Navara (2.3 dCi Twin-Turbo / Tekna / N-Guard)', 'Leaf (40kWh / 62kWh e+)', 'Pulsar (1.2 DIG-T / 1.5 dCi)', '370Z (3.7 V6 Nismo)', 'GT-R (3.8 V6 Twin-Turbo Nismo)', 'Ariya (63kWh / 87kWh)', 'NV200 / NV300 / NV400 / Primastar', 'Other Nissan Model'],
      variants: ['Qashqai 1.3 DIG-T N-Connecta (140PS / 160PS Petrol)', 'Qashqai 1.5 dCi Tekna (115PS Diesel)', 'Qashqai 1.2 DIG-T Acenta Premium (115PS)', 'Juke 1.0 DIG-T Tekna (117PS Petrol)', 'Juke 1.5 dCi Acenta (110PS Diesel)', 'X-Trail 1.6 dCi Tekna 4WD (130PS Diesel)', 'Navara 2.3 dCi 190 TT Tekna 4x4 (190PS Diesel)', 'Micra 1.0 IG-T Acenta (100PS Petrol)'],
      transmissions: ['Xtronic Continuously Variable (CVT)', '7-Speed Dual-Clutch (DCT)', '6-Speed Manual Transmission', '7-Speed Automatic (Navara)', '6-Speed Dual-Clutch GR6 (GT-R)']
    },
    'Toyota': {
      models: ['Yaris (1.5 Hybrid / 1.33 VVT-i / GR Yaris 1.6T)', 'Corolla (1.8 Hybrid / 2.0 Hybrid / Touring Sports)', 'Auris (1.8 Hybrid / 1.2 Turbo / 1.4 D-4D / 1.6 VVT-i)', 'Aygo / Aygo X (1.0 VVT-i)', 'RAV4 (2.5 Hybrid / 2.5 PHEV / 2.0 D-4D / Excel)', 'C-HR (1.8 Hybrid / 2.0 Hybrid / 1.2 Turbo / Design / GR Sport)', 'Prius (1.8 Hybrid / 2.0 PHEV / Prius+)', 'Avensis (1.6 D-4D / 2.0 D-4D / 1.8 VVT-i)', 'Hilux (2.4 D-4D / 2.8 D-4D / Invincible X)', 'Land Cruiser (2.8 D-4D / 3.0 D-4D / Amazon)', 'Supra (3.0 Pro / 2.0 Pro)', 'Proace / Proace City (1.5D / 2.0D)', 'bZ4X (71.4kWh)', 'Verso (1.6 D-4D / 1.8 VVT-i)', 'Other Toyota Model'],
      variants: ['Yaris 1.5 Hybrid Design (116PS Self-Charging Hybrid)', 'Yaris 1.33 VVT-i Icon (99PS Petrol)', 'Corolla 1.8 Hybrid Icon Tech (122PS Hybrid)', 'Auris 1.8 Hybrid Excel (136PS Hybrid)', 'C-HR 1.8 Hybrid Design (122PS Hybrid)', 'RAV4 2.5 Hybrid Dynamic 4WD (222PS Hybrid)', 'Prius 1.8 VVT-i Business Edition (122PS)', 'Hilux Invincible 2.4 D-4D 4WD (150PS Diesel)'],
      transmissions: ['e-CVT Electronic Continuously Variable (Hybrid)', 'Multidrive S CVT Transmission', '6-Speed Manual Transmission', '6-Speed Automatic Super ECT (Hilux/Land Cruiser)', '8-Speed Direct Shift Automatic (Supra/RAV4)']
    },
    'Land Rover': {
      models: ['Range Rover (3.0 D300 / 3.0 D350 / 4.4 SDV8 / 3.0 P400e / 4.4 V8 P530 / Autobiography / Vogue)', 'Range Rover Sport (3.0 SDV6 / 3.0 D300 / 4.4 SDV8 / 5.0 V8 SVR / Dynamic)', 'Range Rover Evoque (2.0 D150 / 2.0 D180 / 2.0 D200 / 1.5 P300e / R-Dynamic)', 'Range Rover Velar (2.0 D180 / 2.0 D240 / 3.0 D300 / 2.0 P400e / R-Dynamic)', 'Discovery (3.0 SDV6 / 3.0 D300 / 2.0 SD4 / HSE Luxury)', 'Discovery Sport (2.0 D150 / 2.0 D180 / 2.0 D200 / P300e / Urban Edition)', 'Defender 90 / 110 / 130 (D250 / D300 / P400 / V8 / X-Dynamic)', 'Freelander 2 (2.2 SD4 / 2.2 TD4 / HSE)', 'Other Land Rover Model'],
      variants: ['Range Rover Sport 3.0 SDV6 HSE Dynamic (306PS Diesel)', 'Range Rover Evoque 2.0 D180 R-Dynamic S (180PS Diesel)', 'Range Rover Velar 2.0 D240 R-Dynamic SE (240PS Diesel)', 'Discovery 3.0 SDV6 HSE Luxury (306PS Diesel)', 'Discovery Sport 2.0 TD4 HSE 4WD (180PS Diesel)', 'Defender 110 3.0 D250 SE (249PS Diesel)', 'Range Rover 4.4 SDV8 Autobiography (339PS Diesel)', 'Freelander 2 2.2 SD4 HSE (190PS Diesel)'],
      transmissions: ['ZF 8-Speed Automatic (8HP70 / 8HP76)', 'ZF 9-Speed Automatic (9HP48 Transverse)', '6-Speed Automatic (Aisin Warner / ZF 6HP26)', '6-Speed Manual Transmission']
    },
    'Jaguar': {
      models: ['XE (2.0d 180 / 2.0d 204 / 2.0t 250 / 3.0 V6 S / R-Dynamic)', 'XF (2.0d 180 / 2.0d 204 / 3.0d V6 / 2.0t 250 / Sportbrake / Chequered Flag)', 'XJ (3.0d V6 / 5.0 V8 Supercharged / Autobiography)', 'F-Pace (2.0d 180 / 2.0d 204 / 3.0d V6 / 2.0 P400e / 5.0 SVR / R-Dynamic)', 'E-Pace (2.0d 150 / 2.0d 180 / 2.0d 204 / P300e / Chequered Flag)', 'I-Pace (EV400 90kWh / HSE)', 'F-Type (2.0 Turbo / 3.0 V6 Supercharged / 5.0 V8 R / SVR)', 'Other Jaguar Model'],
      variants: ['F-Pace 2.0d 180 R-Sport AWD (180PS Diesel)', 'F-Pace 3.0d V6 S AWD (300PS Diesel)', 'XE 2.0d 180 R-Sport (180PS Diesel)', 'XF 2.0d 180 Portfolio (180PS Diesel)', 'XF Sportbrake 2.0d R-Sport (180PS Diesel)', 'E-Pace 2.0d 180 Chequered Flag AWD (180PS Diesel)', 'F-Type 3.0 V6 Supercharged Quickshift (380PS)'],
      transmissions: ['ZF 8-Speed Quickshift Automatic', 'ZF 9-Speed Automatic (E-Pace)', '6-Speed Manual Transmission']
    },
    'SEAT': {
      models: ['Ibiza (1.0 TSI / 1.2 TSI / FR / SE Technology)', 'Leon (1.5 TSI / 2.0 TDI / FR / Cupra 290/300)', 'Ateca (1.5 TSI / 2.0 TDI / FR / Xcellence)', 'Arona (1.0 TSI / 1.5 TSI / FR / SE Technology)', 'Tarraco (2.0 TDI / 1.5 TSI / Xcellence / FR)', 'Toledo (1.6 TDI / 1.2 TSI)', 'Alhambra (2.0 TDI Ecomotive)', 'Mii (1.0 / Electric)', 'Other SEAT Model'],
      variants: ['Leon 1.5 TSI EVO FR Sport (150PS Petrol)', 'Leon 2.0 TDI 150 FR (150PS Diesel)', 'Ibiza 1.0 TSI 95 FR (95PS Petrol)', 'Ateca 1.5 TSI EVO SE Technology (150PS)', 'Arona 1.0 TSI FR Edition (110PS)', 'Tarraco 2.0 TDI 150 Xcellence (150PS Diesel)'],
      transmissions: ['7-Speed DSG Dual-Clutch (DQ381/DQ200)', '6-Speed DSG Dual-Clutch (DQ250)', '6-Speed Manual Transmission', '5-Speed Manual Transmission']
    },
    'Cupra': {
      models: ['Formentor (1.5 TSI / 2.0 TSI 310 / 1.4 e-Hybrid / VZ1/VZ2/VZ3)', 'Leon (2.0 TSI 300 / 1.4 e-Hybrid / VZ2/VZ3)', 'Ateca (2.0 TSI 300 4Drive)', 'Born (58kWh / 77kWh e-Boost)', 'Tavascan', 'Other Cupra Model'],
      variants: ['Formentor 1.5 TSI V2 DSG (150PS Petrol)', 'Formentor 2.0 TSI 310 VZ3 4Drive (310PS Petrol)', 'Leon 2.0 TSI 300 VZ3 DSG (300PS Petrol)', 'Ateca 2.0 TSI 300 4Drive DSG (300PS Petrol)'],
      transmissions: ['7-Speed DSG Dual-Clutch (DQ381)', '6-Speed DSG Dual-Clutch (e-Hybrid DQ400e)', '6-Speed Manual Transmission']
    },
    'Skoda': {
      models: ['Octavia (1.5 TSI / 2.0 TDI / vRS / SE Technology / SE L)', 'Fabia (1.0 TSI / 1.2 TSI / Monte Carlo / SE)', 'Superb (2.0 TDI / 1.5 TSI / 2.0 TSI 280 / SE L / Laurin & Klement)', 'Karoq (1.5 TSI / 2.0 TDI / SE L / SportLine)', 'Kodiaq (2.0 TDI / 1.5 TSI / 2.0 BiTDI vRS / SE L / SportLine)', 'Kamiq (1.0 TSI / 1.5 TSI / Monte Carlo / SE)', 'Scala (1.0 TSI / 1.5 TSI / SE L)', 'Yeti (2.0 TDI / 1.2 TSI / Outdoor)', 'Citigo (1.0 / e-iV)', 'Enyaq iV (60 / 80 / 80X / vRS)', 'Other Skoda Model'],
      variants: ['Octavia 2.0 TDI 150 SE L DSG (150PS Diesel)', 'Octavia vRS 2.0 TDI 200 DSG 4x4 (200PS)', 'Superb 2.0 TDI 150 SE L Executive DSG (150PS)', 'Karoq 1.5 TSI SE L DSG (150PS Petrol)', 'Kodiaq 2.0 TDI 150 SE L 7-Seater DSG 4x4 (150PS)', 'Fabia 1.0 TSI 95 SE Comfort (95PS Petrol)'],
      transmissions: ['7-Speed DSG Dual-Clutch (DQ381/DQ200)', '6-Speed DSG Dual-Clutch (DQ250)', '6-Speed Manual Transmission', '5-Speed Manual Transmission']
    },
    'Peugeot': {
      models: ['208 (1.2 PureTech / 1.5 BlueHDi / GT / Allure / e-208)', '308 (1.2 PureTech / 1.5 BlueHDi / GT / Allure / SW)', '508 (1.5 BlueHDi / 1.6 PureTech / 1.6 Hybrid / GT)', '2008 (1.2 PureTech / 1.5 BlueHDi / GT / e-2008)', '3008 (1.2 PureTech / 1.5 BlueHDi / 2.0 BlueHDi / Hybrid / GT)', '5008 (1.5 BlueHDi / 1.2 PureTech / 2.0 BlueHDi / GT)', '108 (1.0 / 1.2)', 'RCZ (1.6 THP / 2.0 HDi / R)', 'Partner / Rifter (1.5 BlueHDi / 1.6 BlueHDi)', 'Expert (1.5 BlueHDi / 2.0 BlueHDi)', 'Boxer (2.0 BlueHDi / 2.2 BlueHDi)', 'Other Peugeot Model'],
      variants: ['3008 1.5 BlueHDi 130 Allure Premium (130PS Diesel)', '3008 1.2 PureTech GT Line (130PS Petrol)', '2008 1.2 PureTech 130 GT (130PS Petrol)', '208 1.2 PureTech 100 Allure (100PS Petrol)', '5008 1.5 BlueHDi 130 GT Line (130PS Diesel)', '308 1.5 BlueHDi 130 Allure (130PS Diesel)', 'Partner 1.5 BlueHDi 1000 Professional (100PS)'],
      transmissions: ['8-Speed EAT8 Automatic (Aisin AW)', '6-Speed EAT6 Automatic', '6-Speed Manual Transmission', 'EGC 6-Speed Semi-Automatic']
    },
    'Renault': {
      models: ['Clio (1.0 TCe / 0.9 TCe / 1.5 dCi / E-Tech Hybrid / RS Line)', 'Captur (1.0 TCe / 1.3 TCe / 1.5 dCi / E-Tech Hybrid / Iconic)', 'Megane (1.3 TCe / 1.5 dCi / RS 300 / Iconic)', 'Kadjar (1.3 TCe / 1.5 dCi / 1.7 dCi / S-Edition / GT Line)', 'Scenic / Grand Scenic (1.3 TCe / 1.5 dCi / 1.7 dCi)', 'Koleos (2.0 dCi / 1.7 dCi / GT Line)', 'Arkana (1.3 TCe / 1.6 E-Tech Hybrid / R.S. Line)', 'Austral (1.2 E-Tech Hybrid)', 'Zoe (40kWh / 50kWh)', 'Trafic (1.6 dCi / 2.0 dCi Sport)', 'Master (2.3 dCi)', 'Kangoo (1.5 dCi)', 'Other Renault Model'],
      variants: ['Clio 1.0 TCe 90 RS Line (90PS Petrol)', 'Captur 1.3 TCe 130 S Edition (130PS Petrol)', 'Kadjar 1.3 TCe 140 GT Line (140PS Petrol)', 'Megane 1.5 Blue dCi 115 Iconic (115PS Diesel)', 'Trafic SL28 2.0 dCi 145 Sport (145PS Diesel)', 'Arkana 1.6 E-Tech Hybrid RS Line (145PS)'],
      transmissions: ['7-Speed EDC Dual-Clutch (Getrag 7DCT300)', '6-Speed EDC Dual-Clutch (Getrag 6DCT250)', '6-Speed Manual Transmission', 'Multi-Mode Clutchless Hybrid Automatic']
    },
    'Citroen': {
      models: ['C3 (1.2 PureTech / 1.5 BlueHDi / Shine Plus / Flair)', 'C3 Aircross (1.2 PureTech / 1.5 BlueHDi / Flair)', 'C4 (1.2 PureTech / 1.5 BlueHDi / Shine Plus / e-C4)', 'C4 Cactus (1.2 PureTech / 1.6 BlueHDi / Flair)', 'C5 Aircross (1.5 BlueHDi / 1.2 PureTech / Hybrid / Shine)', 'C1 (1.0 VTi)', 'Berlingo (1.5 BlueHDi / 1.6 BlueHDi / Feel / Flair)', 'Dispatch (1.5 BlueHDi / 2.0 BlueHDi)', 'Relay (2.0 BlueHDi / 2.2 BlueHDi)', 'SpaceTourer (2.0 BlueHDi)', 'Other Citroen Model'],
      variants: ['C3 1.2 PureTech 83 Flair Plus (83PS Petrol)', 'C3 Aircross 1.2 PureTech 110 Shine (110PS)', 'C5 Aircross 1.5 BlueHDi 130 Shine (130PS Diesel)', 'Berlingo 1.5 BlueHDi 1000 Driver Edition (100PS)', 'C4 1.2 PureTech 130 Sense Plus (130PS)'],
      transmissions: ['8-Speed EAT8 Automatic', '6-Speed EAT6 Automatic', '6-Speed Manual Transmission', 'ETG6 Semi-Automatic']
    },
    'DS Automobiles': {
      models: ['DS 3 (1.2 PureTech / 1.6 THP / 1.6 BlueHDi)', 'DS 3 Crossback (1.2 PureTech / 1.5 BlueHDi / E-Tense / Rivoli)', 'DS 4 (1.2 PureTech / 1.5 BlueHDi / E-Tense / Rivoli)', 'DS 7 Crossback (1.5 BlueHDi / 1.6 PureTech / E-Tense 4x4 / Ultra Prestige)', 'DS 9 (1.6 PureTech / E-Tense)', 'Other DS Model'],
      variants: ['DS 7 Crossback 1.5 BlueHDi 130 Performance Line', 'DS 7 Crossback 1.6 PureTech 225 Ultra Prestige', 'DS 3 Crossback 1.2 PureTech 130 Prestige', 'DS 3 1.2 PureTech 110 Elegance'],
      transmissions: ['8-Speed EAT8 Automatic', '6-Speed EAT6 Automatic', '6-Speed Manual Transmission']
    },
    'Honda': {
      models: ['Civic (1.0 VTEC / 1.5 VTEC / 1.6 i-DTEC / 2.0 e:HEV / Type R GT)', 'CR-V (1.5 VTEC / 2.0 i-MMD Hybrid / 1.6 i-DTEC / EX)', 'HR-V (1.5 i-VTEC / 1.5 e:HEV / 1.6 i-DTEC / EX)', 'Jazz (1.3 i-VTEC / 1.5 e:HEV / Crosstar / EX)', 'Accord (2.2 i-DTEC / 2.0 i-VTEC)', 'e (35.5kWh Advance)', 'ZR-V (2.0 e:HEV Sport)', 'Other Honda Model'],
      variants: ['Civic 1.0 VTEC Turbo SR (126PS Petrol)', 'Civic 1.5 VTEC Turbo Sport Plus (182PS Petrol)', 'Civic 1.6 i-DTEC EX (120PS Diesel)', 'Civic Type R 2.0 VTEC Turbo GT (320PS)', 'CR-V 2.0 i-MMD Hybrid EX AWD (184PS)', 'Jazz 1.5 i-MMD e-HEV EX (109PS Hybrid)'],
      transmissions: ['Continuously Variable Transmission (CVT)', 'e:HEV Fixed Gear Transmission', '6-Speed Manual Transmission', '9-Speed Automatic (CR-V/Civic Diesel)']
    },
    'Hyundai': {
      models: ['Tucson (1.6 T-GDi / 1.6 CRDi / 1.6 Hybrid / 1.6 PHEV / N Line / Premium)', 'i10 (1.0 MPi / 1.2 MPi / N Line)', 'i20 (1.0 T-GDi / 1.2 / N Line / i20 N)', 'i30 (1.0 T-GDi / 1.4 T-GDi / 1.6 CRDi / N Line / i30 N Performance)', 'Kona (1.0 T-GDi / 1.6 T-GDi / 1.6 Hybrid / Electric 64kWh / Ultimate)', 'Santa Fe (2.2 CRDi / 1.6 T-GDi Hybrid / Premium)', 'Ioniq (1.6 GDi Hybrid / Plug-in / Electric)', 'Ioniq 5 (58kWh / 73kWh / 77kWh / Ultimate)', 'Ioniq 6', 'ix35 (1.7 CRDi / 2.0 CRDi / Premium)', 'Bayon (1.0 T-GDi / SE Connect)', 'Other Hyundai Model'],
      variants: ['Tucson 1.6 T-GDi 150 N Line (150PS Petrol)', 'Tucson 1.6 CRDi 136 SE Nav 48V (136PS Diesel)', 'i30 N 2.0 T-GDi Performance 275 (275PS)', 'Kona 1.0 T-GDi Premium (120PS Petrol)', 'i20 1.0 T-GDi 100 SE Connect (100PS)', 'Santa Fe 2.2 CRDi 200 Premium SE 4WD (200PS)'],
      transmissions: ['7-Speed Dual-Clutch (7-DCT)', '8-Speed Wet Dual-Clutch (N-DCT)', '6-Speed Manual Transmission', '6-Speed Intelligent Manual (iMT)', '8-Speed Automatic (Santa Fe)']
    },
    'Kia': {
      models: ['Sportage (1.6 CRDi / 1.6 T-GDi / 1.6 Hybrid / 1.7 CRDi / GT-Line / 2 / 3 / 4)', 'Ceed / Ceed Sportswagon (1.0 T-GDi / 1.4 T-GDi / 1.6 CRDi / GT-Line)', 'Proceed (1.4 T-GDi / 1.5 T-GDi / 1.6 T-GDi GT)', 'XCeed (1.0 T-GDi / 1.4 T-GDi / 1.5 T-GDi / 1.6 PHEV / 3 / 4)', 'Niro (1.6 GDi Hybrid / 1.6 PHEV / e-Niro 64kWh / 2 / 3 / 4)', 'Picanto (1.0 DPi / 1.25 / GT-Line / 2 / 3)', 'Rio (1.0 T-GDi / 1.25 / 1.4 CRDi / 2 / 3)', 'Stonic (1.0 T-GDi / 1.4 / 1.6 CRDi / 2 / GT-Line)', 'Sorento (2.2 CRDi / 1.6 T-GDi Hybrid / 3 / 4)', 'EV6 (77.4kWh / GT-Line / GT)', 'EV9', 'Soul / Soul EV', 'Optima (1.7 CRDi / 1.6 CRDi / Sportswagon)', 'Venga (1.4 / 1.6 CRDi)', 'Other Kia Model'],
      variants: ['Sportage 1.6 CRDi 134 GT-Line (134PS Diesel)', 'Sportage 1.6 T-GDi 174 GT-Line S AWD (174PS)', 'XCeed 1.5 T-GDi 158 3 Edition (158PS Petrol)', 'Niro 1.6 GDi Hybrid 2 (141PS Hybrid)', 'Ceed 1.4 T-GDi 138 GT-Line (138PS Petrol)', 'Sorento 2.2 CRDi 199 3 Edition 4WD (199PS Diesel)', 'Picanto 1.0 T-GDi GT-Line S (100PS Petrol)'],
      transmissions: ['7-Speed Dual-Clutch (7-DCT)', '8-Speed Dual-Clutch (Sorento/Sportage)', '6-Speed Manual Transmission', '6-Speed Dual-Clutch Hybrid (Niro)', '8-Speed Automatic']
    },
    'Volvo': {
      models: ['XC40 (2.0 D3 / 2.0 D4 / 1.5 T3 / 2.0 T4 / 2.0 B4 / Recharge T4/T5 / R-Design / Inscription)', 'XC60 (2.0 D4 / 2.0 D5 / 2.0 B4 / 2.0 B5 / Recharge T6/T8 / R-Design / Momentum)', 'XC90 (2.0 D5 / 2.0 B5 / Recharge T8 / Inscription / R-Design)', 'V40 / V40 Cross Country (2.0 D2 / 2.0 D3 / 2.0 D4 / 1.5 T2 / 2.0 T3 / R-Design)', 'V60 (2.0 D3 / 2.0 D4 / 2.0 B4 / Recharge T6 / R-Design)', 'V90 (2.0 D4 / 2.0 D5 / 2.0 B4 / Recharge T6 / Inscription)', 'S60 (2.0 T5 / 2.0 B5 / R-Design Plus)', 'S90 (2.0 D4 / 2.0 D5 / Inscription)', 'C40 Recharge', 'Other Volvo Model'],
      variants: ['XC40 2.0 D4 190 AWD R-Design Pro (190PS Diesel)', 'XC40 1.5 T3 163 R-Design (163PS Petrol)', 'XC60 2.0 D4 190 AWD Momentum (190PS Diesel)', 'XC60 2.0 B4 MHEV R-Design AWD (197PS Petrol)', 'XC90 2.0 D5 PowerPulse R-Design AWD (235PS)', 'V40 2.0 D2 120 R-Design Edition (120PS Diesel)', 'V60 2.0 D4 190 Momentum Plus (190PS Diesel)'],
      transmissions: ['8-Speed Geartronic Automatic (Aisin AW TG-81SC)', '6-Speed Geartronic Automatic', '6-Speed Manual Transmission', '7-Speed Dual-Clutch (Recharge Hybrid)']
    },
    'Mazda': {
      models: ['Mazda 2 (1.5 SkyActiv-G / GT Sport / Sport Nav)', 'Mazda 3 (2.0 SkyActiv-G / 2.0 SkyActiv-X / 2.2 SkyActiv-D / GT Sport Tech)', 'Mazda 6 (2.0 SkyActiv-G / 2.2 SkyActiv-D / Sport Nav Plus / Tourer)', 'CX-3 (2.0 SkyActiv-G / 1.5 SkyActiv-D / Sport Nav)', 'CX-30 (2.0 SkyActiv-G / 2.0 SkyActiv-X / GT Sport Tech)', 'CX-5 (2.0 SkyActiv-G / 2.2 SkyActiv-D 150/184 / Sport / GT Sport)', 'CX-60 (2.5 PHEV / 3.3 e-Skyactiv D / Homura / Takumi)', 'MX-5 (1.5 SkyActiv-G / 2.0 SkyActiv-G / RF / Sport Tech)', 'MX-30 (35.5kWh / R-EV)', 'Other Mazda Model'],
      variants: ['CX-5 2.2 SkyActiv-D 184 Sport Nav+ AWD (184PS)', 'CX-5 2.0 SkyActiv-G 165 SE-L Nav+ (165PS Petrol)', 'Mazda 3 2.0 e-SkyActiv-X 186 GT Sport Tech (186PS)', 'Mazda 6 2.2 SkyActiv-D 150 Sport Nav (150PS Diesel)', 'MX-5 2.0 SkyActiv-G 184 Sport Tech (184PS Petrol)', 'CX-30 2.0 e-SkyActiv-G 122 Sport Lux (122PS)'],
      transmissions: ['6-Speed SkyActiv-Drive Automatic', '6-Speed SkyActiv-MT Manual Transmission', '8-Speed Multi-Clutch Automatic (CX-60)']
    },
    'Mini': {
      models: ['Hatch 3-Door (One / Cooper / Cooper D / Cooper S / John Cooper Works)', 'Hatch 5-Door (One / Cooper / Cooper D / Cooper S)', 'Convertible (Cooper / Cooper S / JCW)', 'Clubman (Cooper / Cooper D / Cooper S / Cooper SD / JCW ALL4)', 'Countryman (Cooper / Cooper D / Cooper S / Cooper SD / JCW / PHEV ALL4)', 'Paceman / Coupe', 'Mini Electric', 'Other Mini Model'],
      variants: ['Cooper 1.5 Classic 3dr (136PS Petrol)', 'Cooper S 2.0 Sport 5dr (192PS Petrol)', 'Cooper S 2.0 Exclusive (178PS / 192PS Petrol)', 'John Cooper Works 2.0 Turbo GP (231PS / 306PS)', 'Countryman 2.0 Cooper S Sport ALL4 (192PS)', 'Clubman 2.0 Cooper S Exclusive (192PS Petrol)', 'Cooper D 1.5 Seven Edition (116PS Diesel)'],
      transmissions: ['7-Speed Steptronic Dual-Clutch (Getrag 7DCT300)', '8-Speed Steptronic Automatic (Aisin)', '6-Speed Steptronic Automatic', '6-Speed Manual Transmission']
    },
    'Porsche': {
      models: ['911 (Carrera / Carrera S / 4S / GTS / Turbo / Turbo S / GT3 / 997 / 991 / 992)', 'Cayman (2.0 / 2.5 S / 4.0 GTS / GT4 / 987 / 981 / 718)', 'Boxster (2.0 / 2.5 S / 4.0 GTS / Spyder / 987 / 981 / 718)', 'Macan (2.0 Turbo / 3.0 S / 2.9 GTS / 2.9 Turbo / 3.0 Diesel S)', 'Cayenne (3.0 V6 / 2.9 S / 4.0 GTS / 4.0 Turbo / E-Hybrid / Coupe)', 'Panamera (2.9 4S / 4.0 GTS / 4.0 Turbo / 4 E-Hybrid / Sport Turismo)', 'Taycan (4S / GTS / Turbo / Turbo S / Cross Turismo)', 'Other Porsche Model'],
      variants: ['Macan 2.0T PDK 4WD (245PS / 265PS Petrol)', 'Macan S 3.0 V6 Turbo PDK (354PS Petrol)', 'Macan GTS 2.9 Twin-Turbo PDK (380PS / 440PS)', 'Cayenne 3.0 V6 Tiptronic S (340PS Petrol)', '911 Carrera S 3.0T PDK 992 (450PS Petrol)', '718 Cayman 2.0T PDK (300PS Petrol)', 'Panamera 4 E-Hybrid 2.9 PDK (462PS Hybrid)'],
      transmissions: ['7-Speed PDK Dual-Clutch (Porsche Doppelkupplung)', '8-Speed PDK Dual-Clutch (992 / Panamera)', '8-Speed Tiptronic S Automatic (Cayenne / Macan Diesel)', '6-Speed Manual Transmission', '7-Speed Manual Transmission (911)']
    },
    'Fiat': {
      models: ['500 (1.2 Lounge / 0.9 TwinAir / 1.0 Mild Hybrid / Dolcevita / 500e)', '500X (1.0 FireFly / 1.3 FireFly / 1.6 MultiJet / 2.0 MultiJet / Cross Plus)', '500L (1.4 / 1.3 MultiJet / 1.6 MultiJet / Trekking)', 'Panda (1.2 / 0.9 TwinAir 4x4 / 1.0 Mild Hybrid / City Cross)', 'Tipo (1.4 / 1.0 FireFly / 1.6 MultiJet / Lounge / Street)', 'Punto / Grande Punto (1.2 / 1.4 / 1.3 MultiJet)', 'Doblo / Ducato / Scudo', '124 Spider (1.4 MultiAir / Lusso Plus)', 'Other Fiat Model'],
      variants: ['500 1.2 Lounge 3dr (69PS Petrol)', '500 1.0 Mild Hybrid Dolcevita (70PS Petrol)', '500X 1.0 FireFly Turbo City Cross (120PS)', '500X 1.3 FireFly Turbo Sport DCT (150PS)', 'Tipo 1.4 Easy 5dr (95PS Petrol)', 'Panda 0.9 TwinAir 4x4 (85PS Petrol)', '124 Spider 1.4 MultiAir Lusso Plus (140PS)'],
      transmissions: ['5-Speed Manual Transmission', '6-Speed Manual Transmission', '6-Speed Dualogic Robotized Automatic', '6-Speed DDCT Dual-Clutch Automatic (500X)', '9-Speed Automatic (500X 4x4)']
    },
    'Alfa Romeo': {
      models: ['Giulia (2.0 Turbo 200/280 / 2.2 Diesel 150/180/190/210 / Quadrifoglio 2.9 V6 / Veloce / Speciale)', 'Stelvio (2.0 Turbo 200/280 / 2.2 Diesel 180/190/210 / Quadrifoglio 2.9 V6 / Veloce / Milano Edizione)', 'Giulietta (1.4 TB / 2.0 JTDM-2 / 1.6 JTDM-2 / Veloce / Speciale)', 'MiTo (1.4 TB / 0.9 TwinAir / 1.3 JTDM / Veloce)', 'Tonale (1.5 MHEV / 1.3 PHEV Q4 / Ti / Veloce)', '4C Coupe / Spider', 'Other Alfa Romeo Model'],
      variants: ['Giulia 2.0 Turbo 280 Veloce Auto (280PS Petrol)', 'Giulia 2.2 JTDM-2 180 Speciale Auto (180PS Diesel)', 'Giulia 2.9 V6 Biturbo Quadrifoglio (510PS Petrol)', 'Stelvio 2.2 JTDM-2 210 Milano Edizione Q4 (210PS)', 'Stelvio 2.0 Turbo 280 Veloce Q4 (280PS Petrol)', 'Giulietta 2.0 JTDM-2 150 Speciale (150PS Diesel)'],
      transmissions: ['ZF 8-Speed Automatic Transmission', 'Alfa TCT 6-Speed Dual-Clutch (Giulietta/MiTo/4C)', '6-Speed Manual Transmission']
    },
    'Lexus': {
      models: ['IS (IS300h 2.5 Hybrid / IS250 2.5 V6 / IS200t / F Sport / Premier)', 'CT (CT200h 1.8 Hybrid / F Sport / Luxury / Advance)', 'NX (NX300h 2.5 Hybrid / NX450h+ PHEV / NX350h / F Sport / Takumi)', 'RX (RX450h 3.5 V6 Hybrid / RX450hL / RX500h / F Sport / Takumi)', 'UX (UX250h 2.0 Hybrid / UX300e / F Sport / Takumi)', 'RC (RC300h / RC F 5.0 V8)', 'GS (GS300h / GS450h / GS F)', 'LS (LS500h / LS600h)', 'ES (ES300h / F Sport)', 'LC (LC500 5.0 V8 / LC500h 3.5 V6 Multi-Stage)', 'RZ 450e', 'Other Lexus Model'],
      variants: ['IS300h 2.5 F Sport E-CVT (223PS Hybrid)', 'CT200h 1.8 F Sport E-CVT (136PS Hybrid)', 'NX300h 2.5 F Sport E-FOUR AWD (197PS Hybrid)', 'RX450h 3.5 V6 F Sport Premier AWD (313PS Hybrid)', 'UX250h 2.0 F Sport E-CVT (184PS Hybrid)', 'ES300h 2.5 Takumi E-CVT (218PS Hybrid)'],
      transmissions: ['e-CVT Electronic Continuously Variable Transmission', 'Multi-Stage Hybrid Transmission (LC/LS)', 'Direct-Shift 8-Speed Automatic (IS200t/GS)', 'Direct-Shift 10-Speed Automatic (LC500/RC F)']
    },
    'Dacia': {
      models: ['Duster (1.0 TCe / 1.3 TCe / 1.5 Blue dCi / Prestige / Comfort / Journey)', 'Sandero (1.0 SCe / 0.9 TCe / 1.0 TCe / Essential / Comfort)', 'Sandero Stepway (0.9 TCe / 1.0 TCe / Prestige / Comfort)', 'Jogger (1.0 TCe / 1.6 Hybrid / Expression / Extreme)', 'Logan MCV (0.9 TCe / 1.5 dCi / Stepway)', 'Other Dacia Model'],
      variants: ['Duster 1.5 Blue dCi 115 Prestige 4x4 (115PS Diesel)', 'Duster 1.3 TCe 130 Comfort (130PS Petrol)', 'Sandero Stepway 1.0 TCe 90 Prestige (90PS)', 'Sandero 1.0 TCe 90 Comfort (90PS Petrol)', 'Jogger 1.0 TCe 110 Extreme SE 7-Seater (110PS)'],
      transmissions: ['6-Speed EDC Dual-Clutch (Duster TCe 150)', '6-Speed Manual Transmission', '5-Speed Manual Transmission', 'CVT Automatic (Sandero)', 'Multi-Mode Hybrid Transmission (Jogger)']
    },
    'MG': {
      models: ['MG ZS (1.5 VTi-Tech / 1.0T GDi / Exclusive / Excite / ZS EV 44/72kWh)', 'MG HS (1.5 T-GDi / 1.5 PHEV / Exclusive / Excite)', 'MG3 (1.5 VTi-Tech / Exclusive / Excite)', 'MG4 EV (51kWh / 64kWh / 77kWh Extended / XPOWER 435PS)', 'MG5 EV (52kWh / 61kWh Long Range Exclusive)', 'Cyberster', 'MG6', 'Other MG Model'],
      variants: ['MG ZS 1.5 VTi-Tech Exclusive (106PS Petrol)', 'MG ZS 1.0T GDi Exclusive Auto (111PS Petrol)', 'MG HS 1.5 T-GDi Exclusive (162PS Petrol)', 'MG HS 1.5 Plug-in Hybrid Exclusive (258PS)', 'MG3 1.5 VTi-Tech Exclusive Nav (106PS Petrol)', 'MG4 EV Trophy Long Range (204PS Electric)'],
      transmissions: ['7-Speed Dual-Clutch DCT (MG HS)', '6-Speed Torque Converter Automatic (MG ZS 1.0T)', '6-Speed Manual Transmission', '5-Speed Manual Transmission (MG3/ZS)']
    },
    'Jeep': {
      models: ['Renegade (1.0 GSE / 1.3 GSE / 1.6 MultiJet / 2.0 MultiJet 4x4 / 4xe PHEV / Limited / Trailhawk)', 'Compass (1.4 MultiAir / 1.3 GSE / 1.6 MultiJet / 2.0 MultiJet 4x4 / 4xe PHEV / Night Eagle / S)', 'Cherokee (2.0 MultiJet / 2.2 MultiJet / Limited / Trailhawk)', 'Grand Cherokee (3.0 V6 CRD / 5.7 V8 / 6.4 V8 SRT / 4xe / Overland / Summit)', 'Wrangler (2.0 Turbo / 2.2 MultiJet / 3.6 V6 / Rubicon / Sahara)', 'Avenger (1.2 Turbo / Electric)', 'Other Jeep Model'],
      variants: ['Renegade 1.6 MultiJet II Limited (120PS Diesel)', 'Renegade 1.3 Turbo 4xe Trailhawk 4WD (240PS Hybrid)', 'Compass 1.4 MultiAir II Limited 4WD (170PS Petrol)', 'Grand Cherokee 3.0 V6 CRD Overland 4x4 (250PS)', 'Wrangler 2.0 Turbo Rubicon 4x4 (272PS Petrol)'],
      transmissions: ['ZF 9-Speed Automatic Transmission (Renegade/Compass/Cherokee)', 'ZF 8-Speed Automatic Transmission (Grand Cherokee/Wrangler)', '6-Speed DDCT Dual-Clutch (Renegade/Compass 1.4/1.3)', '6-Speed Manual Transmission']
    },
    'Suzuki': {
      models: ['Swift (1.0 Boosterjet / 1.2 Dualjet / 1.4 Boosterjet Sport / SZ-T / SZ5 / Attitude)', 'Vitara (1.0 Boosterjet / 1.4 Boosterjet / 1.6 DDiS / 1.5 Full Hybrid / SZ-T / SZ5 ALLGRIP)', 'S-Cross (1.0 Boosterjet / 1.4 Boosterjet / 1.5 Full Hybrid / Ultra ALLGRIP)', 'Ignis (1.2 Dualjet / SHVS / ALLGRIP / SZ-T / SZ5)', 'Jimny (1.3 / 1.5 / SZ4 / SZ5)', 'Baleno (1.0 Boosterjet / 1.2 Dualjet / SZ5)', 'SX4 (1.6 / 2.0 DDiS)', 'Swace (1.8 Hybrid)', 'Across (2.5 PHEV)', 'Other Suzuki Model'],
      variants: ['Swift 1.0 Boosterjet SZ-T (111PS Petrol)', 'Swift Sport 1.4 Boosterjet 140 (140PS Petrol)', 'Vitara 1.4 Boosterjet SZ5 ALLGRIP (140PS Petrol)', 'Vitara 1.6 DDiS SZ5 Urban Edition (120PS Diesel)', 'Ignis 1.2 Dualjet SHVS SZ5 ALLGRIP (90PS Petrol)', 'Jimny 1.5 SZ5 ALLGRIP 4x4 (101PS Petrol)'],
      transmissions: ['6-Speed Automatic Transmission (Aisin)', 'CVT Automatic Transmission', 'AGS 5-Speed Auto Gear Shift', '6-Speed Manual Transmission', '5-Speed Manual Transmission']
    },
    'Mitsubishi': {
      models: ['Outlander (2.0 PHEV / 2.4 PHEV / 2.2 DI-D Diesel / GX3 / GX4 / 4hs / Dynamic)', 'ASX (1.6 / 1.8 DI-D / 2.2 DI-D / 2.0 MIVEC / 3 / 4 / 5 / Exceed)', 'L200 (2.4 DI-D / 2.2 DI-D / Barbarian / Warrior / Titan / Series 5/6)', 'Eclipse Cross (1.5 Turbo / 2.4 PHEV / 3 / 4 / First Edition / Exceed)', 'Shogun / Shogun Sport (3.2 DI-D / 2.4 DI-D / SG3 / SG4 / Barbarian)', 'Mirage (1.2 / Juro / Design)', 'Other Mitsubishi Model'],
      variants: ['Outlander 2.4 PHEV 4hs 4WD (224PS Hybrid)', 'Outlander 2.0 PHEV GX4h 4WD (203PS Hybrid)', 'Outlander 2.2 DI-D 150 GX4 4WD (150PS Diesel)', 'L200 Barbarian 2.4 DI-D 178 Double Cab 4x4 (178PS)', 'ASX 1.6 3 5dr (117PS Petrol)', 'Eclipse Cross 1.5 4 4WD (163PS Petrol)'],
      transmissions: ['Twin-Motor e-4WD Single-Speed Transaxle (PHEV)', 'INVECS-III Continuously Variable (CVT)', 'INVECS-II 6-Speed / 8-Speed Automatic (L200/Shogun)', '6-Speed Manual Transmission', '5-Speed Manual Transmission']
    },
    'Subaru': {
      models: ['Impreza (1.6i / 2.0i e-Boxer / WRX STI 2.5 Turbo / SE / Lineartronic)', 'Forester (2.0D / 2.0i e-Boxer / 2.0 XT Turbo / XE Premium)', 'Outback (2.0D / 2.5i / SE Premium / Touring)', 'XV (1.6i / 2.0D / 2.0i e-Boxer / SE Premium)', 'BRZ (2.0 Boxer / SE Lux)', 'Levorg (1.6 GT / 2.0 GT)', 'Other Subaru Model'],
      variants: ['Forester 2.0 e-Boxer XE Premium Lineartronic AWD (150PS)', 'Forester 2.0D 147 XC AWD (147PS Diesel)', 'Outback 2.5i SE Premium Lineartronic AWD (175PS)', 'XV 2.0 e-Boxer SE Premium AWD (150PS Hybrid)', 'Impreza WRX STI 2.5 Type UK 4WD (300PS Turbo)', 'BRZ 2.0 SE Lux (200PS Petrol)'],
      transmissions: ['Lineartronic Continuously Variable Transmission (CVT)', '6-Speed Symmetrical Manual Transmission', '5-Speed Manual Transmission']
    },
    'Tesla': {
      models: ['Model 3 (Standard Range Plus / Long Range AWD / Performance)', 'Model Y (RWD / Long Range AWD / Performance)', 'Model S (75D / 90D / 100D / P100D / Plaid / Long Range)', 'Model X (75D / 90D / 100D / P100D / Plaid / Long Range)'],
      variants: ['Model 3 Long Range Dual Motor All-Wheel Drive', 'Model 3 Standard Range Plus RWD', 'Model 3 Performance Dual Motor AWD', 'Model Y Long Range AWD', 'Model Y Performance AWD', 'Model S 100D Dual Motor AWD'],
      transmissions: ['Single-Speed Fixed Gear Reduction Gearbox (Electric Drive Unit)', 'Dual-Motor Independent Gearbox Front/Rear']
    },
    'Abarth': {
      models: ['595 (1.4 T-Jet / Turismo / Competizione / Esseesse)', '695 (1.4 T-Jet / Biposto / Rivale / Tributo Ferrari / Esseesse)', '124 Spider (1.4 MultiAir Turbo / GT / Scorpione)', '500e (42kWh Scorpionissima)'],
      variants: ['595 1.4 T-Jet 165 Turismo 3dr (165PS Petrol)', '595 1.4 T-Jet 180 Competizione 3dr (180PS Petrol)', '695 1.4 T-Jet 180 Esseesse 3dr (180PS Petrol)', '124 Spider 1.4 MultiAir 170 Roadster (170PS)'],
      transmissions: ['5-Speed Manual Transmission', '6-Speed Manual Transmission (124 Spider)', '5-Speed Abarth MTA Robotized Dualogic w/ Paddles', '6-Speed Automatic (124 Spider)']
    },
    'Smart': {
      models: ['ForTwo (0.9 Turbo / 1.0 / Brabus / EQ Electric / Prime / Passion)', 'ForFour (0.9 Turbo / 1.0 / EQ Electric / Prime / Passion)', '#1 (Pro+ / Premium / Brabus 428PS)', '#3'],
      variants: ['ForTwo 0.9 Turbo Prime Premium Twinamic 2dr (90PS)', 'ForTwo 1.0 Passion 2dr (71PS Petrol)', 'ForFour 0.9 Turbo Brabus Xclusive Twinamic 5dr (109PS)', 'Smart #1 Brabus AWD 66kWh (428PS Electric)'],
      transmissions: ['6-Speed Twinamic Dual-Clutch Automatic', '5-Speed Manual Transmission', 'Single-Speed Fixed Reduction Gearbox (EQ Electric)']
    },
    'Maserati': {
      models: ['Ghibli (3.0 V6 Diesel / 3.0 V6 Twin-Turbo 350/430 S / 3.8 V8 Trofeo / 2.0 Hybrid)', 'Levante (3.0 V6 Diesel / 3.0 V6 Twin-Turbo 350/430 S / 3.8 V8 Trofeo / GT Hybrid)', 'Quattroporte (3.0 V6 Diesel / 3.0 V6 S / 3.8 V8 GTS/Trofeo)', 'Grecale (2.0 GT / 2.0 Modena / 3.0 V6 Trofeo)', 'GranTurismo (4.2 V8 / 4.7 V8 S / 3.0 V6 Nettuno Modena/Trofeo)'],
      variants: ['Ghibli 3.0 V6 275 Diesel Auto (275PS Diesel)', 'Ghibli 3.0 V6 430 S GranSport Auto (430PS Petrol)', 'Levante 3.0 V6 275 Diesel GranLusso Q4 (275PS)', 'Levante 3.0 V6 430 S GranSport Q4 (430PS Petrol)', 'Grecale 2.0 GT MHEV Q4 Auto (300PS Petrol)'],
      transmissions: ['ZF 8-Speed Automatic Transmission (8HP70 / 8HP75)', '6-Speed Automatic (ZF 6HP26)', '6-Speed MC Shift Robotized Sequential']
    },
    'Bentley': {
      models: ['Continental GT (6.0 W12 Twin-Turbo / 4.0 V8 Twin-Turbo / Mulliner / Speed)', 'Continental GTC Convertible (6.0 W12 / 4.0 V8)', 'Flying Spur (6.0 W12 / 4.0 V8 / 2.9 V6 Hybrid)', 'Bentayga (4.0 V8 / 6.0 W12 Speed / 3.0 V6 Hybrid / 4.0 V8 Diesel)'],
      variants: ['Continental GT 4.0 V8 Twin-Turbo 4WD Auto (550PS)', 'Continental GT 6.0 W12 Twin-Turbo Speed 4WD (659PS)', 'Bentayga 4.0 V8 550 Mulliner AWD (550PS Petrol)', 'Flying Spur 4.0 V8 Twin-Turbo 4WD Auto (550PS)'],
      transmissions: ['8-Speed Dual-Clutch Transmission (Porsche/Bentley DCT)', 'ZF 8-Speed Automatic Transmission (8HP90)', 'ZF 6-Speed Automatic (6HP26)']
    },
    'Aston Martin': {
      models: ['Vantage (4.0 V8 Twin-Turbo / 4.7 V8 / 5.9 V12 / F1 Edition)', 'DB11 (4.0 V8 Twin-Turbo / 5.2 V12 Twin-Turbo / AMR / Volante)', 'DBS Superleggera (5.2 V12 Twin-Turbo 715bhp / Volante)', 'DBX (4.0 V8 Twin-Turbo / DBX707 707bhp)', 'DB9 (5.9 V12 / Volante)', 'Vanquish (5.9 V12 / Volante)', 'Rapide (5.9 V12 / Rapide S)'],
      variants: ['Vantage 4.0 V8 Twin-Turbo 510 Coupe Auto (510PS)', 'DB11 4.0 V8 Twin-Turbo 503 Coupe Auto (503PS)', 'DB11 5.2 V12 Twin-Turbo 600 Launch Edition (608PS)', 'DBX 4.0 V8 550 AWD Auto (550PS Petrol)', 'DBX707 4.0 V8 707 AWD Auto (707PS Petrol)'],
      transmissions: ['ZF 8-Speed Touchtronic III Automatic (8HP75)', '9-Speed Wet-Clutch MCT Automatic (DBX707)', '7-Speed Graziano Dog-Leg Manual (Vantage)', '6-Speed Touchtronic II Automatic (DB9)']
    },
    'Other Make': {
      models: ['Custom / Classic / Commercial Vehicle', 'Imported Vehicle', 'Specialist Transmission Vehicle'],
      variants: ['Standard Specification', 'High Performance Spec', 'Commercial Fleet Spec'],
      transmissions: ['Automatic Transmission (ZF / Torque Converter)', 'Dual-Clutch Transmission (DSG / S-Tronic / DCT / Powershift)', 'Manual Transmission (5-Speed / 6-Speed)', 'Continuously Variable Transmission (CVT)', 'Semi-Automatic / Mechatronic Unit', 'Electric Drive Transmission']
    }
  };

  // ==========================================================================
  // 2. CURATED DIRECT REAL UK VEHICLE REGISTRATIONS
  // ==========================================================================
  const CURATED_PLATES = {
    'WF68KLU': { make: 'BMW', model: '3 Series (320d M Sport)', year: '2019', engine: '2.0L Diesel (190 bhp)', transmission: '8-Speed Steptronic Automatic (ZF 8HP)', region: 'Exeter / West of England (WF)' },
    'EA19XPR': { make: 'Volkswagen', model: 'Golf (1.5 TSI EVO Match)', year: '2019', engine: '1.5L Petrol (150 bhp)', transmission: '7-Speed DSG Dual-Clutch (DQ381)', region: 'Chelmsford / Essex (EA)' },
    'LK67YHB': { make: 'Ford', model: 'Focus (1.0 EcoBoost Titanium)', year: '2018', engine: '1.0L Petrol (125 bhp)', transmission: '6-Speed Manual Transmission', region: 'London NW (LK)' },
    'GL70VBC': { make: 'Audi', model: 'A4 (35 TDI S Line S-Tronic)', year: '2020', engine: '2.0L Diesel (163 bhp)', transmission: '7-Speed S-Tronic Dual-Clutch (DL382)', region: 'Maidstone / Kent (GL)' },
    'RO17LKM': { make: 'Mercedes-Benz', model: 'A-Class (A200 AMG Line)', year: '2017', engine: '1.6L Petrol (156 bhp)', transmission: '7G-DCT Dual-Clutch Automatic', region: 'Reading (RO)' },
    'BD21FGT': { make: 'Vauxhall', model: 'Corsa (1.2 Turbo SRi Premium)', year: '2021', engine: '1.2L Petrol (100 bhp)', transmission: '6-Speed Manual Transmission', region: 'Birmingham (BD)' },
    'GU69NTR': { make: 'Nissan', model: 'Qashqai (1.3 DIG-T N-Connecta)', year: '2019', engine: '1.3L Petrol (140 bhp)', transmission: 'Xtronic Continuously Variable (CVT)', region: 'Brighton (GU)' },
    'LO21VBN': { make: 'Audi', model: 'A3 Sportback (35 TFSI S Line)', year: '2021', engine: '1.5L MHEV Petrol (150 bhp)', transmission: '7-Speed S-Tronic Dual-Clutch (DQ381)', region: 'London Stanmore (LO)' },
    'OY68FGT': { make: 'BMW', model: '5 Series (520d M Sport Touring)', year: '2018', engine: '2.0L Diesel (190 bhp)', transmission: '8-Speed ZF Automatic w/ Paddles', region: 'Oxford (OY)' },
    'HV22ABC': { make: 'Mercedes-Benz', model: 'CLA Coupe (CLA220d AMG Line)', year: '2022', engine: '2.0L Diesel (190 bhp)', transmission: '8G-DCT Dual-Clutch Automatic', region: 'Portsmouth (HV)' },
    'SF20KLM': { make: 'Land Rover', model: 'Range Rover Evoque (2.0 D180 R-Dynamic S)', year: '2020', engine: '2.0L Diesel (180 bhp)', transmission: 'ZF 9-Speed Automatic (9HP48)', region: 'Glasgow / Scotland (SF)' },
    'YE19BCD': { make: 'Ford', model: 'Fiesta (1.0 EcoBoost ST-Line)', year: '2019', engine: '1.0L Petrol (125 bhp)', transmission: '6-Speed Manual Transmission', region: 'Leeds / Yorkshire (YE)' },
    'MA71XRT': { make: 'Hyundai', model: 'Tucson (1.6 T-GDi N Line 48V)', year: '2021', engine: '1.6L Petrol MHEV (150 bhp)', transmission: '7-Speed Dual-Clutch (7-DCT)', region: 'Manchester (MA)' },
    'LN18PQR': { make: 'Mini', model: 'Hatch (Cooper S 2.0 Sport)', year: '2018', engine: '2.0L Turbo Petrol (192 bhp)', transmission: '7-Speed Steptronic Dual-Clutch', region: 'London Stanmore (LN)' },
    'AK69WXY': { make: 'Volvo', model: 'XC60 (2.0 D4 AWD Momentum)', year: '2019', engine: '2.0L Diesel (190 bhp)', transmission: '8-Speed Geartronic Automatic', region: 'Peterborough (AK)' },
    'KX20TUV': { make: 'Kia', model: 'Sportage (1.6 CRDi GT-Line S AWD)', year: '2020', engine: '1.6L Diesel (134 bhp)', transmission: '7-Speed Dual-Clutch (7-DCT)', region: 'Northampton (KX)' },
    'BP68HJK': { make: 'Peugeot', model: '3008 (1.5 BlueHDi Allure Premium)', year: '2018', engine: '1.5L Diesel (130 bhp)', transmission: '8-Speed EAT8 Automatic (Aisin)', region: 'Birmingham (BP)' },
    'HN21MNO': { make: 'Toyota', model: 'C-HR (1.8 Hybrid Design)', year: '2021', engine: '1.8L Petrol Hybrid (122 bhp)', transmission: 'e-CVT Hybrid Electronic Transmission', region: 'Portsmouth (HN)' },
    'WN17QRS': { make: 'SEAT', model: 'Leon (2.0 TDI FR Technology)', year: '2017', engine: '2.0L Diesel (150 bhp)', transmission: '6-Speed DSG Dual-Clutch (DQ250)', region: 'Exeter (WN)' },
    'YF70TUV': { make: 'Skoda', model: 'Octavia (2.0 TDI SE L DSG)', year: '2020', engine: '2.0L Diesel (150 bhp)', transmission: '7-Speed DSG Dual-Clutch (DQ381)', region: 'Yorkshire (YF)' },
    'BJ15JJV': { make: 'BMW', model: '3 Series (320d M Sport / SE)', year: '2015', engine: '2.0L Diesel (1995cc)', transmission: '8-Speed Steptronic Automatic (ZF 8HP)', region: 'Birmingham (BJ)' },
    'BK64FYM': { make: 'BMW', model: 'X6 (xDrive40d M Sport)', year: '2014', engine: '3.0L Twin-Turbo Diesel (2993cc, 313 bhp)', colour: 'Black', transmission: '8-Speed Steptronic Automatic (ZF 8HP)', region: 'Birmingham (BK)' },
    'PJ65SYE': { make: 'BMW', model: 'X6 (xDrive30d / xDrive40d M Sport)', year: '2015', engine: '3.0L TwinPower Diesel (2993cc, 258 bhp)', colour: 'Black', transmission: '8-Speed Steptronic Automatic (ZF 8HP)', region: 'Preston (PJ)' },
    'CK64WWG': { make: 'BMW', model: 'X6 (xDrive30d / xDrive40d M Sport)', year: '2014', engine: '3.0L Twin-Turbo Diesel (2993cc, 313 bhp)', colour: 'Black', transmission: '8-Speed Steptronic Automatic (ZF 8HP)', region: 'Cardiff (CK)' },
    'BL22XMW': { make: 'Cupra', model: 'Born (V2 58kWh EV)', year: '2022', engine: 'Electric 58kWh (204 bhp)', colour: 'Vapor Grey', transmission: 'Electric Drive Unit (Single-Speed)', region: 'Birmingham (BL)' },
    'MM17ETZ': { make: 'BMW', model: 'X6 (xDrive30d / xDrive40d M Sport)', year: '2017', engine: '3.0L TwinPower Diesel (2993cc, 258 bhp)', colour: 'Black', transmission: '8-Speed Steptronic Automatic (ZF 8HP)', region: 'Manchester (MM)' },
    'FH17TXF': { make: 'Mercedes-Benz', model: 'A-Class (A180d AMG Line / Sport)', year: '2017', engine: '1.5L Diesel (1461cc, 109 bhp)', colour: 'Grey', transmission: '7G-DCT 7-Speed Dual-Clutch Automatic', region: 'Nottingham (FH)' },
    'FH67TXF': { make: 'Mercedes-Benz', model: 'A-Class (A180d AMG Line / Sport)', year: '2017', engine: '1.5L Diesel (1461cc, 109 bhp)', colour: 'Grey', transmission: '7G-DCT 7-Speed Dual-Clutch Automatic', region: 'Nottingham (FH)' },
    'NG61EYW': { make: 'Audi', model: 'A1 (1.6 TDI Sport)', year: '2011', engine: '1.6L Diesel (1598cc, 105 bhp)', colour: 'Black', transmission: '5-Speed Manual Transmission', region: 'Nottingham / East Midlands (NG)' },
    'GV61FJD': { make: 'BMW', model: '3 Series (320d M Sport)', year: '2011', engine: '2.0L TwinPower Diesel (184 bhp)', colour: 'Black', transmission: '8-Speed Steptronic Automatic (ZF 8HP)', region: 'Garden of England (Maidstone, Brighton) (GV)', isVerified: true },
    'EJ63UNL': { make: 'BMW', model: '1 Series (114i Sport)', spec: '114i Sport', year: '2014', engine: '1.6L Petrol (1598cc, 102 bhp)', colour: 'White', transmission: '6-Speed Manual / 8-Speed Steptronic Automatic', gearboxCategory: 'MANUAL', region: 'Essex / Chelmsford (EJ)', isVerified: true },
    'AB12CDE': { make: 'BMW', model: '3 Series (320d EfficientDynamics)', year: '2012', engine: '2.0L Diesel (163 bhp)', transmission: '8-Speed Steptronic Automatic', region: 'Peterborough (AB)' }
  };

  const UK_AREA_MAP = {
    'A': 'Anglia (Peterborough, Norwich, Ipswich)',
    'B': 'Birmingham & West Midlands',
    'C': 'Cymru / Wales (Cardiff, Swansea, Bangor)',
    'D': 'Deeside / Chester',
    'E': 'Essex (Chelmsford)',
    'F': 'Forest & Fens (Nottingham, Lincoln)',
    'G': 'Garden of England (Maidstone, Brighton)',
    'H': 'Hampshire & Dorset (Bournemouth, Portsmouth)',
    'K': 'Milton Keynes, Luton & Northampton',
    'L': 'London (Stanmore, Wimbledon, Sidcup, Borehamwood)',
    'M': 'Manchester & Merseyside',
    'N': 'Newcastle & North East',
    'O': 'Oxford & Thames Valley',
    'P': 'Preston & Cumbria',
    'R': 'Reading & Berkshire',
    'S': 'Scotland (Glasgow, Edinburgh, Aberdeen)',
    'V': 'Severn Valley (Worcester, Hereford)',
    'W': 'West of England (Exeter, Bristol, Truro)',
    'Y': 'Yorkshire (Leeds, Sheffield, Hull, York)'
  };

  // Local Storage Custom Vehicle Overrides
  function getCustomVehicle(cleanPlate) {
    try {
      const stored = localStorage.getItem('gg_reg_' + cleanPlate);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  }

  function saveCustomVehicle(cleanPlate, vehicleData) {
    try {
      localStorage.setItem('gg_reg_' + cleanPlate, JSON.stringify(vehicleData));
      fetch('/api/save-vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reg: cleanPlate, ...vehicleData })
      }).catch(() => {});
    } catch (e) {}
  }

  // ==========================================================================
  // 3. DETERMINISTIC VEHICLE RESOLVER
  // ==========================================================================
  function parseUkRegistration(rawPlate) {
    if (!rawPlate) return null;
    const clean = rawPlate.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length < 3) return null;

    // Check user-saved custom mapping in localStorage first
    const custom = getCustomVehicle(clean);
    if (custom) {
      return {
        formatted: formatUkPlate(clean),
        raw: clean,
        make: custom.make,
        model: custom.model,
        spec: custom.spec || custom.trim || 'Confirmed Spec',
        year: custom.year || '2019',
        engine: custom.engine || 'Confirmed Spec',
        transmission: custom.transmission || 'Automatic / Dual-Clutch / Manual',
        gearboxCategory: custom.gearboxCategory || 'AUTO',
        region: custom.region || 'UK Registered Vehicle',
        isVerified: true,
        isCustom: true
      };
    }

    // Check curated database
    if (CURATED_PLATES[clean]) {
      const match = CURATED_PLATES[clean];
      return {
        formatted: formatUkPlate(clean),
        raw: clean,
        make: match.make,
        model: match.model,
        spec: match.spec || match.trim || (match.model && match.model.includes('(') ? match.model.split('(')[1].replace(')', '').trim() : 'Standard'),
        derivative: `${match.model} (${match.engine})`,
        year: match.year,
        engine: match.engine,
        fuelType: match.engine && match.engine.includes('Diesel') ? 'Diesel' : 'Petrol',
        transmission: match.transmission,
        gearboxCategory: match.transmission.includes('Manual') ? 'MANUAL' : (match.transmission.includes('DSG') || match.transmission.includes('DCT') ? 'DSG' : 'AUTO'),
        region: match.region,
        isVerified: true
      };
    }

    // Standard UK Plate Format: 2 letters, 2 digits, 3 letters (e.g. GV61FJD, EA19XPR)
    const stdMatch = clean.match(/^([A-Z]{2})([0-9]{2})([A-Z]{0,3})$/);
    let resolvedYear = '2020';
    let regionText = 'UK Registered';

    if (stdMatch) {
      const areaPrefix = stdMatch[1];
      const ageNum = parseInt(stdMatch[2], 10);
      const firstChar = areaPrefix.charAt(0);
      if (UK_AREA_MAP[firstChar]) {
        regionText = UK_AREA_MAP[firstChar] + ' (' + areaPrefix + ')';
      }

      if (ageNum >= 51 && ageNum <= 76) {
        resolvedYear = String(2000 + (ageNum - 50));
      } else if (ageNum >= 1 && ageNum <= 26) {
        resolvedYear = String(2000 + ageNum);
      }
    } else {
      const hash = getDeterministicHash(clean);
      const yearOffset = (hash % 16);
      resolvedYear = String(2008 + yearOffset);
    }

    return {
      formatted: formatUkPlate(clean),
      raw: clean,
      make: '',
      model: '',
      spec: '',
      variant: '',
      derivative: '',
      year: resolvedYear,
      engine: '',
      fuelType: '',
      transmission: 'Automatic / Dual-Clutch / Manual',
      region: regionText,
      isVerified: false,
      found: false
    };
  }

  function formatUkPlate(str) {
    if (!str) return '';
    const clean = str.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length > 4 && /^[A-Z]{2}[0-9]{2}/.test(clean)) {
      return clean.substring(0, 4) + ' ' + clean.substring(4);
    }
    return clean;
  }

  function getDeterministicHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  // ==========================================================================
  // 4. MODAL POPUP & DYNAMIC MAKE/MODEL DROPDOWNS
  // ==========================================================================
  function setupModal() {
    if (document.getElementById('quote-modal-backdrop')) return;

    const modalMarkup = `
      <div id="quote-modal-backdrop" class="modal-backdrop">
        <div class="modal-content" style="max-width:620px; max-height:90vh; overflow-y:auto; padding:2rem 2.25rem; border:1px solid rgba(255,255,255,0.1); background:#111216; border-radius:14px; box-shadow:0 25px 60px rgba(0,0,0,0.85); position:relative;">
          <button class="modal-close-btn" onclick="window.closeQuoteModal()" aria-label="Close modal" style="position:absolute; top:1.25rem; right:1.25rem; width:36px; height:36px; display:inline-flex; align-items:center; justify-content:center; border-radius:50%; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#94a3b8; cursor:pointer; z-index:20; transition:all 0.2s ease;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="modal-header-intro" style="margin-bottom:1.35rem; padding-right:3rem;">
            <span style="font-size:0.75rem; font-weight:800; color:var(--amber-400); text-transform:uppercase; letter-spacing:0.06em; display:inline-flex; align-items:center; gap:6px;">
              <span style="width:6px; height:6px; border-radius:50%; background:var(--amber-400); box-shadow:0 0 8px var(--amber-400);"></span>
              Free Recovery & Fast Diagnostic Estimate
            </span>
            <h2 id="modal-quote-heading" style="font-size:1.85rem; color:#fff; margin:0.25rem 0 0.35rem; font-weight:800; font-family:var(--font-heading); letter-spacing:-0.02em;">
              REQUEST A <span class="highlight-amber">QUOTE</span>
            </h2>
            <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.45; margin:0;">
              Up to 60% cheaper than main dealer. 12-Month warranty included with free nationwide collection.
            </p>
          </div>

          <form id="main-quote-form" onsubmit="window.handleQuoteFormSubmit(event)">
            
            <!-- SECTION 1: VEHICLE DETAILS -->
            <div style="margin-bottom:1.35rem; padding-bottom:1.15rem; border-bottom:1px solid rgba(255,255,255,0.07);">
              <label style="display:flex; justify-content:space-between; align-items:center; font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.55rem;">
                <span>1. Vehicle Registration</span>
              </label>
              
              <div class="modal-reg-input-group" style="display:flex; gap:0.5rem; align-items:center; width:100%; box-sizing:border-box;">
                <div class="uk-reg-box" style="height:46px !important; flex:1 1 auto; min-width:0; box-sizing:border-box;">
                  <div class="uk-reg-flag" style="font-size:7px; padding:0 0.5rem; flex-shrink:0;">
                    <svg viewBox="0 0 60 30" width="13" height="7"><path d="M0 0h60v30H0z" fill="#012169"/><path d="m0 0 60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="m0 0 60 30m0-30L0 30" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></svg>
                    <span>UK</span>
                  </div>
                  <input type="text" id="quote-reg-input" class="uk-reg-input" placeholder="ENTER REG" style="font-size:1.1rem; width:100%; text-align:center;" maxlength="8" oninput="window.handleRegLookup(this.value, 'modal')" onkeydown="if(event.key==='Enter'){event.preventDefault();window.triggerRegLookup('modal');}">
                </div>
                <button type="button" class="btn btn-secondary" onclick="window.triggerRegLookup('modal')" style="height:46px !important; padding:0 1rem !important; font-size:0.82rem; font-weight:800; flex-shrink:0; white-space:nowrap; border-radius:9999px;">
                  FIND VEHICLE
                </button>
              </div>

              <!-- Live Verification Result Badge -->
              <div id="modal-reg-lookup-result"></div>

              <!-- Manual Vehicle Specification Dropdowns -->
              <div id="vehicle-spec-section" style="margin-top:1rem; padding-top:0.85rem; border-top:1px dashed rgba(255,255,255,0.08); transition:all 0.3s ease;">
                <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:0.6rem;">
                  Or Select Vehicle Manually:
                </div>

                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.75rem;">
                  <div class="form-group" style="margin-bottom:0;">
                    <label class="form-label" style="font-size:0.78rem;" for="quote-make-select">Make</label>
                    <select id="quote-make-select" class="form-select" onchange="window.handleMakeSelectChange(this.value, 'modal', true)" style="padding:0.65rem 0.85rem; font-size:0.88rem;">
                      <option value="">-- Select Make --</option>
                    </select>
                  </div>
                  <div class="form-group" style="margin-bottom:0;">
                    <label class="form-label" style="font-size:0.78rem;" for="quote-model-select">Model</label>
                    <select id="quote-model-select" class="form-select" onchange="window.handleModelSelectChange(this.value, 'modal', true)" style="padding:0.65rem 0.85rem; font-size:0.88rem;">
                      <option value="">-- Select Model --</option>
                    </select>
                  </div>
                </div>

                <div style="display:grid; grid-template-columns:1.3fr 0.7fr; gap:0.75rem;">
                  <div class="form-group" style="margin-bottom:0;">
                    <label class="form-label" style="font-size:0.78rem;" for="quote-transmission-select">Transmission</label>
                    <select id="quote-transmission-select" class="form-select" onchange="window.handleTransSelectChange(this.value, 'modal', true)" style="padding:0.65rem 0.85rem; font-size:0.88rem;">
                      <option value="Manual">Manual</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Semi-Automatic">Semi-Automatic</option>
                    </select>
                  </div>
                  <div class="form-group" style="margin-bottom:0;">
                    <label class="form-label" style="font-size:0.78rem;" for="quote-year-input">Year</label>
                    <input type="text" id="quote-year-input" class="form-input" placeholder="2018" oninput="window.handleYearInputChange(this.value, 'modal', true)" style="padding:0.65rem 0.85rem; font-size:0.88rem;">
                  </div>
                </div>

                <input type="hidden" id="quote-make">
                <input type="hidden" id="quote-model">
              </div>
            </div>

            <!-- SECTION 2: CUSTOMER CONTACT & LOCATION -->
            <div style="margin-bottom:1.25rem;">
              <div style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em; margin-bottom:0.65rem;">
                2. Your Details
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:0.75rem;">
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.78rem;" for="quote-name">Full Name *</label>
                  <input type="text" id="quote-name" class="form-input" placeholder="John Smith" required style="padding:0.7rem 0.85rem; font-size:0.9rem;">
                </div>
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.78rem;" for="quote-phone">Phone Number *</label>
                  <input type="tel" id="quote-phone" class="form-input" placeholder="07123 456789" required style="padding:0.7rem 0.85rem; font-size:0.9rem;">
                </div>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.78rem;" for="quote-email">Email Address *</label>
                  <input type="email" id="quote-email" class="form-input" placeholder="john@example.co.uk" required style="padding:0.7rem 0.85rem; font-size:0.9rem;">
                </div>
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.78rem;" for="quote-postcode">Postcode / City *</label>
                  <input type="text" id="quote-postcode" class="form-input" placeholder="e.g. RG1 1AA" required style="padding:0.7rem 0.85rem; font-size:0.9rem;">
                </div>
              </div>
            </div>

            <!-- SECTION 3: SERVICE TYPE & FAULT DESCRIPTION -->
            <div style="margin-bottom:1.25rem;">
              <div style="display:grid; grid-template-columns:1fr; gap:0.75rem;">
                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.78rem;" for="quote-service-type">Required Service</label>
                  <select id="quote-service-type" class="form-select" style="padding:0.7rem 0.85rem; font-size:0.9rem;">
                    <option value="Gearbox Repair / Diagnostic">Gearbox Repair / Diagnostic Booking</option>
                    <option value="Gearbox Reconditioning">Gearbox Reconditioning (OEM Standard)</option>
                    <option value="Gearbox Replacement">Gearbox Replacement</option>
                    <option value="Clutch & Dual-Mass Flywheel">Clutch & Dual-Mass Flywheel</option>
                    <option value="Automatic / DSG Mechatronics">Automatic / DSG Mechatronics</option>
                    <option value="Emergency Recovery & Diagnostics">Emergency Free Recovery</option>
                  </select>
                </div>

                <div class="form-group" style="margin-bottom:0;">
                  <label class="form-label" style="font-size:0.78rem;" for="quote-desc">Fault Symptoms <span style="font-weight:400; text-transform:none; color:var(--text-muted);">(Optional)</span></label>
                  <textarea id="quote-desc" class="form-textarea" rows="2" placeholder="e.g. grinding noise, slipping in 2nd/3rd gear, warning light on..." style="padding:0.65rem 0.85rem; font-size:0.88rem; min-height:55px;"></textarea>
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-full btn-lg" style="margin-top:0.35rem; font-size:1.05rem; padding:0.85rem 1.5rem; border-radius:8px; font-weight:800; letter-spacing:0.02em;">
              Submit Quote Request →
            </button>

            <div style="display:flex; align-items:center; justify-content:center; gap:1rem; margin-top:1rem; font-size:0.76rem; color:var(--text-muted); flex-wrap:wrap;">
              <span> 100% Confidential</span>
              <span>12-Month Warranty</span>
              <span> Free Collection</span>
              <span> 0% Finance</span>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalMarkup);
    populateMakeDropdown('modal');
  }

  function populateMakeDropdown(scope = 'modal') {
    const makeSelectId = scope === 'page' ? 'quote-make-select-page' : 'quote-make-select';
    const makeSelect = document.getElementById(makeSelectId);
    if (!makeSelect) return;

    const currentVal = makeSelect.value;
    makeSelect.innerHTML = '<option value="">-- Select Manufacturer --</option>';

    const makes = Object.keys(CAR_DATABASE);
    makes.forEach(make => {
      const opt = document.createElement('option');
      opt.value = make;
      opt.textContent = make;
      makeSelect.appendChild(opt);
    });

    if (currentVal) {
      makeSelect.value = currentVal;
    }
  }

  function handleMakeSelectChange(selectedMake, scope = 'modal', isUserAction = false) {
    const modelSelectId = scope === 'page' ? 'quote-model-select-page' : 'quote-model-select';
    const modelSelect = document.getElementById(modelSelectId);
    const hiddenMake = document.getElementById(scope === 'page' ? 'quote-make-page' : 'quote-make');
    
    if (hiddenMake) hiddenMake.value = selectedMake;
    if (!modelSelect) return;

    modelSelect.innerHTML = '<option value="">-- Select Model --</option>';

    if (selectedMake && CAR_DATABASE[selectedMake]) {
      const makeData = CAR_DATABASE[selectedMake];
      makeData.models.forEach(model => {
        const opt = document.createElement('option');
        opt.value = model;
        opt.textContent = model;
        modelSelect.appendChild(opt);
      });

      const transSelectId = scope === 'page' ? 'quote-transmission-select-page' : 'quote-transmission-select';
      const transSelect = document.getElementById(transSelectId);
      if (transSelect && makeData.transmissions && makeData.transmissions.length > 0) {
        const firstTrans = makeData.transmissions[0];
        for (let i = 0; i < transSelect.options.length; i++) {
          if (transSelect.options[i].text.toLowerCase().includes(firstTrans.substring(0, 8).toLowerCase())) {
            transSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    if (isUserAction) { persistCurrentSelection(scope); }
  }

  function handleModelSelectChange(selectedModel, scope = 'modal', isUserAction = false) {
    const hiddenModel = document.getElementById(scope === 'page' ? 'quote-model-page' : 'quote-model');
    if (hiddenModel) hiddenModel.value = selectedModel;
    if (isUserAction) { persistCurrentSelection(scope); }
  }

  function handleTransSelectChange(selectedTrans, scope = 'modal', isUserAction = false) {
    if (isUserAction) { persistCurrentSelection(scope); }
  }

  function handleYearInputChange(yearVal, scope = 'modal', isUserAction = false) {
    if (isUserAction) { persistCurrentSelection(scope); }
  }

  function persistCurrentSelection(scope = 'modal') {
    const regInputId = scope === 'page' ? 'quote-reg-input-page' : 'quote-reg-input';
    const regInput = document.getElementById(regInputId);
    if (!regInput || !regInput.value) return;

    const clean = regInput.value.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length < 3) return;

    const makeSelect = document.getElementById(scope === 'page' ? 'quote-make-select-page' : 'quote-make-select');
    const modelSelect = document.getElementById(scope === 'page' ? 'quote-model-select-page' : 'quote-model-select');
    const transSelect = document.getElementById(scope === 'page' ? 'quote-transmission-select-page' : 'quote-transmission-select');
    const yearInput = document.getElementById(scope === 'page' ? 'quote-year-input-page' : 'quote-year-input');

    const make = makeSelect ? makeSelect.value : '';
    const model = modelSelect ? modelSelect.value : '';
    const transmission = transSelect ? transSelect.value : '';
    const year = yearInput ? yearInput.value : '';

    if (make) {
      saveCustomVehicle(clean, { make, model, transmission, year });
      // Update result badge text
      const resultElemId = scope === 'page' ? 'reg-lookup-result' : 'modal-reg-lookup-result';
      const resultElem = document.getElementById(resultElemId);
      if (resultElem) {
        resultElem.innerHTML = `
          <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.4); border-radius:6px; padding:0.75rem 1rem; margin-top:0.5rem; text-align:left;">
            <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.35rem; flex-wrap:wrap; gap:0.5rem;">
              <div style="display:flex; align-items:center; gap:0.4rem;">
                <span style="background:#10b981; color:#fff; font-size:0.7rem; font-weight:800; padding:2px 6px; border-radius:4px; text-transform:uppercase;">✓ VEHICLE CONFIRMED</span>
                <span style="font-size:0.95rem; font-weight:800; color:#fff;">${year} ${make}</span>
              </div>
              <span style="font-size:0.75rem; color:var(--text-muted);">Saved to registration</span>
            </div>
            <div style="font-size:0.88rem; color:var(--amber-400); font-weight:700; margin-bottom:0.25rem;">
              ${model || 'Model Selected'}
            </div>
            <div style="font-size:0.78rem; color:var(--text-secondary);">
              <span><strong>Gearbox:</strong> ${transmission}</span>
            </div>
          </div>
        `;
      }
    }
  }

  
  // ==========================================================================
  // VEHICLE SESSION PERSISTENCE HELPERS
  // ==========================================================================
  function saveActiveVehicle(vehicleData) {
    if (!vehicleData) return;
    try {
      sessionStorage.setItem('gg_active_vehicle', JSON.stringify(vehicleData));
      localStorage.removeItem('gg_active_vehicle');
    } catch (e) {}

    // Auto-populate all .uk-reg-input across the current page
    const plateFormatted = vehicleData.formatted || formatUkPlate(vehicleData.reg || vehicleData.raw || '');
    if (plateFormatted) {
      document.querySelectorAll('.uk-reg-input').forEach(input => {
        if (!input.value || input.value.trim().toUpperCase().replace(/\s+/g, '') !== plateFormatted.toUpperCase().replace(/\s+/g, '')) {
          input.value = plateFormatted;
        }
      });
    }

    try {
      window.dispatchEvent(new CustomEvent('gg:vehicle-changed', { detail: { vehicle: vehicleData } }));
    } catch (e) {}
  }

  function getActiveVehicle() {
    try {
      const data = sessionStorage.getItem('gg_active_vehicle');
      if (data) return JSON.parse(data);
      // Clean up legacy localStorage if found
      localStorage.removeItem('gg_active_vehicle');
      return null;
    } catch (e) {
      return null;
    }
  }

  function clearActiveVehicle(scope = 'modal') {
    try {
      sessionStorage.removeItem('gg_active_vehicle');
      localStorage.removeItem('gg_active_vehicle');
    } catch (e) {}

    // Clear all reg inputs on the page
    document.querySelectorAll('.uk-reg-input').forEach(input => {
      input.value = '';
    });

    // Clear lookup results
    const modalRes = document.getElementById('modal-reg-lookup-result');
    if (modalRes) modalRes.innerHTML = '';
    const pageRes = document.getElementById('reg-lookup-result');
    if (pageRes) pageRes.innerHTML = '';

    // Show manual dropdowns
    const modalSpec = document.getElementById('vehicle-spec-section');
    if (modalSpec) modalSpec.style.display = 'block';
    const pageSpec = document.getElementById('vehicle-spec-section-page');
    if (pageSpec) pageSpec.style.display = 'block';

    // Reset hidden inputs
    ['quote-make', 'quote-model', 'quote-make-page', 'quote-model-page'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });

    // Focus input
    const inputId = scope === 'page' ? 'quote-reg-input-page' : 'quote-reg-input';
    const input = document.getElementById(inputId) || document.querySelector('.uk-reg-input');
    if (input) {
      input.focus();
    }

    try {
      window.dispatchEvent(new CustomEvent('gg:vehicle-changed', { detail: { vehicle: null } }));
    } catch (e) {}
  }

  // ==========================================================================
  // 5. LIVE REGISTRATION LOOKUP HANDLER (ONLINE DVLA API + LOCAL FALLBACK)
  // ==========================================================================
  function isGenuineUkPlate(str) {
    if (!str || typeof str !== 'string') return false;
    const clean = str.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (clean.length < 2 || clean.length > 8) return false;
    // Real UK plates ALWAYS contain digits (towns/counties like CRAWLEY, LONDON, OXFORD do not)
    if (!/[0-9]/.test(clean)) return false;
    return /^[A-Z]{1,3}[0-9]{1,4}[A-Z]{0,3}$|^[0-9]{1,4}[A-Z]{1,3}$/.test(clean);
  }

  let lookupDebounceTimer = null;

  function handleRegLookup(value, scope = 'modal') {
    clearTimeout(lookupDebounceTimer);
    const clean = (value || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    // Smooth typing: only execute background fetch if user entered a genuine UK plate pattern with digits (>= 5 chars)
    if (isGenuineUkPlate(clean) && clean.length >= 5) {
      lookupDebounceTimer = setTimeout(() => {
        executeRegLookup(clean, scope);
      }, 700);
    } else {
      const resultElemId = scope === 'page' ? 'reg-lookup-result' : 'modal-reg-lookup-result';
      const resultElem = document.getElementById(resultElemId);
      if (resultElem && clean.length === 0) {
        resultElem.innerHTML = '';
      }
    }
  }

  async function executeRegLookup(value, scope = 'modal') {
    const resultElemId = scope === 'page' ? 'reg-lookup-result' : 'modal-reg-lookup-result';
    const resultElem = document.getElementById(resultElemId);
    if (!resultElem) return;

    const clean = (value || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

    if (!clean || clean.length < 3) {
      resultElem.innerHTML = '';
      const specSectionId = scope === 'page' ? 'vehicle-spec-section-page' : 'vehicle-spec-section';
      const specSection = document.getElementById(specSectionId);
      if (specSection) specSection.style.display = 'block';
      return;
    }

    // 1. Instant local curated check
    const localMatch = parseUkRegistration(clean);
    if (localMatch && localMatch.isVerified && localMatch.make && localMatch.make !== 'UK Registered') {
      saveActiveVehicle(localMatch);
      renderVehicleResult(localMatch, clean, scope, true);
      syncVehicleToForm(localMatch, scope);
      return;
    }

    // Show quick checking state
    resultElem.innerHTML = `
      <div style="font-size:0.8rem; color:var(--amber-400); display:flex; align-items:center; gap:0.5rem; margin-top:0.4rem;">
        <span style="display:inline-block; animation:spin 1s linear infinite;"></span>
        <span>Checking official DVSA MOT records for <strong>${formatUkPlate(clean)}</strong>...</span>
      </div>
    `;

    // 2. Try live server API (Official DVSA MOT History API / Cache)
    try {
      const res = await fetch('/api/vehicle-lookup?reg=' + encodeURIComponent(clean));
      if (res.ok) {
        const liveData = await res.json();
        if (liveData && liveData.found !== false && liveData.make && liveData.make !== 'UK Registered' && liveData.make !== 'Vehicle') {
          saveActiveVehicle(liveData);
          renderVehicleResult(liveData, clean, scope, true);
          syncVehicleToForm(liveData, scope);
          return;
        }
      }
    } catch (e) {
      console.warn("Live MOT API lookup note:", e);
    }

    // 3. Not Found - Do NOT put an incorrect vehicle
    renderNotFoundResult(clean, scope);
  }

  function renderNotFoundResult(cleanPlate, scope) {
    const resultElemId = scope === 'page' ? 'reg-lookup-result' : 'modal-reg-lookup-result';
    const resultElem = document.getElementById(resultElemId);
    if (!resultElem) return;

    const parsed = parseUkRegistration(cleanPlate);
    const yearText = parsed && parsed.year ? parsed.year : '2011';
    const regionText = parsed && parsed.region ? parsed.region : 'UK Registered';

    if (parsed && parsed.year) {
      syncVehicleToForm({ year: parsed.year, transmission: 'Automatic' }, scope);
    }

    resultElem.innerHTML = `
      <div class="diag-fade-in" style="background:rgba(245, 158, 11, 0.08); border:1px solid rgba(245, 158, 11, 0.35); border-radius:8px; padding:0.75rem 1rem; margin-top:0.65rem; text-align:left;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; flex-wrap:wrap;">
          <div style="display:flex; align-items:center; gap:0.45rem;">
            <span style="background:var(--amber-400); color:#000; font-size:0.68rem; font-weight:800; padding:2px 6px; border-radius:4px; text-transform:uppercase;">UK REGISTERED</span>
            <span style="font-size:0.88rem; font-weight:700; color:#ffffff;">Plate: <strong>${formatUkPlate(cleanPlate)}</strong> • Year: <strong>${yearText}</strong> (${regionText})</span>
          </div>
          <button type="button" onclick="window.focusVehicleSelect('${scope}')" style="background:none; border:none; color:var(--amber-400); font-weight:700; cursor:pointer; text-decoration:underline; font-size:0.78rem; padding:0;">
            Confirm Make & Model Below ↓
          </button>
        </div>
      </div>
    `;

    // Ensure manual vehicle specification dropdowns are open and ready for user selection
    const specSectionId = scope === 'page' ? 'vehicle-spec-section-page' : 'vehicle-spec-section';
    const specSection = document.getElementById(specSectionId);
    if (specSection) specSection.style.display = 'block';
  }

  function renderVehicleResult(vehicle, cleanPlate, scope, isLiveDvla) {
    const resultElemId = scope === 'page' ? 'reg-lookup-result' : 'modal-reg-lookup-result';
    const resultElem = document.getElementById(resultElemId);
    if (!resultElem) return;

    if (!vehicle.isVerified || !vehicle.make || vehicle.make === 'UK Registered') {
      resultElem.innerHTML = `
        <div class="diag-fade-in" style="background:rgba(245,158,11,0.06); border:1px solid rgba(245,158,11,0.25); border-radius:8px; padding:0.75rem 1rem; margin-top:0.65rem; text-align:left;">
          <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:0.45rem;">
              <span style="background:#f59e0b; color:#000; font-size:0.68rem; font-weight:800; padding:2px 6px; border-radius:4px; text-transform:uppercase;">DECODED</span>
              <span style="font-size:0.92rem; font-weight:800; color:#fff;">${vehicle.year || 'UK'} Registration (${formatUkPlate(cleanPlate)})</span>
            </div>
            <div style="display:flex; align-items:center; gap:0.65rem;">
              <button type="button" onclick="window.focusVehicleSelect('${scope}')" style="background:none; border:none; color:var(--amber-400); font-weight:700; cursor:pointer; text-decoration:underline; font-size:0.75rem; padding:0;">
                Select Make & Model ↓
              </button>
              <button type="button" onclick="window.clearActiveVehicle('${scope}')" style="background:none; border:none; color:var(--text-muted); font-weight:600; cursor:pointer; text-decoration:underline; font-size:0.75rem; padding:0;">
                Clear ✕
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // Hide manual selection dropdowns when vehicle is verified
    const specSectionId = scope === 'page' ? 'vehicle-spec-section-page' : 'vehicle-spec-section';
    const specSection = document.getElementById(specSectionId);
    if (specSection) specSection.style.display = 'none';

    const currentCat = (vehicle.gearboxCategory || (vehicle.transmission && vehicle.transmission.toLowerCase().includes('manual') ? 'MANUAL' : (vehicle.transmission && (vehicle.transmission.toLowerCase().includes('semi') || vehicle.transmission.toLowerCase().includes('dsg') || vehicle.transmission.toLowerCase().includes('dct')) ? 'SEMI_AUTO' : 'AUTO'))).toUpperCase();
    const currentGearbox = currentCat === 'MANUAL' ? 'Manual' : (currentCat === 'DSG' || currentCat === 'SEMI_AUTO' ? 'Semi-Automatic' : 'Automatic');
    const displayModel = (vehicle.baseModel || vehicle.model || '-').split('(')[0].trim();
    let cleanSpec = vehicle.spec || vehicle.variant || vehicle.derivative || (vehicle.model && vehicle.model.includes('(') ? vehicle.model.split('(')[1].replace(')', '').trim() : (vehicle.engine || 'Standard'));
    cleanSpec = (cleanSpec || 'Standard').replace(/\b([A-Za-z]+)\s+\1\b/gi, '$1').trim();
    const displayEngine = vehicle.engineCapacity ? `${(vehicle.engineCapacity/1000).toFixed(1)}L (${vehicle.engineCapacity}cc)` : (vehicle.engine || '-');
    const rawFuel = vehicle.fuelType || vehicle.fuel || 'Petrol';
    const cleanFuel = (rawFuel || 'Petrol').replace(/\b([A-Za-z]+)\s+\1\b/gi, '$1').trim();
    const firstUsedVal = vehicle.firstUsedDate || vehicle.firstRegistered || `${vehicle.year || '-'}`;

    resultElem.innerHTML = `
      <!-- Desktop View (2-Line Concise Layout) -->
      <div class="veh-card-desktop diag-fade-in" style="background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.3); border-radius:8px; padding:0.85rem 1.15rem; margin-top:0.65rem; text-align:left;">
        <!-- Line 1: Bigger Reg + Title + Gearbox Above + MOT Badge + Change Reg Button -->
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.6rem; flex-wrap:wrap; margin-bottom:0.45rem;">
          <div style="display:flex; align-items:center; gap:0.75rem; flex-wrap:wrap;">
            <span style="background:#ffb703; color:#0d121d; font-family:var(--font-heading), sans-serif; font-size:0.96rem; font-weight:900; padding:4px 11px; border-radius:5px; letter-spacing:0.06em; box-shadow:0 1px 4px rgba(0,0,0,0.3); display:inline-block;">
              ${vehicle.registration || vehicle.formatted || 'UK MATCH'}
            </span>
            <span style="font-size:1.15rem; font-weight:900; color:#fff; font-family:var(--font-heading);">
              ${vehicle.year || ''} ${vehicle.make} ${displayModel}
            </span>
            <span style="color:rgba(255,255,255,0.25);">&bull;</span>
            <span style="font-size:0.92rem; color:var(--amber-400); font-weight:800; background:rgba(245,158,11,0.1); border:1px solid rgba(245,158,11,0.3); padding:2px 9px; border-radius:5px;">
              Gearbox: ${currentGearbox}
            </span>
          </div>
          <div style="display:flex; align-items:center; gap:0.6rem;">
            ${vehicle.motStatus ? `<span style="background:rgba(34,197,94,0.18); color:#4ade80; border:1px solid rgba(34,197,94,0.35); font-size:0.74rem; font-weight:800; padding:3px 9px; border-radius:9999px;">✓ MOT ${vehicle.motStatus}</span>` : ''}
            <button type="button" onclick="window.clearActiveVehicle('${scope}')" style="background:none; border:none; color:var(--amber-400); font-weight:700; cursor:pointer; text-decoration:underline; font-size:0.75rem; padding:0;">
              Change Reg 
            </button>
          </div>
        </div>

        <!-- Line 2: All Specific Details with Spec + Quick Selector (No redundant make/model) -->
        <div style="font-size:0.78rem; color:#cbd5e1; display:flex; flex-wrap:wrap; align-items:center; justify-content:space-between; gap:0.4rem 0.6rem; border-top:1px solid rgba(255,255,255,0.06); padding-top:0.35rem; margin-top:0.25rem;">
          <div style="display:flex; flex-wrap:wrap; align-items:center; gap:0.35rem 0.55rem;">
            <span><strong style="color:#94a3b8;">Spec:</strong> ${cleanSpec}</span>
            <span style="color:rgba(255,255,255,0.2);">&bull;</span>
            <span><strong style="color:#94a3b8;">Year:</strong> ${vehicle.year || '-'}</span>
            <span style="color:rgba(255,255,255,0.2);">&bull;</span>
            <span><strong style="color:#94a3b8;">Engine:</strong> ${displayEngine}</span>
            <span style="color:rgba(255,255,255,0.2);">&bull;</span>
            <span><strong style="color:#94a3b8;">Fuel:</strong> ${cleanFuel}</span>
            <span style="color:rgba(255,255,255,0.2);">&bull;</span>
            <span><strong style="color:#94a3b8;">Colour:</strong> ${vehicle.colour || 'Confirmed'}</span>
          </div>
          <div style="display:inline-flex; gap:5px; flex-wrap:wrap;">
            <button type="button" onclick="window.selectVehicleGearboxSpec('MANUAL', '${scope}')" style="cursor:pointer; background:${currentCat === 'MANUAL' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${currentCat === 'MANUAL' ? 'var(--amber-400)' : 'rgba(255,255,255,0.15)'}; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.72rem; font-weight:800; display:inline-flex; align-items:center; gap:4px; transition:all 0.2s;">
               Manual
            </button>
            <button type="button" onclick="window.selectVehicleGearboxSpec('AUTO', '${scope}')" style="cursor:pointer; background:${currentCat === 'AUTO' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${currentCat === 'AUTO' ? 'var(--amber-400)' : 'rgba(255,255,255,0.15)'}; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.72rem; font-weight:800; display:inline-flex; align-items:center; gap:4px; transition:all 0.2s;">
               Automatic
            </button>
            <button type="button" onclick="window.selectVehicleGearboxSpec('SEMI_AUTO', '${scope}')" style="cursor:pointer; background:${(currentCat === 'SEMI_AUTO' || currentCat === 'DSG') ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${(currentCat === 'SEMI_AUTO' || currentCat === 'DSG') ? 'var(--amber-400)' : 'rgba(255,255,255,0.15)'}; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.72rem; font-weight:800; display:inline-flex; align-items:center; gap:4px; transition:all 0.2s;">
               Semi-Auto
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile & Tablet View (Matching Screenshot) -->
      <div class="veh-card-mobile veh-mob-container diag-fade-in">
        <!-- Top Row: Reg Plate + MOT Badge + Change Reg -->
        <div style="display:flex; align-items:center; justify-content:space-between; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.4rem;">
          <span style="background:#ffb703; color:#0d121d; font-family:var(--font-heading), sans-serif; font-size:0.95rem; font-weight:900; padding:4px 11px; border-radius:5px; letter-spacing:0.06em; box-shadow:0 1px 4px rgba(0,0,0,0.3); display:inline-block;">
            ${vehicle.registration || vehicle.formatted || 'UK MATCH'}
          </span>
          <div style="display:flex; align-items:center; gap:0.5rem;">
            ${vehicle.motStatus ? `<span style="background:rgba(34,197,94,0.18); color:#4ade80; border:1px solid rgba(34,197,94,0.35); font-size:0.75rem; font-weight:800; padding:3px 10px; border-radius:9999px;">✓ MOT ${vehicle.motStatus}</span>` : ''}
            <button type="button" onclick="window.clearActiveVehicle('${scope}')" style="background:none; border:none; color:var(--amber-400); font-weight:700; cursor:pointer; text-decoration:underline; font-size:0.75rem; padding:0;">
              Change Reg 
            </button>
          </div>
        </div>

        <!-- Big Title & Subtitle -->
        <div class="veh-mob-header">
          <div class="veh-mob-title">${vehicle.make} ${displayModel}</div>
          <div class="veh-mob-sub">${cleanFuel} &bull; ${displayEngine} &bull; ${vehicle.year || '-'}</div>
        </div>

        <!-- 2-Column Specification Grid with Dashed Lines -->
        <div class="veh-mob-grid">
          <div class="veh-mob-cell">
            <div class="veh-mob-label">COLOUR</div>
            <div class="veh-mob-val">${vehicle.colour || 'Confirmed'}</div>
          </div>
          <div class="veh-mob-cell">
            <div class="veh-mob-label">FIRST USED</div>
            <div class="veh-mob-val">${firstUsedVal}</div>
          </div>
          <div class="veh-mob-cell">
            <div class="veh-mob-label" style="color:var(--amber-400);">GEARBOX</div>
            <div class="veh-mob-val amber">${currentGearbox}</div>
          </div>
          <div class="veh-mob-cell">
            <div class="veh-mob-label">SPEC</div>
            <div class="veh-mob-val">${cleanSpec}</div>
          </div>
        </div>

        <!-- Mobile Quick Transmission Toggle Row -->
        <div style="border-top:1px solid rgba(255,255,255,0.08); padding-top:0.75rem; margin-top:0.75rem; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:0.5rem;">
          <div style="font-size:0.72rem; font-weight:800; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.04em;">
            Select Gearbox:
          </div>
          <div style="display:inline-flex; gap:6px; flex-wrap:wrap;">
            <button type="button" onclick="window.selectVehicleGearboxSpec('MANUAL', '${scope}')" style="cursor:pointer; background:${currentCat === 'MANUAL' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${currentCat === 'MANUAL' ? 'var(--amber-400)' : 'rgba(255,255,255,0.15)'}; color:#fff; padding:4px 10px; border-radius:6px; font-size:0.75rem; font-weight:800; display:inline-flex; align-items:center; gap:4px; transition:all 0.2s;">
               Manual
            </button>
            <button type="button" onclick="window.selectVehicleGearboxSpec('AUTO', '${scope}')" style="cursor:pointer; background:${currentCat === 'AUTO' ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${currentCat === 'AUTO' ? 'var(--amber-400)' : 'rgba(255,255,255,0.15)'}; color:#fff; padding:4px 10px; border-radius:6px; font-size:0.75rem; font-weight:800; display:inline-flex; align-items:center; gap:4px; transition:all 0.2s;">
               Automatic
            </button>
            <button type="button" onclick="window.selectVehicleGearboxSpec('SEMI_AUTO', '${scope}')" style="cursor:pointer; background:${(currentCat === 'SEMI_AUTO' || currentCat === 'DSG') ? 'rgba(245,158,11,0.25)' : 'rgba(255,255,255,0.05)'}; border:1px solid ${(currentCat === 'SEMI_AUTO' || currentCat === 'DSG') ? 'var(--amber-400)' : 'rgba(255,255,255,0.15)'}; color:#fff; padding:4px 10px; border-radius:6px; font-size:0.75rem; font-weight:800; display:inline-flex; align-items:center; gap:4px; transition:all 0.2s;">
               Semi-Auto
            </button>
          </div>
        </div>
      </div>
    `;
  }

  window.selectVehicleGearboxSpec = function(type, scope = 'modal') {
    const v = getActiveVehicle();
    if (!v) return;
    if (type === 'MANUAL') {
      v.gearboxCategory = 'MANUAL';
      v.transmission = 'Manual';
      v.gearboxFamily = 'Manual';
      v.gearboxCode = 'MANUAL';
    } else if (type === 'SEMI_AUTO' || type === 'DSG') {
      v.gearboxCategory = 'DSG';
      v.transmission = 'Semi-Automatic';
      v.gearboxFamily = 'Semi-Automatic';
      v.gearboxCode = 'SEMI-AUTO';
    } else {
      v.gearboxCategory = 'AUTO';
      v.transmission = 'Automatic';
      v.gearboxFamily = 'Automatic';
      v.gearboxCode = 'AUTOMATIC';
    }
    saveActiveVehicle(v);
    renderVehicleResult(v, v.reg || '', scope, true);
    syncVehicleToForm(v, scope);
  };

  function toggleVehicleGearboxType(type, scope = 'modal') {
    const v = getActiveVehicle();
    if (!v) return;

    if (type === 'MANUAL') {
      v.gearboxCategory = 'MANUAL';
      v.gearboxFamily = v.manualFamily || `${v.make} 5/6-Speed Manual Transmission`;
      v.gearboxCode = 'MT-6SPEED';
      v.transmission = v.gearboxFamily;
    } else {
      v.gearboxCategory = v.automaticCategory || 'AUTO';
      v.gearboxFamily = v.automaticFamily || v.gearboxFamily;
      v.gearboxCode = v.automaticCode || 'AUTO-OEM';
      v.transmission = v.gearboxFamily;
    }

    saveActiveVehicle(v);
    renderVehicleResult(v, v.reg || '', scope, true);
    syncVehicleToForm(v, scope);
  }

  function focusVehicleSelect(scope = 'modal') {
    const isPage = scope === 'page';
    const specSectionId = isPage ? 'vehicle-spec-section-page' : 'vehicle-spec-section';
    const specSection = document.getElementById(specSectionId);
    if (specSection) {
      specSection.style.display = 'block';
      specSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    const makeSelectId = isPage ? 'quote-make-select-page' : 'quote-make-select';
    const makeSelect = document.getElementById(makeSelectId);
    if (makeSelect) {
      makeSelect.focus();
      makeSelect.style.borderColor = 'var(--amber-400)';
      makeSelect.style.boxShadow = '0 0 12px rgba(245,158,11,0.4)';
      setTimeout(() => {
        makeSelect.style.borderColor = '';
        makeSelect.style.boxShadow = '';
      }, 2500);
    }
  }

  function syncVehicleToForm(vehicle, scope = 'modal') {
    if (!vehicle) return;
    const isPage = scope === 'page';
    const specSectionId = isPage ? 'vehicle-spec-section-page' : 'vehicle-spec-section';
    const specSection = document.getElementById(specSectionId);

    // If verified vehicle with make & model from reg: HIDE the dropdown section completely!
    if (vehicle.isVerified && vehicle.make && vehicle.make !== 'UK Registered') {
      if (specSection) specSection.style.display = 'none';
    } else {
      if (specSection) specSection.style.display = 'block';
    }

    const makeSelect = document.getElementById(isPage ? 'quote-make-select-page' : 'quote-make-select');
    const modelSelect = document.getElementById(isPage ? 'quote-model-select-page' : 'quote-model-select');
    const transSelect = document.getElementById(isPage ? 'quote-transmission-select-page' : 'quote-transmission-select');
    const yearInput = document.getElementById(isPage ? 'quote-year-input-page' : 'quote-year-input');
    const hiddenMake = document.getElementById(isPage ? 'quote-make-page' : 'quote-make');
    const hiddenModel = document.getElementById(isPage ? 'quote-model-page' : 'quote-model');

    if (hiddenMake) hiddenMake.value = vehicle.make || '';
    if (hiddenModel) hiddenModel.value = vehicle.model || '';
    if (yearInput && vehicle.year) yearInput.value = vehicle.year;

    // 1. AUTO-FILL MANUFACTURER / MAKE
    let matchedMakeKey = '';
    if (makeSelect) {
      populateMakeDropdown(scope);
      if (vehicle.make) {
        const vehicleMakeLower = vehicle.make.toLowerCase().replace(/[^a-z0-9]/g, '');
        for (let i = 0; i < makeSelect.options.length; i++) {
          const optVal = makeSelect.options[i].value;
          const optValClean = optVal.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (optValClean && (optValClean === vehicleMakeLower || optValClean.includes(vehicleMakeLower) || vehicleMakeLower.includes(optValClean))) {
            makeSelect.selectedIndex = i;
            matchedMakeKey = optVal;
            break;
          }
        }
        if (!matchedMakeKey && makeSelect.options.length > 0) {
          const opt = document.createElement('option');
          opt.value = vehicle.make;
          opt.textContent = vehicle.make;
          opt.selected = true;
          makeSelect.appendChild(opt);
          matchedMakeKey = vehicle.make;
        }
        handleMakeSelectChange(matchedMakeKey || vehicle.make, scope, false);
      }
    }

    // 2. AUTO-FILL MODEL
    if (modelSelect && (vehicle.model || matchedMakeKey)) {
      const fullModelStr = (vehicle.model || '').toLowerCase();
      const cleanModelStr = fullModelStr.replace(/[^a-z0-9]/g, '');
      let found = false;

      // Match against available model options
      for (let i = 0; i < modelSelect.options.length; i++) {
        const optVal = modelSelect.options[i].value;
        if (!optVal) continue;
        const optClean = optVal.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (optClean && (cleanModelStr.includes(optClean) || optClean.includes(cleanModelStr))) {
          modelSelect.selectedIndex = i;
          found = true;
          break;
        }
      }

      // If not matched, try base model before parentheses
      if (!found && vehicle.model) {
        const baseModel = vehicle.model.split('(')[0].trim();
        const baseClean = baseModel.toLowerCase().replace(/[^a-z0-9]/g, '');
        for (let i = 0; i < modelSelect.options.length; i++) {
          const optVal = modelSelect.options[i].value;
          if (!optVal) continue;
          const optClean = optVal.toLowerCase().replace(/[^a-z0-9]/g, '');
          if (optClean && (optClean === baseClean || baseClean.includes(optClean) || optClean.includes(baseClean))) {
            modelSelect.selectedIndex = i;
            found = true;
            break;
          }
        }
      }

      // If still not matched, append and select
      if (!found && vehicle.model) {
        const opt = document.createElement('option');
        opt.value = vehicle.model;
        opt.textContent = vehicle.model;
        opt.selected = true;
        modelSelect.appendChild(opt);
      }
    }

    // 3. AUTO-FILL TRANSMISSION TYPE
    if (transSelect) {
      const transLower = (vehicle.transmission || '').toLowerCase();
      const catLower = (vehicle.gearboxCategory || '').toLowerCase();
      if (catLower === 'manual' || transLower.includes('manual')) {
        transSelect.value = 'Manual';
      } else if (catLower === 'dsg' || catLower === 'semi_auto' || transLower.includes('semi') || transLower.includes('clutch') || transLower.includes('dsg')) {
        transSelect.value = 'Semi-Automatic';
      } else {
        transSelect.value = 'Automatic';
      }
    }

    // 4. VISUAL AUTO-FILL BADGE
    const badgeId = isPage ? 'spec-autofill-badge-page' : 'spec-autofill-badge';
    let badge = document.getElementById(badgeId);
    if (!badge && !isPage) {
      const specSection = document.getElementById('vehicle-spec-section');
      if (specSection) {
        const header = specSection.querySelector('div');
        if (header) {
          header.innerHTML = `
            <div style="font-size:0.85rem; font-weight:700; color:#fff; text-transform:uppercase; letter-spacing:0.5px;">
              2. Vehicle Specification (All UK Makes & Models)
            </div>
            <div id="spec-autofill-badge"></div>
          `;
          badge = document.getElementById('spec-autofill-badge');
        }
      }
    }
    if (badge) {
      const plateLabel = vehicle.formatted || formatUkPlate(vehicle.raw) || 'Registration';
      if (vehicle.isVerified && vehicle.make) {
        badge.innerHTML = `<span style="font-size:0.75rem; color:#10b981; font-weight:700; background:rgba(16,185,129,0.15); border:1px solid rgba(16,185,129,0.3); padding:3px 8px; border-radius:4px; text-transform:none;">✓ Auto-Filled from ${plateLabel}</span>`;
      } else {
        badge.innerHTML = `<span style="font-size:0.75rem; color:var(--amber-400); font-weight:700; background:rgba(245,158,11,0.15); border:1px solid rgba(245,158,11,0.3); padding:3px 8px; border-radius:4px; text-transform:none;">Year Decoded (${vehicle.year}) — Select Make Below</span>`;
      }
    }
  }

  function triggerRegLookup(scope = 'modal') {
    const inputId = scope === 'page' ? 'quote-reg-input-page' : 'quote-reg-input';
    const input = document.getElementById(inputId) || document.getElementById('quote-reg-input');
    if (input && input.value) {
      handleRegLookup(input.value, scope);
    } else {
      const resultElemId = scope === 'page' ? 'reg-lookup-result' : 'modal-reg-lookup-result';
      const resultElem = document.getElementById(resultElemId);
      if (resultElem) {
        resultElem.innerHTML = `<span style="color:#ef4444; font-size:0.85rem; font-weight:600;">Please enter a UK registration plate first</span>`;
      }
    }
  }

  // ==========================================================================
  // 6. MODAL OPEN/CLOSE & HERO/BANNER INITIALIZATION
  // ==========================================================================
  function openQuoteModal(arg1 = '', arg2 = '', arg3 = '', arg4 = '') {
    setupModal();
    const backdrop = document.getElementById('quote-modal-backdrop');
    if (!backdrop) return;

    let locationName = '';
    let serviceName = '';
    let regPlate = '';
    let userPostcode = arg4 || '';

    // Check all passed arguments for genuine UK registration
    const allArgs = [arg1, arg2, arg3, arg4].filter(a => typeof a === 'string' && a.trim().length > 0);
    for (const a of allArgs) {
      const cleanA = a.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
      if (/[0-9]/.test(cleanA) && isGenuineUkPlate(cleanA)) {
        regPlate = cleanA;
      } else if (!locationName && !/[0-9]/.test(cleanA) && cleanA.length >= 3) {
        locationName = a.trim();
      } else if (!serviceName && !/[0-9]/.test(cleanA) && cleanA.length >= 3 && locationName) {
        serviceName = a.trim();
      }
    }

    if (locationName) {
      const heading = document.getElementById('modal-quote-heading');
      if (heading) heading.innerHTML = `REQUEST A QUOTE IN <span class="highlight-amber">${locationName.toUpperCase()}</span>`;
      const postcode = document.getElementById('quote-postcode');
      if (postcode && !postcode.value) {
        postcode.value = userPostcode || locationName;
      }
    } else {
      const heading = document.getElementById('modal-quote-heading');
      if (heading) heading.innerHTML = `REQUEST A <span class="highlight-amber">QUOTE</span>`;
    }

    if (serviceName) {
      const serviceSelect = document.getElementById('quote-service-type');
      if (serviceSelect) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
    }

    const regInput = document.getElementById('quote-reg-input');
    const modalRes = document.getElementById('modal-reg-lookup-result');

    if (regPlate) {
      if (regInput) regInput.value = formatUkPlate(regPlate);
      executeRegLookup(regPlate, 'modal');
    } else {
      if (regInput) regInput.value = '';
      if (modalRes) modalRes.innerHTML = '';
      const specSection = document.getElementById('vehicle-spec-section');
      if (specSection) specSection.style.display = 'block';
    }

    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeQuoteModal() {
    const backdrop = document.getElementById('quote-modal-backdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function handleQuoteFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const name = form.querySelector('#quote-name') ? form.querySelector('#quote-name').value : 'Valued Customer';
    
    const hiddenMake = form.querySelector('#quote-make') ? form.querySelector('#quote-make').value : (form.querySelector('#quote-make-page') ? form.querySelector('#quote-make-page').value : '');
    const hiddenModel = form.querySelector('#quote-model') ? form.querySelector('#quote-model').value : (form.querySelector('#quote-model-page') ? form.querySelector('#quote-model-page').value : '');
    
    const makeSelectVal = form.querySelector('#quote-make-select') ? form.querySelector('#quote-make-select').value : (form.querySelector('#quote-make-select-page') ? form.querySelector('#quote-make-select-page').value : '');
    const modelSelectVal = form.querySelector('#quote-model-select') ? form.querySelector('#quote-model-select').value : (form.querySelector('#quote-model-select-page') ? form.querySelector('#quote-model-select-page').value : '');
    
    const make = hiddenMake || makeSelectVal || 'Vehicle';
    const model = hiddenModel || modelSelectVal || '';
    const refNum = 'GG-' + Math.floor(100000 + Math.random() * 900000);

    const modalContent = document.querySelector('.modal-content');
    if (modalContent && form.id === 'main-quote-form') {
      modalContent.innerHTML = `
        <div style="text-align:center; padding:2rem 1rem;">
          <div style="width:70px; height:70px; border-radius:50%; background:rgba(16, 185, 129, 0.15); border:2px solid #10b981; color:#10b981; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; box-shadow:0 0 30px rgba(16,185,129,0.3);">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          </div>
          <h2 style="font-size:1.85rem; margin-bottom:0.5rem; color:#fff;">ESTIMATE REQUEST RECEIVED</h2>
          <p style="font-size:1.05rem; color:var(--amber-400); font-weight:700; margin-bottom:1rem;">Booking Reference: ${refNum}</p>
          <p style="color:var(--text-secondary); max-width:440px; margin:0 auto 2rem; font-size:0.95rem; line-height:1.6;">
            Thank you, <strong>${name}</strong>. Our senior gearbox technician is reviewing specifications for your <strong>${make} ${model}</strong> and will call you with a quote proposal.
          </p>
          <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
            <a href="tel:02080589668" class="btn btn-primary" style="text-decoration:none;">
              Call Priority Line: 0208 058 9668
            </a>
            <button class="btn btn-secondary" onclick="window.closeQuoteModal()">
              Close Window
            </button>
          </div>
        </div>
      `;
    } else {
      alert(`Thank you, ${name}! Your quote request for ${make} ${model} (Ref: ${refNum}) has been received. Our transmission specialist will contact you shortly.`);
    }
  }

  function initQuoteEngine() {
    // Quick Reg Plate Form (Hero & Banners) - ignore if inside fault finder
    const quickRegForms = document.querySelectorAll('.hero-reg-form, .quick-reg-form');
    quickRegForms.forEach(form => {
      if (
        form.closest('#fault-wizard-container') || 
        form.closest('#diagnostic-engine') || 
        form.classList.contains('diag-reg-form') ||
        form.classList.contains('diag-hero-reg-form') ||
        window.location.pathname.includes('fault-finding')
      ) {
        return;
      }
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const input = form.querySelector('.uk-reg-input');
        const regValue = input ? input.value.trim().toUpperCase().replace(/\s+/g, '') : '';
        
        // If on quote.html, focus page form
        const pageRegInput = document.getElementById('quote-reg-input-page');
        if (pageRegInput && form.closest('.cinematic-hero-section')) {
          pageRegInput.value = formatUkPlate(regValue);
          executeRegLookup(regValue, 'page');
          document.getElementById('quote-form-section')?.scrollIntoView({ behavior: 'smooth' });
        } else {
          openQuoteModal('', '', regValue);
        }
      });
    });

    // Close on backdrop click & Escape key
    document.addEventListener('click', function (e) {
      if (e.target && e.target.id === 'quote-modal-backdrop') {
        closeQuoteModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeQuoteModal();
      }
    });

    // Setup standalone page dropdowns if on quote.html
    if (document.getElementById('quote-make-select-page')) {
      populateMakeDropdown('page');

      // Check URL query parameters (e.g. quote.html?reg=BK64FYM)
      const urlParams = new URLSearchParams(window.location.search);
      const regParam = urlParams.get('reg');
      if (regParam) {
        const pageInput = document.getElementById('quote-reg-input-page');
        if (pageInput) {
          pageInput.value = formatUkPlate(regParam);
          executeRegLookup(regParam, 'page');
        }
      }
    }

    // Auto-populate active vehicle from session across all inputs
    const active = getActiveVehicle();
    if (active && (active.reg || active.raw)) {
      const plateFormatted = active.formatted || formatUkPlate(active.reg || active.raw);
      document.querySelectorAll('.uk-reg-input').forEach(input => {
        if (!input.value) input.value = plateFormatted;
      });

      // If on quote.html and no URL query override, auto-render page form
      const pageInput = document.getElementById('quote-reg-input-page');
      const urlParams = new URLSearchParams(window.location.search);
      if (pageInput && !urlParams.get('reg')) {
        pageInput.value = plateFormatted;
        renderVehicleResult(active, active.reg || active.raw, 'page', true);
        syncVehicleToForm(active, 'page');
      }
    }
  }

  // Expose global methods
  window.openQuoteModal = openQuoteModal;
  window.closeQuoteModal = closeQuoteModal;
  window.handleRegLookup = handleRegLookup;
  window.executeRegLookup = executeRegLookup;
  window.triggerRegLookup = triggerRegLookup;
  window.handleMakeSelectChange = handleMakeSelectChange;
  window.handleModelSelectChange = handleModelSelectChange;
  window.handleTransSelectChange = handleTransSelectChange;
  window.handleYearInputChange = handleYearInputChange;
  window.focusVehicleSelect = focusVehicleSelect;
  window.handleQuoteFormSubmit = handleQuoteFormSubmit;
  window.saveActiveVehicle = saveActiveVehicle;
  window.getActiveVehicle = getActiveVehicle;
  window.clearActiveVehicle = clearActiveVehicle;
  window.toggleVehicleGearboxType = toggleVehicleGearboxType;
  window.CAR_DATABASE = CAR_DATABASE;
  window.parseUkRegistration = parseUkRegistration;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initQuoteEngine);
  } else {
    initQuoteEngine();
  }
})();
