
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"Su.","mon":"M.","tue":"Tu.","wed":"W.","thu":"Th.","fri":"F.","sat":"Sa."},"wideDayNames":{"sun":"Sunday","mon":"Monday","tue":"Tuesday","wed":"Wednesday","thu":"Thursday","fri":"Friday","sat":"Saturday"}};