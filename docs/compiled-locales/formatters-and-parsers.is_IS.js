
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"S","mon":"M","tue":"Þ","wed":"M","thu":"F","fri":"F","sat":"L"},"wideDayNames":{"sun":"sunnudagur","mon":"mánudagur","tue":"þriðjudagur","wed":"miðvikudagur","thu":"fimmtudagur","fri":"föstudagur","sat":"laugardagur"}};