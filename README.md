# Partners Pest Solutions — Website

Static HTML/CSS/JS website for [partnerspestsolutions.com](https://partnerspestsolutions.com). Source lives in the repo root; `deploy/build.sh` packages deployable files into `dist/` for GitHub Pages and AWS.

**→ See [PLAN.md](./PLAN.md) for the full go-live checklist and step-by-step manual setup instructions for every remaining item.**

---

## Files

```
partners-pest-control/
├── .github/workflows/      ← CI/CD (GitHub Pages + AWS)
├── deploy/
│   ├── build.sh            ← Packages site → dist/
│   └── aws/README.md       ← AWS S3 + CloudFront setup guide
├── index.html              ← Home page
├── pages/
│   ├── residential.html    ← Residential pest control
│   ├── commercial.html     ← Commercial & industrial
│   ├── bed-bug.html        ← Bed bug treatment
│   ├── about.html          ← About us
│   ├── mosquito.html       ← Mosquito & tick
│   ├── rodent.html         ← Rodent control
│   ├── general-pest.html   ← General pest control (legacy)
│   └── contact.html        ← Contact form
├── css/
│   ├── tokens.css          ← Design tokens (colors, type, spacing)
│   ├── base.css            ← Reset, utilities, buttons, cards
│   ├── nav.css             ← Navigation styles
│   ├── home.css            ← Home page styles
│   └── pages.css           ← Inner page styles (pest, contact, footer)
├── js/
│   ├── components.js       ← Nav & footer injected into every page
│   ├── main.js             ← Scroll behavior, active links, reveal
│   └── contact.js          ← Form validation & submission
└── images/
    └── logo.jpg            ← Partners Pest Solutions logo
```

---

## Recommended Free Stack

| Need | Free Option | Notes |
|---|---|---|
| **Hosting** | [GitHub Pages](https://pages.github.com) or [Cloudflare Pages](https://pages.cloudflare.com) | Both free for static sites. Cloudflare Pages pairs well with the domain. |
| **Domain DNS** | [Cloudflare](https://cloudflare.com) (free plan) | Point `partnerspestsolutions.com` A/CNAME records to your host. |
| **Contact form email** | [Formspree](https://formspree.io) (free tier: 50 submissions/mo) | Works with GitHub Pages. Set `action="https://formspree.io/f/YOUR_ID"` in `pages/contact.html`. |
| **Business email** | [Zoho Mail](https://www.zoho.com/mail/zohomail-pricing.html) (free for 1 domain, up to 5 users) | Gives you `info@partnerspestsolutions.com` without paying for Google Workspace. |

**Suggested setup:** Cloudflare Pages (hosting + DNS) → Formspree (form emails to your inbox) → Zoho Mail (professional email address).

---

## Deploy

### GitHub Pages (current)

Deployments run automatically via GitHub Actions on every push to `main`.

**One-time setup** (if not already done):

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under **Build and deployment**, set **Source** to **GitHub Actions** (not "Deploy from a branch")
4. Push to `main` — the **Deploy to GitHub Pages** workflow runs automatically
5. Site URL: `https://patguettler.github.io/partners-pest-control/`

Workflow file: `.github/workflows/github-pages.yml`

**Local preview:**

```bash
bash deploy/build.sh
cd dist && python3 -m http.server 8080
# Open http://localhost:8080
```

### AWS (optional)

For S3 + CloudFront production hosting, see **[deploy/aws/README.md](./deploy/aws/README.md)**.

Workflow file: `.github/workflows/deploy-aws.yml` (manual trigger after AWS secrets are configured)

---

## Before Going Live — Replace These Placeholders

| File | Placeholder | Replace With |
|---|---|---|
| License number | `js/config.js` → `licenseNumber` | Populates footer and contact page automatically |
| `pages/contact.html` | `action="#"` | Formspree endpoint URL (see below) |

Phone `(256) 302-6660` and email `info@partnerspestsolutions.com` are already set.

---

## Setting Up the Contact Form

The form currently submits to `#` (no-op) and shows a success message — fine for demo.

**To receive real emails with Formspree** (recommended for GitHub Pages):

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form → get your endpoint URL
3. In `pages/contact.html`, replace `action="#"` with `action="https://formspree.io/f/YOUR_ID"`
4. Formspree will email submissions to your inbox

**Alternative — Netlify Forms** (if hosting on Netlify instead):

1. Add `data-netlify="true"` to the `<form>` tag
2. Set `action="/pages/contact.html"`
3. Netlify auto-detects and routes submissions to your email

---

## Updating Content

**Phone / Email / License:** Edit `js/components.js` (nav/footer) and `pages/contact.html`

**Service content:** Edit the relevant HTML file in `pages/`

**Logo:** Replace `images/logo.jpg` — keep the same filename

**Colors / fonts:** Edit `css/tokens.css` — all design decisions flow from there

---

## Dark Mode

The site automatically follows the user's OS/browser theme preference (`prefers-color-scheme`). No toggle needed. Dark mode tokens are defined at the bottom of `css/tokens.css`.
