---
version: alpha
name: "Clerk"
website: "https://clerk.com"
description: "Clerk supplies a turnkey authentication and user‑management layer for React, Next.js and Remix applications, exposing a purple primary token (#6c47ff), a white canvas (#ffffff), a dark ink (#000000), a Geist‑Numbers‑based typographic system, and a component library of roughly twenty reusable UI primitives."

seo:
  title: "Clerk Design System for React — #6c47ff, geistNumbers, 20 components"
  metaDescription: "Clerk’s design system centers on the brand purple #6c47ff and the Geist‑Numbers typeface, delivering a white canvas, dark ink, and a curated set of UI components for modern web apps."
  highlights:
    - "Primary accent — the brand purple #6c47ff appears on headings, CTA buttons, and interactive icons, establishing a consistent visual hook across the site."
    - "Ink dominance — black #000000 powers all body copy and navigation links, delivering maximum contrast against the white canvas."
    - "Hairline definition — the light gray #d9d9de is used for 1 px borders on tables, inputs, and card outlines, subtly separating content without visual noise."
    - "Surface layering — neutral grays #e3e3e7 and #eeeef0 provide background bands for cards and modal dialogs, creating depth while preserving a flat aesthetic."
  tags:
    - "Design & Creative Tools"
  lastUpdated: "2026-05-14"
  author:
    name: "Dov Azencot"
    url: "https://x.com/dovazencot"
  opening: |
    Clerk’s homepage opens on a pure white canvas (#ffffff) that frames a headline rendered in 64 px Geist‑Numbers with a weight of 700, colored in the brand purple #6c47ff. Below the hero, body copy rests on dark ink #000000, while interactive elements such as primary buttons inherit the same purple accent and a 4 px border rendered in #d9d9de. The layout interleaves neutral surfaces – #e3e3e7 for card backgrounds and #eeeef0 for input fields – establishing a rhythm of contrast and relief that guides the eye without relying on gradients or illustrations.

    Inside this DESIGN.md file you will find 23 color tokens grouped into primary, ink, canvas, hairline, muted, surface‑1/2/3, link, error, warning, and several brand‑specific shades; 12 typography tokens covering display, heading, body, caption, code, and button roles; 6 rounded values ranging from 0 px to a full 9999 px radius; a spacing scale from 4 px to 24 px; and a component catalog of 20 primitives that span navigation, forms, cards, alerts, and modals. The token set follows the Google Labs design‑token specification, exposing each value as a CSS custom property ready for consumption by Tailwind, CSS‑in‑JS, or native stylesheet imports.

    To use the system, import the generated token file into your project and reference tokens via the {colors.x}, {typography.x}, {rounded.x}, and {spacing.x} placeholders. In Tailwind you can map the custom properties to theme extensions, while in CSS‑in‑JS you can read the variables directly from the :root. This approach guarantees visual consistency across React components and downstream applications, and it demonstrates why Clerk’s visual language merits close study for teams building authentication‑heavy products.
  related:
    - href: "/design"
      title: "Browse all design systems"
      description: "The full directory of DESIGN.md files on shadcn.io, with live mockups for each."
    - href: "https://clerk.com"
      title: "Clerk — official site"
      description: "Clerk's public marketing site — the source of truth for the live tokens captured in this file."
    - href: "https://github.com/google-labs-code/design.md"
      title: "The DESIGN.md specification"
      description: "Google Labs' open spec for machine-readable design system files — the format this page is built on."
  questions:
    - id: "what-is-the-role-of-the-primary-color-in"
      title: "What is the role of the primary color in Clerk’s UI?"
      answer: "The primary color #6c47ff functions as the visual anchor for all interactive affordances. It colors headings, CTA buttons, and highlighted icons, ensuring that users can instantly locate actionable elements. The token appears in the CSS variable list under --color-purple-500 and is referenced by components such as heroHeading, h2, and badge-primary. By limiting the accent to a single hue, the system avoids chromatic overload while still providing a clear signal hierarchy that separates primary actions from secondary text rendered in #000000."
    - id: "how-does-the-typography-system-different"
      title: "How does the typography system differentiate headings from body text?"
      answer: "Headings employ the Geist‑Numbers family at larger sizes (32 px for display‑xl, 13 px for heading‑lg) with increased weight (600–700) and a negative letter‑spacing of –0.48 px, creating visual prominence. Body text uses the same family at 13 px or 11 px with a regular weight of 400 and normal letter‑spacing, delivering comfortable line heights of 20 px to 24 px. Code snippets switch to the soehneMono mono‑stack at 12 px weight 600, preserving readability for technical content. This tiered approach maintains typographic harmony while clearly signalling hierarchy."
    - id: "what-spacing-conventions-are-applied-to"
      title: "What spacing conventions are applied to form elements?"
      answer: "Form elements adopt a base vertical spacing of 8 px between label and input, with horizontal padding of 8 px on the input container. The spacing token “sm” (12 px) is used for internal padding of buttons, while “md” (16 px) defines the gap between form rows. These values stem from the extracted spacing list where 8 px and 12 px dominate the count, ensuring that the vertical rhythm aligns with the line height of body text (20 px) and that controls feel neither cramped nor excessive."
    - id: "how-are-error-states-visualized-in-the-c"
      title: "How are error states visualized in the component library?"
      answer: "Error states leverage the red token #ef4444, which appears in the CSS variable --color-red-500. Components such as alert-error and input-error border use this hue for outlines and background fills, while accompanying text adopts the same color for emphasis. The error color is paired with the neutral hairline #d9d9de for subtle borders, preserving contrast without overwhelming the layout. This consistent use of a single error hue across components creates an instantly recognisable feedback loop for users."
    - id: "what-is-the-recommended-method-for-integ"
      title: "What is the recommended method for integrating the rounded tokens into custom components?"
      answer: "Rounded tokens are exposed as CSS variables –radius-sm (4 px), –radius-md (6 px), –radius-lg (8 px), –radius-xl (12 px), and –radius-full (9999 px). When building a custom component, assign the desired radius via var(--radius‑md) for moderate rounding or var(--radius‑full) for fully circular avatars. In Tailwind, map these variables to borderRadius utilities (e.g., rounded‑md: var(--radius‑md)). This strategy ensures that any new component inherits the same curvature language as the core library, maintaining visual cohesion across the product."

colors:
  primary: "#6c47ff"
  ink: "#000000"
  canvas: "#ffffff"
  hairline: "#d9d9de"
  muted: "#5e5f6e"
  surface-1: "#e3e3e7"
  surface-2: "#eeeef0"
  surface-3: "#d9d9de"
  link: "#6c47ff"
  error: "#ef4444"
  warning: "#ea520c"
  brand-yellow: "#fff963"
  brand-sky: "#38dafd"
  brand-sky-light: "#5de3ff"
  neutral-800: "#2f3037"
  neutral-700: "#42434d"
  neutral-600: "#5e5f6e"
  neutral-500: "#747686"
  neutral-400: "#9394a1"
  neutral-300: "#b7b8c2"
  neutral-200: "#d9d9de"
  neutral-100: "#e3e3e7"
  neutral-50: "#ffffff"

typography:
  display-xl:
    fontFamily: "geistNumbers, suisse, \"suisse Fallback\""
    fontSize: 32px
    fontWeight: 600
    lineHeight: 40px
    letterSpacing: "-0.48px"
  heading-lg:
    fontFamily: "geistNumbers, suisse, \"suisse Fallback\""
    fontSize: 13px
    fontWeight: 700
    lineHeight: 72px
    letterSpacing: "-1.6px"
  body-md:
    fontFamily: "geistNumbers, suisse, \"suisse Fallback\""
    fontSize: 13px
    fontWeight: 400
    lineHeight: 20px
  body-sm:
    fontFamily: "geistNumbers, suisse, \"suisse Fallback\""
    fontSize: 11px
    fontWeight: 400
    lineHeight: 18px
  caption-sm:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
    fontSize: 10px
    fontWeight: 400
    lineHeight: 16px
  code-sm:
    fontFamily: "soehneMono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace"
    fontSize: 12px
    fontWeight: 600
    lineHeight: 24px
  button-lg:
    fontFamily: "geistNumbers, suisse, \"suisse Fallback\""
    fontSize: 15px
    fontWeight: 400
    lineHeight: 24px
  label-sm:
    fontFamily: "ui-sans-serif, system-ui, sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\""
    fontSize: 12px
    fontWeight: 500
    lineHeight: 18px
  overline:
    fontFamily: "Inter, \"Inter Fallback\""
    fontSize: 11px
    fontWeight: 400
    lineHeight: 18px
  small:
    fontFamily: "Inter, \"Inter Fallback\""
    fontSize: 10px
    fontWeight: 400
    lineHeight: 16px
  tiny:
    fontFamily: "geistNumbers, suisse, \"suisse Fallback\""
    fontSize: 13px
    fontWeight: 500
    lineHeight: 19.89px

rounded:
  none: "0px"
  sm: "4px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"

spacing:
  xxs: "4px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  base: "20px"
  lg: "24px"
  xl: "32px"

components:
  primary-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    borderRadius: "{rounded.md}"
    paddingX: "{spacing.sm}"
    paddingY: "{spacing.xs}"
    font: "{typography.button-lg}"
    border: "0px"
  secondary-button:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    borderRadius: "{rounded.sm}"
    paddingX: "{spacing.sm}"
    paddingY: "{spacing.xs}"
    font: "{typography.body-sm}"
    borderWidth: "1px"
  card:
    backgroundColor: "{colors.surface-2}"
    borderColor: "{colors.hairline}"
    borderRadius: "{rounded.lg}"
    padding: "{spacing.md}"
    shadow: "0 1px 3px rgba(0,0,0,0.1)"
  modal:
    backgroundColor: "{colors.canvas}"
    borderRadius: "{rounded.xl}"
    padding: "{spacing.lg}"
    maxWidth: "480px"
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
  alert-success:
    backgroundColor: "#22c543"
    textColor: "{colors.canvas}"
    borderRadius: "{rounded.sm}"
    padding: "{spacing.sm}"
    font: "{typography.body-sm}"
  alert-error:
    backgroundColor: "{colors.error}"
    textColor: "{colors.canvas}"
    borderRadius: "{rounded.sm}"
    padding: "{spacing.sm}"
    font: "{typography.body-sm}"
  nav-bar:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderBottomColor: "{colors.hairline}"
    paddingY: "{spacing.xs}"
    font: "{typography.body-sm}"
  nav-link:
    textColor: "{colors.link}"
    font: "{typography.body-sm}"
    paddingX: "{spacing.xs}"
  input-field:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    borderRadius: "{rounded.sm}"
    paddingX: "{spacing.sm}"
    paddingY: "{spacing.xs}"
    font: "{typography.body-sm}"
  dropdown:
    backgroundColor: "{colors.surface-1}"
    borderColor: "{colors.hairline}"
    borderRadius: "{rounded.sm}"
    paddingY: "{spacing.xs}"
    font: "{typography.body-sm}"
  tooltip:
    backgroundColor: "{colors.neutral-800}"
    textColor: "{colors.canvas}"
    borderRadius: "{rounded.sm}"
    paddingX: "{spacing.xs}"
    paddingY: "{spacing.xxs}"
    font: "{typography.caption-sm}"
  badge-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    borderRadius: "{rounded.full}"
    paddingX: "{spacing.xxs}"
    paddingY: "{spacing.xxs}"
    font: "{typography.overline}"
  badge-neutral:
    backgroundColor: "{colors.neutral-200}"
    textColor: "{colors.ink}"
    borderRadius: "{rounded.full}"
    paddingX: "{spacing.xxs}"
    paddingY: "{spacing.xxs}"
    font: "{typography.overline}"
  footer:
    backgroundColor: "{colors.neutral-800}"
    textColor: "{colors.muted}"
    paddingY: "{spacing.md}"
    font: "{typography.caption-sm}"
  sidebar:
    backgroundColor: "{colors.neutral-100}"
    textColor: "{colors.ink}"
    width: "240px"
    padding: "{spacing.md}"
  form-label:
    textColor: "{colors.ink}"
    font: "{typography.label-sm}"
    marginBottom: "{spacing.xxs}"
  form-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    borderRadius: "{rounded.md}"
    paddingX: "{spacing.sm}"
    paddingY: "{spacing.xs}"
    font: "{typography.button-lg}"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.link}"
    borderRadius: "{rounded.full}"
    padding: "{spacing.xxs}"
    font: "{typography.body-sm}"

---


## Overview

Clerk’s visual language rests on a single, deliberate move: **Purple‑as‑action.** The system treats the brand purple #6c47ff as the exclusive signal for interactive elements, while all surrounding UI remains in neutral grays or stark white. Where most SaaS dashboards scatter multiple accent hues across headers, buttons, and alerts, Clerk confines color to one purposeful hue, letting structure and typography carry the remaining hierarchy. This restraint yields a clean, data‑focused experience that scales across documentation, dashboards, and embedded widgets.

Key Characteristics:
- Primary accent #6c47ff applied to headings, CTA buttons, and interactive icons.
- Dark ink #000000 provides maximum legibility on the white canvas.
- Neutral surface layers (#e3e3e7, #eeeef0) create depth without additional colors.
- Hairline borders #d9d9de delineate tables and cards with minimal visual weight.
- Rounded tokens range from 4 px to full circles, offering consistent curvature.
- Spacing tokens from 4 px to 24 px enforce a predictable rhythm.
- Typography hierarchy uses Geist‑Numbers for headings and body, with a mono‑stack for code.
- Component library includes 20 primitives covering navigation, forms, alerts, and modals.
- CSS custom properties expose every token for Tailwind or CSS‑in‑JS consumption.
- The design system aligns with Google Labs token spec, ensuring interoperability.

## Known Gaps

- The token set lacks explicit dark‑mode variants; designers must manually invert canvas and ink for night‑time experiences, which adds overhead for teams targeting both themes.
- No dedicated success color appears in the extracted palette, forcing reuse of the brand purple for positive feedback and potentially confusing users.
- The spacing scale includes compound values (e.g., "4px 8px") that are not directly usable as single‑dimension tokens, requiring developers to split them manually.
- Rounded values contain an extreme radius (6.71089e+07px) that does not map cleanly to typical UI patterns, so the full‑radius token is approximated with 9999px.
- Component documentation is limited to structural properties; interaction states such as hover, focus, and disabled are not enumerated, leaving implementation details ambiguous.
- Font‑size tokens are expressed in pixels rather than rem units, which can hinder responsive scaling across varied viewport sizes.
- The brand yellow #fff963 appears only in the color list but is not referenced by any component, suggesting an unused accent that could be repurposed for warnings or highlights.
