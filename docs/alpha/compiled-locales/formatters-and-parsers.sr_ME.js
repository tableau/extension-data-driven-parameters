
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"n","mon":"p","tue":"u","wed":"s","thu":"č","fri":"p","sat":"s"},"wideDayNames":{"sun":"nedjelja","mon":"ponedeljak","tue":"utorak","wed":"srijeda","thu":"četvrtak","fri":"petak","sat":"subota"}};