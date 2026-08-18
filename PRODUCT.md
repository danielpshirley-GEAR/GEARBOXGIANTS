# Gearbox Giants — Product Specification (`PRODUCT.md`)

## 1. Product Overview
**Gearbox Giants** is a specialist UK automotive engineering service and digital platform dedicated to transmission rebuilds, reconditioning, Mechatronic repairs, dual-clutch overhauls (DSG, S-Tronic, DCT, PowerShift), automatic gearboxes (ZF 6HP/8HP, Aisin, Steptronic), and manual transmissions.

The platform provides vehicle owners with real-time vehicle identification powered by the official UK DVSA MOT History Trade API, an interactive 4-step transmission diagnostic analyser, transparent quote generation, and regional hub service booking with nationwide recovery.

---

## 2. Target Audience & Personas
* **Private Vehicle Owners in Distress**: Drivers facing sudden gearbox failures, shuddering, dashboard fault codes (e.g. *PRNDS flashing*, *Limp Mode*, *Gearbox Overheating*), or expensive dealer repair quotes.
* **Commercial Fleet Managers & Taxis**: Operators needing rapid turnaround transmission reconditioning to minimize fleet downtime.
* **Car Enthusiasts & Performance Vehicle Drivers**: Owners of high-performance German and UK vehicles (BMW M/X series, Audi S/RS, VW Golf R/GTI, Mercedes AMG) requiring specialist Mechatronic and clutch calibration.

---

## 3. Core Value Propositions
1. **Instant Vehicle Verification**: Zero-friction number plate lookup cross-referencing live DVSA records (Make, Model, Year, Engine CC, Fuel, MOT History, Mileage).
2. **Interactive Diagnostic Fault Finder**: Guided 4-step mechanical protocol helping users identify specific failure modes (Mechatronics pressure loss, clutch pack wear, synchro failure, valve body solenoids) before visiting a garage.
3. **Transparent Quote Proposals**: Honest pricing estimates comparing dealer rates (£3,000–£5,000+) with Gearbox Giants reconditioned units (£650–£1,450) including free recovery and warranty.
4. **Regional Workshop Network**: Strategic physical hubs covering Greater London, Berkshire, South Coast, East Anglia, Oxfordshire, and the Midlands.

---

## 4. Key User Journeys

```
[Journey 1: Quick Registration Quote]
Hero Reg Input (Plate: BK64 FYM) ➔ DVSA MOT Live Decoded ➔ Pre-filled Quote Modal ➔ Direct Booking

[Journey 2: Guided Fault Diagnosis]
Diagnostic Lab ➔ Vehicle Reg / Gearbox Select ➔ Operating Condition ➔ Symptom Checklist ➔ Instant Fault Report & Price Claim

[Journey 3: Local Regional Hub Inquiry]
Location Hub (e.g., London Hub) ➔ Workshop Radius Map ➔ Recovery Coverage Check ➔ Direct Specialist Call (0208 058 9668)
```

---

## 5. Architectural & Technical Stack
* **Frontend**: Modern Vanilla HTML5, CSS3 Custom Properties (Design Tokens), Vanilla Modular JavaScript.
* **Graphics & Interactivity**: WebGL 3D Transmission Engine (Three.js), Interactive Geographic Radius Maps (Leaflet.js).
* **Backend Gateway**: Python asynchronous HTTP proxy (`server.py`) handling DVSA OAuth2 token lifecycle management and live JSON vehicle data streaming.
* **Storage Model**: `sessionStorage` (`gg_active_vehicle`) providing seamless multi-page registration persistence without stale cross-session caching.
