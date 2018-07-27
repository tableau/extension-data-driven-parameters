
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"n","mon":"p","tue":"w","wed":"ś","thu":"c","fri":"p","sat":"s"},"wideDayNames":{"sun":"niedziela","mon":"poniedziałek","tue":"wtorek","wed":"środa","thu":"czwartek","fri":"piątek","sat":"sobota"}};