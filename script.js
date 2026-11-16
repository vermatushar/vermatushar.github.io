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

  // ---- About fold ----
  var aboutToggle = document.getElementById('aboutToggle');
  var aboutIntro = document.getElementById('aboutIntro');

  if (aboutToggle && aboutIntro) {
    var aboutReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function aboutFoldedHeight() {
      if (window.matchMedia('(max-width: 640px)').matches) {
        var body = aboutIntro.querySelector('.section-body');
        var cs = window.getComputedStyle(body);
        var line = parseFloat(cs.lineHeight);
        if (!line || isNaN(line)) line = parseFloat(cs.fontSize) * 1.8;
        return Math.round(line * 4.5);
      }
      return aboutToggle.offsetHeight;
    }

    function aboutSetOpen(open, animate) {
      var full = aboutIntro.scrollHeight;
      var fold = aboutFoldedHeight();
      aboutIntro.classList.toggle('is-expanded', open);
      aboutToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      aboutToggle.setAttribute('aria-label', open ? 'Hide full About' : 'Show full About');
      if (aboutReduce || !animate) {
        aboutIntro.style.transition = 'none';
        aboutIntro.style.maxHeight = (open ? full : fold) + 'px';
        void aboutIntro.offsetHeight;
        aboutIntro.style.transition = '';
      } else if (!open) {
        aboutIntro.style.maxHeight = full + 'px';
        void aboutIntro.offsetHeight;
        aboutIntro.style.maxHeight = fold + 'px';
      } else {
        aboutIntro.style.maxHeight = full + 'px';
      }
    }

    document.documentElement.classList.add('about-js');
    aboutSetOpen(false, false);

    aboutToggle.addEventListener('click', function () {
      var open = aboutToggle.getAttribute('aria-expanded') === 'true';
      aboutToggle.classList.remove('is-pulse');
      void aboutToggle.offsetWidth;
      aboutToggle.classList.add('is-pulse');
      aboutSetOpen(!open, true);
    });

    aboutToggle.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        aboutToggle.click();
      }
    });

    aboutToggle.addEventListener('animationend', function () {
      aboutToggle.classList.remove('is-pulse');
    });

    var aboutResizeTimer;
    window.addEventListener('resize', function () {
      window.clearTimeout(aboutResizeTimer);
      aboutResizeTimer = window.setTimeout(function () {
        aboutSetOpen(aboutToggle.getAttribute('aria-expanded') === 'true', false);
      }, 120);
    });
  }
})();
