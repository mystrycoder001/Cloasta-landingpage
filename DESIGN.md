---
name: Cloasta
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style

This design system is built on an "Intelligent Sci-Fi" aesthetic, blending the precision of high-performance developer tools with the atmospheric depth of cinematic interfaces. The personality is sophisticated, technical, and premium, targeting a professional audience that values speed and visual clarity.

The style is a hybrid of **Minimalism** and **Glassmorphism**. It utilizes heavy whitespace and a restricted color palette to maintain focus, while employing frosted surfaces and radiant gradients to provide a sense of depth and future-forward innovation. The interface should feel like a high-end command center—utilitarian yet deeply evocative.

## Colors

The palette is anchored in a deep, cosmic navy background (`#080810`), providing a high-contrast foundation for the primary gradient. This gradient moves from a deep violet through a signature blue into a sharp cyan, representing energy and data flow. 

Text is treated with strict hierarchy: high-contrast off-white (`#f0f0ff`) for readability and a cool-toned gray (`#6b7280`) for metadata and secondary information. Surface colors rely on semi-transparency rather than solid fills, allowing the background to bleed through subtly, maintaining a cohesive atmospheric "void."

## Typography

The design system exclusively uses **Inter** to achieve a modern, systematic, and utilitarian feel. The hierarchy is defined by extreme weight shifts and generous tracking on smaller labels to mimic technical HUDs (Heads-Up Displays).

Headlines use a bold weight with slightly tightened letter-spacing at large sizes for a "compact" impact, whereas sub-headings and labels use increased tracking (letter-spacing) to ensure legibility against dark backgrounds. All type should be rendered with `antialiased` smoothing to maintain the premium feel on high-density displays.

## Layout & Spacing

The layout philosophy follows a strict 12-column fluid grid system for desktop, transitioning to a single-column stack for mobile. Elements should be aligned to a 8px base grid to ensure mathematical harmony.

Vertical rhythm is expansive; use generous margins between sections to evoke the "Minimalist/Vercel" aesthetic. Safe areas and internal card padding should scale from 16px on mobile to 24px or 32px on desktop to allow the content "room to breathe" within the glass containers.

## Elevation & Depth

Depth is conveyed through **Glassmorphism** and light-based hierarchy rather than traditional shadows.
- **Surface Tiers:** Use `backdrop-filter: blur(12px)` on all floating containers. Higher-level elements (like modals) should have a slightly higher opacity (0.08) compared to base cards (0.04).
- **Outlines:** Instead of shadows, use "Ghost Borders"—1px solid lines with low opacity (`rgba(255,255,255,0.1)`). 
- **Inner Glows:** For active states or primary elements, use a subtle 1px inner border with a gradient stroke to simulate a light-catching edge.
- **Ambient Glows:** Use large, blurred radial gradients in the background (far behind the UI) to create a sense of environmental lighting.

## Shapes

The shape language is "Soft-Tech." While the layout is structured and grid-heavy, the corners are notably rounded to provide a approachable, high-end feel. 

Standard UI elements (inputs, small buttons) use a base radius of `0.5rem`. Larger structural components, such as cards and navigation bars, should use `rounded-2xl` (1.5rem) to emphasize the "glass sheet" metaphor. This contrast between the sharp grid and the soft container edges creates the distinctive "Linear" inspired silhouette.

## Components

### Buttons
- **Primary:** Background is the primary purple-blue-cyan gradient. Text is white. Add a `box-shadow` using the middle blue color at 30% opacity with a large blur (20px) to create a "glow" effect.
- **Secondary:** Transparent background with a 1px white border at 10% opacity. On hover, background becomes `rgba(255,255,255,0.05)`.

### Cards
- **Construction:** 4% white opacity background, 12px backdrop-blur, and a 1px border (`rgba(255,255,255,0.08)`).
- **Hover State:** Border opacity increases to 20%, and a very subtle top-down gradient tint is applied to the background.

### Navigation
- **Top Bar:** Fixed position with a dark glass effect (`rgba(8, 8, 16, 0.8)` background with blur). Use a 1px bottom border to separate it from the main content.

### Input Fields
- **Default:** Dark, semi-transparent background with a 1px border.
- **Focus:** The border should transition to a solid primary blue, accompanied by a subtle outer glow of the same color.

### Chips/Badges
- Small, uppercase text with high letter-spacing. Backgrounds should be highly desaturated versions of the primary colors at 10% opacity to act as subtle indicators.