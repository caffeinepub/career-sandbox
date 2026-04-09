# Design Brief — Career Sandbox

**Purpose:** Educational web app for grades 10-12 career exploration. Warm, balanced aesthetic with peach primary + sage green accents, creating youthful encouragement without monotone fatigue.

**Tone:** Warm, approachable, purposeful, energetic. Minecraft pixel accent *only* on landing quote section. Core UI modern and clean—peach/green variety prevents fatigue.

**Differentiation:** 4 color-coded streams (Gaming: purple, Science: teal, Commerce: gold, Arts: coral) + peach buttons + sage accents create visual routing with warmth and visual interest throughout.

---

## Color Palette

| Token | Light OKLCH | Dark OKLCH | Usage |
|-------|------------|-----------|-------|
| **Background** | 0.98 0.02 50 | 0.14 0 0 | Warm off-white / near-black base |
| **Foreground** | 0.18 0 0 | 0.95 0 0 | Text, primary content |
| **Card** | 1.0 0 0 | 0.18 0 0 | Surface for content cards |
| **Primary** | 0.68 0.15 50 | 0.78 0.12 48 | Peach buttons, CTA, focus—warm primary |
| **Secondary** | 0.65 0.08 140 | 0.58 0.06 140 | Sage green accents, highlights |
| **Accent** | 0.65 0.08 140 | 0.58 0.06 140 | Sage green secondary buttons, active |
| **Destructive** | 0.55 0.22 25 | 0.65 0.19 22 | Errors, alerts |
| **Border** | 0.88 0 0 | 0.28 0 0 | Dividers, separators |
| **Stream: Gaming** | 0.55 0.28 290 | 0.65 0.22 295 | Purple/violet—creative, playful |
| **Stream: Science** | 0.58 0.25 200 | 0.68 0.2 200 | Teal/blue—analytical, exploratory |
| **Stream: Commerce** | 0.72 0.2 20 | 0.65 0.16 18 | Warm gold/amber—professional yet warm |
| **Stream: Arts** | 0.65 0.18 15 | 0.62 0.15 12 | Coral/terracotta—creative warmth |

---

## Typography

| Role | Font | Scale | Weight | Usage |
|------|------|-------|--------|-------|
| **Display** | General Sans | 32-48px | 700 | Headers, hero titles, stream titles |
| **Body** | DM Sans | 16px | 400-600 | Body text, UI labels, descriptions |
| **Mono** | Geist Mono | 12-14px | 400-500 | Code blocks, metadata, timestamps |

---

## Structural Zones

| Zone | Treatment | OKLCH | Note |
|------|-----------|-------|------|
| **Header/Nav** | White card with subtle shadow | card: 1.0 0 0 light / 0.18 0 0 dark | Elevation separates from content |
| **Hero Section** | Background base with Minecraft quote overlay | background: 0.975 0 0 light | Quote section uses pixel/blocky accents |
| **Content Sections** | Card-based grid, alternate light/muted backgrounds | card/muted: alternates | Visual rhythm through surface layers |
| **Stream Cards** | Colored header bar + white/card body | stream-* + card | Color-coded identity for each stream |
| **CTA Buttons** | Primary color fill, white text, 48px min-height | primary + primary-foreground | Touch-friendly sizing |
| **Footer** | Subtle background with border-top | muted/40 + border | Low emphasis, accessory content |

---

## Spacing & Rhythm

- **Base unit:** 4px (rem: 0.25, scale: 1–12)
- **Touch targets:** minimum 48px height/width
- **Container padding:** 16px mobile / 24px desktop
- **Grid gap:** 16px mobile / 20px desktop
- **Card padding:** 16-24px consistent
- **Section margin:** 32px–64px vertical

---

## Component Patterns

- **Cards:** rounded corners (12px), subtle shadow-card, 1px border (border color), padding 20px
- **Buttons:** min-height 48px, padding 12px–16px, rounded-lg (10px), transition-smooth. Primary = peach, secondary = sage green, varied not monotone.
- **Input fields:** border-input, background-input, 44px min-height, rounded-md (8px)
- **Stream badges:** colored background (stream-*), white text, rounded-full, 8–12px padding
- **Navigation:** sticky header with logo + nav links, flex row, 56px height

---

## Motion & Interaction

- **Default transition:** cubic-bezier(0.4, 0, 0.2, 1) over 0.3s (--transition-smooth)
- **Button hover:** opacity-80 + scale-98
- **Quote rotation:** fade in/out 0.5s, cycle every 5–10 seconds
- **Card entrance:** slide-up + fade-in on scroll (optional intersection observer)
- **Stream hover:** slight lift (shadow-elevated), color-shift to light variant

---

## Constraints

- **No LinkedIn aesthetic:** avoid corporate grays, professional headshots, skill endorsements
- **No monotone peach:** peach primary + sage green accent + 4 stream colors prevent visual fatigue
- **Mobile-first:** all layouts scale up from 320px viewport
- **Pixel accents:** Minecraft style *only* in quote section (blocky borders, 8–16px blocks, stream accent color)
- **High contrast:** WCAG AA+ for all text/interactive elements
- **Warm not boring:** background has +2 chroma warmth; dark mode lifted to 78% L for peach visibility

---

## Signature Detail

Minecraft-inspired rotating quote section on landing: blocky pixel frame around quote text, 8–16px square blocks in stream accent color, fade-in animation. Quote rotates every 5–10 seconds with subtle fade transition. Signals youthful, playful tone without compromising educational credibility.
