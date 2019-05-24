
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"日","mon":"月","tue":"火","wed":"水","thu":"木","fri":"金","sat":"土"},"wideDayNames":{"sun":"日曜日","mon":"月曜日","tue":"火曜日","wed":"水曜日","thu":"木曜日","fri":"金曜日","sat":"土曜日"}};