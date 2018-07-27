
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"sun","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"อา","mon":"จ","tue":"อ","wed":"พ","thu":"พฤ","fri":"ศ","sat":"ส"},"wideDayNames":{"sun":"วันอาทิตย์","mon":"วันจันทร์","tue":"วันอังคาร","wed":"วันพุธ","thu":"วันพฤหัสบดี","fri":"วันศุกร์","sat":"วันเสาร์"}};