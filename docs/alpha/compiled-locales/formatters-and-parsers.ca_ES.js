
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"dg","mon":"dl","tue":"dt","wed":"dc","thu":"dj","fri":"dv","sat":"ds"},"wideDayNames":{"sun":"diumenge","mon":"dilluns","tue":"dimarts","wed":"dimecres","thu":"dijous","fri":"divendres","sat":"dissabte"}};