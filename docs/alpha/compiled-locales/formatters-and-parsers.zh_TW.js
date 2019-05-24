
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"日","mon":"一","tue":"二","wed":"三","thu":"四","fri":"五","sat":"六"},"wideDayNames":{"sun":"星期日","mon":"星期一","tue":"星期二","wed":"星期三","thu":"星期四","fri":"星期五","sat":"星期六"}};