
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"D","mon":"L","tue":"M","wed":"C","thu":"D","fri":"A","sat":"S"},"wideDayNames":{"sun":"Dé Domhnaigh","mon":"Dé Luain","tue":"Dé Máirt","wed":"Dé Céadaoin","thu":"Déardaoin","fri":"Dé hAoine","sat":"Dé Sathairn"}};