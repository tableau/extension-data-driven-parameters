
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":false,"narrowDayNames":{"sun":"D","mon":"H","tue":"M","wed":"M","thu":"E","fri":"P","sat":"S"},"wideDayNames":{"sun":"e diel","mon":"e hënë","tue":"e martë","wed":"e mërkurë","thu":"e enjte","fri":"e premte","sat":"e shtunë"}};