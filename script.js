/* ==========================================================
   Ujjawal Singh portfolio
   Theme, navigation, project index, GitHub data, contact form
   ========================================================== */
(function () {
  'use strict';

  var GITHUB_USER = 'Gameover007coder';

  // EmailJS (public keys, safe to ship in the browser)
  var EMAILJS_PUBLIC_KEY = 'ZkusTjuMM-TjTuvP6';
  var EMAILJS_SERVICE_ID = 'service_vg7pcu3';
  var EMAILJS_TEMPLATE_ID = 'template_i5ml5oj';
  var CONTACT_EMAIL = 'ujjusingh099@gmail.com';

  /* ---------- Content ----------
     Edit this section to change what appears in "Selected work"
     and in the repository list. */

  var PROJECTS = [
    {
      repo: 'resume-evaluator',
      title: 'Resume Evaluator',
      kind: 'AI and data',
      desc: 'Evaluates how well a resume matches a job description. Runs as a Streamlit web app.',
      demo: 'https://resume-evaluator-gs.streamlit.app/',
      stack: ['Python', 'Streamlit']
    },
    {
      repo: 'OMR-Evaluation-System',
      title: 'OMR Evaluation System',
      kind: 'AI and data',
      desc: 'Automates the evaluation of OMR answer sheets.'
    },
    {
      repo: 'Task-Management',
      title: 'Task Management',
      kind: 'Web app',
      desc: 'A task and project management application that runs in the browser.',
      demo: 'https://gameover007coder.github.io/Task-Management/'
    },
    {
      repo: 'E-COMMERCE',
      title: 'E-Commerce',
      kind: 'Web app',
      desc: 'An e-commerce web project, hosted live on GitHub Pages.',
      demo: 'https://gameover007coder.github.io/E-COMMERCE/'
    },
    {
      repo: 'Person-Finder',
      title: 'Person Finder',
      kind: 'AI and data',
      desc: 'A person-finding project.'
    },
    {
      repo: 'Networking-Linux-Firewall',
      title: 'Linux Firewall',
      kind: 'Systems and networking',
      desc: 'Linux networking and firewall work, part of my hands-on security fundamentals practice.'
    },
    {
      repo: 'Online-Student-Registration-System',
      title: 'Student Registration System',
      kind: 'Web app',
      desc: 'An online student registration project.'
    },
    {
      repo: 'earning-ai',
      title: 'Earning AI',
      kind: 'AI and data',
      desc: 'An AI-focused project concept exploring earning tools.'
    }
  ];

  var REPO_GROUPS = {
    'Web': ['E-COMMERCE', 'Task-Management', 'portfolio', 'Ujjawal-Singh', 'Ujjawal', 'Online-Student-Registration-System', 'Online-Student-Registration-System.github.io', 'evententery', 'gatepass', 'Maurax'],
    'AI and data': ['OMR-Evaluation-System', 'OMR-Evaluation-System-2', 'resume-evaluator', 'Automated-Resume-Relevance-Check-System.2', 'Streamlit', 'ai', 'earning-ai', 'Person-Finder', 'blank-app'],
    'Systems and networking': ['PBL_OS', 'OS_lab', 'Networking-Linux', 'Networking-Linux-Firewall'],
    'Other': ['School', 'Abhinaw.github.io', 'Astha-Singh', 'Intership-project']
  };

  /* ---------- Helpers ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') node.className = attrs[k];
      else if (k === 'text') node.textContent = attrs[k];
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  function repoUrl(name) { return 'https://github.com/' + GITHUB_USER + '/' + name; }

  function formatDate(iso) {
    try {
      return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(iso));
    } catch (e) { return ''; }
  }

  var ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M8 7h9v9"/></svg>';
  var PLUS = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';

  /* ---------- Theme ---------- */
  (function theme() {
    var root = document.documentElement;
    var btn = $('#themeToggle');
    var meta = $('meta[name="theme-color"]');

    function apply(t) {
      root.setAttribute('data-theme', t);
      btn.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
      if (meta) meta.setAttribute('content', t === 'dark' ? '#0b1222' : '#f2f4f8');
    }
    apply(root.getAttribute('data-theme') || 'light');

    btn.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      apply(next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  })();

  /* ---------- Header and mobile menu ---------- */
  (function header() {
    var bar = $('#siteHeader');
    var nav = $('#nav');
    var btn = $('#menuBtn');

    function onScroll() { bar.classList.toggle('is-scrolled', window.scrollY > 8); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    function setOpen(open) {
      nav.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }
    btn.addEventListener('click', function () { setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
    $$('a', nav).forEach(function (a) { a.addEventListener('click', function () { setOpen(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });

    // Highlight the section in view
    var links = $$('.nav-list a');
    var map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (a) { a.removeAttribute('aria-current'); });
          var link = map[entry.target.id];
          if (link) link.setAttribute('aria-current', 'true');
        });
      }, { rootMargin: '-45% 0px -50% 0px' });
      Object.keys(map).forEach(function (id) {
        var sec = document.getElementById(id);
        if (sec) io.observe(sec);
      });
      var home = document.getElementById('home');
      if (home) new IntersectionObserver(function (e) {
        if (e[0].isIntersecting) links.forEach(function (a) { a.removeAttribute('aria-current'); });
      }, { rootMargin: '-45% 0px -50% 0px' }).observe(home);
    }
  })();

  /* ---------- Portrait fallback ---------- */
  (function portrait() {
    var img = $('#portraitImg');
    var frame = $('#portraitFrame');
    if (!img || !frame) return;
    function fail() { frame.classList.add('no-img'); }
    img.addEventListener('error', fail);
    if (img.complete && img.naturalWidth === 0) fail();
  })();

  /* ---------- Generated project glyph (identicon from the repo name) ---------- */
  function hash(str) {
    var h = 2166136261;
    for (var i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function glyph(name) {
    var rand = rng(hash(name));
    var n = 6, cell = 16, half = n / 2, out = '';
    for (var y = 0; y < n; y++) {
      for (var x = 0; x < half; x++) {
        var r = rand();
        if (r < 0.42) continue;
        var op = r > 0.8 ? 1 : 0.55;
        out += '<rect x="' + (x * cell) + '" y="' + (y * cell) + '" width="' + cell + '" height="' + cell + '" rx="4" fill="currentColor" opacity="' + op + '"/>';
        out += '<rect x="' + ((n - 1 - x) * cell) + '" y="' + (y * cell) + '" width="' + cell + '" height="' + cell + '" rx="4" fill="currentColor" opacity="' + op + '"/>';
      }
    }
    return '<svg viewBox="0 0 ' + (n * cell) + ' ' + (n * cell) + '" aria-hidden="true" focusable="false">' + out + '</svg>';
  }

  /* ---------- Project index ---------- */
  var index = $('#projectIndex');
  var rows = [];

  function buildRow(p, i) {
    var id = 'proj-' + i;
    var li = el('li', { 'class': 'row' });

    var stackText = (p.stack || []).join(', ');
    var btn = el('button', { 'class': 'row-btn', type: 'button', id: id + '-btn', 'aria-expanded': 'false', 'aria-controls': id + '-panel' }, [
      el('span', { 'class': 'row-title', text: p.title }),
      el('span', { 'class': 'row-kind', text: p.kind }),
      el('span', { 'class': 'row-stack', text: stackText }),
      (function () { var s = el('span', { 'class': 'row-icon', 'aria-hidden': 'true' }); s.innerHTML = PLUS; return s; })()
    ]);
    var head = el('h3', { 'class': 'row-head' }, [btn]);

    var g = el('div', { 'class': 'glyph' });
    g.innerHTML = glyph(p.repo);

    var tags = el('div', { 'class': 'tags' });
    (p.stack || []).forEach(function (t) { tags.appendChild(el('span', { 'class': 'tag', text: t })); });

    var links = el('div', { 'class': 'panel-links' });
    if (p.demo) {
      var demo = el('a', { 'class': 'text-link', href: p.demo, target: '_blank', rel: 'noopener' });
      demo.innerHTML = 'Live demo' + ARROW;
      links.appendChild(demo);
    }
    var repo = el('a', { 'class': 'text-link', href: repoUrl(p.repo), target: '_blank', rel: 'noopener' });
    repo.innerHTML = 'Repository' + ARROW;
    links.appendChild(repo);

    var meta = el('p', { 'class': 'panel-meta' });

    var body = el('div', {}, [el('p', { 'class': 'panel-desc', text: p.desc }), tags, links, meta]);
    var inner = el('div', { 'class': 'row-panel-inner' }, [el('div', { 'class': 'panel-grid' }, [g, body])]);
    var panel = el('div', { 'class': 'row-panel', id: id + '-panel', role: 'region', 'aria-labelledby': id + '-btn' }, [inner]);

    li.appendChild(head);
    li.appendChild(panel);

    btn.addEventListener('click', function () { toggle(li, btn); });
    rows.push({ p: p, li: li, btn: btn, tags: tags, meta: meta, stackEl: $('.row-stack', btn) });
    return li;
  }

  function toggle(li, btn, force) {
    var open = typeof force === 'boolean' ? force : !li.classList.contains('is-open');
    li.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
  }

  if (index) {
    PROJECTS.forEach(function (p, i) { index.appendChild(buildRow(p, i)); });
    if (rows[0]) toggle(rows[0].li, rows[0].btn, true);
  }

  /* ---------- Repository list ---------- */
  var repoList = $('#repoList');
  var filtersEl = $('#repoFilters');
  var countEl = $('#reposCount');
  var activeFilter = 'All';
  var repoMeta = {}; // lowercase name -> GitHub API object
  var extraRepos = []; // repos on GitHub that aren't in REPO_GROUPS

  function allRepoEntries() {
    var entries = [];
    Object.keys(REPO_GROUPS).forEach(function (group) {
      REPO_GROUPS[group].forEach(function (name) { entries.push({ name: name, group: group }); });
    });
    extraRepos.forEach(function (name) { entries.push({ name: name, group: 'Other' }); });
    return entries;
  }

  function renderRepos() {
    if (!repoList) return;
    var entries = allRepoEntries();
    var visible = entries.filter(function (e) { return activeFilter === 'All' || e.group === activeFilter; });

    repoList.innerHTML = '';
    visible.forEach(function (e) {
      var m = repoMeta[e.name.toLowerCase()];
      var a = el('a', { 'class': 'repo', href: repoUrl(e.name), target: '_blank', rel: 'noopener' }, [
        el('span', { 'class': 'repo-name', text: e.name }),
        el('span', { 'class': 'repo-lang', text: m && m.language ? m.language : '' })
      ]);
      repoList.appendChild(el('li', {}, [a]));
    });
    if (countEl) countEl.textContent = '(' + visible.length + ')';
  }

  function renderFilters() {
    if (!filtersEl) return;
    filtersEl.innerHTML = '';
    ['All'].concat(Object.keys(REPO_GROUPS)).forEach(function (name) {
      var b = el('button', { 'class': 'filter', type: 'button', 'aria-pressed': String(name === activeFilter), text: name });
      b.addEventListener('click', function () {
        activeFilter = name;
        $$('.filter', filtersEl).forEach(function (f) { f.setAttribute('aria-pressed', String(f === b)); });
        renderRepos();
      });
      filtersEl.appendChild(b);
    });
  }

  renderFilters();
  renderRepos();

  /* ---------- Live data from GitHub (optional enhancement) ---------- */
  function enrichFromGitHub() {
    if (!window.fetch) return;
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 7000);

    fetch('https://api.github.com/users/' + GITHUB_USER + '/repos?per_page=100&sort=updated', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: ctrl ? ctrl.signal : undefined
    })
      .then(function (res) { clearTimeout(timer); return res.ok ? res.json() : Promise.reject(); })
      .then(function (data) {
        if (!Array.isArray(data)) return;
        var known = {};
        allRepoEntries().forEach(function (e) { known[e.name.toLowerCase()] = true; });

        data.forEach(function (r) {
          repoMeta[r.name.toLowerCase()] = r;
          if (!known[r.name.toLowerCase()] && !r.fork) extraRepos.push(r.name);
        });

        rows.forEach(function (row) {
          var m = repoMeta[row.p.repo.toLowerCase()];
          if (!m) return;
          if (m.language && !(row.p.stack && row.p.stack.length)) {
            row.stackEl.textContent = m.language;
            row.tags.appendChild(el('span', { 'class': 'tag', text: m.language }));
          }
          var parts = [];
          if (m.pushed_at) parts.push('Last updated ' + formatDate(m.pushed_at));
          if (m.stargazers_count) parts.push(m.stargazers_count + (m.stargazers_count === 1 ? ' star' : ' stars'));
          row.meta.textContent = parts.join('. ');
        });

        renderRepos();
      })
      .catch(function () { /* offline or rate-limited: the static content is already complete */ });
  }
  enrichFromGitHub();

  /* ---------- Copy email ---------- */
  (function copyEmail() {
    var btn = $('#copyEmail');
    if (!btn) return;
    btn.addEventListener('click', function () {
      function done() {
        btn.textContent = 'Copied';
        setTimeout(function () { btn.textContent = 'Copy email'; }, 1800);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(CONTACT_EMAIL).then(done, function () { window.location.href = 'mailto:' + CONTACT_EMAIL; });
      } else {
        window.location.href = 'mailto:' + CONTACT_EMAIL;
      }
    });
  })();

  /* ---------- Contact form ---------- */
  (function contactForm() {
    var form = $('#contactForm');
    if (!form) return;
    var btn = $('#submitBtn');
    var status = $('#formStatus');

    function say(type, text) {
      status.className = 'form-status ' + (type ? 'is-' + type : '');
      status.textContent = text;
    }

    if (window.emailjs) window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    else window.addEventListener('load', function () { if (window.emailjs) window.emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY }); });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (form.company && form.company.value) return; // honeypot

      if (!form.checkValidity()) {
        form.reportValidity();
        say('error', 'Fill in every field with a valid email address, then send again.');
        return;
      }

      $('#replyTo').value = form.from_email.value;

      if (!window.emailjs) {
        say('error', 'The form service did not load. Email me directly at ' + CONTACT_EMAIL + '.');
        return;
      }

      btn.disabled = true;
      btn.textContent = 'Sending';
      say('', 'Sending your message.');

      window.emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
        .then(function () {
          say('ok', 'Message sent. I will reply to ' + form.from_email.value + ' soon.');
          form.reset();
        })
        .catch(function () {
          say('error', 'The message did not send. Email me directly at ' + CONTACT_EMAIL + '.');
        })
        .then(function () {
          btn.disabled = false;
          btn.textContent = 'Send message';
        });
    });
  })();

  /* ---------- Footer year ---------- */
  var year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
