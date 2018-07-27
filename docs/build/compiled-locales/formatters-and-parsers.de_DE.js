
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"S","mon":"M","tue":"D","wed":"M","thu":"D","fri":"F","sat":"S"},"wideDayNames":{"sun":"Sonntag","mon":"Montag","tue":"Dienstag","wed":"Mittwoch","thu":"Donnerstag","fri":"Freitag","sat":"Samstag"}};