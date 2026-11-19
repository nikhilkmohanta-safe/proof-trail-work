---
name: Warm Archival Ledger
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#3e4944'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#6e7a74'
  outline-variant: '#bdc9c2'
  surface-tint: '#006c53'
  primary: '#005f49'
  on-primary: '#ffffff'
  primary-container: '#0d7a5f'
  on-primary-container: '#a8ffdf'
  inverse-primary: '#7cd8b8'
  secondary: '#4e635c'
  on-secondary: '#ffffff'
  secondary-container: '#d0e8de'
  on-secondary-container: '#546961'
  tertiary: '#754a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#956000'
  on-tertiary-container: '#ffead4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#98f4d3'
  primary-fixed-dim: '#7cd8b8'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#00513e'
  secondary-fixed: '#d0e8de'
  secondary-fixed-dim: '#b5ccc3'
  on-secondary-fixed: '#0b1f1a'
  on-secondary-fixed-variant: '#364b44'
  tertiary-fixed: '#ffddb6'
  tertiary-fixed-dim: '#ffb958'
  on-tertiary-fixed: '#2a1800'
  on-tertiary-fixed-variant: '#643f00'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: 0em
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system merges the mathematical precision of cryptographic accounting with the tactile luxury of Swiss archival publishing. Tailored for sophisticated financial technologists, institutional custody managers, and cryptographic analysts, the interface establishes an atmosphere of trust, permanent record-keeping, and quiet authority.

The aesthetic philosophy is **Archival Minimalist meets Technical Editorial**. Instead of cold neo-brutalist tech or glowing cyber neon, it treats digital ledgers as rare bond paper: warm, tactile, and immutably inked. High-density cryptographic hash tables, block heights, and public key registries are rendered with hairline structure and rich espresso contrast. The emotional response is one of total calm, deliberate clarity, and permanence—rendering volatile on-chain events into structured, unhurried records.

## Colors

The palette is rooted in fibrous crème, soft bone, and warm linen tones, contrasted against deep espresso ink and dense forest hues. 

- **Surfaces & Canvases:** The root backdrop rests at `#FBF9F5` (Soft Alabaster), stepping down into `#F5F2EB` (Warm Linen Crème) for base containers, `#ECE7DE` for nested modules, and `#E3DDD2` for micro-recessed data slots.
- **Structural Outlines:** Subtle hairline borders utilize `#DCD5C5` and `#D2CAAF`, avoiding cold grays in favor of warm stone and parchment rules.
- **Typography & Inks:** Primary text relies on `#1C1A17` (Deep Espresso Ink) to retain total legibility without harsh synthetic black. Secondary context sits in `#4A463F` (Charcoal Umber), and metadata annotations appear in `#706B62` (Muted Warm Slate).
- **Accents & Action:** Primary interactions leverage `#0D7A5F` (Archival Sage/Emerald) and high-contrast anchor CTAs in `#1A2E28` (Deep Forest Ink). Protocol alerts, pending states, and epoch milestones use `#B47818` (Burnished Brass/Amber).

## Typography

The typographic system utilizes a tri-family hierarchy balancing technical governance with editorial rhythm.

- **Headlines (Space Grotesk):** Provides mathematical structure and understated geometric tension for vault balances, total value locked (TVL), section headers, and governance proposal titles.
- **Body & Continuous Copy (Hanken Grotesk):** Delivers clean readability across parameters, contract audit reports, and balance breakdowns with crisp humanist proportions.
- **Data, Hashes, & Numeric Chips (JetBrains Mono):** Standardized across all transaction hashes, wallet public keys, gas metrics, and timestamps. Tabular figures ensure aligned numerical auditing down vertical balance sheets.

## Layout & Spacing

The layout model is governed by an archival 12-column fluid grid designed for dense information architecture and modular ledger inspection.

- **Canvas & Framing:** Layouts feature an explicit 1px inner framing line (`#DCD5C5`) separating the viewport canvas from the data sheets. 
- **Grid Adaptability:**
  - **Desktop (≥ 1280px):** 12-column grid, `margin-desktop: 2.5rem`, `gutter-desktop: 1.5rem`. Enables multi-pane verification: block explorer sidebars, cryptographic state machines, and real-time execution terminals.
  - **Tablet (768px – 1279px):** 8-column grid, `margin: 1.5rem`, `gutter: 1rem`. Secondary sidebars collapse into persistent horizontal drawer rails.
  - **Mobile (< 768px):** 4-column grid, `margin: 1rem`, `gutter: 0.75rem`. Complex key-value records stack into single-column archival ledger receipts.
- **Spacing Rhythm:** Data density is preserved via strict multi-tier spacing tokens. Micro-gap pairings use `space-xs` (4px) and `space-sm` (8px) for tightly related metadata pairs, while container interiors maintain a balanced `space-md` (16px) to `space-lg` (24px) breathing room.

## Elevation & Depth

This design system completely rejects heavy synthetic drop-shadows and vibrant glowing blurs in favor of **Tonal Layering and Hairline Stratification**. Depth mimics sheets of pressed paper laid atop one another:

1. **Base Layer (Canvas):** Tone `#FBF9F5` (Soft Alabaster) provides the underlying foundation.
2. **Sheet Layer (Cards & Panels):** Tone `#F5F2EB` edged with a crisp 1px solid border (`#DCD5C5`). 
3. **Recessed Well (Data Registers & Inputs):** Sunken interior modules use `#ECE7DE` with an inset boundary of `#E3DDD2` to create functional micro-wells for transaction streams and input tables.
4. **Floating Sheets (Modals & Command Palettes):** Tone `#FBF9F5` with a dual-stage micro-shadow: an ultra-subtle ambient shadow tinted with warm umber (`0 4px 20px -2px rgba(45, 42, 38, 0.05)`) paired with a sharp 1px structural border in `#D2CAAF`.

## Shapes

The shape architecture is calibrated to **Soft (Level 1)**. This geometry respects the archival document metaphor: subtle softened corners that feel refined and machined, rather than bubbly or toy-like.

- **Micro Components (Chips, Badges, Monospace Hashes):** `0.125rem` (2px) to `0.25rem` (4px) corner radii, preserving the look of physical punched-paper ledger labels.
- **Interactive Controls (Buttons, Inputs, Selectors):** `0.25rem` (4px) corner radii for clean, firm click surfaces.
- **Containers & Ledger Cards:** `0.5rem` (8px) corner radii (`rounded-lg`), creating distinct framing while retaining structural grid tension.
- **Overlay Dialogs & Floating Drawers:** `0.75rem` (12px) corner radii (`rounded-xl`).

## Components

### Buttons
- **Primary Action (Commit / Sign):** Solid deep forest ink (`#1A2E28`) background, crème text (`#FBF9F5`), 1px tone-on-tone border (`#1A2E28`). Hover transitions subtly to `#0D7A5F` (Archival Sage).
- **Secondary Action (Verify / Export):** Paper crème background (`#F5F2EB`), charcoal ink text (`#1C1A17`), 1px border (`#DCD5C5`). Hover shifts surface to `#ECE7DE`.
- **Tertiary / Utility:** Ghost button with `#4A463F` text, gaining a faint `#ECE7DE` background on focus/hover.

### Chips & Monospace Badges
- **Cryptographic Hash Chip:** Compact container with `#ECE7DE` background, 1px `#DCD5C5` border, JetBrains Mono text (`#2D2A26`), accompanied by an inline copy action indicator.
- **Status Badges:**
  - *Confirmed / Finalized:* Warm sage tint background (`#E6F2ED`), emerald ink (`#0D7A5F`), border in `#B8DCD0`.
  - *Pending / Mempool:* Warm amber tint background (`#FAF2E6`), burnished brass ink (`#B47818`), border in `#EED9B3`.
  - *Failed / Reverted:* Muted warm terracotta tint background (`#F8EAE8`), rust ink (`#9E382B`), border in `#E8BCB5`.

### Input Fields
- Built into recessed porcelain wells (`#ECE7DE`). Text is rendered in `#1C1A17` with `#706B62` placeholders. 
- Inactive state: 1px border in `#DCD5C5`. 
- Active focus state: 1px crisp outline in `#0D7A5F` with zero blur glow, reinforcing mechanical drafting precision.

### Ledger Cards & Tables
- **Container Structure:** Backed with `#F5F2EB`, enclosed in a 1px `#DCD5C5` border.
- **Header Separators:** Hairline divide (`#DCD5C5`) separating metric totals from itemized transaction streams.
- **Table Rows:** Alternating micro-tones between `#F5F2EB` and `#FBF9F5`. Row borders sit at 1px `#E3DDD2`. Monospaced numbers align strictly right.

### Checkboxes & Radio Selectors
- Rigid square and circular controls with a 1.5px `#DCD5C5` rim. Checked state fills with `#1A2E28` and an off-white `#FBF9F5` internal marker.

### Domain-Specific Components
- **Epoch Progress Gauges:** Hairline segmented progress meters using `#D2CAAF` for the track and `#0D7A5F` for confirmed block segments.
- **Merkle Proof Tree Visualizers:** Monochromatic lineage paths using `#DCD5C5` connectors and `#ECE7DE` proof node tiles with JetBrains Mono hash signatures.