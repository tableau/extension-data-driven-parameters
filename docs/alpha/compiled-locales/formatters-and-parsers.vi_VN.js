
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"CN","mon":"T2","tue":"T3","wed":"T4","thu":"T5","fri":"T6","sat":"T7"},"wideDayNames":{"sun":"Chủ Nhật","mon":"Thứ Hai","tue":"Thứ Ba","wed":"Thứ Tư","thu":"Thứ Năm","fri":"Thứ Sáu","sat":"Thứ Bảy"}};