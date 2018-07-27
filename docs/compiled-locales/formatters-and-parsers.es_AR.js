
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"D","mon":"L","tue":"M","wed":"M","thu":"J","fri":"V","sat":"S"},"wideDayNames":{"sun":"domingo","mon":"lunes","tue":"martes","wed":"miércoles","thu":"jueves","fri":"viernes","sat":"sábado"}};