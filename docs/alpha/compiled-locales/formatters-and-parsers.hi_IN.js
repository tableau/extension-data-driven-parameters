
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"र","mon":"सो","tue":"मं","wed":"बु","thu":"गु","fri":"शु","sat":"श"},"wideDayNames":{"sun":"रविवार","mon":"सोमवार","tue":"मंगलवार","wed":"बुधवार","thu":"गुरुवार","fri":"शुक्रवार","sat":"शनिवार"}};