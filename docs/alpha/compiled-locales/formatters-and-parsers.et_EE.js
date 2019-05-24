
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"P","mon":"E","tue":"T","wed":"K","thu":"N","fri":"R","sat":"L"},"wideDayNames":{"sun":"pühapäev","mon":"esmaspäev","tue":"teisipäev","wed":"kolmapäev","thu":"neljapäev","fri":"reede","sat":"laupäev"}};