
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"вс","mon":"пн","tue":"вт","wed":"ср","thu":"чт","fri":"пт","sat":"сб"},"wideDayNames":{"sun":"воскресенье","mon":"понедельник","tue":"вторник","wed":"среда","thu":"четверг","fri":"пятница","sat":"суббота"}};