
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"N","mon":"P","tue":"U","wed":"S","thu":"Č","fri":"P","sat":"S"},"wideDayNames":{"sun":"nedjelja","mon":"ponedjeljak","tue":"utorak","wed":"srijeda","thu":"četvrtak","fri":"petak","sat":"subota"}};