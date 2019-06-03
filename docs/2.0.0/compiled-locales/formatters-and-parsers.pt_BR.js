
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"D","mon":"S","tue":"T","wed":"Q","thu":"Q","fri":"S","sat":"S"},"wideDayNames":{"sun":"domingo","mon":"segunda-feira","tue":"terça-feira","wed":"quarta-feira","thu":"quinta-feira","fri":"sexta-feira","sat":"sábado"}};