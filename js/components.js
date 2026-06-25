/* ============================================================
   COMPONENTS — Nav and Footer injected into every page
   Eliminates duplicate HTML across all pages
   ============================================================ */

(function () {
  'use strict';

  const SITE = window.SITE_CONFIG || {
    phone: '(256) 302-6660',
    phoneTel: '+12563026660',
    email: 'info@partnerspestsolutions.com',
    licenseNumber: '',
  };

  function licenseText() {
    return SITE.licenseNumber
      ? `License #: ${SITE.licenseNumber}`
      : 'Licensed & Insured in Alabama';
  }

  const NAV_HTML = `
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="container nav__inner">
        <a href="/" class="nav__logo" aria-label="Partners Pest Solutions - Home">
          <img src="../images/logo.jpg" alt="Partners Pest Solutions logo" width="110" height="101">
        </a>
        <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav__links" role="list">
          <li><a class="nav__link" href="/"                         data-page="index.html">Home</a></li>
          <li><a class="nav__link" href="../pages/residential.html"  data-page="residential.html">Residential</a></li>
          <li><a class="nav__link" href="../pages/commercial.html"   data-page="commercial.html">Commercial</a></li>
          <li><a class="nav__link" href="../pages/bed-bug.html"       data-page="bed-bug.html">Bed Bugs</a></li>
          <li><a class="nav__link" href="../pages/mosquito.html"      data-page="mosquito.html">Mosquito</a></li>
          <li><a class="nav__link" href="../pages/about.html"         data-page="about.html">About</a></li>
          <li><a class="nav__link" href="../pages/contact.html"       data-page="contact.html">Contact</a></li>
          <li class="nav__cta">
            <a class="btn btn-primary" href="../pages/contact.html">Contact Us</a>
            <a class="nav__phone" href="tel:${SITE.phoneTel}">${SITE.phone}</a>
          </li>
        </ul>
      </div>
    </nav>`;

  const FOOTER_HTML = `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <div>
            <img class="footer__logo" src="../images/logo.jpg" alt="Partners Pest Solutions">
            <p class="footer__tagline">Protecting homes and businesses with professional pest solutions. Licensed, insured, and family owned — serving North Alabama.</p>
          </div>
          <div>
            <p class="footer__heading">Services</p>
            <ul class="footer__links">
              <li><a class="footer__link" href="../pages/residential.html">Residential</a></li>
              <li><a class="footer__link" href="../pages/commercial.html">Commercial &amp; Industrial</a></li>
              <li><a class="footer__link" href="../pages/bed-bug.html">Bed Bug Treatment</a></li>
              <li><a class="footer__link" href="../pages/rodent.html">Rodent Control</a></li>
              <li><a class="footer__link" href="../pages/mosquito.html">Mosquito &amp; Tick</a></li>
            </ul>
          </div>
          <div>
            <p class="footer__heading">Company</p>
            <ul class="footer__links">
              <li><a class="footer__link" href="/">Home</a></li>
              <li><a class="footer__link" href="../pages/about.html">About Us</a></li>
              <li><a class="footer__link" href="../pages/contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <p class="footer__heading">Contact</p>
            <ul class="footer__links">
              <li><a class="footer__link" href="tel:${SITE.phoneTel}">${SITE.phone}</a></li>
              <li><a class="footer__link" href="mailto:${SITE.email}">${SITE.email}</a></li>
              <li><span class="footer__link" data-license></span></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <span>&copy; ${new Date().getFullYear()} Partners Pest Solutions. All rights reserved.</span>
          <span>partnerspestsolutions.com</span>
        </div>
      </div>
    </footer>`;

  // Root-relative variant for index.html (one level up)
  const NAV_HTML_ROOT = NAV_HTML
    .replace(/\.\.\/images\//g, 'images/')
    .replace(/\.\.\/pages\//g, 'pages/');

  const FOOTER_HTML_ROOT = FOOTER_HTML
    .replace(/\.\.\/images\//g, 'images/')
    .replace(/\.\.\/pages\//g, 'pages/');

  function isRoot() {
    const path = window.location.pathname;
    return path.endsWith('index.html') || path.endsWith('/') || path === '';
  }

  function applySiteConfig() {
    const text = licenseText();
    document.querySelectorAll('[data-license]').forEach(el => {
      el.textContent = text;
    });
  }

  function inject() {
    const navSlot    = document.getElementById('nav-slot');
    const footerSlot = document.getElementById('footer-slot');
    const root       = isRoot();

    if (navSlot)    navSlot.innerHTML    = root ? NAV_HTML_ROOT    : NAV_HTML;
    if (footerSlot) footerSlot.innerHTML = root ? FOOTER_HTML_ROOT : FOOTER_HTML;
    applySiteConfig();
  }

  document.addEventListener('DOMContentLoaded', inject);
})();
