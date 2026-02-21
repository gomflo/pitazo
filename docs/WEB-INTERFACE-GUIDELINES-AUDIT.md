# Web Interface Guidelines – Auditoría

Revisión según [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines). Formato `file:line`.

## src/layouts/Layout.astro

- Layout.astro:12 - falta skip link a contenido principal (headings hierarchical; include skip link for main content)
- Layout.astro:20 - body: considerar `color-scheme` si se añade dark theme

## src/pages/index.astro

- index.astro:38 - subtítulo de fecha: usar `…` en lugar de `·` si se desea elipsis (Typography)
- index.astro:57 - empty state: mensaje claro ✓
- index.astro:76 - script: `formatDate` duplicado server/client; mismo algoritmo → sin riesgo hidratación ✓

## src/components/MatchCard.astro

- MatchCard.astro:23 - img equipo local: `alt=""` → usar alt descriptivo p. ej. `alt={"Logo de " + match.home}`
- MatchCard.astro:40 - img equipo visitante: idem, `alt={"Logo de " + match.away}`
- MatchCard.astro:14 - article: no es interactivo; no requiere cursor-pointer ✓

## src/components/DayPickerCarousel.tsx

- DayPickerCarousel.tsx:45 - nav: añadir `touch-action: manipulation` en contenedor scroll (Touch & Interaction)
- DayPickerCarousel.tsx:54 - Button: tiene aria-pressed y aria-label ✓
- DayPickerCarousel.tsx:55 - transition-colors: ya usa transition-colors ✓

## src/components/ui/button.tsx

- button.tsx:8 - focus-visible:outline-none + ring ✓ (never outline-none without replacement)
- button.tsx:8 - transition-colors ✓

## src/components/ui/carousel.tsx

- carousel.tsx:213 - CarouselPrevious: sr-only "Previous slide" ✓ (icon-only con texto accesible)
- carousel.tsx:239 - CarouselNext: idem ✓

## src/styles/global.css

- global.css:70 - .day-picker-scroll: animaciones/transiciones; añadir respeto a prefers-reduced-motion

## Resumen

- **Corregir:** skip link (Layout), alt en logos (MatchCard), touch-action (DayPickerCarousel), prefers-reduced-motion (global.css).
- **Opcional:** tipografía "…" donde aplique; color-scheme si hay dark.
