# Private portfolio analytics

## Your dashboard

Sign in at https://bevanto.goatcounter.com/. Collection is configured for this account; viewing statistics must remain restricted to logged-in users. The portfolio has no public analytics page or dashboard link.

## Account setup and deployment

1. Create a site at https://www.goatcounter.com/ using an account only you control.
2. In Settings, set **Dashboard viewable by** to **Logged in users**. Do not use public access or secret-token access. Do not add other dashboard users.
3. Leave **Allow adding visitor counts on your website** disabled and do not enable dashboard embedding or public sharing.
4. Keep **Sessions** enabled under data collection so repeat visits/clicks are deduplicated by GoatCounter. For a minimal dashboard, turn off unneeded location, browser, and screen-size collection.
5. `siteCode` in `script.js` is set to `bevanto`. No password, access token, or API key belongs in the repository. The code alone allows collection, not dashboard access.
6. Keep `productionHosts` restricted to your live portfolio hostname. Add a custom domain here if you use one; previews and local files are excluded.
7. Merge and deploy the portfolio, then visit it and click each résumé download. Confirm page visits and résumé events appear in the signed-in dashboard. Check the dashboard in a signed-out/private browser: statistics must not be visible.

Until the site code is configured, analytics is disabled and no analytics script is requested. Dashboard access is enforced by GoatCounter's account settings, not by portfolio JavaScript.

## What you will see

- Page visits, including the individual project detail pages; `/` and `/index.html` share one entry.
- `resume-swe`: the software engineering résumé, combined across Home and SWE.
- `resume-qa`: the QA résumé.
- `resume-games`: the Game Dev résumé.

Résumé events represent clicks, not proof that a PDF downloaded successfully or was read. Direct visits to a PDF URL cannot be measured by this browser script. Visits are approximate, deduplicated within GoatCounter's session window; they are not identified people or a lifetime count of individuals. Do not add per-page unique counts together to infer unique people across the site. Ad blockers, privacy preferences, or a quick navigation before the analytics library loads may omit activity. Collection starts only after activation and deployment; there is no historical backfill.

The integration sends page paths and static page titles, plus the three fixed résumé event labels. It drops query strings, URL fragments and referrers, adds no custom visitor identifiers, and does not use cookies or local storage. It respects browser Do Not Track and Global Privacy Control signals. GoatCounter uses transient IP/browser information to estimate visits; see its privacy and session documentation below.

For your own browsing, use GoatCounter's documented **Ignore my own visits** option. Verify access settings before activation; never publish a dashboard token, an embedded dashboard, or count API output on the portfolio.

## Documentation

- https://www.goatcounter.com/help/start
- https://www.goatcounter.com/help/events
- https://www.goatcounter.com/help/sessions
- https://www.goatcounter.com/help/privacy
- https://www.goatcounter.com/help/skip-own
