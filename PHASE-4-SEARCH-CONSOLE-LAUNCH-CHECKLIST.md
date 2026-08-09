# HaloGo Partner — Phase 4 Search Console, Indexing & Launch SEO Preparation
Production domain: https://halogo.my/
Prepared: 2026-08-09

## A. PRE-LAUNCH — COMPLETE IN THIS PACKAGE
- [x] Production canonical URLs point to `https://halogo.my/`.
- [x] XML sitemap uses absolute production URLs.
- [x] `robots.txt` declares the production sitemap.
- [x] Core pages are indexable in the production build.
- [x] Structured data and social metadata use production-domain references.
- [x] GitHub staging is not used as the canonical production source.
- [x] Redirect planning document is included.
- [x] Phase 1–3 SEO/performance work retained.

## B. BEFORE DNS / HOSTING CUT-OVER
- [ ] Back up the current `halogo.my` website and current redirect rules.
- [ ] Record important legacy URLs and traffic/ranking pages from the existing site.
- [ ] Implement the approved 301 redirect map at server/hosting level.
- [ ] Ensure HTTPS certificate is active for `halogo.my`.
- [ ] Choose one hostname policy (`https://halogo.my/` is the canonical target); redirect HTTP and unwanted hostname variants consistently.
- [ ] Confirm server returns real HTTP status codes: 200 for live pages, 301 for permanent moves, 404/410 for genuinely removed URLs.
- [ ] Enable Brotli/Gzip and long-lived caching for versioned static assets where hosting supports it.

## C. GOOGLE SEARCH CONSOLE SETUP
Recommended property: Domain property `halogo.my`.
- [ ] Sign in to Google Search Console using the company-controlled Google account.
- [ ] Add Domain property: `halogo.my` (do not enter `https://`).
- [ ] Copy the unique Google verification TXT record.
- [ ] Add that TXT record in the DNS provider for `halogo.my`.
- [ ] Keep the TXT record permanently after verification.
- [ ] Grant appropriate company/team users access; avoid dependence on one personal account.

Why Domain property: it covers protocols and subdomains in one property and uses DNS verification.

## D. GO-LIVE VALIDATION — DO BEFORE REQUESTING INDEXING
Check these production URLs directly:
- `https://halogo.my/`
- `https://halogo.my/business.html`
- `https://halogo.my/sim-card-esim.html`
- `https://halogo.my/location.html`
- `https://halogo.my/robots.txt`
- `https://halogo.my/sitemap.xml`

For every core page:
- [ ] HTTP 200.
- [ ] Correct page renders on desktop/mobile.
- [ ] Canonical equals the intended production URL.
- [ ] No `noindex`.
- [ ] Internal links work.
- [ ] Images/fonts/JS/CSS return successfully.
- [ ] Structured data has no critical syntax errors.
- [ ] Legacy URL redirects resolve in one hop to the correct destination.

## E. SITEMAP + INDEXING
After the new site is live and validated:
- [ ] Search Console → Sitemaps → submit `https://halogo.my/sitemap.xml`.
- [ ] Confirm sitemap status is successful and URLs are discovered.
- [ ] Use URL Inspection on the homepage first.
- [ ] Inspect the other three core pages.
- [ ] Request indexing only after each inspected URL is live, canonical and correct.
- [ ] Do not repeatedly spam Request Indexing; sitemap + crawlable internal links remain the scalable discovery mechanism.

Priority order:
1. `https://halogo.my/`
2. `https://halogo.my/business.html`
3. `https://halogo.my/location.html`
4. `https://halogo.my/sim-card-esim.html`

## F. FIRST 72 HOURS
- [ ] Check Page Indexing for accidental exclusions.
- [ ] Check sitemap processing.
- [ ] Check Crawl Stats / server errors.
- [ ] Test legacy 301 redirects.
- [ ] Search branded queries manually for obvious wrong/legacy results, but use Search Console as the primary source of truth.
- [ ] Do not make unnecessary URL/title architecture changes immediately after launch unless there is a real issue.

## G. FIRST 2–4 WEEKS
Track:
- Indexed core URLs.
- Branded impressions/clicks.
- Non-branded queries by landing page.
- CTR by page/query.
- Mobile usability / Core Web Vitals.
- 404s and redirect errors.
- Queries around Halo Telco plans, HaloGo Partner/rakan niaga, eSIM/simkad and locations.

Use actual Search Console query data to guide the next content expansion. Avoid creating thin keyword pages before data supports them.

## Important
Search Console verification, sitemap submission and Request Indexing are account-side actions. They cannot be completed merely by adding files to this ZIP. Do them against the live production domain after deployment.
