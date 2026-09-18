/* Salon Matin - demo. Kun det nødvendige: menu, header-tilstand og bløde indtoninger. */
(function () {
  'use strict';

  var body = document.body;
  var header = document.getElementById('header');
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobile-nav');

  /* --- Mobilmenu --------------------------------------------------------- */
  function setNav(open) {
    body.classList.toggle('nav-open', open);
    body.style.overflow = open ? 'hidden' : '';
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    burger.setAttribute('aria-label', open ? 'Luk menu' : 'Åbn menu');
  }

  if (burger && mobileNav) {
    burger.addEventListener('click', function () {
      setNav(!body.classList.contains('nav-open'));
    });

    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setNav(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && body.classList.contains('nav-open')) setNav(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && body.classList.contains('nav-open')) setNav(false);
    });
  }

  /* --- Header ------------------------------------------------------------ */
  var stuck = false;
  function onScroll() {
    var next = window.scrollY > 24;
    if (next !== stuck) {
      stuck = next;
      header.classList.toggle('is-stuck', stuck);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Indtoning ved scroll ---------------------------------------------- */
  var items = document.querySelectorAll('.reveal');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!('IntersectionObserver' in window) || reduced) {
    for (var i = 0; i < items.length; i++) items[i].classList.add('is-in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });

    /* Lander man direkte på et anker, skal alt over skærmen være synligt. */
    window.addEventListener('load', function () {
      items.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
      });
    });
  }

  /* --- Årstal i footer --------------------------------------------------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
