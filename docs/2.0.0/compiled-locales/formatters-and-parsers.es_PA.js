
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"d","mon":"l","tue":"m","wed":"m","thu":"j","fri":"v","sat":"s"},"wideDayNames":{"sun":"domingo","mon":"lunes","tue":"martes","wed":"miércoles","thu":"jueves","fri":"viernes","sat":"sábado"}};