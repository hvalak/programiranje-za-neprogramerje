/* Sedem interaktivnih demo-jev. Brez knjiznic, delujejo tudi brez streznika.
   Vsak demo je funkcija, ki dobi element in slovar oznak ter nanj obesi vmesnik. */

(function () {

  /* katera demo pripada kateremu pojmu */
  var FOR_ID = {
    "1.7": "loop",
    "3.2": "textBinary",
    "4.2": "fourShapes",
    "5.1": "urlParts",
    "6.7": "clickToDb",
    "10.2": "tokens",
    "10.5": "contextWindow"
  };

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  var L = {
    sl: {
      run: "Zaženi", step: "Korak", reset: "Ponastavi", stop: "Ustavi",
      total: "skupaj", item: "element", round: "ponovitev", done: "konec",
      openAsText: "Odpri kot besedilo", readable: "berljivo", garbage: "neberljivo",
      excel: "Excel", csv: "CSV", json: "JSON", sql: "SQL",
      scheme: "protokol", host: "gostitelj", port: "vrata", path: "pot",
      query: "poizvedba", frag: "odsek", invalid: "To ni veljaven naslov.", dflt: "privzeto",
      save: "Shrani gosta", step1: "Brskalnik: klik", step2: "Zahteva",
      step3: "Strežnik: preverjanje", step4: "Baza: zapis", step5: "Odgovor",
      step6: "Brskalnik: osvežitev", again: "Še enkrat",
      addMsg: "+ sporočilo", addFile: "+ datoteka", summarise: "Pripravi povzetek",
      used: "porabljeno", full: "Okno je polno — najstarejši del izpade.",
      warn: "Čas za povzetek.", ok: "Udobno.",
      tokensApprox: "Približek: pravi tokenizator deli drugače. Namen je razmerje, ne natančno število.",
      tokensCount: "tokenov", chars: "znakov", perToken: "znakov na token",
      sampleSl: "Račun številka 2026-0148 je bil včeraj plačan v celoti.",
      sampleEn: "Invoice number 2026-0148 was paid in full yesterday.",
      slLabel: "slovensko", enLabel: "angleško", ratio: "razmerje"
    },
    en: {
      run: "Run", step: "Step", reset: "Reset", stop: "Stop",
      total: "total", item: "item", round: "pass", done: "done",
      openAsText: "Open as text", readable: "readable", garbage: "unreadable",
      excel: "Spreadsheet", csv: "CSV", json: "JSON", sql: "SQL",
      scheme: "protocol", host: "host", port: "port", path: "path",
      query: "query", frag: "fragment", invalid: "That is not a valid address.", dflt: "default",
      save: "Save guest", step1: "Browser: click", step2: "Request",
      step3: "Server: checks", step4: "Database: write", step5: "Response",
      step6: "Browser: refresh", again: "Again",
      addMsg: "+ message", addFile: "+ file", summarise: "Summarise",
      used: "used", full: "The window is full — the oldest part drops out.",
      warn: "Time to summarise.", ok: "Comfortable.",
      tokensApprox: "Approximate: a real tokeniser splits differently. The ratio is the point, not the exact count.",
      tokensCount: "tokens", chars: "characters", perToken: "characters per token",
      sampleSl: "Račun številka 2026-0148 je bil včeraj plačan v celoti.",
      sampleEn: "Invoice number 2026-0148 was paid in full yesterday.",
      slLabel: "Slovene", enLabel: "English", ratio: "ratio"
    }
  };

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function btn(label, cls) {
    var b = el("button", "dbtn" + (cls ? " " + cls : ""), esc(label));
    b.type = "button";
    return b;
  }

  /* ─────────────── 1. zanka v zivo ─────────────── */

  function loop(root, t) {
    var data = [120, 45, 310];
    var mode = "for";
    var i = -1, total = 0, timer = null;

    var bar = el("div", "d-bar");
    var bFor = btn("for"), bWhile = btn("while");
    var bStep = btn(t.step), bRun = btn(t.run, "primary"), bReset = btn(t.reset);
    [bFor, bWhile, bStep, bRun, bReset].forEach(function (b) { bar.appendChild(b); });

    var code = el("pre", "d-code");
    var state = el("div", "d-state");
    var out = el("pre", "d-out");

    root.appendChild(bar);
    root.appendChild(code);
    root.appendChild(state);
    root.appendChild(out);

    function srcFor() {
      return [
        "racuni = [120, 45, 310]",
        "skupaj = 0",
        "",
        "for znesek in racuni:",
        "    skupaj = skupaj + znesek",
        "",
        "print(skupaj)"
      ];
    }
    function srcWhile() {
      return [
        "racuni = [120, 45, 310]",
        "skupaj = 0",
        "n = 0",
        "while n < len(racuni):",
        "    skupaj = skupaj + racuni[n]",
        "    n = n + 1",
        "print(skupaj)"
      ];
    }

    function draw() {
      var lines = mode === "for" ? srcFor() : srcWhile();
      var active = i < 0 ? -1 : (i >= data.length ? lines.length - 1 : 4);
      code.innerHTML = lines.map(function (l, k) {
        return '<span class="d-line' + (k === active ? " on" : "") + '">' +
          (esc(l) || "&nbsp;") + "</span>";
      }).join("\n");

      state.innerHTML = data.map(function (v, k) {
        return '<span class="d-chip' + (k === i ? " on" : (k < i ? " past" : "")) + '">' + v + "</span>";
      }).join("") +
        '<span class="d-eq">' + esc(t.total) + " = <b>" + total + "</b></span>";

      var log = [];
      for (var k = 0; k < Math.min(i + 1, data.length); k++) {
        log.push("+ " + data[k] + "  ->  " + data.slice(0, k + 1).reduce(function (a, b) { return a + b; }, 0));
      }
      if (i >= data.length) log.push("print(" + total + ")  ->  " + t.done);
      out.textContent = log.join("\n") || "—";

      bFor.setAttribute("aria-pressed", mode === "for");
      bWhile.setAttribute("aria-pressed", mode === "while");
    }

    function step() {
      if (i >= data.length) return stop();
      i++;
      if (i < data.length) total += data[i];
      draw();
      if (i >= data.length) stop();
    }
    function stop() { clearInterval(timer); timer = null; bRun.textContent = t.run; }
    function reset() { stop(); i = -1; total = 0; draw(); }

    bStep.onclick = step;
    bReset.onclick = reset;
    bRun.onclick = function () {
      if (timer) return stop();
      if (i >= data.length) reset();
      bRun.textContent = t.stop;
      timer = setInterval(step, 800);
    };
    bFor.onclick = function () { mode = "for"; reset(); };
    bWhile.onclick = function () { mode = "while"; reset(); };

    reset();
  }

  /* ─────────────── 2. tekst vs. binarno ─────────────── */

  function textBinary(root, t) {
    var TXT = "Ana Novak;ana@primer.si;120\nBor Kovac;bor@primer.si;45\nCvet Zupan;cvet@primer.si;310";
    var BIN = "\\x89PNG\\r\\n\\x1a\\n\\x00\\x00\\x00\\rIHDR\\x00\\x00\\x02X\\x00\\x00\\x01\\xa4" +
              "\\x08\\x06\\x00\\x00\\x00\\x9c\\xb8\\x8a\\xd4\\x00\\x00 \\x00IDATx\\x9c\\xec\\xbdy" +
              "\\xd8\\x1cE\\x9d?~\\xaaz\\xee\\xd1\\x1c\\xf7\\x1d\\xb9\\x0f\\x92\\x90\\x00\\t\\x81" +
              "\\x84\\x00\\xe1\\xbe\\xef{\\x1f\\xbb\\xe0\\x9d\\xf7\\xba\\xeb\\x1d\\xa8\\xc0";

    var bar = el("div", "d-bar");
    var b1 = btn("gostje.txt"), b2 = btn("logo.png");
    bar.appendChild(b1); bar.appendChild(b2);
    var head = el("div", "d-note");
    var out = el("pre", "d-out tall");
    root.appendChild(bar); root.appendChild(head); root.appendChild(out);

    function show(kind) {
      var txt = kind === "txt";
      b1.setAttribute("aria-pressed", txt);
      b2.setAttribute("aria-pressed", !txt);
      head.innerHTML = "<code>open(\"" + (txt ? "gostje.txt" : "logo.png") + "\"" +
        (txt ? ", encoding=\"utf-8\"" : ", \"rb\"") + ").read()</code> &rarr; " +
        '<b class="' + (txt ? "good" : "bad") + '">' + esc(txt ? t.readable : t.garbage) + "</b>";
      out.textContent = txt ? TXT : BIN;
      out.className = "d-out tall" + (txt ? "" : " mono-bin");
    }
    b1.onclick = function () { show("txt"); };
    b2.onclick = function () { show("bin"); };
    show("txt");
  }

  /* ─────────────── 3. isti podatki, stiri oblike ─────────────── */

  function fourShapes(root, t) {
    var rows = [
      ["Novak", "novak@primer.si", 120],
      ["Kovac", "kovac@primer.si", 45],
      ["Zupan", "zupan@primer.si", 310]
    ];
    var keys = ["ime", "email", "znesek"];

    var bar = el("div", "d-bar");
    var names = [t.excel, t.csv, t.json, t.sql];
    var btns = names.map(function (n) { var b = btn(n); bar.appendChild(b); return b; });
    var out = el("div", "d-shape");
    root.appendChild(bar); root.appendChild(out);

    function render(k) {
      btns.forEach(function (b, j) { b.setAttribute("aria-pressed", j === k); });
      if (k === 0) {
        out.innerHTML = '<table class="d-table"><thead><tr>' +
          keys.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") +
          "</tr></thead><tbody>" +
          rows.map(function (r) {
            return "<tr>" + r.map(function (c) { return "<td>" + esc(c) + "</td>"; }).join("") + "</tr>";
          }).join("") + "</tbody></table>";
        return;
      }
      var text;
      if (k === 1) {
        text = keys.join(",") + "\n" + rows.map(function (r) { return r.join(","); }).join("\n");
      } else if (k === 2) {
        text = JSON.stringify(rows.map(function (r) {
          var o = {}; keys.forEach(function (key, j) { o[key] = r[j]; }); return o;
        }), null, 2);
      } else {
        text = rows.map(function (r) {
          return "INSERT INTO stranke (" + keys.join(", ") + ")\n" +
            "VALUES ('" + r[0] + "', '" + r[1] + "', " + r[2] + ");";
        }).join("\n");
      }
      out.innerHTML = '<pre class="d-out">' + esc(text) + "</pre>";
    }
    btns.forEach(function (b, k) { b.onclick = function () { render(k); }; });
    render(0);
  }

  /* ─────────────── 4. razstavljen URL ─────────────── */

  function urlParts(root, t) {
    var presets = [
      "https://www.zlataovca.si:443/gradivo/index.html?lang=sl#modul3",
      "http://localhost:8080/index.html",
      "http://192.168.1.24:8080/index.html?lang=en",
      "https://nakljucne-besede.trycloudflare.com/"
    ];
    var bar = el("div", "d-bar");
    ["www", "localhost", "LAN", "tunel"].forEach(function (n, k) {
      var b = btn(n);
      b.onclick = function () { input.value = presets[k]; draw(); };
      bar.appendChild(b);
    });
    var input = el("input", "d-input");
    input.type = "text";
    input.spellcheck = false;
    var out = el("div", "d-parts");
    root.appendChild(bar); root.appendChild(input); root.appendChild(out);

    function row(label, value) {
      if (value === "" || value == null) return "";
      return '<div class="d-part"><span>' + esc(label) + "</span><code>" + esc(value) + "</code></div>";
    }
    function draw() {
      var u;
      try { u = new URL(input.value); } catch (e) {
        out.innerHTML = '<p class="d-note bad">' + esc(t.invalid) + "</p>";
        return;
      }
      out.innerHTML =
        row(t.scheme, u.protocol.replace(":", "")) +
        row(t.host, u.hostname) +
        row(t.port, u.port || ((u.protocol === "https:" ? "443" : "80") + " (" + t.dflt + ")")) +
        row(t.path, u.pathname) +
        row(t.query, u.search.replace("?", "")) +
        row(t.frag, u.hash.replace("#", ""));
    }
    input.addEventListener("input", draw);
    input.value = presets[0];
    draw();
  }

  /* ─────────────── 5. klik -> API -> baza ─────────────── */

  function clickToDb(root, t) {
    var steps = [
      [t.step1, "gumb 'Shrani' -> JavaScript"],
      [t.step2, "POST /api/gostje\\n{ \"ime\": \"Nov gost\" }"],
      [t.step3, "sme_shraniti(uporabnik) -> True"],
      [t.step4, "INSERT INTO gostje (ime) VALUES ('Nov gost')"],
      [t.step5, "200 OK\\n{ \"id\": 42, \"ime\": \"Nov gost\" }"],
      [t.step6, "seznam se dopolni, stran se ne nalozi znova"]
    ];
    var bar = el("div", "d-bar");
    var go = btn(t.save, "primary");
    bar.appendChild(go);
    var list = el("div", "d-steps");
    root.appendChild(bar); root.appendChild(list);

    list.innerHTML = steps.map(function (s, k) {
      return '<div class="d-step" data-k="' + k + '"><span class="d-num">' + (k + 1) + "</span>" +
        "<span class=\"d-st\"><b>" + esc(s[0]) + "</b><code>" + esc(s[1]).replace(/\\n/g, "<br>") + "</code></span></div>";
    }).join("");

    var nodes = list.querySelectorAll(".d-step");
    var running = false;
    go.onclick = function () {
      if (running) return;
      running = true;
      go.textContent = "...";
      nodes.forEach(function (n) { n.classList.remove("on", "done"); });
      var k = 0;
      var iv = setInterval(function () {
        if (k > 0) nodes[k - 1].classList.replace("on", "done");
        if (k >= nodes.length) {
          clearInterval(iv);
          running = false;
          go.textContent = t.again;
          return;
        }
        nodes[k].classList.add("on");
        k++;
      }, 550);
    };
  }

  /* ─────────────── 6. context window ─────────────── */

  function contextWindow(root, t) {
    var used = 0, max = 100;
    var bar = el("div", "d-bar");
    var bMsg = btn(t.addMsg), bFile = btn(t.addFile), bSum = btn(t.summarise, "primary"), bR = btn(t.reset);
    [bMsg, bFile, bSum, bR].forEach(function (b) { bar.appendChild(b); });
    var meter = el("div", "d-meter", "<i></i>");
    var label = el("div", "d-note");
    root.appendChild(bar); root.appendChild(meter); root.appendChild(label);

    function draw() {
      used = Math.min(used, max);
      var pct = Math.round(used / max * 100);
      var fill = meter.querySelector("i");
      fill.style.width = pct + "%";
      fill.className = pct >= 100 ? "danger" : (pct >= 80 ? "warn" : "");
      label.innerHTML = "<b>" + pct + " %</b> " + esc(t.used) + " &middot; " +
        esc(pct >= 100 ? t.full : (pct >= 80 ? t.warn : t.ok));
    }
    bMsg.onclick = function () { used += 6; draw(); };
    bFile.onclick = function () { used += 22; draw(); };
    bSum.onclick = function () { used = Math.min(used, 12); draw(); };
    bR.onclick = function () { used = 0; draw(); };
    draw();
  }

  /* ─────────────── 7. stevec tokenov ─────────────── */

  function tokens(root, t) {
    /* Groba priblizna delitev: pogoste kratke besede ostanejo cele,
       daljse in besede s sumniki se razbijejo na kose po ~4 znake. */
    function split(text) {
      var out = [];
      (text.match(/\s*[^\s]+|\s+/g) || []).forEach(function (w) {
        var core = w.trim();
        if (!core) return;
        var lead = w.slice(0, w.length - w.trimStart().length);
        var plain = /^[a-zA-Z]+$/.test(core);
        if (plain && core.length <= 7) { out.push(lead + core); return; }
        var size = plain ? 5 : 3;
        for (var i = 0; i < core.length; i += size) {
          out.push((i === 0 ? lead : "") + core.slice(i, i + size));
        }
      });
      return out;
    }

    var bar = el("div", "d-bar");
    var bSl = btn(t.slLabel), bEn = btn(t.enLabel);
    bar.appendChild(bSl); bar.appendChild(bEn);
    var ta = el("textarea", "d-input tall");
    ta.spellcheck = false;
    var view = el("div", "d-tokens");
    var stat = el("div", "d-note");
    var warn = el("p", "d-note small", esc(t.tokensApprox));
    root.appendChild(bar); root.appendChild(ta); root.appendChild(view);
    root.appendChild(stat); root.appendChild(warn);

    function draw() {
      var text = ta.value;
      var parts = split(text);
      view.innerHTML = parts.map(function (p, k) {
        return '<span class="d-tok t' + (k % 4) + '">' + esc(p).replace(/ /g, "&nbsp;") + "</span>";
      }).join("");
      var chars = text.length;
      var n = parts.length || 1;
      stat.innerHTML = "<b>" + parts.length + "</b> " + esc(t.tokensCount) + " &middot; " +
        chars + " " + esc(t.chars) + " &middot; " + (chars / n).toFixed(1) + " " + esc(t.perToken);
    }
    bSl.onclick = function () { ta.value = t.sampleSl; draw(); };
    bEn.onclick = function () { ta.value = t.sampleEn; draw(); };
    ta.addEventListener("input", draw);
    ta.value = t.sampleSl;
    draw();
  }

  var DEMOS = {
    loop: loop, textBinary: textBinary, fourShapes: fourShapes,
    urlParts: urlParts, clickToDb: clickToDb,
    contextWindow: contextWindow, tokens: tokens
  };

  window.DEMOS = {
    forId: function (id) { return FOR_ID[id] || null; },
    has: function (name) { return !!DEMOS[name]; },
    mount: function (name, lang) {
      if (!DEMOS[name]) return null;
      var box = el("div", "demo");
      try {
        DEMOS[name](box, L[lang] || L.sl);
      } catch (e) {
        box.textContent = "";
      }
      return box;
    }
  };
})();
