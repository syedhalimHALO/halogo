# HaloGo Partner — Production Polish V1.1

Production canonical domain: https://halogo.my/
Staging: GitHub Pages may continue to be used for testing, but production SEO signals point to halogo.my.

## Phase 1.1 — Production Domain Alignment
- Re-pointed canonical URLs from GitHub Pages to https://halogo.my/.
- Re-pointed Open Graph and Twitter image/URL metadata to production domain.
- Re-pointed JSON-LD @id, url, publisher, breadcrumb and store page references to production domain.
- Updated sitemap.xml to production URLs.
- Updated robots.txt sitemap declaration to https://halogo.my/sitemap.xml.
- Scanned deployable HTML/CSS/JS/XML/JSON/TXT for legacy GitHub production references.
- Internal navigation remains relative so the same build can be tested on staging.
- Added redirect migration map for the existing halogo.my site.

## Important launch note
The current halogo.my site already has indexed extensionless URLs (for example /business, /support, /downloads). The revamp currently uses .html URLs. Do not remove valuable legacy URLs without redirects. Implement the mappings in REDIRECT-MAP.md at the hosting/server layer before cut-over.

## Recommended production sequence
1. Deploy to staging and QA.
2. Configure redirects at the final host.
3. Deploy to halogo.my.
4. Verify https://halogo.my/robots.txt and https://halogo.my/sitemap.xml.
5. Verify canonical tags and structured data on live pages.
6. Submit the production sitemap in Google Search Console.


## PHASE 2 — CSS + JAVASCRIPT + CORE WEB VITALS
See `PHASE-2-OPTIMIZATION-NOTES.md` for the complete Phase 2 changelog and deployment recommendations.
