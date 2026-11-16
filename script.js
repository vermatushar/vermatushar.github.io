/* Portfolio — JS */
(function () {
  'use strict';

  // ---- Theme Toggle ----
  var toggle = document.getElementById('themeToggle');
  var html = document.documentElement;

  function syncThemePressed() {
    if (!toggle) return;
    toggle.setAttribute('aria-pressed', html.getAttribute('data-theme') === 'dark' ? 'true' : 'false');
  }

  if (toggle) {
    syncThemePressed();
    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      var isDark = html.getAttribute('data-theme') === 'dark';
      if (isDark) {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      syncThemePressed();
    });
  }

  // ---- Mobile Nav Toggle ----
  var navToggle = document.getElementById('navToggle');
  var navRight = document.getElementById('navRight');
  var nav = document.getElementById('nav');

  if (navToggle && navRight) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      navRight.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    navRight.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navRight.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Rotating Hero Text ----
  var rotatingEl = document.getElementById('rotatingText');
  if (rotatingEl) {
    var phrases = [
      'an AI researcher.',
      'a builder of agentic systems.',
      'a multi-agent systems builder.',
      'an agent runtime architect.',
      'an eval systems designer.',
      'a writer.'
    ];
    var idx = 0;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setInterval(function () {
      // Slide up and fade out
      rotatingEl.style.opacity = '0';
      rotatingEl.style.transform = 'translateY(-10px)';

      setTimeout(function () {
        idx = (idx + 1) % phrases.length;
        rotatingEl.textContent = phrases[idx];
        // Position below, then animate in
        rotatingEl.style.transform = 'translateY(10px)';
        // Force reflow so the browser registers the new position
        void rotatingEl.offsetHeight;
        rotatingEl.style.opacity = '1';
        rotatingEl.style.transform = 'translateY(0)';
      }, 400);
    }, 3000);
  }
})();
