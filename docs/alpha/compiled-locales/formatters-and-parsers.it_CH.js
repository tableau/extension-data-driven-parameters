
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"D","mon":"L","tue":"M","wed":"M","thu":"G","fri":"V","sat":"S"},"wideDayNames":{"sun":"domenica","mon":"lunedì","tue":"martedì","wed":"mercoledì","thu":"giovedì","fri":"venerdì","sat":"sabato"}};