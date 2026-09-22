/* Predavateljsko okno. Sinhronizira se z glavnim oknom prek localStorage.
   Glavno okno pise kljuc pzn.sync, to okno pise ukaze v pzn.cmd. */

(function () {

  var startedAt = Date.now();
  var slideAt = Date.now();
  var lastId = null;

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function md(s) {
    return esc(s)
      .replace(/\[\[([^\]]+)\]\]/g, '<span class="en">$1</span>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  }

  function read() {
    try { return JSON.parse(localStorage.getItem('pzn.sync') || 'null'); } catch (e) { return null; }
  }

  function send(cmd) {
    try { localStorage.setItem('pzn.cmd', JSON.stringify(Object.assign({ t: Date.now() }, cmd))); }
    catch (e) {}
  }

  /* linearen seznam slajdov: naslov modula, nato njegovi pojmi */
  function flat(lang, core) {
    var out = [];
    (window.CONTENT[lang] || window.CONTENT.sl).modules.forEach(function (m) {
      out.push({ kind: 'module', id: 'm' + m.id, t: m.t, s: [m.sub], notes: '' });
      (m.items || []).forEach(function (it) {
        if (core && !it.core) return;
        out.push({ kind: 'item', id: it.id, t: it.t, s: it.s, notes: it.notes || '', tag: it.tag });
      });
    });
    return out;
  }

  function mmss(ms) {
    var s = Math.max(0, Math.floor(ms / 1000));
    var m = Math.floor(s / 60);
    return (m < 10 ? '0' : '') + m + ':' + ((s % 60) < 10 ? '0' : '') + (s % 60);
  }

  function tick() {
    $('pvElapsed').textContent = mmss(Date.now() - startedAt);
    $('pvOnSlide').textContent = mmss(Date.now() - slideAt);
  }

  function draw() {
    var sync = read();
    var warn = $('pvWarn');

    if (!sync) {
      warn.hidden = false;
      warn.textContent = 'Čakam na glavno okno — preklopi ga v Predstavitev.';
      return;
    }
    warn.hidden = true;

    var lang = sync.lang === 'en' ? 'en' : 'sl';
    window.I18N.set(lang);
    var ui = window.I18N.ui();
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-ui]').forEach(function (n) {
      var k = n.getAttribute('data-ui');
      if (ui[k]) n.textContent = ui[k];
    });

    var list = flat(lang, !!sync.core);
    var i = Math.min(Math.max(sync.i || 0, 0), list.length - 1);
    var now = list[i] || { t: '—', s: [], notes: '' };
    var next = list[i + 1];

    if (now.id !== lastId) { lastId = now.id; slideAt = Date.now(); }

    $('pvBadge').textContent = (i + 1) + ' / ' + (sync.n || list.length) +
      (sync.core ? ' · ' + ui.coreOnly : '');
    $('pvTitle').innerHTML = esc(now.t) + (now.tag ? ' <span class="tag">' + esc(now.tag) + '</span>' : '');
    $('pvSentences').innerHTML = (now.s || []).map(function (x) {
      return '<li>' + md(x) + '</li>';
    }).join('');
    $('pvNextTitle').textContent = next ? next.t : ui.theEnd;
    $('pvNotes').innerHTML = now.notes ? md(now.notes) : '<span class="pv-dim">—</span>';
    tick();
  }

  window.addEventListener('storage', function (e) {
    if (e.key === 'pzn.sync') draw();
  });

  $('pvPrev').addEventListener('click', function () { send({ go: 'prev' }); });
  $('pvNext').addEventListener('click', function () { send({ go: 'next' }); });
  $('pvReset').addEventListener('click', function () { startedAt = Date.now(); slideAt = Date.now(); tick(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); send({ go: 'next' }); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); send({ go: 'prev' }); }
  });

  try {
    var t = localStorage.getItem('pzn.theme');
    if (t) document.documentElement.dataset.theme = t;
  } catch (e) {}

  setInterval(tick, 1000);
  setInterval(draw, 1500);   /* varovalo, ce storage dogodek izpade */
  draw();
})();
