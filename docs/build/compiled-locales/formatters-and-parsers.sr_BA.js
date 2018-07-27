
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"н","mon":"п","tue":"у","wed":"с","thu":"ч","fri":"п","sat":"с"},"wideDayNames":{"sun":"недјеља","mon":"понедељак","tue":"уторак","wed":"сриједа","thu":"четвртак","fri":"петак","sat":"субота"}};