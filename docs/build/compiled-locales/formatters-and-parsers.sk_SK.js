
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"n","mon":"p","tue":"u","wed":"s","thu":"š","fri":"p","sat":"s"},"wideDayNames":{"sun":"nedeľa","mon":"pondelok","tue":"utorok","wed":"streda","thu":"štvrtok","fri":"piatok","sat":"sobota"}};