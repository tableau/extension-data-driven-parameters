
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"н","mon":"п","tue":"в","wed":"с","thu":"ч","fri":"п","sat":"с"},"wideDayNames":{"sun":"недела","mon":"понеделник","tue":"вторник","wed":"среда","thu":"четврток","fri":"петок","sat":"сабота"}};