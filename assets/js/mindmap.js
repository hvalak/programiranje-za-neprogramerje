/* Krovni mind map — dvonivojski, interaktiven.

   Nivo 0: sredina = gradivo, obroč = 12 modulov, pikčaste črte = povezave med moduli.
   Nivo 1: klik na modul -> modul postane sredina, obroč so njegovi pojmi.
   Klik na pojem -> skok nanj (priročnik) ali na njegov slajd (predstavitev).

   Brez knjižnic. Barve samo iz teme. */

(function () {

  var W = 1000, H = 660, CX = 500, CY = 330;

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function cut(s, n) {
    s = String(s);
    return s.length > n ? s.slice(0, n - 1).trim() + '…' : s;
  }

  /* razmesti n vozlisc po krogu, zacne zgoraj */
  function ring(n, r) {
    var out = [];
    for (var i = 0; i < n; i++) {
      var a = -Math.PI / 2 + i * 2 * Math.PI / n;
      out.push({ a: a, x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) });
    }
    return out;
  }

  function label(p, text, opts) {
    opts = opts || {};
    var right = Math.cos(p.a) > -0.01;
    var dx = right ? 13 : -13;
    return '<text x="' + (p.x + dx) + '" y="' + (p.y + 4) + '"' +
      ' text-anchor="' + (right ? 'start' : 'end') + '"' +
      ' font-size="' + (opts.size || 13) + '"' +
      (opts.weight ? ' font-weight="' + opts.weight + '"' : '') +
      ' fill="' + (opts.fill || 'currentColor') + '" stroke="none">' + esc(text) + '</text>';
  }

  function node(p, r, cls, fill) {
    return '<circle cx="' + p.x + '" cy="' + p.y + '" r="' + r + '"' +
      ' fill="' + fill + '" stroke="var(--bg)" stroke-width="2" class="' + (cls || '') + '"/>';
  }

  /* pikcasta krivulja med dvema tockama, upognjena proti sredini */
  function linkPath(p1, p2) {
    var mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
    var qx = CX + (mx - CX) * 0.25, qy = CY + (my - CY) * 0.25;
    return 'M' + p1.x + ',' + p1.y + ' Q' + qx + ',' + qy + ' ' + p2.x + ',' + p2.y;
  }

  /* pari modulov, ki so povezani prek links v pojmih */
  function moduleLinks(modules) {
    var seen = {}, out = [];
    modules.forEach(function (m) {
      (m.items || []).forEach(function (it) {
        (it.links || []).forEach(function (lid) {
          var other = parseInt(String(lid).split('.')[0], 10);
          if (!other || other === m.id) return;
          var key = Math.min(m.id, other) + '-' + Math.max(m.id, other);
          if (seen[key]) return;
          seen[key] = 1;
          out.push([m.id, other]);
        });
      });
    });
    return out;
  }

  function renderTop(data, ui, done) {
    var mods = data.modules;
    var pts = ring(mods.length, 215);
    var byId = {};
    mods.forEach(function (m, i) { byId[m.id] = pts[i]; });

    var s = '';

    moduleLinks(mods).forEach(function (pair) {
      var a = byId[pair[0]], b = byId[pair[1]];
      if (!a || !b) return;
      s += '<path d="' + linkPath(a, b) + '" fill="none" stroke="var(--muted)"' +
        ' stroke-width="1" stroke-dasharray="3 5" opacity=".45"/>';
    });

    mods.forEach(function (m, i) {
      var p = pts[i];
      var isDone = done.has('m' + m.id);
      var empty = !(m.items && m.items.length);
      s += '<line x1="' + CX + '" y1="' + CY + '" x2="' + p.x + '" y2="' + p.y +
        '" stroke="var(--line)" stroke-width="1.5"/>';
      s += '<g class="mm-node" data-mod="' + m.id + '" tabindex="0" role="button">';
      s += '<circle cx="' + p.x + '" cy="' + p.y + '" r="16" fill="transparent"/>';
      s += node(p, 7, '', empty ? 'var(--line)' : (isDone ? 'var(--ok)' : 'var(--accent)'));
      s += label(p, m.id + '. ' + cut(m.t, 26), {
        size: 13, weight: 600, fill: empty ? 'var(--muted)' : 'currentColor'
      });
      s += '</g>';
    });

    s += '<circle cx="' + CX + '" cy="' + CY + '" r="58" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>';
    s += '<text x="' + CX + '" y="' + (CY - 4) + '" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" stroke="none">' +
      esc(ui.mapCenter1) + '</text>';
    s += '<text x="' + CX + '" y="' + (CY + 14) + '" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" stroke="none">' +
      esc(ui.mapCenter2) + '</text>';
    s += '<text x="' + CX + '" y="' + (CY + 34) + '" text-anchor="middle" font-size="10" fill="var(--muted)" stroke="none">' +
      esc(mods.length + ' ' + ui.mapModules) + '</text>';

    return s;
  }

  /* Na telefonu je radialni zemljevid neberljiv (13 enot pisave na 1000 enot sirine).
     Zato se poleg njega izrise se seznam; CSS pokaze enega ali drugega. */
  function listMarkup(data, ui, done) {
    var out = '<ul class="mm-list">';
    data.modules.forEach(function (m) {
      var empty = !(m.items && m.items.length);
      out += '<li class="mm-li' + (done.has('m' + m.id) ? ' done' : '') + '">' +
        '<button type="button" class="mm-node" data-goto="m' + m.id + '">' +
        '<span class="mm-num">' + m.id + '</span>' +
        '<span class="mm-t">' + esc(m.t) + '</span>' +
        '<span class="mm-c">' + (empty ? '—' : (m.items.length + ' ' + ui.mapConcepts)) + '</span>' +
        '</button></li>';
    });
    return out + '</ul>';
  }

  function renderModule(m, ui) {
    var items = m.items || [];
    var s = '';

    if (!items.length) {
      s += '<text x="' + CX + '" y="' + (CY - 130) + '" text-anchor="middle" font-size="14"' +
        ' fill="var(--muted)" stroke="none">' + esc(ui.mapSoon) + '</text>';
    }

    var r = items.length > 14 ? 250 : (items.length > 8 ? 225 : 190);
    var pts = ring(Math.max(items.length, 1), r);

    items.forEach(function (it, i) {
      var p = pts[i];
      s += '<line x1="' + CX + '" y1="' + CY + '" x2="' + p.x + '" y2="' + p.y +
        '" stroke="var(--line)" stroke-width="1.5"/>';
      s += '<g class="mm-node" data-goto="' + esc(it.id) + '" tabindex="0" role="button">';
      s += '<circle cx="' + p.x + '" cy="' + p.y + '" r="14" fill="transparent"/>';
      s += node(p, 5.5, '', it.core ? 'var(--accent)' : 'var(--muted)');
      s += label(p, cut(it.t, 24), { size: 12.5 });
      s += '</g>';
    });

    s += '<g class="mm-node" data-mod="0" tabindex="0" role="button">';
    s += '<circle cx="' + CX + '" cy="' + CY + '" r="62" fill="var(--surface)" stroke="var(--accent)" stroke-width="2"/>';
    s += '<text x="' + CX + '" y="' + (CY - 10) + '" text-anchor="middle" font-size="11"' +
      ' fill="var(--accent)" font-weight="700" stroke="none">' + esc(ui.module + ' ' + m.id) + '</text>';

    var words = String(m.t).split(' '), line1 = '', line2 = '';
    words.forEach(function (w) {
      if ((line1 + ' ' + w).trim().length <= 16 && !line2) line1 = (line1 + ' ' + w).trim();
      else line2 = (line2 + ' ' + w).trim();
    });
    s += '<text x="' + CX + '" y="' + (CY + 8) + '" text-anchor="middle" font-size="12.5"' +
      ' font-weight="600" fill="currentColor" stroke="none">' + esc(cut(line1, 18)) + '</text>';
    if (line2) {
      s += '<text x="' + CX + '" y="' + (CY + 24) + '" text-anchor="middle" font-size="12.5"' +
        ' font-weight="600" fill="currentColor" stroke="none">' + esc(cut(line2, 18)) + '</text>';
    }
    s += '<text x="' + CX + '" y="' + (CY + (line2 ? 42 : 28)) + '" text-anchor="middle" font-size="10"' +
      ' fill="var(--muted)" stroke="none">' + esc('← ' + ui.mapBack) + '</text>';
    s += '</g>';

    return s;
  }

  window.MINDMAP = {
    /* mount: element; data: CONTENT[lang]; ui: nizi; done: Set; onGo: fn(conceptId) */
    render: function (mount, data, ui, done, onGo) {
      var open = 0;

      function draw() {
        var body = open
          ? renderModule(data.modules.filter(function (m) { return m.id === open; })[0], ui)
          : renderTop(data, ui, done);
        mount.innerHTML =
          '<div class="mm-wrap"><svg class="mindmap" viewBox="0 0 ' + W + ' ' + H + '" ' +
          'xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(ui.mapTitle) + '">' +
          body + '</svg><p class="mm-hint">' + esc(open ? ui.mapHintIn : ui.mapHint) + '</p>' +
          listMarkup(data, ui, done) + '</div>';
      }

      mount.addEventListener('click', function (e) {
        var g = e.target.closest ? e.target.closest('.mm-node') : null;
        if (!g) return;
        if (g.hasAttribute('data-mod')) {
          open = parseInt(g.getAttribute('data-mod'), 10) || 0;
          draw();
        } else if (g.hasAttribute('data-goto')) {
          onGo(g.getAttribute('data-goto'));
        }
      });

      mount.addEventListener('keydown', function (e) {
        if (e.key !== 'Enter' && e.key !== ' ') return;
        var g = e.target.closest ? e.target.closest('.mm-node') : null;
        if (!g) return;
        e.preventDefault();
        g.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      });

      draw();
    }
  };
})();
