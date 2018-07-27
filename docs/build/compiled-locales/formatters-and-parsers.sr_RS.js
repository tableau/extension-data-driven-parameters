
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"н","mon":"п","tue":"у","wed":"с","thu":"ч","fri":"п","sat":"с"},"wideDayNames":{"sun":"недеља","mon":"понедељак","tue":"уторак","wed":"среда","thu":"четвртак","fri":"петак","sat":"субота"}};