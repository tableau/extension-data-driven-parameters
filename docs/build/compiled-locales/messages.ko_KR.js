
/*!
 * Globalize v1.3.0-tableau.0 2017-08-07T16:33Z Released under the MIT license
 * http://git.io/TrdQbw
 */
"undefined"!=typeof process&&"node"===process.release.name?global.localizeGlobalNamespace=global:window.localizeGlobalNamespace=window,function(a,b){a.TabGlobalize=b()}(localizeGlobalNamespace,function(){function a(b){if(!(this instanceof a))return new a(b);i(b,"locale"),k(b,"locale"),this._locale=b}var b=function(a){return"string"==typeof a?a:"number"==typeof a?""+a:JSON.stringify(a)},c=function(a,c){return a=a.replace(/{[0-9a-zA-Z-_. ]+}/g,function(a){return a=a.replace(/^{([^}]*)}$/,"$1"),b(c[a])})},d=function(){var a=arguments[0];return[].slice.call(arguments,1).forEach(function(b){var c;for(c in b)a[c]=b[c]}),a},e=function(a,b,e){var f;return b=a+(b?": "+c(b,e):""),f=new Error(b),f.code=a,d(f,e),f},f=function(a){return[].reduce.call(a,function(a,b){return 0|(a=(a<<5)-a+b.charCodeAt(0))},0)},g=function(a,b,c,d){var e;return d=d||JSON.stringify(c),e=f(a+b+d),e>0?"a"+e:"b"+Math.abs(e)},h=function(a,b,c,d){if(!c)throw e(a,b,d)},i=function(a,b){h("E_MISSING_PARAMETER","Missing required parameter `{name}`.",void 0!==a,{name:b})},j=function(a,b,c,d){h("E_INVALID_PAR_TYPE","Invalid `{name}` parameter ({value}). {expected} expected.",c,{expected:d,name:b,value:a})},k=function(a,b){j(a,b,void 0===a||"string"==typeof a,"a string")},l=function(a){return a.replace(/([.*+?^=!:${}()|\[\]\/\\])/g,"\\$1")},m=function(a,b,c){var d;for("string"!=typeof a&&(a=String(a)),d=a.length;d<b;d+=1)a=c?a+"0":"0"+a;return a};return a.locale=function(a){return k(a,"locale"),arguments.length&&(this._locale=a),this._locale},a._createError=e,a._formatMessage=c,a._regexpEscape=l,a._runtimeKey=g,a._stringPad=m,a._validateParameterPresence=i,a._validateParameterTypeString=k,a._validateParameterType=j,a}),function(a,b){b(a.TabGlobalize)}(localizeGlobalNamespace,function(a){var b=a._runtimeKey,c=a._validateParameterType,d=function(a){return null!==a&&""+a=="[object Object]"},e=function(a,b){c(a,b,void 0===a||d(a)||Array.isArray(a),"Array or Plain Object")},f=function(a){return function(b){return"number"!=typeof b&&"string"!=typeof b||(b=[].slice.call(arguments,0)),e(b,"variables"),a(b)}};return a._messageFormatterFn=f,a._messageFormat=function(){return{number:function(a,b){if(isNaN(a))throw new Error("'"+a+"' isn't a number.");return a-(b||0)},plural:function(a,b,c,d,e){if({}.hasOwnProperty.call(d,a))return d[a]();b&&(a-=b);var f=c(a,e);return f in d?d[f]():d.other()},select:function(a,b){return{}.hasOwnProperty.call(b,a)?b[a]():b.other()}}}(),a._validateParameterTypeMessageVariables=e,a.messageFormatter=a.prototype.messageFormatter=function(){return a[b("messageFormatter",this._locale,[].slice.call(arguments,0))]},a.formatMessage=a.prototype.formatMessage=function(a){return this.messageFormatter(a).apply({},[].slice.call(arguments,1))},a}),function(a,b){b(a.TabGlobalize)}(localizeGlobalNamespace,function(a){var b=a._runtimeKey,c=a._validateParameterPresence,d=a._validateParameterType,e=function(a,b){d(a,b,void 0===a||"number"==typeof a,"Number")},f=function(a){return function(b){return c(b,"value"),e(b,"value"),a(b)}};return a._pluralGeneratorFn=f,a._validateParameterTypeNumber=e,a.plural=a.prototype.plural=function(a,b){return c(a,"value"),e(a,"value"),this.pluralGenerator(b)(a)},a.pluralGenerator=a.prototype.pluralGenerator=function(c){return c=c||{},a[b("pluralGenerator",this._locale,[c])]},a});
(function( root, factory ) {
  root.Localize = root.Localize || {};
  root.Localize.msg = new root.TabGlobalize('ko');
  factory( root.TabGlobalize, root.Localize );
  if (root.Localize.initFormattersAndParsers) {
    root.Localize.initFormattersAndParsers();
  }
}(localizeGlobalNamespace, function( Globalize ) {
var validateParameterTypeNumber = Globalize._validateParameterTypeNumber;
var validateParameterPresence = Globalize._validateParameterPresence;
var pluralGeneratorFn = Globalize._pluralGeneratorFn;
var validateParameterTypeMessageVariables = Globalize._validateParameterTypeMessageVariables;
var messageFormat = Globalize._messageFormat;
var messageFormatterFn = Globalize._messageFormatterFn;

Globalize.a1835044563 = pluralGeneratorFn(function(n
/*``*/) {
  return 'other';
});
Globalize.a284995171 = messageFormatterFn((function(  ) {
  return function (d) { return "닫기"; }
})(), Globalize("ko").pluralGenerator({}));
Globalize.a1202311115 = messageFormatterFn((function(  ) {
  return function (d) { return "대화 상자 닫기"; }
})(), Globalize("ko").pluralGenerator({}));
Globalize.b2143774627 = messageFormatterFn((function(  ) {
  return function (d) { return "사용자 지정 색상"; }
})(), Globalize("ko").pluralGenerator({}));
Globalize.b657135042 = messageFormatterFn((function(  ) {
  return function (d) { return "감소"; }
})(), Globalize("ko").pluralGenerator({}));
Globalize.a1474388506 = messageFormatterFn((function(  ) {
  return function (d) { return "증가"; }
})(), Globalize("ko").pluralGenerator({}));
Globalize.a2062145797 = messageFormatterFn((function(  ) {
  return function (d) { return "대기 표시기"; }
})(), Globalize("ko").pluralGenerator({}));
}));
