
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"S","mon":"P","tue":"A","wed":"T","thu":"K","fri":"P","sat":"Š"},"wideDayNames":{"sun":"sekmadienis","mon":"pirmadienis","tue":"antradienis","wed":"trečiadienis","thu":"ketvirtadienis","fri":"penktadienis","sat":"šeštadienis"}};