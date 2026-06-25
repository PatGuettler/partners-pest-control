/* ============================================================
   COMPONENTS — Nav and Footer injected into every page
   Eliminates duplicate HTML across all pages
   ============================================================ */

(function () {
  'use strict';

  const NAV_HTML = `
    <nav class="nav" role="navigation" aria-label="Main navigation">
      <div class="container nav__inner">
        <a href="../index.html" class="nav__logo" aria-label="Partners Pest Solutions - Home">
          <img src="../images/logo.jpg" alt="Partners Pest Solutions logo" width="80" height="73">
        </a>
        <button class="nav__toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
        <ul class="nav__links" role="list">
          <li><a class="nav__link" href="../index.html"              data-page="index.html">Home</a></li>
          <li><a class="nav__link" href="../pages/residential.html"  data-page="residential.html">Residential</a></li>
          <li><a class="nav__link" href="../pages/commercial.html"   data-page="commercial.html">Commercial</a></li>
          <li><a class="nav__link" href="../pages/bed-bug.html"       data-page="bed-bug.html">Bed Bugs</a></li>
          <li><a class="nav__link" href="../pages/mosquito.html"      data-page="mosquito.html">Mosquito</a></li>
          <li><a class="nav__link" href="../pages/about.html"         data-page="about.html">About</a></li>
          <li><a class="nav__link" href="../pages/contact.html"       data-page="contact.html">Contact</a></li>
          <li class="nav__cta">
            <a class="btn btn-primary" href="tel:+12563026660">
              Contact Us — (256) 302-6660
            </a>
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
              <li><a class="footer__link" href="../index.html">Home</a></li>
              <li><a class="footer__link" href="../pages/about.html">About Us</a></li>
              <li><a class="footer__link" href="../pages/contact.html">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <p class="footer__heading">Contact</p>
            <ul class="footer__links">
              <li><a class="footer__link" href="tel:+12563026660">(256) 302-6660</a></li>
              <li><a class="footer__link" href="mailto:info@partnerspestsolutions.com">info@partnerspestsolutions.com</a></li>
              <li><span class="footer__link">License #: [STATE-LICENSE]</span></li>
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
  const NAV_HTML_ROOT = NAV_HTML.replace(/\.\.\/index\.html/g, 'index.html')
    .replace(/\.\.\/images\//g, 'images/')
    .replace(/\.\.\/pages\//g, 'pages/');

  const FOOTER_HTML_ROOT = FOOTER_HTML
    .replace(/\.\.\/images\//g, 'images/')
    .replace(/\.\.\/pages\//g, 'pages/')
    .replace(/\.\.\/index\.html/g, 'index.html');

  function isRoot() {
    const path = window.location.pathname;
    return path.endsWith('index.html') || path.endsWith('/') || path === '';
  }

  function inject() {
    const navSlot    = document.getElementById('nav-slot');
    const footerSlot = document.getElementById('footer-slot');
    const root       = isRoot();

    if (navSlot)    navSlot.innerHTML    = root ? NAV_HTML_ROOT    : NAV_HTML;
    if (footerSlot) footerSlot.innerHTML = root ? FOOTER_HTML_ROOT : FOOTER_HTML;
  }

  document.addEventListener('DOMContentLoaded', inject);
})();
