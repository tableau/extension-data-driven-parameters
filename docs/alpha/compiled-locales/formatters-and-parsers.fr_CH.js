
if ("undefined" != typeof process && "node" === process.release.name) {
  global.localizeGlobalNamespace = global;
} else {
  window.localizeGlobalNamespace = window;
}
localizeGlobalNamespace.Localize = localizeGlobalNamespace.Localize || {};
localizeGlobalNamespace.Localize.localeData = {"firstDayOfWeek":"mon","prefer24HourTimeCycle":true,"narrowDayNames":{"sun":"D","mon":"L","tue":"M","wed":"M","thu":"J","fri":"V","sat":"S"},"wideDayNames":{"sun":"dimanche","mon":"lundi","tue":"mardi","wed":"mercredi","thu":"jeudi","fri":"vendredi","sat":"samedi"}};