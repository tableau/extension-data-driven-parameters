
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"N","mon":"P","tue":"Ú","wed":"S","thu":"Č","fri":"P","sat":"S"},"wideDayNames":{"sun":"neděle","mon":"pondělí","tue":"úterý","wed":"středa","thu":"čtvrtek","fri":"pátek","sat":"sobota"}};