/* ============================================================
   SHARED JS — nav toggle, scroll shadow, active link
   Loaded on every page
   ============================================================ */

(function () {
  'use strict';

  // ── Nav scroll shadow ──────────────────────────────────────
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Hamburger toggle ──────────────────────────────────────
  function initNavToggle() {
    const toggle = document.querySelector('.nav__toggle');
    const links  = document.querySelector('.nav__links');
    if (!toggle || !links) return;

    const open  = () => { toggle.classList.add('open');    links.classList.add('open');  };
    const close = () => { toggle.classList.remove('open'); links.classList.remove('open'); };
    const isOpen = () => toggle.classList.contains('open');

    toggle.addEventListener('click', () => isOpen() ? close() : open());

    // Close on outside click
    document.addEventListener('click', e => {
      if (isOpen() && !toggle.contains(e.target) && !links.contains(e.target)) close();
    });

    // Close on nav link click (mobile)
    links.querySelectorAll('.nav__link').forEach(l => l.addEventListener('click', close));
  }

  // ── Active nav link ───────────────────────────────────────
  function initActiveLink() {
    const path   = window.location.pathname.split('/').pop() || 'index.html';
    const links  = document.querySelectorAll('.nav__link[data-page]');
    links.forEach(l => {
      if (l.dataset.page === path) l.classList.add('active');
    });
  }

  // ── Scroll reveal (simple fade-up) ───────────────────────
  function initScrollReveal() {
    if (!window.IntersectionObserver) return;
    const els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => observer.observe(el));
  }

  // ── Init ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initNavScroll();
    initNavToggle();
    initActiveLink();
    initScrollReveal();
  });
})();
