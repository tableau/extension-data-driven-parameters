
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"P","mon":"P","tue":"S","wed":"Ç","thu":"P","fri":"C","sat":"C"},"wideDayNames":{"sun":"Pazar","mon":"Pazartesi","tue":"Salı","wed":"Çarşamba","thu":"Perşembe","fri":"Cuma","sat":"Cumartesi"}};