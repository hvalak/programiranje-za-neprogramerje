/* Jezik vmesnika. Vsebina je v content/content-*.js — tukaj so samo gumbi in oznake. */

window.UI = {
  sl: {
    title: "Programiranje za neprogramerje",
    subtitle: "Kaj moraš razumeti, da lahko gradiš z AI agenti",
    viewHandbook: "Priročnik",
    viewSlides: "Predstavitev",
    license: "CC BY-SA 4.0",
    deeper: "Rad bi izvedel več",
    output: "Izpis",
    copy: "Kopiraj",
    copied: "Kopirano",
    done: "modul predelan",
    core: "jedro",
    module: "Modul",
    sources: "Več o tem",
    mapTitle: "Zemljevid gradiva",
    mapCenter1: "Programiranje",
    mapCenter2: "za neprogramerje",
    mapModules: "modulov",
    mapBack: "nazaj",
    mapSoon: "Vsebina tega modula še nastaja.",
    mapHint: "Klikni modul, da se odpre. Pikčaste črte povezujejo sorodne teme.",
    mapHintIn: "Klikni pojem, da skočiš nanj. Klikni sredino za nazaj.",
    contents: "Kazalo",
    glossary: "Slovarček",
    glossaryIntro: "Vsi pojmi po abecedi, slovensko ↔ angleško.",
    searchPh: "Išči pojem, tudi po angleškem izrazu…",
    noResults: "Ni zadetkov.",
    coreOnly: "samo jedro",
    showAll: "vse",
    elapsed: "Seja",
    onSlide: "Na slajdu",
    nextSlide: "Naslednji",
    notesTitle: "Opombe",
    theEnd: "Konec",
    presenterOff: "Predavateljskega okna ni bilo mogoče odpreti (brskalnik je blokiral novo okno).",
    helpTitle: "Tipke",
    close: "Zapri",
    keys: [
      ["→ / preslednica", "naprej"],
      ["←", "nazaj"],
      ["F", "cel zaslon"],
      ["B", "črn zaslon"],
      ["O", "pregled vseh slajdov"],
      ["P", "predavateljsko okno"],
      ["/", "iskanje"],
      ["?", "ta pomoč"]
    ],
    minutes: "min"
  },
  en: {
    title: "Programming for Non-Programmers",
    subtitle: "What you need to understand to build with AI agents",
    viewHandbook: "Handbook",
    viewSlides: "Presentation",
    license: "CC BY-SA 4.0",
    deeper: "I'd like to know more",
    output: "Output",
    copy: "Copy",
    copied: "Copied",
    done: "module done",
    core: "core",
    module: "Module",
    sources: "More on this",
    mapTitle: "Map of the material",
    mapCenter1: "Programming for",
    mapCenter2: "Non-Programmers",
    mapModules: "modules",
    mapBack: "back",
    mapSoon: "This module is still being written.",
    mapHint: "Click a module to open it. Dotted lines connect related topics.",
    mapHintIn: "Click a concept to jump to it. Click the centre to go back.",
    contents: "Contents",
    glossary: "Glossary",
    glossaryIntro: "Every term in alphabetical order, English ↔ Slovene.",
    searchPh: "Search a concept…",
    noResults: "Nothing found.",
    coreOnly: "core only",
    showAll: "all",
    elapsed: "Session",
    onSlide: "On slide",
    nextSlide: "Next",
    notesTitle: "Notes",
    theEnd: "The end",
    presenterOff: "The presenter window could not be opened (the browser blocked the pop-up).",
    helpTitle: "Keyboard",
    close: "Close",
    keys: [
      ["→ / space", "next"],
      ["←", "back"],
      ["F", "full screen"],
      ["B", "black screen"],
      ["O", "overview of all slides"],
      ["P", "presenter window"],
      ["/", "search"],
      ["?", "this help"]
    ],
    minutes: "min"
  }
};

window.I18N = (function () {
  var KEY = "pzn.lang";

  function detect() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q === "sl" || q === "en") return q;
    try {
      var s = localStorage.getItem(KEY);
      if (s === "sl" || s === "en") return s;
    } catch (e) { /* zasebni način */ }
    return "sl";
  }

  var lang = detect();

  return {
    get: function () { return lang; },
    ui: function () { return window.UI[lang]; },
    set: function (l) {
      if (l !== "sl" && l !== "en") return;
      lang = l;
      try { localStorage.setItem(KEY, l); } catch (e) {}
      var url = new URL(location.href);
      url.searchParams.set("lang", l);
      history.replaceState(null, "", url);
      document.documentElement.lang = l;
    }
  };
})();
