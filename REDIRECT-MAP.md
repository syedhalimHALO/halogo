# HaloGo Partner — Redirect Migration Map

This is a launch-time redirect plan for the existing halogo.my site. Redirects must be implemented by the production host/server; a static HTML file cannot create a true HTTP 301 by itself.

## Confirmed high-priority mappings
| Existing indexed URL | Revamp destination | Action |
|---|---|---|
| `https://halogo.my/` | `https://halogo.my/` | Replace homepage; no redirect needed |
| `https://halogo.my/business` | `https://halogo.my/business.html` | HTTP 301 |

## Legacy URLs to preserve unless intentionally retired
These URLs were discoverable on the existing site during the 2026-08-09 migration audit and are not represented by equivalent standalone pages in the current four-page revamp. Do **not** blindly redirect all of them to the homepage. Preserve them, migrate their content, or map each to a genuinely equivalent destination.

- `/support`
- `/applicationform`
- `/downloads`
- `/terms_of_use`
- `/terms_and_condition`
- `/mobile_apps`
- `/ht_hi_value`

Other legacy URLs may exist. Before final cut-over, export URLs from Google Search Console / analytics and crawl the live legacy site to create the exhaustive redirect table.

## Proposed revamp canonical URLs
- `/`
- `/business.html`
- `/sim-card-esim.html`
- `/location.html`

## Engineering rule
Use one-hop HTTP 301 redirects. Avoid redirect chains and avoid mass-redirecting unrelated retired URLs to the homepage.
