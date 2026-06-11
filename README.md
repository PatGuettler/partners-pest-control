# Partners Pest Solutions — Website

Static HTML/CSS/JS website for Partners Pest Solutions. No build step required — upload and go.

---

## Files

```
partners-pest/
├── index.html              ← Home page
├── pages/
│   ├── general-pest.html   ← General pest control
│   ├── termite.html        ← Termite control
│   ├── rodent.html         ← Rodent control
│   ├── mosquito.html       ← Mosquito & tick
│   └── contact.html        ← Inspection request form
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

## Deploy to GitHub Pages

1. Upload all files to your GitHub repository (maintain the folder structure)
2. Go to **Settings → Pages**
3. Set source to **Deploy from a branch**
4. Select branch: `main`, folder: `/ (root)`
5. Click **Save** — your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`

---

## Before Going Live — Replace These Placeholders

| File | Placeholder | Replace With |
|---|---|---|
| `js/components.js` | `(000) 000-0000` | Real phone number |
| `js/components.js` | `info@partnerspestsolutions.com` | Real email |
| `js/components.js` | `[STATE-LICENSE]` | State license number |
| `js/components.js` | `https://app.fieldworkhq.com/portal/YOUR-COMPANY-ID` | Real Fieldwork portal URL (Fieldwork → Settings → Customer Portal) |
| `pages/contact.html` | `(000) 000-0000` | Real phone number |
| `pages/contact.html` | `info@partnerspestsolutions.com` | Real email |
| `pages/contact.html` | `[STATE-LICENSE-NUMBER]` | State license number |
| `pages/contact.html` | `action="#"` | Form endpoint URL (see below) |
| All footer instances | `[STATE-LICENSE]` | State license number |

---

## Setting Up the Contact Form

The form currently submits to `#` (no-op) and shows a success message — fine for demo.

**To receive real emails**, replace `action="#"` in `pages/contact.html` with one of:

**Option A — Netlify Forms** (if hosting on Netlify):
1. Add `data-netlify="true"` to the `<form>` tag
2. Set `action="/pages/contact.html"` 
3. Netlify will auto-detect and route submissions to your email

**Option B — Formspree** (works with GitHub Pages):
1. Sign up at formspree.io
2. Create a new form → get your endpoint URL
3. Replace `action="#"` with `action="https://formspree.io/f/YOUR_ID"`
4. Change `method="POST"` (already set)

---

## Updating Content

**Phone / Email / License:** Edit `js/components.js` (nav/footer) and `pages/contact.html`

**Service content:** Edit the relevant HTML file in `pages/`

**Logo:** Replace `images/logo.jpg` — keep the same filename

**Fieldwork link:** Search for `YOUR-COMPANY-ID` across all files and replace with real portal URL

**Colors / fonts:** Edit `css/tokens.css` — all design decisions flow from there

---

## Dark Mode

The site automatically follows the user's OS/browser theme preference (`prefers-color-scheme`). No toggle needed. Dark mode tokens are defined at the bottom of `css/tokens.css`.
