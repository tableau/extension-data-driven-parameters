
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"S","mon":"M","tue":"T","wed":"O","thu":"T","fri":"F","sat":"L"},"wideDayNames":{"sun":"søndag","mon":"mandag","tue":"tirsdag","wed":"onsdag","thu":"torsdag","fri":"fredag","sat":"lørdag"}};