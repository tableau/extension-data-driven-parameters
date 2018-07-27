
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"M","mon":"S","tue":"S","wed":"R","thu":"K","fri":"J","sat":"S"},"wideDayNames":{"sun":"Minggu","mon":"Senin","tue":"Selasa","wed":"Rabu","thu":"Kamis","fri":"Jumat","sat":"Sabtu"}};