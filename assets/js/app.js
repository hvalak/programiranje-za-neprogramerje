/* Sestavljanje strani iz content-*.js. Brez knjiznic. */

(function () {
  var app = document.getElementById('app');
  var bar = document.querySelector('#progressbar i');
  var slides = [];
  var cur = 0;
  var coreOnly = false;

  /* ---------- pomozne ---------- */

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function md(s) { /* `koda`, *poudarek*, [[angleski izraz]] */
    return esc(s)
      .replace(/\[\[([^\]]+)\]\]/g, '<span class="en">$1</span>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function plain(s) { return String(s).replace(/[`*\[\]]/g, ''); }

  var store = {
    get: function (k, d) {
      try { var v = localStorage.getItem(k); return v == null ? d : v; } catch (e) { return d; }
    },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  function doneSet() {
    try { return new Set(JSON.parse(store.get('pzn.done', '[]'))); } catch (e) { return new Set(); }
  }
  function saveDone(s) { store.set('pzn.done', JSON.stringify(Array.from(s))); }

  function data() { return window.CONTENT[window.I18N.get()]; }
  function allItems() {
    var out = [];
    data().modules.forEach(function (m) {
      (m.items || []).forEach(function (it) { out.push({ m: m, it: it }); });
    });
    return out;
  }

  /* ---------- izris pojma ---------- */

  function conceptNode(it, lang, ui) {
    var n = el('article', 'concept' + (it.code || it.viz ? ' has-viz' : '') + (it.core ? ' is-core' : ''));
    n.id = 'c' + it.id;
    n.dataset.cid = it.id;

    var head = el('div', 'concept-head');
    head.appendChild(el('h3', null, esc(it.t)));
    if (it.tag) head.appendChild(el('span', 'tag', esc(it.tag)));
    n.appendChild(head);

    var ul = el('ul', 'sentences');
    it.s.forEach(function (line) { ul.appendChild(el('li', null, md(line))); });
    n.appendChild(ul);

    if (it.code || it.cmds) {
      var cw = el('div', 'codewrap', it.code ? window.CODE.render(it.code, ui) : '');
      if (it.cmds && it.cmds.length) {
        cw.insertAdjacentHTML('beforeend', '<table class="cmds"><tbody>' +
          it.cmds.map(function (r) {
            return '<tr><td><code>' + esc(r[0]) + '</code></td><td>' + md(r[1]) + '</td></tr>';
          }).join('') + '</tbody></table>');
      }
      n.appendChild(cw);
    } else if (it.viz && window.VIZ.has(it.viz)) {
      n.appendChild(el('figure', 'viz', window.VIZ.render(it.viz, lang)));
    }

    var demoName = it.demo || (window.DEMOS && window.DEMOS.forId(it.id));
    if (demoName && window.DEMOS.has(demoName)) {
      var box = window.DEMOS.mount(demoName, lang);
      if (box) { n.appendChild(box); n.classList.add('has-demo'); }
    }

    if (it.deeper) {
      var d = el('details', 'deeper');
      var html = '<summary>' + esc(ui.deeper) + '</summary><p>' + md(it.deeper) + '</p>';
      if (it.refs && it.refs.length) {
        html += '<div class="refs"><span class="refs-label">' + esc(ui.sources) + '</span><ul>' +
          it.refs.map(function (r) {
            return '<li><a href="' + esc(r.url) + '" target="_blank" rel="noopener noreferrer">' +
              esc(r.t) + '</a></li>';
          }).join('') + '</ul></div>';
      }
      d.innerHTML = html;
      n.appendChild(d);
    }

    return n;
  }

  /* ---------- izris strani ---------- */

  function render() {
    var lang = window.I18N.get();
    var ui = window.I18N.ui();
    var d = data();
    var done = doneSet();

    document.documentElement.lang = lang;
    document.title = ui.title;
    document.querySelectorAll('[data-ui]').forEach(function (n) {
      var k = n.getAttribute('data-ui');
      if (ui[k]) n.textContent = ui[k];
    });
    document.querySelectorAll('[data-lang-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.langBtn === lang);
    });
    syncViewButtons();
    var si = document.getElementById('searchIn');
    if (si) si.placeholder = ui.searchPh;

    app.innerHTML = '';

    var hero = el('section', 'hero');
    hero.id = 'top';
    hero.appendChild(el('h1', null, esc(d.meta.title)));
    hero.appendChild(el('p', 'lead', esc(d.meta.subtitle)));
    if (d.meta.intro) hero.appendChild(el('p', null, md(d.meta.intro)));

    var mount = el('section', 'mapmount');
    hero.appendChild(mount);
    app.appendChild(hero);
    window.MINDMAP.render(mount, d, ui, done, goTo);

    d.modules.forEach(function (m) {
      var mkey = 'm' + m.id;
      var sec = el('section', 'module' + (done.has(mkey) ? ' done' : ''));
      sec.id = mkey;
      var h = el('div', 'module-head');
      h.innerHTML = '<div class="kicker">' + esc(ui.module) + ' ' + m.id + '</div>' +
        '<h2>' + esc(m.t) + '</h2><p>' + esc(m.sub) + '</p>' +
        '<label class="check"><input type="checkbox" data-done="' + mkey + '"' +
        (done.has(mkey) ? ' checked' : '') + '> ' + esc(ui.done) + '</label>';
      sec.appendChild(h);
      app.appendChild(sec);

      (m.items || []).forEach(function (it) { app.appendChild(conceptNode(it, lang, ui)); });
    });

    app.appendChild(glossaryNode(ui));

    if (isPrint()) {
      app.insertBefore(tocNode(d, ui), app.children[1] || null);
      app.querySelectorAll('details').forEach(function (n) { n.open = true; });
    }

    if (!document.getElementById('slidenum')) {
      var num = el('div', 'slidenum');
      num.id = 'slidenum';
      document.body.appendChild(num);
    }

    collectSlides();
    updateProgress();
  }

  function isPrint() { return document.documentElement.dataset.view === 'print'; }

  function tocNode(d, ui) {
    var sec = el('section', 'toc');
    var html = '<h2>' + esc(ui.contents) + '</h2><ol>';
    d.modules.forEach(function (m) {
      html += '<li>' + esc(m.t) + '<ul>' +
        (m.items || []).map(function (it) { return '<li>' + esc(it.t) + '</li>'; }).join('') +
        '</ul></li>';
    });
    html += '<li>' + esc(ui.glossary) + '</li></ol>';
    sec.innerHTML = html;
    return sec;
  }

  function glossaryNode(ui) {
    var sec = el('section', 'module glossary');
    sec.id = 'glossary';
    var rows = allItems().map(function (x) {
      return { t: x.it.t, tag: x.it.tag || '', s: plain(x.it.s[0]), id: x.it.id, m: x.m.id };
    }).sort(function (a, b) { return a.t.localeCompare(b.t, window.I18N.get()); });

    var html = '<div class="module-head"><div class="kicker">' + esc(ui.glossary) +
      '</div><h2>' + esc(ui.glossary) + '</h2><p>' + esc(ui.glossaryIntro) + '</p></div>' +
      '<dl class="gloss">';
    rows.forEach(function (r) {
      html += '<dt><a href="#c' + esc(r.id) + '" data-jump="' + esc(r.id) + '">' + esc(r.t) + '</a>' +
        (r.tag ? ' <span class="tag">' + esc(r.tag) + '</span>' : '') + '</dt>' +
        '<dd>' + esc(r.s) + '</dd>';
    });
    sec.innerHTML = html + '</dl>';
    return sec;
  }

  /* ---------- pogleda ---------- */

  function collectSlides() {
    var sel = coreOnly ? '.module, .concept.is-core' : '.module, .concept';
    slides = Array.prototype.slice.call(app.querySelectorAll(sel))
      .filter(function (n) { return n.id !== 'glossary'; });
    if (cur >= slides.length) cur = Math.max(0, slides.length - 1);
    if (isSlides()) showSlide(cur);
  }

  function isSlides() { return document.documentElement.dataset.view === 'slides'; }

  function showSlide(i) {
    if (!slides.length) return;
    cur = Math.max(0, Math.min(i, slides.length - 1));
    app.querySelectorAll('.current').forEach(function (n) { n.classList.remove('current'); });
    slides[cur].classList.add('current');
    var n = document.getElementById('slidenum');
    if (n) {
      n.textContent = (cur + 1) + ' / ' + slides.length + (coreOnly ? ' · ' + window.I18N.ui().coreOnly : '');
    }
    updateProgress();
    broadcast();
  }

  function syncViewButtons() {
    var v = document.documentElement.dataset.view;
    document.querySelectorAll('[data-view-btn]').forEach(function (b) {
      b.setAttribute('aria-pressed', b.dataset.viewBtn === v);
    });
  }

  function setView(v) {
    var anchorId = null;
    if (isSlides()) {
      if (slides[cur]) anchorId = slides[cur].id;
    } else {
      var near = slides[nearestSlide()];
      if (near) anchorId = near.id;
    }
    document.documentElement.dataset.view = v;
    store.set('pzn.view', v);
    syncViewButtons();
    if (v === 'slides') {
      var here = anchorId ? slides.findIndex(function (s) { return s.id === anchorId; }) : 0;
      showSlide(here < 0 ? 0 : here);
    } else {
      app.querySelectorAll('.current').forEach(function (n) { n.classList.remove('current'); });
      if (anchorId) {
        var t = document.getElementById(anchorId);
        if (t) t.scrollIntoView();
      }
      updateProgress();
    }
  }

  function nearestSlide() {
    var y = window.scrollY + 120, best = 0;
    slides.forEach(function (s, i) { if (s.offsetTop <= y) best = i; });
    return best;
  }

  function updateProgress() {
    if (!bar) return;
    if (isSlides()) {
      bar.style.width = slides.length ? ((cur + 1) / slides.length * 100) + '%' : '0';
    } else {
      var h = document.body.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? window.scrollY / h * 100 : 0) + '%';
    }
  }

  function goTo(id) {
    closeOverlays();
    var target = document.getElementById(/^\d/.test(id) ? 'c' + id : id);
    if (!target) return;
    if (isSlides()) {
      var i = slides.findIndex(function (s) { return s === target; });
      if (i < 0) { setCore(false); i = slides.findIndex(function (s) { return s === target; }); }
      if (i >= 0) showSlide(i);
    } else {
      target.scrollIntoView();
      target.classList.add('flash');
      setTimeout(function () { target.classList.remove('flash'); }, 1200);
    }
  }

  function setCore(on) {
    coreOnly = on;
    var b = document.getElementById('coreBtn');
    if (b) b.setAttribute('aria-pressed', on);
    var keep = slides[cur] ? slides[cur].id : null;
    collectSlides();
    if (keep) {
      var i = slides.findIndex(function (s) { return s.id === keep; });
      if (i >= 0) showSlide(i);
    }
  }

  /* ---------- predavateljsko okno ---------- */

  function broadcast() {
    if (!slides[cur]) return;
    store.set('pzn.sync', JSON.stringify({
      id: slides[cur].dataset.cid || slides[cur].id,
      i: cur, n: slides.length,
      lang: window.I18N.get(),
      core: coreOnly,
      t: Date.now()
    }));
  }

  function openPresenter() {
    var w = window.open('presenter.html', 'pzn-presenter', 'width=900,height=640');
    if (!w) alert(window.I18N.ui().presenterOff);
    else broadcast();
  }

  /* ---------- iskanje in pregled ---------- */

  function closeOverlays() {
    ['searchOv', 'gridOv'].forEach(function (id) {
      var n = document.getElementById(id);
      if (n) n.hidden = true;
    });
  }

  function openSearch() {
    closeOverlays();
    var ov = document.getElementById('searchOv');
    var input = document.getElementById('searchIn');
    ov.hidden = false;
    input.value = '';
    runSearch('');
    input.focus();
  }

  function runSearch(q) {
    var ui = window.I18N.ui();
    var out = document.getElementById('searchOut');
    q = q.trim().toLowerCase();
    var hits = allItems().filter(function (x) {
      if (!q) return false;
      var hay = (x.it.t + ' ' + (x.it.tag || '') + ' ' + x.it.s.join(' ') + ' ' +
        (x.it.deeper || '')).toLowerCase();
      return hay.indexOf(q) >= 0;
    }).slice(0, 25);

    if (!q) { out.innerHTML = ''; return; }
    if (!hits.length) { out.innerHTML = '<li class="empty">' + esc(ui.noResults) + '</li>'; return; }
    out.innerHTML = hits.map(function (x) {
      return '<li><a href="#c' + esc(x.it.id) + '" data-jump="' + esc(x.it.id) + '">' +
        '<b>' + esc(x.it.t) + '</b>' + (x.it.tag ? ' <span class="tag">' + esc(x.it.tag) + '</span>' : '') +
        '<span class="where">' + esc(ui.module + ' ' + x.m.id + ' · ' + x.m.t) + '</span></a></li>';
    }).join('');
  }

  function openGrid() {
    closeOverlays();
    var out = document.getElementById('gridOut');
    out.innerHTML = slides.map(function (s, i) {
      var isMod = s.classList.contains('module');
      var title = s.querySelector('h2, h3');
      return '<button type="button" class="gcard' + (isMod ? ' gmod' : '') +
        (i === cur ? ' gcur' : '') + '" data-slide="' + i + '">' +
        '<span class="gnum">' + (i + 1) + '</span>' +
        '<span class="gt">' + esc(title ? title.textContent : '') + '</span></button>';
    }).join('');
    document.getElementById('gridOv').hidden = false;
  }

  /* ---------- dogodki ---------- */

  document.addEventListener('click', function (e) {
    var b;
    if ((b = e.target.closest('[data-jump]'))) {
      e.preventDefault();
      goTo(b.getAttribute('data-jump'));
      return;
    }
    if ((b = e.target.closest('[data-slide]'))) {
      closeOverlays();
      showSlide(parseInt(b.getAttribute('data-slide'), 10));
      return;
    }
    if ((b = e.target.closest('[data-lang-btn]'))) {
      var keepId = slides[cur] ? slides[cur].id : null;
      window.I18N.set(b.dataset.langBtn);
      render();
      if (keepId && isSlides()) {
        var i = slides.findIndex(function (s) { return s.id === keepId; });
        showSlide(i < 0 ? 0 : i);
      }
      return;
    }
    if ((b = e.target.closest('[data-view-btn]'))) { setView(b.dataset.viewBtn); return; }
    if (e.target.id === 'coreBtn') { setCore(!coreOnly); return; }
    if (e.target.id === 'searchBtn') { openSearch(); return; }
    if (e.target.id === 'themeBtn') {
      var t = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = t;
      store.set('pzn.theme', t);
      return;
    }
    if (e.target.id === 'helpBtn') { openHelp(); return; }
    if (e.target.classList.contains('overlay')) closeOverlays();
  });

  document.addEventListener('change', function (e) {
    if (!e.target.matches('[data-done]')) return;
    var key = e.target.getAttribute('data-done');
    var sec = e.target.closest('.module');
    var s = doneSet();
    if (e.target.checked) { s.add(key); if (sec) sec.classList.add('done'); }
    else { s.delete(key); if (sec) sec.classList.remove('done'); }
    saveDone(s);
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'searchIn') runSearch(e.target.value);
  });

  document.addEventListener('keydown', function (e) {
    var typing = /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
    var k = e.key;

    if (k === 'Escape') {
      closeOverlays();
      document.getElementById('blackout').hidden = true;
      return;
    }
    if (typing) {
      if (k === 'Enter') {
        var first = document.querySelector('#searchOut [data-jump]');
        if (first) goTo(first.getAttribute('data-jump'));
      }
      return;
    }

    if (k === '/') { e.preventDefault(); openSearch(); return; }
    if (k === '?') { openHelp(); return; }
    if (k === 'o' || k === 'O') { if (isSlides()) openGrid(); return; }
    if (k === 'p' || k === 'P') { openPresenter(); return; }
    if (k === 'c' || k === 'C') { if (isSlides()) setCore(!coreOnly); return; }
    if (k === 'f' || k === 'F') {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
      return;
    }
    if (k === 'b' || k === 'B') {
      var bo = document.getElementById('blackout');
      bo.hidden = !bo.hidden;
      return;
    }
    if (!isSlides()) return;
    if (k === 'ArrowRight' || k === ' ' || k === 'PageDown') { e.preventDefault(); showSlide(cur + 1); }
    else if (k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); showSlide(cur - 1); }
    else if (k === 'Home') { showSlide(0); }
    else if (k === 'End') { showSlide(slides.length - 1); }
  });

  window.addEventListener('scroll', function () {
    if (!isSlides()) updateProgress();
  }, { passive: true });

  /* predavateljsko okno lahko krmili glavno */
  window.addEventListener('storage', function (e) {
    if (e.key !== 'pzn.cmd' || !e.newValue) return;
    try {
      var c = JSON.parse(e.newValue);
      if (c.go === 'next') showSlide(cur + 1);
      else if (c.go === 'prev') showSlide(cur - 1);
      else if (typeof c.i === 'number') showSlide(c.i);
    } catch (err) {}
  });

  function openHelp() {
    var ui = window.I18N.ui();
    document.getElementById('helpKeys').innerHTML = ui.keys.map(function (r) {
      return '<li><kbd>' + r[0] + '</kbd><span>' + r[1] + '</span></li>';
    }).join('');
    var d = document.getElementById('helpDlg');
    if (d.showModal) d.showModal(); else d.open = true;
  }

  /* ---------- zagon ---------- */

  function injectLogo() {
    if (!window.LOGO_SVG) return;
    ['brandMark', 'colophonMark'].forEach(function (id) {
      var n = document.getElementById(id);
      if (n) n.innerHTML = window.LOGO_SVG;
    });
  }

  document.documentElement.dataset.theme = store.get('pzn.theme', 'dark');
  var qView = new URLSearchParams(location.search).get('view');
  document.documentElement.dataset.view =
    (qView === 'print' || qView === 'slides' || qView === 'handbook')
      ? qView : store.get('pzn.view', 'handbook');
  window.I18N.set(window.I18N.get());
  injectLogo();
  render();
  if (isSlides()) showSlide(0);
})();
