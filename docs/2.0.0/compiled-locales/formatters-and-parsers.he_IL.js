
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"א׳","mon":"ב׳","tue":"ג׳","wed":"ד׳","thu":"ה׳","fri":"ו׳","sat":"ש׳"},"wideDayNames":{"sun":"יום ראשון","mon":"יום שני","tue":"יום שלישי","wed":"יום רביעי","thu":"יום חמישי","fri":"יום שישי","sat":"יום שבת"}};