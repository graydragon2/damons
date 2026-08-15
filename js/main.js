(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');

  function onScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Above-the-fold entrance: reveal .load-in elements once the page has
  // painted, so the hero/menu-hero text staggers in on arrival. A timeout
  // fallback guarantees content still appears if rAF is ever delayed
  // (e.g. by a slow render-blocking resource).
  var readyFired = false;
  function markReady() {
    if (readyFired) return;
    readyFired = true;
    document.body.classList.add('is-ready');
  }
  requestAnimationFrame(function () {
    requestAnimationFrame(markReady);
  });
  setTimeout(markReady, 300);

  // Scroll reveal for below-the-fold sections.
  var revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
      );
      revealEls.forEach(function (el) {
        io.observe(el);
      });
    } else {
      revealEls.forEach(function (el) {
        el.classList.add('is-visible');
      });
    }
  }
})();
