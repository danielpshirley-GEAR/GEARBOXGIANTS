# Gearbox Giants — Design System & Guidelines (`DESIGN.md`)

## 1. Design Philosophy: Precision Automotive Engineering
The visual language of **Gearbox Giants** reflects high-precision mechanical engineering, industrial authority, and transparent trust. Every element is designed to convey mastery over complex drivetrain mechanics while remaining frictionless and accessible.

---

## 2. Anti-AI Slop Rules (Strictly Enforced)
* 🚫 **No Purple-on-Dark or Violet Accents**: The palette is strictly high-contrast industrial obsidian, carbon black, metallic slate, and mechanical amber/gold.
* 🚫 **No Over-Nested Cards**: Avoid box-inside-a-box container bloat. Use clean dividers and whitespace to group information.
* 🚫 **No Textureless Surfaces**: Visual elements feature subtle glassmorphism (`backdrop-filter: blur(12px)`), hairline borders (`rgba(255,255,255,0.08)`), and depth.
* 🚫 **No Generic Untracked Typography**: All headings have deliberate letter-spacing (`-0.02em` for modern sans, `0.12em` for mono plates).
* 🚫 **No Default White Input Overlays**: UK number plates must remain seamlessly yellow (`#facc15` / `#fbbf24`) with transparent inputs and black characters.

---

## 3. Color Tokens & Palette

| Token | Hex / Value | Usage |
| :--- | :--- | :--- |
| `--bg-base` | `#08090c` | Primary canvas & body background |
| `--bg-surface` | `#0f1218` | Cards, hero containers, and modals |
| `--bg-elevated` | `#161b24` | Elevated controls, chips, and dropdowns |
| `--amber-400` | `#fbbf24` | Primary brand accent, CTA highlights, active states |
| `--amber-500` | `#f59e0b` | High-energy buttons, hover states, badges |
| `--emerald-500` | `#10b981` | Verified DVSA badges, success indicators |
| `--text-primary` | `#ffffff` | Headings, plate titles, key metrics |
| `--text-secondary`| `#cbd5e1` | Subheadings, descriptions, list items |
| `--text-muted` | `#94a3b8` | Field labels, timestamp notes, placeholders |
| `--border-subtle`| `rgba(255,255,255,0.08)` | Section dividers, card outlines |
| `--plate-yellow` | `#facc15` | UK rear registration plate background |
| `--plate-blue` | `#012169` | UK flag sideband |

---

## 4. Typography Scale

* **Headings (`--font-heading`)**: `Montserrat`, `Syne`, `Inter`, sans-serif (Weights: `800`, `900`).
  * `H1 (Hero)`: `clamp(2.4rem, 5.5vw, 4.2rem)` — Uppercase, line-height `1.05`, letter-spacing `-0.01em`.
  * `H2 (Section)`: `clamp(1.8rem, 3.8vw, 2.8rem)` — Bold, line-height `1.15`.
  * `H3 (Card Title)`: `1.25rem – 1.45rem` — Bold, line-height `1.2`.
* **Body (`--font-body`)**: `Inter`, system-ui, sans-serif (Weights: `400`, `500`, `600`).
* **UK Registration Plates (`--font-plate`)**: `Charles Wright`, `Impact`, monospace.
  * Tracking: `0.12em – 0.18em`, Text Transform: `uppercase`, Weight: `900`.

---

## 5. Core Component Standards

### A. UK Registration Plate Input (`.uk-reg-box`)
* Height: `44px – 50px`
* Background: `#facc15` (Solid UK plate yellow)
* Flag Euroband: Left `#012169` blue band with crisp UK Union Jack SVG.
* Input: `background: transparent !important`, `border: none !important`, `color: #000000 !important`. Zero white autofill boxes.

### B. Verified Vehicle Identification Card
* Border: `1px solid rgba(16,185,129,0.3)`
* Background: `rgba(16,185,129,0.06)`
* Header: Emerald `✓ DVSA VERIFIED` badge + `Year Make Model` in bold white.
* Metadata Chips: Pill chips (`⚙️ Transmission`, `⛽ Engine`, `📍 Mileage`, `🛡️ MOT: Valid`).
* Actions: Clear & accessible `Change Reg 🔄` and `Adjust Spec ✏️` text buttons.

### C. Quote Modal (`.quote-modal-container`)
* Width: `620px max` (Comfortable fit on mobile and desktop without viewport clipping).
* Backdrop: `rgba(4, 5, 8, 0.82)` with `backdrop-filter: blur(16px)`.
* Sections:
  1. `1. Vehicle Details` (Auto-verified plate badge OR manual dropdowns)
  2. `2. Customer Contact & Location` (Name, Phone, Postcode/Area)
  3. `3. Required Service & Fault Description` (Service select & notes)
* Submit Button: Full-width amber gradient button with hover pulse.

### D. Diagnostic Wizard (`#fault-wizard-container`)
* Progressive Disclosure: 4 structured steps (1. Vehicle $\rightarrow$ 2. Condition $\rightarrow$ 3. Symptoms $\rightarrow$ 4. Report).
* Step Tracker: Sleek numbered circular nodes connected with dynamic progress lines.
* Interactive Cards: High-contrast selection cards with amber border highlights on active state.
