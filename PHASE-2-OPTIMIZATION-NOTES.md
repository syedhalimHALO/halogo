# HaloGo Partner — Phase 2 Optimization Notes

Version: Production Polish V2
Date: 2026-08-09
Production domain: https://halogo.my/
Base: HaloGo Partner Production Polish V1.1

## Objective
Optimize CSS delivery, JavaScript execution and Core Web Vitals readiness while preserving the approved visual design and functionality.

## Completed

### CSS
- Created `css/halogo.min.css` from the consolidated master stylesheet using parser-safe minification.
- All production pages now load the minified stylesheet.
- Raw CSS payload reduced from 632,947 bytes to 591,636 bytes (~6.5%).
- Estimated gzip payload reduced from ~109.8 KB to ~97.1 KB (~11.6%).
- Original `css/halogo.css` is retained as the editable source file. Future CSS edits should be made to the source and the minified production file regenerated.
- No aggressive unused-selector purge was performed because multiple visual states/classes are activated dynamically by JavaScript.

### JavaScript / interaction performance
- Shared header scroll state now uses `requestAnimationFrame` throttling rather than updating on every raw scroll event.
- Decorative pointer/parallax effects are limited to devices with a fine pointer and hover capability.
- Reduced-motion behaviour remains respected.
- Business sales carousel autoplay stops when off-screen or when the browser tab is hidden, and resumes only when useful.
- Existing passive scroll/touch listeners and IntersectionObserver optimizations were preserved.

### Location page / Leaflet
- Removed Leaflet + MarkerCluster from the initial render path.
- The page no longer requests 3 Leaflet/MarkerCluster stylesheets and 2 JavaScript libraries directly from the HTML head.
- Map dependencies are loaded dynamically when the locator approaches the viewport, when the hero search requires the locator, or during browser idle time.
- Added loading and graceful map-failure states.
- Existing jsDelivr preconnect is retained to reduce connection setup time once the map is requested.

### Core Web Vitals readiness
- Phase 1 LCP image priority and intrinsic image dimensions are preserved.
- Phase 2 reduces initial third-party work on Location and reduces continuous main-thread animation/scroll work.
- Production should target good Core Web Vitals at the 75th percentile: LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1.
- Final scores cannot be guaranteed from source-code inspection alone; they must be measured after deployment because hosting, cache headers, CDN, network, device and real-user conditions affect results.

## Static QA completed
- All 4 HTML pages parsed successfully.
- No duplicate HTML IDs detected.
- All referenced local images, CSS and JavaScript files exist.
- All 8 JavaScript files pass `node --check`.
- Minified CSS parses with zero stylesheet parse errors.
- No GitHub staging-domain references remain in production metadata/files.
- Location HTML no longer contains eager Leaflet/MarkerCluster stylesheet/script tags.

## Server / hosting recommendations for production cut-over
These are deployment-layer settings and are not forced into the static package because the final hosting stack has not been identified.

1. Enable Brotli and/or gzip for HTML, CSS, JS, SVG, JSON and XML.
2. Use long-lived immutable caching for versioned static assets (images/CSS/JS), while keeping HTML cache shorter.
3. Serve HTTPS only and redirect HTTP to HTTPS.
4. Prefer HTTP/2 or HTTP/3 where available.
5. Verify MIME types for WebP, webmanifest, XML and fonts.
6. Run PageSpeed Insights/Lighthouse after `halogo.my` deployment and then validate field data in Search Console/CrUX when sufficient traffic exists.

## Files most relevant to Phase 2
- `css/halogo.css` — editable source
- `css/halogo.min.css` — production stylesheet
- `js/script.js` — shared scroll/header optimization
- `js/business-luxury-polish.js` — fine-pointer gating
- `js/help-centre.js` — fine-pointer gating
- `js/sales-carousel.js` — visibility-aware autoplay
- `js/location.js` — deferred Leaflet loading
- `location.html` — initial Leaflet dependencies removed

## Next recommended phase
Phase 3 — Advanced SEO & Content Architecture: keyword/search-intent mapping, internal linking, on-page copy optimization, local SEO landing strategy, entity consistency and conversion-oriented content structure.
