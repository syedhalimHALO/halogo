# HaloGo Partner — Phase 4.1 Bilingual Architecture & English Version

Production domain: https://halogo.my/
Prepared: 2026-08-09

## Architecture
Bahasa Malaysia remains the default language at the root:
- `/`
- `/business.html`
- `/sim-card-esim.html`
- `/location.html`

English is published under:
- `/en/`
- `/en/business.html`
- `/en/sim-card-esim.html`
- `/en/location.html`

## Implemented
- Complete English version of the four core pages.
- Professional Malaysian-English copy rather than literal word-for-word translation.
- BM / EN language switcher in the global header.
- Equivalent-page switching (for example `/business.html` ↔ `/en/business.html`).
- `lang="ms-MY"` and `lang="en-MY"` document language declarations.
- Self-referencing canonical URLs for each language page.
- Reciprocal `hreflang="ms-MY"` and `hreflang="en-MY"`.
- `hreflang="x-default"` points to the Bahasa Malaysia default.
- Open Graph locale + alternate locale.
- Sitemap expanded from 4 to 8 URLs with reciprocal xhtml hreflang links.
- English SEO titles and meta descriptions.
- English JSON-LD for pages that already contain structured data.
- Separate `/js/en/` dynamic string layer so BM interactions remain untouched.
- English translations for FAQ/search, calculator messages, partner journey and locator states.
- Shared images/fonts/CSS retained to avoid duplicating large assets.
- Production canonical host remains `https://halogo.my/`; staging remains non-canonical.

## Maintenance rule
Whenever visible BM copy changes materially, review the equivalent English page and its dynamic JS strings in the same release. Product names, prices, quotas, benefits, commission claims, contact details and legal disclaimers must stay synchronized across both languages.

## Search Console
After production launch, submit the single bilingual `/sitemap.xml`. Google can discover both language versions through sitemap hreflang, reciprocal head hreflang and internal language-switch links.
