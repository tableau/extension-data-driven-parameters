
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"Κ","mon":"Δ","tue":"Τ","wed":"Τ","thu":"Π","fri":"Π","sat":"Σ"},"wideDayNames":{"sun":"Κυριακή","mon":"Δευτέρα","tue":"Τρίτη","wed":"Τετάρτη","thu":"Πέμπτη","fri":"Παρασκευή","sat":"Σάββατο"}};