
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"н","mon":"п","tue":"а","wed":"с","thu":"ч","fri":"п","sat":"с"},"wideDayNames":{"sun":"нядзеля","mon":"панядзелак","tue":"аўторак","wed":"серада","thu":"чацвер","fri":"пятніца","sat":"субота"}};