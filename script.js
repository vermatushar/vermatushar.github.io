/* Portfolio — JS */
(function () {
  'use strict';

  // ---- Theme Toggle ----
  var toggle = document.getElementById('themeToggle');
  var html = document.documentElement;

  if (toggle) {
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
    });
  }

  // ---- Mobile Nav Toggle ----
  var navToggle = document.getElementById('navToggle');
  var navRight = document.getElementById('navRight');
  var nav = document.getElementById('nav');

  if (navToggle && navRight) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navRight.classList.toggle('active');
    });

    navRight.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navRight.classList.remove('active');
      });
    });
  }

  // ---- Rotating Hero Text ----
  var rotatingEl = document.getElementById('rotatingText');
  if (rotatingEl) {
    var phrases = [
      'an AI Research Engineer.',
      'a multi-agent systems builder.',
      'an agent runtime architect.',
      'an applied AI researcher.',
      'an eval systems designer.',
      'a writer.'
    ];
    var idx = 0;

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
