
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"일","mon":"월","tue":"화","wed":"수","thu":"목","fri":"금","sat":"토"},"wideDayNames":{"sun":"일요일","mon":"월요일","tue":"화요일","wed":"수요일","thu":"목요일","fri":"금요일","sat":"토요일"}};