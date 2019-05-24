
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"A","mon":"I","tue":"S","wed":"R","thu":"K","fri":"J","sat":"S"},"wideDayNames":{"sun":"Ahad","mon":"Isnin","tue":"Selasa","wed":"Rabu","thu":"Khamis","fri":"Jumaat","sat":"Sabtu"}};