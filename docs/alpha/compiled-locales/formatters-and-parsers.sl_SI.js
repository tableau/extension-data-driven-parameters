
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"n","mon":"p","tue":"t","wed":"s","thu":"č","fri":"p","sat":"s"},"wideDayNames":{"sun":"nedelja","mon":"ponedeljek","tue":"torek","wed":"sreda","thu":"četrtek","fri":"petek","sat":"sobota"}};