
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"V","mon":"H","tue":"K","wed":"Sz","thu":"Cs","fri":"P","sat":"Sz"},"wideDayNames":{"sun":"vasárnap","mon":"hétfő","tue":"kedd","wed":"szerda","thu":"csütörtök","fri":"péntek","sat":"szombat"}};