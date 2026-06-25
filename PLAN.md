# Partners Pest Solutions — Remaining Work Plan

Plan for everything still needed to take **partnerspestsolutions.com** from its current state to production-ready. Use this as a launch checklist.

**Last updated:** June 2025

---

## Current Status (Done)

- [x] New pages: Residential, Commercial & Industrial, Bed Bug, About
- [x] Termite content removed (page deleted, nav/footer/home/form updated)
- [x] Mosquito & Tick page kept as-is
- [x] Logo display enlarged (nav 80px, footer 90px)
- [x] "Request an Inspection" / "Pay My Bill" replaced with Contact Us + `(256) 302-6660`
- [x] Phone and email placeholders updated site-wide
- [x] README documents recommended free stack (Cloudflare Pages, Formspree, Zoho Mail)

---

## Phase 1 — Launch Blockers

These must be completed before the site goes live. Nothing here requires code unless noted.

### 1.1 Hosting & Domain

| # | Task | Owner | Notes |
|---|------|-------|-------|
| 1 | Choose host: **Cloudflare Pages** (recommended) or GitHub Pages | Client / Dev | Cloudflare simplifies custom domain + DNS in one place |
| 2 | Connect GitHub repo to host and deploy `main` branch | Dev | No build step — static files deploy as-is |
| 3 | Add custom domain `partnerspestsolutions.com` in host settings | Dev | Host will provide DNS records or nameservers |
| 4 | Point domain DNS to host (A/CNAME or Cloudflare nameservers) | Client | DNS propagation can take up to 48 hours |
| 5 | Verify HTTPS works on `https://partnerspestsolutions.com` | Dev | Auto-issued via Cloudflare / GitHub Pages |
| 6 | Set up `www` redirect → apex (or vice versa) | Dev | Pick one canonical URL and redirect the other |

### 1.2 Contact Form (Formspree)

The form in `pages/contact.html` currently has `action="#"` — submissions **do not send email** and will show an error alert.

| # | Task | File(s) | Notes |
|---|------|---------|-------|
| 1 | Create free [Formspree](https://formspree.io) account | — | Free tier: 50 submissions/month |
| 2 | Create a new form; copy endpoint URL | — | Looks like `https://formspree.io/f/xxxxxxxx` |
| 3 | Set form `action` to Formspree URL | `pages/contact.html` | Replace `action="#"` |
| 4 | Set notification email in Formspree dashboard | Formspree | Where submissions are delivered |
| 5 | Test a real submission end-to-end | — | Confirm email arrives with all fields |
| 6 | Decide on photo uploads | `pages/contact.html` | File upload field exists; Formspree free tier may not support attachments — either remove upload field or upgrade Formspree |

**Optional code fix after Formspree is wired:** rename form id `inspection-form` → `contact-form` in `pages/contact.html` and `js/contact.js` for clarity.

### 1.3 Business Email

| # | Task | Notes |
|---|------|-------|
| 1 | Set up [Zoho Mail](https://www.zoho.com/mail/) (free for 1 domain) | Creates `info@partnerspestsolutions.com` |
| 2 | Add MX records in DNS (Zoho provides these) | Required for email to work |
| 3 | Verify `info@partnerspestsolutions.com` sends/receives | Test from personal email |
| 4 | Point Formspree notifications to this inbox | Or a personal email if preferred |

### 1.4 License Number

| # | Task | File(s) |
|---|------|---------|
| 1 | Get Alabama pest control license number from client | — |
| 2 | Replace `[STATE-LICENSE]` | `js/components.js` (footer) |
| 3 | Replace `[STATE-LICENSE-NUMBER]` | `pages/contact.html` (contact info card) |

---

## Phase 2 — Client Input Needed

Decisions or content only the business owner can provide.

| # | Question | Impact | Default if no answer |
|---|----------|--------|----------------------|
| 1 | **Physical business address** — display on Contact page / footer? | Local SEO, trust | Omit for now; phone + email only |
| 2 | **1-800-554-1422** on Residential page — still active? | `pages/residential.html` | Keep both numbers |
| 3 | **`general-pest.html`** — keep, remove, or redirect to Residential? | Legacy page still exists, not in main nav | Keep in footer only; no redirect |
| 4 | **Hours of operation** — add to Contact page? | Customer convenience | Omit |
| 5 | **Service area map or city list** — expand beyond About page? | SEO | Current city list on About is sufficient |
| 6 | **Logo file** — happy with current `images/logo.jpg` at larger size? | Branding | Keep current file |
| 7 | **Photo uploads on contact form** — needed? | Form complexity / Formspree tier | Remove field if not needed |

---

## Phase 3 — Code & Content Cleanup

Small fixes that improve consistency. Can be done anytime before or after launch.

| # | Task | File(s) | Priority |
|---|------|---------|----------|
| 1 | Update contact form notes placeholder ("prepare for the inspection" → general message) | `pages/contact.html` | Medium |
| 2 | Update sidebar copy "schedule an inspection directly" → "schedule service" | `pages/contact.html` | Low |
| 3 | Rename `inspection-form` → `contact-form` | `pages/contact.html`, `js/contact.js` | Low |
| 4 | Remove or redirect `pages/general-pest.html` if client confirms | `pages/general-pest.html`, nav/footer if needed | Depends on Phase 2 |
| 5 | Add `rel="noopener"` audit on any new external links | All pages | Low |
| 6 | Review mobile nav with 8 items — consider grouping Services in a dropdown if cramped | `js/components.js`, `css/nav.css` | Medium |

---

## Phase 4 — SEO & Polish

Recommended before or shortly after launch. Improves discoverability and professionalism.

| # | Task | File(s) | Notes |
|---|------|---------|-------|
| 1 | Add favicon (`images/favicon.ico` or PNG) | All HTML `<head>` sections | Generate from logo |
| 2 | Add Open Graph + Twitter Card meta tags | `index.html` + key pages | Better link previews on social |
| 3 | Add `<link rel="canonical" href="https://partnerspestsolutions.com/...">` | All pages | Prevents duplicate URL issues |
| 4 | Create `sitemap.xml` | Repo root | Submit to Google Search Console |
| 5 | Create `robots.txt` | Repo root | Allow all; point to sitemap |
| 6 | Register [Google Search Console](https://search.google.com/search-console) | — | Verify domain ownership |
| 7 | Set up [Google Business Profile](https://business.google.com) | — | Critical for local pest control SEO |
| 8 | Add privacy policy page (brief) | `pages/privacy.html` | Recommended if collecting form data; link from footer |
| 9 | Optional: Google Analytics or Cloudflare Web Analytics | `js/` or Cloudflare dashboard | Free traffic insights |

---

## Phase 5 — Post-Launch

Ongoing items after the site is live.

| # | Task | Notes |
|---|------|-------|
| 1 | Monitor Formspree submission volume (50/mo free limit) | Upgrade if needed |
| 2 | Test contact form monthly | Ensure emails still deliver |
| 3 | Keep license number and phone current | `js/components.js`, `pages/contact.html` |
| 4 | Seasonal content updates (e.g. mosquito program timing) | `pages/mosquito.html` |
| 5 | Collect and add customer testimonials | `index.html` — no section exists yet |
| 6 | Add team/technician photos if available | About page |
| 7 | Review Search Console for crawl errors | After sitemap submitted |

---

## Recommended Free Stack (Summary)

| Need | Service | Cost |
|------|---------|------|
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com) | Free |
| DNS + domain | [Cloudflare](https://cloudflare.com) registrar or DNS | Domain ~$10–15/yr; DNS free |
| Contact form → email | [Formspree](https://formspree.io) | Free (50 submissions/mo) |
| Business email | [Zoho Mail](https://www.zoho.com/mail/) | Free (1 domain, up to 5 users) |
| Local SEO | Google Business Profile | Free |
| Analytics | Cloudflare Web Analytics | Free |

**Total recurring cost:** domain registration only (~$10–15/year) if using the free tiers above.

---

## Launch Checklist (Quick Reference)

Copy this for go-live day:

```
[ ] Site deployed to Cloudflare Pages (or GitHub Pages)
[ ] partnerspestsolutions.com resolves with HTTPS
[ ] www redirect configured
[ ] Formspree connected and tested
[ ] info@partnerspestsolutions.com working
[ ] License number added to footer and contact page
[ ] All pages load correctly on mobile
[ ] Phone link (256) 302-6660 works from mobile
[ ] Client reviewed all page content
[ ] Google Search Console + Business Profile set up
[ ] sitemap.xml submitted
```

---

## File Reference — Where to Edit What

| What to change | Where |
|----------------|-------|
| Phone, email, license, nav, footer | `js/components.js` |
| Contact form endpoint | `pages/contact.html` → `action` attribute |
| Form validation / submit behavior | `js/contact.js` |
| Service page content | `pages/*.html` |
| Home page | `index.html` |
| Logo image | `images/logo.jpg` |
| Colors, fonts, spacing | `css/tokens.css` |
| Logo size in nav | `css/nav.css` + `js/components.js` (width/height attrs) |

---

## Suggested Order of Work

1. **Get license number** from client (5 min once they reply)
2. **Set up Formspree** → wire form → test (30 min)
3. **Deploy to Cloudflare Pages** from GitHub (30 min)
4. **Point DNS** for partnerspestsolutions.com (5 min + propagation wait)
5. **Set up Zoho Mail** for info@ (30 min + DNS)
6. **Client content review** — confirm 800 number, address, general-pest page (async)
7. **Phase 4 SEO items** — favicon, sitemap, Search Console (1–2 hours)
8. **Post-launch** — Google Business Profile, testimonials over time

---

*For deployment and form setup details, see also [README.md](./README.md).*
