
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"S","mon":"M","tue":"T","wed":"W","thu":"T","fri":"F","sat":"S"},"wideDayNames":{"sun":"Sunday","mon":"Monday","tue":"Tuesday","wed":"Wednesday","thu":"Thursday","fri":"Friday","sat":"Saturday"}};