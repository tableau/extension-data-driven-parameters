
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"Н","mon":"П","tue":"В","wed":"С","thu":"Ч","fri":"П","sat":"С"},"wideDayNames":{"sun":"неділя","mon":"понеділок","tue":"вівторок","wed":"середа","thu":"четвер","fri":"пʼятниця","sat":"субота"}};