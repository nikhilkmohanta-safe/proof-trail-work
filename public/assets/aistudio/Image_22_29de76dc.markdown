---
name: Cryptographic Ledger
colors:
  surface: '#10131a'
  surface-dim: '#10131a'
  surface-bright: '#363941'
  surface-container-lowest: '#0b0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d1f27'
  surface-container-high: '#272a32'
  surface-container-highest: '#32353d'
  on-surface: '#e1e2ec'
  on-surface-variant: '#b9cac4'
  inverse-surface: '#e1e2ec'
  inverse-on-surface: '#2d3038'
  outline: '#83948f'
  outline-variant: '#3a4a46'
  surface-tint: '#00dfc1'
  primary: '#d7fff3'
  on-primary: '#00382f'
  primary-container: '#00f5d4'
  on-primary-container: '#006c5c'
  inverse-primary: '#006b5b'
  secondary: '#4edea3'
  on-secondary: '#003824'
  secondary-container: '#00a572'
  on-secondary-container: '#00311f'
  tertiary: '#f0f8ff'
  on-tertiary: '#00354a'
  tertiary-container: '#b1e1ff'
  on-tertiary-container: '#00678b'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#26fedc'
  primary-fixed-dim: '#00dfc1'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#005144'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#c4e7ff'
  tertiary-fixed-dim: '#7bd0ff'
  on-tertiary-fixed: '#001e2c'
  on-tertiary-fixed-variant: '#004c69'
  background: '#10131a'
  on-background: '#e1e2ec'
  surface-variant: '#32353d'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-hash:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

The design system projects absolute verification, structural precision, and high-velocity engineering rigor. Tailored for engineers, systems architects, and technical researchers, it eliminates decorative fluff in favor of authoritative technical clarity. The emotional tone evokes cryptographic finality: immutable, secure, telemetry-driven, and hyper-competent.

The design movement combines **Engineering Minimalism** with **Tactile Cyber-Precision**:
- Grounded slate and deep carbon surfaces emulate low-latency terminal and development environments.
- High-frequency data density is balanced by structural breathing room and disciplined alignment.
- Visual status indicators—cryptographic verification tags, hash receipts, and pipeline states—utilize radiant, targeted electric neon accents against dark structural canvases.
- Micro-textures lean into technical instrumentation: hairline divider grids, monospaced metadata arrays, and discrete audit badges that simulate signed cryptographic artifacts.

## Colors

The palette operates on a foundation of obsidian and cool slate substrates, punctuated by high-potency luminescent accents reserved strictly for proof verification, live metrics, and interaction thresholds.

- **Primary (`#00F5D4`) — Electric Cyan**: Represents active cryptographic verification, verified pipeline state, focus rings, and primary execution calls. Used deliberately to signal proof validation and interactive affordances.
- **Secondary (`#10B981`) — Emerald Signal**: Applied exclusively to immutable success states, cryptographic signature validations, and verified merit ledger badges.
- **Tertiary (`#38BDF8`) — Deep Cyber Sky**: Serves secondary telemetry, git-commit linkages, language tags, and tertiary structural highlights.
- **Neutral (`#0A0D14`) — Slate Obsidian**: The grounding base matrix. Derives surface layers through subtle luminance stepping (from `#0A0D14` canvas to `#121824` container, and `#1E293B` border outlines), ensuring rich depth without milky washouts.
- **Text & Contrast hierarchy**:
  - High-emphasis labels and headlines use crisp `#F8FAFC`.
  - Secondary metadata and payload properties use `#94A3B8`.
  - Muted code comments and hash prefixes settle at `#475569`.

## Typography

Typography establishes an unambiguous visual separation between human narrative and machine verification.

- **Prose & Hierarchy (`Inter`)**: Handles structural information, executive project narratives, candidate profiles, and headline levels. Tightly tracked letterforms (`-0.01em` to `-0.03em`) on headlines maintain a dense, modern software interface tone.
- **Machine State & Telemetry (`JetBrains Mono`)**: Mandated for all cryptographic proof hashes, commit SHAs, technical tags, pipeline timings, tabular metrics, and audit IDs. Tabular numbers (`tnum`) must remain enabled across the entire platform to guarantee vertical column alignment across numerical telemetry and status updates.

## Layout & Spacing

The layout model implements a responsive 12-column fluid grid bounded by a max-width container of `1440px` to maintain terminal ergonomics on ultra-wide screens.

- **Desktop (1024px+)**: 12-column grid, `1.5rem` (`24px`) gutters, and `3rem` canvas margins. Enables split views comparing code artifact traces against verified identity portfolios.
- **Tablet (768px - 1023px)**: 8-column layout, `1.25rem` (`20px`) gutters, and `2rem` margins. Complex audit graphs collapse into stepped sequential cards.
- **Mobile (< 768px)**: 4-column layout, `1rem` margins and gutters. Audit badges and hash streams wrap gracefully with monospaced text truncation (`0x7f...a9c`).

Vertical cadence enforces an 8pt base grid rhythm: components pair internal densities (`space-xs`, `space-sm`) with expansive section dividers (`space-xl`) to prevent data-heavy dashboards from feeling congested.

## Elevation & Depth

Depth does not rely on diffused skeuomorphic drop shadows. Instead, it utilizes **tonal slate layering** coupled with **hairline technical containment**:

- **Layer 0 (Canvas)**: Deep base `#0A0D14`. Background for full-bleed shell layouts.
- **Layer 1 (Card Matrix)**: Elevated slate `#111622` surfaced with a crisp `1px` stroke of `#1E293B`.
- **Layer 2 (Floating Inspect Panels & Flyouts)**: Surface elevated to `#182234` with an accented border of `#334155`.
- **Luminescent Accent Haloing**: Interactive or verified states emit a precise, short-spread glow: `0px 0px 16px rgba(0, 245, 212, 0.15)` for Electric Cyan and `0px 0px 16px rgba(16, 185, 129, 0.15)` for verified Emerald badges.
- **Backdrop Blurs**: Dropdowns and modal backdrops utilize `backdrop-filter: blur(12px)` over `rgba(10, 13, 20, 0.85)` to maintain technical continuity without clouding underlying proof traces.

## Shapes

The design system maintains a calibrated **Soft (`1`)** shape profile (`0.25rem` / `4px` base radius). This geometry creates a structured, architectural feel reminiscent of modern integrated development environments (IDEs) and hardware control boards:

- **Buttons, Inputs, Micro-Badges**: `0.25rem` (`rounded-sm`). Crisp, disciplined, and compact.
- **Cards, Artifact Containers, Proof Panels**: `0.5rem` (`rounded-lg`). Provides subtle perimeter relief while maintaining rigid column alignments.
- **Verification Pills & Status Nodes**: Full pill radii (`9999px`) are strictly forbidden; micro-tags must retain the standard `0.25rem` corners to prevent a casual consumer aesthetic.

## Components

### Buttons & Interactive Triggers
- **Primary Action (Verify / Commit Proof)**: Background of `#00F5D4` text in `#0A0D14` font-weight 600. On hover, shifts to `#00DDBE` with a localized `0px 0px 12px rgba(0, 245, 212, 0.3)` glow.
- **Secondary (Terminal Action / Inspect)**: High-density dark slate surface `#182234` with a `1px` border of `#334155` and `#F8FAFC` text. Hover transitions border to `#00F5D4`.
- **Ghost / Utility**: Borderless, `#94A3B8` text, activating to `#00F5D4` on hover with an ambient background tint of `rgba(0, 245, 212, 0.05)`.

### Cryptographic Audit Badges & Micro-Badges
- **Verified Signature Tag**: Compact container (`py-0.5 px-2`), monospaced font (`label-sm`), background `rgba(16, 185, 129, 0.1)`, hairline border `1px solid rgba(16, 185, 129, 0.3)`, text `#10B981`. Prefixed with an SVG shield-check icon or hash indicator (`#`).
- **Telemetry / Metric Pill**: Background `rgba(56, 189, 248, 0.08)`, border `rgba(56, 189, 248, 0.25)`, text `#38BDF8`. Displays live PR counts, benchmark latencies, and language distribution.

### Proof Cards & Artifact Panels
- Composed of `#111622` background with a continuous `1px` border in `#1E293B`.
- Header bar features split information: title in `Inter` headline-sm alongside an immutable hash anchor and verification timestamp in `JetBrains Mono` code-hash.
- Hover state features a subtle border illumination shift toward `#334155` without layout shifts or elevation scaling.

### Input Fields & Terminal Consoles
- Background `#0D111A`, `1px` border `#1E293B`, internal padding `space-sm space-md`.
- Focus state activates an instantaneous `1px solid #00F5D4` edge with zero displacement, accompanied by a subtle cursor glow. Placeholder text rests at `#475569`.

### Checkboxes & State Selectors
- Rigid square (`rounded-sm`), `16px x 16px`. Inactive: `#1E293B` background with `#334155` border. Checked: `#00F5D4` fill with dark checkmark icon `#0A0D14`.

### Verification Hash Snippets (Specialized Component)
- Inline interactive snippet displaying truncated commit/audit strings (e.g., `proof_0x8f2a...c3`). Clicking toggles a momentary Emerald notification state (`Copied [SHA-256]`) with an audio-visual flash.