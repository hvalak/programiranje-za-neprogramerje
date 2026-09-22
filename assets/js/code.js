/* Prikaz kode v slogu programerskega priročnika.
   Brez knjižnic: barvanje je en sam regularni izraz. */

(function () {

  var KW = /^(def|return|if|elif|else|for|while|in|not|and|or|import|from|as|with|True|False|None|lambda|class|try|except|finally|raise|pass|break|continue|async|await|yield|global|assert|del|is|SELECT|FROM|WHERE|JOIN|LEFT|INNER|ON|GROUP|ORDER|BY|HAVING|INSERT|INTO|VALUES|CREATE|TABLE|UPDATE|SET|DELETE|LIMIT|DESC|ASC|AND|OR|NOT|NULL|PRIMARY|KEY|FOREIGN|REFERENCES|INTEGER|TEXT|REAL|AS|SUM|COUNT|AVG|const|let|var|function|new|export|default)$/;
  var BI = /^(print|len|range|open|int|str|float|round|sorted|sum|abs|min|max|enumerate|zip|list|dict|input|type)$/;

  var RE = new RegExp(
    "('[^'\\n]*'|\"[^\"\\n]*\")" +   // 1 niz
    "|(#[^\\n]*)" +                  // 2 komentar
    "|\\b(\\d+\\.\\d+|\\d+)\\b" +    // 3 stevilo
    "|\\b([A-Za-z_][A-Za-z_0-9]*)\\b", // 4 beseda
    "g");

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function hi(line) {
    return esc(line).replace(RE, function (m, str, com, num, word) {
      if (str) return '<span class="t-str">' + str + "</span>";
      if (com) return '<span class="t-com">' + com + "</span>";
      if (num) return '<span class="t-num">' + num + "</span>";
      if (word) {
        if (KW.test(word)) return '<span class="t-kw">' + word + "</span>";
        if (BI.test(word)) return '<span class="t-bi">' + word + "</span>";
      }
      return m;
    });
  }

  function lines(src, numbered) {
    return src.replace(/\s+$/, "").split("\n").map(function (l, i) {
      var n = numbered ? '<i>' + (i + 1) + "</i>" : "";
      return '<span class="ln">' + n + (hi(l) || "&nbsp;") + "</span>";
    }).join("\n");
  }

  window.CODE = {
    render: function (c, ui) {
      if (!c || !c.src) return "";
      var isTerm = !!c.term;
      var head = esc(c.file || (isTerm ? "terminal" : "primer.py"));
      var h = '<figure class="codeblock' + (isTerm ? " term" : "") + '">';
      h += '<figcaption class="cb-head"><span class="cb-dots"></span>' + head + "</figcaption>";
      h += '<pre class="cb-src"><code>' + lines(c.src, !isTerm) + "</code></pre>";
      if (c.out) {
        h += '<div class="cb-out"><span class="cb-label">' + esc(ui.output) + "</span>" +
             "<pre>" + esc(c.out.replace(/\s+$/, "")) + "</pre></div>";
      }
      if (c.note) h += '<figcaption class="cb-note">' + esc(c.note) + "</figcaption>";
      return h + "</figure>";
    }
  };
})();
