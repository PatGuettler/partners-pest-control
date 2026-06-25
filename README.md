# Partners Pest Solutions — Website

Static HTML/CSS/JS website for [partnerspestsolutions.com](https://partnerspestsolutions.com). No build step required — upload and go.

---

## Files

```
partners-pest-control/
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

## Deploy to GitHub Pages

1. Upload all files to your GitHub repository (maintain the folder structure)
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**
4. Select branch: `main`, folder: `/ (root)`
5. Click **Save** — your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`
6. Point `partnerspestsolutions.com` DNS to GitHub Pages (or use Cloudflare Pages for simpler custom domain setup)

---

## Before Going Live — Replace These Placeholders

| File | Placeholder | Replace With |
|---|---|---|
| `js/components.js` | `[STATE-LICENSE]` | State license number |
| `pages/contact.html` | `[STATE-LICENSE-NUMBER]` | State license number |
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
