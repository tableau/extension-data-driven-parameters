
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"D","mon":"L","tue":"M","wed":"X","thu":"J","fri":"V","sat":"S"},"wideDayNames":{"sun":"domingo","mon":"lunes","tue":"martes","wed":"miércoles","thu":"jueves","fri":"viernes","sat":"sábado"}};