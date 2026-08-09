# HaloGo Partner — Launch Day Runbook

## T-24h
1. Freeze content/code changes except launch blockers.
2. Back up existing `halogo.my`.
3. Confirm 301 redirect configuration is ready.
4. Confirm production hosting, SSL, compression and cache configuration.
5. Confirm Search Console Domain property ownership or prepare DNS TXT verification.

## T-0: Deploy
1. Deploy Production Polish build.
2. Confirm homepage returns 200 over HTTPS.
3. Validate the four core pages and static assets.
4. Validate `robots.txt` and `sitemap.xml`.
5. Activate/test legacy 301 redirects.
6. Check canonical URLs and structured data.

## T+30–60 minutes
Only when the production checks pass:
1. Submit `sitemap.xml` in Search Console.
2. URL Inspect homepage and request indexing.
3. Inspect/request the remaining three core URLs.
4. Record any indexing/canonical warnings.

## T+24h
1. Recheck sitemap processing.
2. Check Page Indexing/Crawl Stats.
3. Check server logs/hosting analytics for 404/5xx if available.
4. Fix launch blockers, not cosmetic SEO fluctuations.

## T+72h
1. Re-test redirects and core pages.
2. Review Search Console impressions/discovered URLs.
3. Record a baseline for future SEO comparison.

## Rollback trigger examples
Consider rollback/fix-forward immediately if:
- homepage/core pages return 5xx;
- CSS/JS/assets fail broadly;
- robots/noindex blocks production;
- canonical points to staging/wrong host;
- critical legacy redirects are broken.
