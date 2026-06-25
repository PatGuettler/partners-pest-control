# Partners Pest Solutions — Remaining Work Plan

Plan for everything still needed to take **partnerspestsolutions.com** from its current state to production-ready.

**Last updated:** June 2025

---

## Table of Contents

1. [Current Status (Done)](#current-status-done)
2. [Quick Launch Checklist](#quick-launch-checklist)
3. [Suggested Order of Work](#suggested-order-of-work)
4. [Phase 1 — Launch Blockers (Manual Setup)](#phase-1--launch-blockers-manual-setup)
   - [1.1 Hosting & Domain (Cloudflare Pages)](#11-hosting--domain-cloudflare-pages)
   - [1.1 Alt — GitHub Pages](#11-alt--github-pages)
   - [1.2 Contact Form (Formspree)](#12-contact-form-formspree)
   - [1.3 Business Email (Zoho Mail)](#13-business-email-zoho-mail)
   - [1.4 License Number](#14-license-number)
5. [Phase 2 — Client Input (Manual Decisions)](#phase-2--client-input-manual-decisions)
6. [Phase 3 — Code & Content Cleanup](#phase-3--code--content-cleanup)
7. [Phase 4 — SEO & Polish (Manual Setup)](#phase-4--seo--polish-manual-setup)
8. [Phase 5 — Post-Launch (Ongoing Manual Tasks)](#phase-5--post-launch-ongoing-manual-tasks)
9. [File Reference](#file-reference)

---

## Current Status (Done)

- [x] New pages: Residential, Commercial & Industrial, Bed Bug, About
- [x] Termite content removed
- [x] Mosquito & Tick page kept as-is
- [x] Logo display enlarged
- [x] Contact Us + `(256) 302-6660` replaces old CTAs
- [x] Phone and email updated site-wide

---

## Quick Launch Checklist

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
[ ] sitemap.xml submitted (after dev adds file)
```

---

## Suggested Order of Work

Do these in order — later steps depend on earlier ones:

1. Push code to GitHub (if not already)
2. **1.1** Deploy to Cloudflare Pages
3. **1.1** Connect domain DNS (can propagate while you do other steps)
4. **1.2** Set up Formspree and wire the form
5. **1.3** Set up Zoho Mail (needs DNS access from step 3)
6. **1.4** Add license number once client provides it
7. **Phase 2** Send client the decision questionnaire
8. **Phase 4** Google Search Console + Business Profile (after site is live)
9. **Phase 3** Code cleanup (you or your developer)
10. **Phase 5** Ongoing maintenance

---

## Phase 1 — Launch Blockers (Manual Setup)

---

### 1.1 Hosting & Domain (Cloudflare Pages)

**What you need before starting:**
- A [GitHub](https://github.com) account
- This project's code pushed to a GitHub repository
- Access to where `partnerspestsolutions.com` is registered (GoDaddy, Namecheap, Google Domains, etc.)
- A [Cloudflare](https://cloudflare.com) account (free)

#### Step 1 — Push the site to GitHub

1. Go to [github.com/new](https://github.com/new)
2. Create a repository (e.g. `partners-pest-control`)
3. On your computer, in the project folder, run:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/partners-pest-control.git
   git branch -M main
   git push -u origin main
   ```
4. Confirm all files are visible on GitHub (including `index.html` at the repo root)

#### Step 2 — Create a Cloudflare account and add your domain

1. Go to [dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up) and create an account
2. Click **Add a site**
3. Enter `partnerspestsolutions.com` and click **Continue**
4. Select the **Free** plan → **Continue**
5. Cloudflare will scan existing DNS records — review and click **Continue**

#### Step 3 — Point your domain to Cloudflare nameservers

1. Cloudflare shows two nameservers (e.g. `ada.ns.cloudflare.com` and `bob.ns.cloudflare.com`)
2. Log in to wherever you bought the domain (registrar)
3. Find **DNS Settings** or **Nameservers**
4. Change from default nameservers to Cloudflare's two nameservers
5. Save — propagation takes 15 minutes to 48 hours
6. In Cloudflare, click **Done, check nameservers** — status will show **Active** when ready

#### Step 4 — Connect GitHub and deploy on Cloudflare Pages

1. In Cloudflare dashboard, go to **Workers & Pages** (left sidebar)
2. Click **Create** → **Pages** → **Connect to Git**
3. Authorize Cloudflare to access GitHub
4. Select the `partners-pest-control` repository
5. Click **Begin setup**
6. Configure build settings:
   - **Project name:** `partners-pest-solutions` (or any name)
   - **Production branch:** `main`
   - **Framework preset:** `None`
   - **Build command:** leave **empty**
   - **Build output directory:** `/` (root)
7. Click **Save and Deploy**
8. Wait 1–2 minutes — you'll get a URL like `partners-pest-solutions.pages.dev`
9. Open that URL and confirm the site loads

#### Step 5 — Add the custom domain

1. In your Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter `partnerspestsolutions.com` → **Continue** → **Activate domain**
4. Cloudflare auto-creates the DNS record (usually a CNAME) — no manual DNS needed if domain is on Cloudflare
5. Wait a few minutes, then open `https://partnerspestsolutions.com` and confirm it loads with the padlock (HTTPS)

#### Step 6 — Set up www redirect

1. Still in **Custom domains**, click **Set up a custom domain** again
2. Enter `www.partnerspestsolutions.com` → **Activate**
3. Go to **Rules** → **Redirect Rules** (or **Bulk Redirects** on free plan: use a Page Rule or Redirect Rule)
4. Create a redirect rule:
   - **If:** Hostname equals `www.partnerspestsolutions.com`
   - **Then:** Static redirect to `https://partnerspestsolutions.com` with status **301**
5. Test: visiting `www.partnerspestsolutions.com` should land on `https://partnerspestsolutions.com`

#### Step 7 — Verify deployment on every push

1. Any future `git push` to `main` auto-redeploys the site
2. Check **Deployments** tab in Cloudflare Pages to confirm builds succeed

**Troubleshooting:**
- **Site shows 404:** Confirm `index.html` is at the repo root, not inside a subfolder
- **Domain not resolving:** Nameserver change may still be propagating — wait up to 48 hours
- **SSL errors:** In Cloudflare → **SSL/TLS** → set mode to **Full** (not Full Strict unless you have origin certs)

---

### 1.1 Alt — GitHub Pages

Use this only if you prefer GitHub over Cloudflare for hosting. DNS is harder to manage; Cloudflare Pages is still recommended for DNS.

#### Step 1 — Push to GitHub

Same as Cloudflare Step 1 above.

#### Step 2 — Enable GitHub Pages

1. Open your repo on GitHub
2. Go to **Settings** → **Pages**
3. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` → folder `/ (root)` → **Save**
4. Wait 1–2 minutes — site appears at `https://YOUR-USERNAME.github.io/REPO-NAME/`

#### Step 3 — Add custom domain

1. Still on **Pages** settings, under **Custom domain**, enter `partnerspestsolutions.com` → **Save**
2. GitHub shows DNS records you need — typically:
   - **A records** for `@` pointing to GitHub IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - **CNAME** for `www` pointing to `YOUR-USERNAME.github.io`
3. Add those records in your DNS provider (Cloudflare, registrar, etc.)
4. Enable **Enforce HTTPS** once DNS verifies

#### Step 4 — www redirect

GitHub Pages doesn't auto-redirect www. Either:
- Only use the apex domain (`partnerspestsolutions.com`), or
- Set a redirect at your DNS provider (Cloudflare Redirect Rule recommended)

---

### 1.2 Contact Form (Formspree)

The form currently has `action="#"` — it does **not** send email until you complete these steps.

**What you need:**
- An email address to receive submissions (use `info@partnerspestsolutions.com` once Zoho is set up, or your personal email for now)

#### Step 1 — Create a Formspree account

1. Go to [formspree.io](https://formspree.io)
2. Click **Get Started** → sign up with email or Google
3. Confirm your email if prompted

#### Step 2 — Create a new form

1. In the Formspree dashboard, click **+ New Form**
2. **Form name:** `Partners Pest Contact`
3. **Email:** enter where submissions should go (e.g. your personal email for now; change to `info@partnerspestsolutions.com` after Zoho is live)
4. Click **Create Form**
5. Copy the **form endpoint URL** — it looks like:
   ```
   https://formspree.io/f/xpwzgkln
   ```
   Keep this URL — you'll paste it into the website.

#### Step 3 — Update the website form action

1. Open `pages/contact.html` in your editor
2. Find the `<form>` tag (around line 56) that says `action="#"`
3. Replace `#` with your Formspree URL:
   ```html
   action="https://formspree.io/f/YOUR_FORM_ID"
   ```
4. Save the file
5. Commit and push to GitHub — Cloudflare Pages will redeploy automatically

#### Step 4 — Configure Formspree settings (recommended)

1. In Formspree, open your form → **Settings**
2. **Submission Archive:** ON (lets you view past submissions in dashboard)
3. **reCAPTCHA:** optional — enable if you get spam
4. **Reply-to:** set to use the submitter's email field (`email`) so you can hit Reply in your inbox
5. **Subject line:** customize, e.g. `New contact from Partners Pest Solutions`

#### Step 5 — Test the form end-to-end

1. Go to `https://partnerspestsolutions.com/pages/contact.html` (or your `.pages.dev` URL while testing)
2. Fill out every required field and submit
3. You should see the green "Thank you!" message on the page
4. Check your inbox (and spam folder) for the Formspree notification — allow 1–2 minutes
5. If it fails with an alert ("Something went wrong"):
   - Confirm the `action` URL is correct (no typos)
   - Confirm the site has been redeployed after your edit
   - Check Formspree dashboard → **Submissions** for errors

#### Step 6 — Decide on photo uploads

The contact form has an optional photo upload field. On Formspree's **free plan, file uploads are not supported**.

**Option A — Remove uploads (recommended for free tier):**
1. Ask your developer to remove the file upload section from `pages/contact.html`
2. Redeploy

**Option B — Keep uploads:**
1. Upgrade Formspree to a paid plan that supports attachments, or
2. Remove the upload field and ask customers to email photos separately

---

### 1.3 Business Email (Zoho Mail)

**What you need:**
- Domain `partnerspestsolutions.com` using Cloudflare nameservers (from section 1.1)
- ~30 minutes + up to 24 hours for email DNS to propagate

#### Step 1 — Sign up for Zoho Mail

1. Go to [zoho.com/mail/zohomail-pricing.html](https://www.zoho.com/mail/zohomail-pricing.html)
2. Under **Mail Lite** or **Forever Free Plan**, click **Sign Up** (free plan supports 1 domain, up to 5 users)
3. Choose **Sign up with a domain I already own**
4. Enter `partnerspestsolutions.com`
5. Create your Zoho account (admin email can be a personal Gmail for now)

#### Step 2 — Verify domain ownership

1. Zoho asks you to verify you control the domain
2. Choose **Add a TXT record** (easiest if using Cloudflare)
3. Zoho shows a TXT record like:
   ```
   Name/Host: @  (or partnerspestsolutions.com)
   Value: zoho-verification=xxxxxxxx.zmverify.zoho.com
   ```
4. Open **Cloudflare dashboard** → select `partnerspestsolutions.com` → **DNS** → **Records**
5. Click **Add record**:
   - **Type:** TXT
   - **Name:** `@`
   - **Content:** paste Zoho's verification value
   - **TTL:** Auto
6. Click **Save**
7. Back in Zoho, click **Verify** — may take a few minutes; retry if it fails initially

#### Step 3 — Add MX records for email delivery

1. Zoho shows MX records to add. For Zoho Mail, they are typically:
   ```
   Priority 10   mx.zoho.com
   Priority 20   mx2.zoho.com
   Priority 50   mx3.zoho.com
   ```
2. In **Cloudflare DNS**, delete any existing MX records for this domain (from old email provider)
3. Add each MX record:
   - **Type:** MX
   - **Name:** `@`
   - **Mail server:** `mx.zoho.com` (then `mx2.zoho.com`, `mx3.zoho.com`)
   - **Priority:** 10, 20, 50 respectively
   - **Proxy status:** DNS only (grey cloud, not orange) — **important**
4. Click **Save** on each

#### Step 4 — Add SPF record (prevents spam filtering)

1. In Cloudflare DNS, add:
   - **Type:** TXT
   - **Name:** `@`
   - **Content:** `v=spf1 include:zoho.com ~all`
2. If an SPF record already exists, merge includes — only one SPF TXT record allowed per domain

#### Step 5 — Add DKIM (recommended)

1. In Zoho Mail admin → **Email Configuration** → **DKIM**
2. Zoho generates a TXT record — copy it
3. Add to Cloudflare DNS as instructed (usually name like `zoho._domainkey`)
4. Verify in Zoho admin

#### Step 6 — Create the mailbox

1. In Zoho Mail admin → **Users** → **Add User**
2. Create `info@partnerspestsolutions.com`
3. Set a strong password
4. Log in at [mail.zoho.com](https://mail.zoho.com) with that address

#### Step 7 — Test send and receive

1. From your personal email, send a message to `info@partnerspestsolutions.com`
2. Log into Zoho and confirm it arrived
3. Reply from `info@` to your personal email — confirm it's not in spam
4. If email doesn't arrive within an hour, double-check MX records are **DNS only** (grey cloud) in Cloudflare

#### Step 8 — Point Formspree to the new inbox

1. Go to [formspree.io](https://formspree.io) → your form → **Settings**
2. Change notification email to `info@partnerspestsolutions.com`
3. Submit a test form to confirm delivery

---

### 1.4 License Number

#### Step 1 — Get the license number from the business owner

1. Ask the client for their **Alabama pest control business license number**
2. It may appear on their truck decals, invoices, or state regulatory paperwork
3. Alabama Department of Agriculture & Industries regulates pest control — the client should have this on file

#### Step 2 — Add the license number to the site

1. Open `js/config.js`
2. Set `licenseNumber` to the real value, e.g. `licenseNumber: '12345',`
3. Save, commit, push — the footer and contact page update automatically
4. If left empty, the site shows **"Licensed & Insured in Alabama"** instead of a placeholder

#### Step 3 — Verify

1. Load any page and scroll to the footer — license line should show real number or fallback text
2. Load the Contact page — same text appears in the contact info sidebar

---

## Phase 2 — Client Input (Manual Decisions)

Send these questions to the business owner. Record their answers, then act on them.

#### Step 1 — Send the questionnaire

Copy and send this (email, text, or call):

> **Quick questions before we go live:**
>
> 1. **Business address** — Do you want your physical address shown on the website? (Helps local Google search.) If yes, what is it?
> 2. **1-800-554-1422** — Is this number still active? It's listed on the Residential page alongside (256) 302-6660.
> 3. **General Pest page** — We have an older "General Pest" page that's not in the main menu. Should we keep it, delete it, or merge it into Residential?
> 4. **Business hours** — Do you want hours listed on the Contact page? If yes, what are they?
> 5. **Photo uploads** — Should customers be able to upload photos on the contact form? (Requires a paid form plan, or they can email photos separately.)
> 6. **Logo** — Are you happy with the logo size now, or do you want changes?
> 7. **License number** — What is your Alabama pest control license number for the footer?

#### Step 2 — Act on each answer

| Answer | What you do |
|--------|-------------|
| **Address — Yes** | Give developer the address to add to `pages/contact.html` and `js/components.js` footer |
| **Address — No** | No action needed |
| **800 number — Yes, keep** | No action needed |
| **800 number — No, remove** | Ask developer to remove `1-800-554-1422` from `pages/residential.html` |
| **General Pest — Keep** | No action needed (page stays, linked from footer only) |
| **General Pest — Remove** | Ask developer to delete `pages/general-pest.html` and remove footer link |
| **General Pest — Merge** | Ask developer to redirect `general-pest.html` → `residential.html` |
| **Hours — Yes** | Give developer hours to add to Contact page |
| **Hours — No** | No action needed |
| **Photo uploads — Yes** | Upgrade Formspree or ask developer to remove field (see 1.2 Step 6) |
| **Photo uploads — No** | Ask developer to remove upload field from contact form |
| **Logo — Changes needed** | Send new logo file to replace `images/logo.jpg` |
| **License number** | Follow [1.4](#14-license-number) |

---

## Phase 3 — Code & Content Cleanup

These require editing the codebase. If you're not comfortable editing HTML/JS, send this list to your developer.

| # | Task | Who | Manual steps for you |
|---|------|-----|----------------------|
| 1 | Fix contact form placeholder text | Developer | Confirm you want "inspection" wording changed to general contact language |
| 2 | Fix "schedule an inspection" copy on Contact page | Developer | No action from you — dev edits `pages/contact.html` |
| 3 | Rename form id to `contact-form` | Developer | No action from you |
| 4 | Remove/redirect `general-pest.html` | Developer | Complete Phase 2 questionnaire first, then tell dev the answer |
| 5 | External link audit | Developer | No action from you |
| 6 | Mobile nav review | Developer + You | After deploy, open site on your phone — if menu feels cramped, tell dev to group services in a dropdown |

**Your only manual step:** Test on your phone after launch and report UX issues.

---

## Phase 4 — SEO & Polish (Manual Setup)

---

### 4.1 Google Search Console

**When to do this:** After `partnerspestsolutions.com` is live.

#### Step 1 — Add your property

1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Sign in with a Google account (use one the business owner controls)
3. Click **Add property**
4. Choose **URL prefix** and enter `https://partnerspestsolutions.com`
5. Click **Continue**

#### Step 2 — Verify ownership

**Easiest method if using Cloudflare:**

1. Choose **HTML tag** verification
2. Copy the meta tag Google gives you (e.g. `<meta name="google-site-verification" content="abc123" />`)
3. Give this tag to your developer to add inside `<head>` on `index.html`
4. After deploy, click **Verify** in Search Console

**Alternative — DNS verification (no code change):**

1. Choose **Domain name provider**
2. Copy the TXT record Google provides
3. Add it in Cloudflare DNS → **TXT** record → paste value → Save
4. Click **Verify** in Search Console

#### Step 3 — Submit sitemap

1. Ask your developer to add `sitemap.xml` to the repo root (see developer note below)
2. After deploy, in Search Console go to **Sitemaps**
3. Enter `sitemap.xml` → **Submit**
4. Status should show **Success** within a few days

**Developer note for sitemap:** Create `sitemap.xml` listing all page URLs with `https://partnerspestsolutions.com/` prefix.

#### Step 4 — Request indexing of key pages

1. In Search Console, use **URL Inspection** at the top
2. Enter `https://partnerspestsolutions.com/` → **Request indexing**
3. Repeat for `/pages/contact.html`, `/pages/residential.html`, etc.

---

### 4.2 Google Business Profile

**Critical for local pest control — do this as the business owner.**

#### Step 1 — Create or claim the profile

1. Go to [business.google.com](https://business.google.com)
2. Sign in with a Google account the business controls
3. Click **Manage now** or **Add your business**
4. Enter business name: **Partners Pest Solutions**
5. Choose category: **Pest control service** (or similar)
6. If a listing already exists, click **Claim this business** instead

#### Step 2 — Add location and contact info

1. **Address:** use real business address (required for verification — can hide later if home-based)
2. **Service area:** add cities from the About page (Arab, Guntersville, Huntsville, etc.)
3. **Phone:** `(256) 302-6660`
4. **Website:** `https://partnerspestsolutions.com`

#### Step 3 — Verify the business

Google will offer a verification method:

- **Postcard by mail** (most common) — arrives in 5–14 days with a code
- **Phone or email** — if offered, faster

1. Enter the verification code when received
2. Profile goes live after verification

#### Step 4 — Complete the profile

1. **Hours:** add business hours
2. **Description:** copy/adapt text from `pages/about.html`
3. **Photos:** upload logo (`images/logo.jpg`) and any truck/team photos
4. **Services:** add Residential, Commercial, Bed Bug, Mosquito, etc.

#### Step 5 — Link to Search Console

1. In Google Business Profile settings, confirm website URL matches Search Console property
2. This helps Google connect your website and map listing

---

### 4.3 Cloudflare Web Analytics (Optional, Free)

#### Step 1 — Enable analytics

1. Cloudflare dashboard → **Analytics & Logs** → **Web Analytics**
2. Click **Add a site** → enter `partnerspestsolutions.com`
3. Cloudflare gives you a JavaScript snippet (beacon)

#### Step 2 — Add snippet to site

1. Give the snippet to your developer to add before `</body>` on all pages, or
2. If only on `index.html` initially, that's enough for basic traffic data

#### Step 3 — View data

1. Return to **Web Analytics** in Cloudflare after 24 hours
2. View page views, referrers, countries — no cookie banner required (privacy-friendly)

---

### 4.4 Items that need a developer

Ask your developer to implement these (not manual dashboard setup):

| Item | What to tell your developer |
|------|----------------------------|
| **Favicon** | "Add a favicon generated from `images/logo.jpg` to all pages" |
| **Open Graph tags** | "Add og:title, og:description, og:image, og:url to index and service pages" |
| **Canonical URLs** | "Add `<link rel="canonical">` to every page using partnerspestsolutions.com" |
| **sitemap.xml** | "Create sitemap.xml at repo root listing all pages" |
| **robots.txt** | "Create robots.txt allowing all crawlers and pointing to sitemap" |
| **Privacy policy** | "Add a basic privacy policy page — we collect name, email, phone, address via contact form" |

---

## Phase 5 — Post-Launch (Ongoing Manual Tasks)

---

### 5.1 Monthly contact form test

**Do this on the 1st of each month (5 minutes):**

1. Go to `https://partnerspestsolutions.com/pages/contact.html`
2. Submit a test message with subject line "Monthly test — please ignore"
3. Confirm email arrives at `info@partnerspestsolutions.com`
4. Delete the test message

---

### 5.2 Monitor Formspree usage

**Do this monthly:**

1. Log in to [formspree.io](https://formspree.io)
2. Check submission count — free tier is **50/month**
3. If approaching the limit, either upgrade Formspree or ensure phone calls are promoted as primary contact

---

### 5.3 Keep contact info current

**Whenever phone, email, or license changes:**

1. Edit `js/components.js` (footer + nav phone)
2. Edit `pages/contact.html` (contact sidebar)
3. Push to GitHub — auto-redeploys
4. Update Google Business Profile to match

---

### 5.4 Seasonal content updates

**Before mosquito season (March–April):**

1. Review `pages/mosquito.html` — confirm dates and program details are current
2. Ask developer to update any seasonal references on the home page if needed

---

### 5.5 Add testimonials (when available)

1. Collect written testimonials from customers (name + city is enough; full name optional)
2. Send to developer with permission to publish
3. Developer adds a testimonials section to `index.html`

---

### 5.6 Search Console health check

**Do this quarterly:**

1. Log in to [Google Search Console](https://search.google.com/search-console)
2. Check **Pages** → look for crawl errors or "Not indexed" issues
3. Check **Experience** → fix any mobile usability problems reported
4. Share any errors with your developer

---

## File Reference

| What to change | Where | How |
|----------------|-------|-----|
| License number | `js/config.js` | Edit `licenseNumber` — populates footer + contact page |
| Contact form endpoint | `pages/contact.html` | Change `action="..."` on `<form>` tag |
| Form validation | `js/contact.js` | Developer only |
| Service page content | `pages/*.html` | Edit file → commit → push |
| Home page | `index.html` | Edit file → commit → push |
| Logo image | `images/logo.jpg` | Replace file, keep same filename |
| DNS records | Cloudflare dashboard | Manual (see 1.1, 1.3) |
| Form notifications | Formspree dashboard | Manual (see 1.2) |
| Business email | Zoho Mail admin | Manual (see 1.3) |
| Google listing | Google Business Profile | Manual (see 4.2) |

---

## Recommended Free Stack (Summary)

| Need | Service | Cost |
|------|---------|------|
| Hosting | Cloudflare Pages | Free |
| DNS | Cloudflare | Free |
| Domain registration | Your registrar | ~$10–15/year |
| Contact form | Formspree | Free (50 submissions/mo) |
| Business email | Zoho Mail | Free (1 domain) |
| Local SEO | Google Business Profile | Free |
| Analytics | Cloudflare Web Analytics | Free |

---

*Technical reference for developers: [README.md](./README.md)*
