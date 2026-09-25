/* ============================================================
   Ujjawal Singh — portfolio scripts
   Theme · Header · Scroll · Projects · Contact
   ============================================================ */
(function () {
  'use strict';

  var GH       = 'Gameover007coder';
  var EJS_KEY  = 'ZkusTjuMM-TjTuvP6';
  var EJS_SVC  = 'service_vg7pcu3';
  var EJS_TPL  = 'template_i5ml5oj';
  var MY_EMAIL = 'ujjusingh099@gmail.com';

  /* — Project data — */
  var PROJECTS = [
    { repo:'resume-evaluator',  title:'Resume Evaluator',   kind:'AI & Data',  desc:'Scores how well a resume matches a job description. Built with Python and Streamlit.', demo:'https://resume-evaluator-gs.streamlit.app/', stack:['Python','Streamlit'] },
    { repo:'OMR-Evaluation-System', title:'OMR Evaluation', kind:'AI & Data',  desc:'Automates answer-sheet grading using computer vision and image processing.' },
    { repo:'Task-Management',   title:'Task Management',    kind:'Web App',    desc:'Browser-based project & task tracker with drag-and-drop and local persistence.', demo:'https://gameover007coder.github.io/Task-Management/' },
    { repo:'E-COMMERCE',        title:'E-Commerce Store',   kind:'Web App',    desc:'Product catalogue, cart and checkout flow — fully responsive, hosted on GitHub Pages.', demo:'https://gameover007coder.github.io/E-COMMERCE/' },
    { repo:'Person-Finder',     title:'Person Finder',      kind:'AI & Data',  desc:'Search and match engine for finding people across data sources.' },
    { repo:'Networking-Linux-Firewall', title:'Linux Firewall', kind:'Systems', desc:'iptables / nftables firewall lab — part of my hands-on security practice.' },
    { repo:'Online-Student-Registration-System', title:'Student Registration', kind:'Web App', desc:'Online registration with form validation and database back-end.' },
    { repo:'earning-ai',        title:'Earning AI',         kind:'AI & Data',  desc:'Concept project exploring AI-driven productivity and earning tools.' }
  ];

  /* — Helpers — */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function mk(tag, a, kids) {
    var n = document.createElement(tag);
    for (var k in a) {
      if (k === 'cls')      n.className = a[k];
      else if (k === 'txt') n.textContent = a[k];
      else if (k === 'htm') n.innerHTML = a[k];
      else                  n.setAttribute(k, a[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }
  function ghUrl(name) { return 'https://github.com/' + GH + '/' + name; }
  function fmtDate(iso) {
    try { return new Intl.DateTimeFormat('en', { month:'short', year:'numeric' }).format(new Date(iso)); }
    catch (e) { return ''; }
  }

  var SVG_FOLDER = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>';
  var SVG_GH     = '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>';
  var SVG_EXT    = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>';

  /* ===================== THEME ===================== */
  (function () {
    var root = document.documentElement;
    var btn  = $('#themeToggle');
    var meta = $('meta[name="theme-color"]');

    function set(t) {
      root.setAttribute('data-theme', t);
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      if (meta) meta.content = t === 'dark' ? '#0b0d14' : '#f5f5fa';
    }
    set(root.getAttribute('data-theme') || 'dark');

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      set(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  })();

  /* ===================== AMBIENT CURSOR GLOW ===================== */
  (function () {
    var glow = $('#cursorGlow');
    if (!glow || window.matchMedia('(hover: none)').matches) return;

    var visible = false;
    window.addEventListener('pointermove', function (e) {
      if (!visible) {
        glow.style.opacity = '1';
        visible = true;
      }
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive: true });

    document.addEventListener('mouseleave', function () {
      glow.style.opacity = '0';
      visible = false;
    });
  })();

  /* ===================== HERO CONSTELLATION CANVAS ===================== */
  (function () {
    var canvas = $('#heroCanvas');
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ctx = canvas.getContext('2d');
    if (!ctx) return;

    var hero = $('#home');
    var particles = [];
    var count = 36;
    var width = 0, height = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var mouse = { x: -9999, y: -9999, active: false };
    var animId = null;
    var isHeroVisible = true;

    function resize() {
      var rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    }

    function initParticles() {
      particles = [];
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * (width || 800),
          y: Math.random() * (height || 600),
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: 1.5 + Math.random() * 1.5
        });
      }
    }

    function draw() {
      if (!isHeroVisible) return;

      ctx.clearRect(0, 0, width, height);

      var isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      var pColor = isDark ? 'rgba(108, 99, 255, 0.65)' : 'rgba(91, 82, 224, 0.45)';
      var lColor = isDark ? 'rgba(108, 99, 255, ' : 'rgba(91, 82, 224, ';

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = pColor;
        ctx.fill();

        for (var j = i + 1; j < particles.length; j++) {
          var p2 = particles[j];
          var dx = p.x - p2.x;
          var dy = p.y - p2.y;
          var dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            var alpha = (1 - dist / 110) * (isDark ? 0.2 : 0.1);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = lColor + alpha + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        if (mouse.active) {
          var mdx = p.x - mouse.x;
          var mdy = p.y - mouse.y;
          var mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 130) {
            var malpha = (1 - mdist / 130) * (isDark ? 0.45 : 0.25);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = 'rgba(255, 107, 157, ' + malpha + ')';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () {
      resize();
    }, { passive: true });

    if (hero) {
      hero.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      });
      hero.addEventListener('mouseleave', function () {
        mouse.active = false;
      });

      if ('IntersectionObserver' in window) {
        var heroObs = new IntersectionObserver(function (entries) {
          isHeroVisible = entries[0].isIntersecting;
          if (isHeroVisible && !animId) {
            draw();
          } else if (!isHeroVisible && animId) {
            cancelAnimationFrame(animId);
            animId = null;
          }
        }, { threshold: 0 });
        heroObs.observe(hero);
      }
    }

    resize();
    initParticles();
    draw();
  })();

  /* ===================== TYPEWRITER EFFECT ===================== */
  (function () {
    var el = $('#typewriter');
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var phrases = [
      'things for the web.',
      'AI & intelligent tools.',
      'scalable web apps.',
      'developer utilities.'
    ];
    var phraseIdx = 0;
    var charIdx = phrases[0].length;
    var isDeleting = true;

    function tick() {
      var current = phrases[phraseIdx];

      if (isDeleting) {
        charIdx--;
        el.textContent = current.substring(0, charIdx);
        if (charIdx <= 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          setTimeout(tick, 350);
          return;
        }
        setTimeout(tick, 45);
      } else {
        charIdx++;
        el.textContent = current.substring(0, charIdx);
        if (charIdx >= current.length) {
          isDeleting = true;
          setTimeout(tick, 2200);
          return;
        }
        setTimeout(tick, 75);
      }
    }

    setTimeout(tick, 2400);
  })();

  /* ===================== HEADER / NAV ===================== */
  (function () {
    var bar = $('#siteHeader');
    var nav = $('#nav');
    var btn = $('#menuBtn');

    window.addEventListener('scroll', function () {
      bar.classList.toggle('is-scrolled', window.scrollY > 8);
    }, { passive: true });
    bar.classList.toggle('is-scrolled', window.scrollY > 8);

    function toggle(open) {
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    }
    btn.addEventListener('click', function () {
      toggle(btn.getAttribute('aria-expanded') !== 'true');
    });
    $$('a', nav).forEach(function (a) {
      a.addEventListener('click', function () { toggle(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') toggle(false);
    });

    /* active-section highlight */
    var links = $$('.nav__link');
    var map   = {};
    links.forEach(function (a) { map[a.href.split('#')[1]] = a; });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          var l = map[en.target.id];
          if (l) l.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-40% 0px -55% 0px' });
      Object.keys(map).forEach(function (id) {
        var s = document.getElementById(id);
        if (s) io.observe(s);
      });
    }
  })();

  /* ===================== SCROLL PROGRESS BAR ===================== */
  (function () {
    var bar = $('#scrollProgress');
    if (!bar) return;

    var ticking = false;
    function update() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var progress  = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = progress + '%';
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  })();

  /* ===================== PORTRAIT FALLBACK ===================== */
  (function () {
    var img = $('#portraitImg'), fr = $('#portraitFrame');
    if (!img || !fr) return;
    function fail() { fr.classList.add('no-img'); }
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  })();

  /* ===================== SCROLL REVEAL ===================== */
  (function () {
    // Different reveal directions for variety
    var config = [
      { sel: '.section__header--center', dir: 'up' },
      { sel: '.section__left',           dir: 'left' },
      { sel: '.card',                    dir: 'up', stagger: true },
      { sel: '.skill-group',             dir: 'up', stagger: true },
      { sel: '.fact',                    dir: 'right', stagger: true },
      { sel: '.tl',                      dir: 'left', stagger: true },
      { sel: '.contact__email-box',      dir: 'up' },
      { sel: '.contact__social',         dir: 'right', stagger: true },
      { sel: '.form',                    dir: 'up' },
      { sel: '.lead',                    dir: 'up' },
    ];

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !('IntersectionObserver' in window)) return;

    var all = [];
    config.forEach(function (c) {
      var els = $$(c.sel);
      els.forEach(function (el, i) {
        el.classList.add('reveal');
        var dirClass = 'reveal-' + (c.dir || 'up');
        el.classList.add(dirClass);
        if (c.stagger) el.style.setProperty('--si', i);
        all.push(el);
      });

      // add stagger class to parent if needed
      if (c.stagger && els.length > 0 && els[0].parentNode) {
        els[0].parentNode.classList.add('stagger');
      }
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          // small delay so stagger looks intentional
          var delay = parseInt(getComputedStyle(en.target).getPropertyValue('--si') || '0') * 80;
          setTimeout(function () {
            en.target.classList.add('visible');
          }, delay);
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    all.forEach(function (el) { obs.observe(el); });
  })();

  /* ===================== PARALLAX-LITE (hero photo) ===================== */
  (function () {
    var photo = $('.hero__frame');
    if (!photo || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          var rect = photo.getBoundingClientRect();
          var center = rect.top + rect.height / 2;
          var vh = window.innerHeight;
          var offset = ((center - vh / 2) / vh) * -12;
          photo.style.transform = 'translateY(' + offset + 'px)';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  })();

  /* ===================== STATS COUNTER ===================== */
  (function () {
    var section = $('#stats');
    if (!section) return;

    var counters = $$('.stat-card__number', section);
    if (!counters.length) return;

    var animated = false;
    function animateCounters() {
      if (animated) return;
      animated = true;

      counters.forEach(function (el) {
        var target = parseInt(el.getAttribute('data-target') || '0', 10);
        var duration = 1600;
        var start = performance.now();

        function update(now) {
          var progress = Math.min((now - start) / duration, 1);
          var ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          var val = Math.floor(ease * target);
          el.textContent = val.toLocaleString();

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = target.toLocaleString();
          }
        }
        requestAnimationFrame(update);
      });
    }

    if ('IntersectionObserver' in window) {
      var obs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          animateCounters();
          obs.disconnect();
        }
      }, { threshold: 0.2 });
      obs.observe(section);
    } else {
      animateCounters();
    }
  })();

  /* ===================== CARD TILT & SPOTLIGHT ===================== */
  function enableCardTilt(card) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');

      var centerX = rect.width / 2;
      var centerY = rect.height / 2;
      var rotX = ((y - centerY) / centerY) * -5;
      var rotY = ((x - centerX) / centerX) * 5;

      card.style.transform = 'perspective(900px) rotateX(' + rotX.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      card.style.setProperty('--mouse-x', '-400px');
      card.style.setProperty('--mouse-y', '-400px');
      card.style.transform = '';
    });
  }

  /* ===================== PROJECT CARDS ===================== */
  var grid  = $('#projectGrid');
  var cards = [];

  function buildCard(p) {
    var li = mk('li', { cls: 'card', 'data-kind': p.kind });

    var top   = mk('div', { cls: 'card__top' });
    var icon  = mk('div', { cls: 'card__icon', htm: SVG_FOLDER });
    var links = mk('div', { cls: 'card__links' });

    if (p.demo) links.appendChild(mk('a', { cls:'card__link', href:p.demo, target:'_blank', rel:'noopener', 'aria-label':'Live demo', htm:SVG_EXT }));
    links.appendChild(mk('a', { cls:'card__link', href:ghUrl(p.repo), target:'_blank', rel:'noopener', 'aria-label':'Source code', htm:SVG_GH }));

    top.appendChild(icon);
    top.appendChild(links);

    var kindEl  = mk('span', { cls:'card__kind', txt:p.kind });
    var titleEl = mk('h3',   { cls:'card__title', txt:p.title });
    var descEl  = mk('p',    { cls:'card__desc',  txt:p.desc });
    var tagsEl  = mk('div',  { cls:'card__tags' });
    (p.stack || []).forEach(function (t) { tagsEl.appendChild(mk('span', { cls:'card__tag', txt:t })); });
    var metaEl = mk('p', { cls:'card__meta' });

    li.appendChild(top);
    li.appendChild(kindEl);
    li.appendChild(titleEl);
    li.appendChild(descEl);
    li.appendChild(tagsEl);
    li.appendChild(metaEl);

    enableCardTilt(li);

    cards.push({ p:p, el:li, tags:tagsEl, meta:metaEl });
    return li;
  }

  if (grid) {
    PROJECTS.forEach(function (p) { grid.appendChild(buildCard(p)); });
  }

  /* ===================== PROJECT FILTERS ===================== */
  (function () {
    var filterBtns = $$('#projectFilters .filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) {
          b.classList.remove('is-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-selected', 'true');

        var filter = btn.getAttribute('data-filter');
        cards.forEach(function (c) {
          var show = filter === 'all' || c.p.kind === filter;
          if (show) {
            c.el.classList.remove('is-hidden');
            c.el.classList.remove('fade-in');
            void c.el.offsetWidth;
            c.el.classList.add('fade-in');
          } else {
            c.el.classList.add('is-hidden');
          }
        });
      });
    });
  })();

  /* ===================== GITHUB ENRICHMENT ===================== */
  (function () {
    if (!window.fetch) return;
    var ac = window.AbortController ? new AbortController() : null;
    var tm = setTimeout(function () { if (ac) ac.abort(); }, 7000);

    fetch('https://api.github.com/users/' + GH + '/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: ac ? ac.signal : undefined
    })
    .then(function (r) { clearTimeout(tm); return r.ok ? r.json() : Promise.reject(); })
    .then(function (data) {
      if (!Array.isArray(data)) return;
      var meta = {};
      data.forEach(function (r) { meta[r.name.toLowerCase()] = r; });

      cards.forEach(function (c) {
        var m = meta[c.p.repo.toLowerCase()];
        if (!m) return;
        if (m.language && !(c.p.stack && c.p.stack.length)) {
          c.tags.appendChild(mk('span', { cls:'card__tag', txt:m.language }));
        }
        var parts = [];
        if (m.pushed_at) parts.push('Updated ' + fmtDate(m.pushed_at));
        if (m.stargazers_count) parts.push(m.stargazers_count + (m.stargazers_count === 1 ? ' star' : ' stars'));
        c.meta.textContent = parts.join(' · ');
      });
    })
    .catch(function () {});
  })();

  /* ===================== COPY EMAIL ===================== */
  (function () {
    var btn = $('#copyEmail');
    if (!btn) return;
    btn.addEventListener('click', function () {
      function done() {
        btn.textContent = 'Copied ✓';
        setTimeout(function () { btn.textContent = 'Copy email'; }, 2000);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(MY_EMAIL).then(done, function () {
          location.href = 'mailto:' + MY_EMAIL;
        });
      } else {
        location.href = 'mailto:' + MY_EMAIL;
      }
    });
  })();

  /* ===================== CONTACT FORM ===================== */
  (function () {
    var form = $('#contactForm');
    if (!form) return;
    var btn    = $('#submitBtn');
    var status = $('#formStatus');

    function msg(type, txt) {
      status.className = 'form__status' + (type ? ' is-' + type : '');
      status.textContent = txt;
    }

    if (window.emailjs) window.emailjs.init({ publicKey: EJS_KEY });
    else window.addEventListener('load', function () {
      if (window.emailjs) window.emailjs.init({ publicKey: EJS_KEY });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (form.company && form.company.value) return;

      if (!form.checkValidity()) {
        form.reportValidity();
        msg('error', 'Please fill in every field correctly.');
        return;
      }

      $('#replyTo').value = form.from_email.value;

      if (!window.emailjs) {
        msg('error', 'Form service didn\'t load — email me at ' + MY_EMAIL);
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending…';
      msg('', 'Sending your message…');

      window.emailjs.sendForm(EJS_SVC, EJS_TPL, form)
        .then(function () {
          msg('ok', 'Sent! I\'ll reply to ' + form.from_email.value + ' soon.');
          form.reset();
        })
        .catch(function () {
          msg('error', 'Couldn\'t send — email me directly at ' + MY_EMAIL);
        })
        .then(function () {
          btn.disabled = false;
          btn.textContent = 'Send message';
        });
    });
  })();

  /* ===================== SMOOTH ANCHORS ===================== */
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(a.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, '', a.getAttribute('href'));
      }
    });
  });

  /* ===================== FOOTER YEAR ===================== */
  var yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();

})();
