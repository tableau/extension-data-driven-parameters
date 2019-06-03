
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"Z","mon":"M","tue":"D","wed":"W","thu":"D","fri":"V","sat":"Z"},"wideDayNames":{"sun":"zondag","mon":"maandag","tue":"dinsdag","wed":"woensdag","thu":"donderdag","fri":"vrijdag","sat":"zaterdag"}};