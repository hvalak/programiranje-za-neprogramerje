/* Strukturni diagrami (omrezje, HTTP, gostovanje, arhitektura).
   NE metafore - za razlago pojmov se uporablja koda (code.js).

   Pravila:
     - samo currentColor in var(--accent), nobene fiksne barve,
     - viewBox s fiksnim razmerjem, sirina 100 %,
     - besedilo je dvojezicno prek slovarja L.

   Register je zaenkrat prazen; polni se od Modula 5 naprej (M3). */

(function () {
  var A = 'var(--accent)';
  var M = 'var(--muted)';

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function svg(vb, body) {
    return '<svg viewBox="' + vb + '" xmlns="http://www.w3.org/2000/svg" ' +
      'fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" font-family="inherit">' + body + '</svg>';
  }

  function box(x, y, w, h, o) {
    o = o || {};
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h +
      '" rx="' + (o.r == null ? 10 : o.r) + '"' +
      (o.stroke ? ' stroke="' + o.stroke + '"' : '') +
      (o.dash ? ' stroke-dasharray="5 4"' : '') +
      (o.fill ? ' fill="' + o.fill + '" fill-opacity="' + (o.op || .1) + '"' : '') + '/>';
  }

  function t(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '" fill="' + (o.fill || 'currentColor') +
      '" stroke="none" font-size="' + (o.size || 15) + '"' +
      (o.weight ? ' font-weight="' + o.weight + '"' : '') +
      (o.anchor ? ' text-anchor="' + o.anchor + '"' : '') +
      (o.mono ? ' font-family="ui-monospace, Consolas, monospace"' : '') + '>' + esc(s) + '</text>';
  }

  function arrow(x1, y1, x2, y2, o) {
    o = o || {};
    var c = o.stroke || M;
    var dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
    var ux = dx / len, uy = dy / len, hx = x2 - ux * 9, hy = y2 - uy * 9;
    var px = -uy * 4.5, py = ux * 4.5;
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + hx + '" y2="' + hy + '" stroke="' + c + '"' +
      (o.dash ? ' stroke-dasharray="4 4"' : '') + '/>' +
      '<polygon points="' + x2 + ',' + y2 + ' ' + (hx + px) + ',' + (hy + py) + ' ' +
      (hx - px) + ',' + (hy - py) + '" fill="' + c + '" stroke="none"/>';
  }

  var L = { sl: {}, en: {} };
  var VIZ = {};

  window.VIZ = {
    has: function (n) { return !!VIZ[n]; },
    render: function (n, lang) { return VIZ[n] ? VIZ[n](L[lang] || L.sl) : ''; },
    _helpers: { svg: svg, box: box, t: t, arrow: arrow, A: A, M: M }
  };
})();
