
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"S","mon":"P","tue":"O","wed":"T","thu":"C","fri":"P","sat":"S"},"wideDayNames":{"sun":"svētdiena","mon":"pirmdiena","tue":"otrdiena","wed":"trešdiena","thu":"ceturtdiena","fri":"piektdiena","sat":"sestdiena"}};