//get GET Params
$.extend({getUrlVars:function(){for(var b,a=[],c=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),d=0;d<c.length;d++)b=c[d].split("="),a.push(b[0]),a[b[0]]=b[1];return a},getUrlVar:function(a){return $.getUrlVars()[a]}});
//hash function
String.prototype.hashCode=function(){var b,c,d,a=0;if(0==this.length)return a;for(b=0,d=this.length;d>b;b++)c=this.charCodeAt(b),a=(a<<5)-a+c,a|=0;return a};


//find in array function
var sagashi = function(array, p1, p2) {
	if (p2){
		var attr = p1;
		var value = p2;
	    for(var i = 0; i < array.length; i += 1) {
	        if(array[i][attr] === value) {
	            return i;
	        }
	    }
	}
	else {
	    for(var i = 0; i < array.length; i += 1) {
	        if(array[i] === value) {
	            return i;
	        }
	    }
	}
}

/**
 * DEVELOPED BY
 * GIL LOPES BUENO
 * gilbueno.mail@gmail.com
 *
 * WORKS WITH:
 * IE 9+, FF 4+, SF 5+, WebKit, CH 7+, OP 12+, BESEN, Rhino 1.7+
 *
 * FORK:
 * https://github.com/melanke/Watch.JS
 */

"use strict";!function(a){"object"==typeof exports?module.exports=a():"function"==typeof define&&define.amd?define(a):(window.WatchJS=a(),window.watch=window.WatchJS.watch,window.unwatch=window.WatchJS.unwatch,window.callWatchers=window.WatchJS.callWatchers)}(function(){var a={noMore:!1},b=[],c=function(a){var b={};return a&&"[object Function]"==b.toString.call(a)},e=function(a){return"[object Array]"===Object.prototype.toString.call(a)},f=function(a,b){var c=[],d=[];if("string"!=typeof a&&"string"!=typeof b){if(e(a))for(var f=0;f<a.length;f++)void 0===b[f]&&c.push(f);else for(var f in a)a.hasOwnProperty(f)&&void 0===b[f]&&c.push(f);if(e(b))for(var g=0;g<b.length;g++)void 0===a[g]&&d.push(g);else for(var g in b)b.hasOwnProperty(g)&&void 0===a[g]&&d.push(g)}return{added:c,removed:d}},g=function(a){if(null==a||"object"!=typeof a)return a;var b=a.constructor();for(var c in a)b[c]=a[c];return b},h=function(a,b,c,d){try{Object.observe(a[b],function(a){d(a)})}catch(e){try{Object.defineProperty(a,b,{get:c,set:d,enumerable:!0,configurable:!0})}catch(f){try{Object.prototype.__defineGetter__.call(a,b,c),Object.prototype.__defineSetter__.call(a,b,d)}catch(g){throw new Error("watchJS error: browser not supported :/")}}}},i=function(a,b,c){try{Object.defineProperty(a,b,{enumerable:!1,configurable:!0,writable:!1,value:c})}catch(d){a[b]=c}},j=function(){c(arguments[1])?k.apply(this,arguments):e(arguments[1])?l.apply(this,arguments):m.apply(this,arguments)},k=function(a,b,c,d){if("string"!=typeof a&&(a instanceof Object||e(a))){var f=[];if(e(a))for(var g=0;g<a.length;g++)f.push(g);else for(var h in a)a.hasOwnProperty(h)&&f.push(h);l(a,f,b,c,d),d&&x(a,"$$watchlengthsubjectroot",b,c)}},l=function(a,b,c,d,f){if("string"!=typeof a&&(a instanceof Object||e(a)))for(var g=0;g<b.length;g++){var h=b[g];m(a,h,c,d,f)}},m=function(a,b,d,f,g){"string"!=typeof a&&(a instanceof Object||e(a))&&(c(a[b])||(null!=a[b]&&(void 0===f||f>0)&&k(a[b],d,void 0!==f?f-1:f),q(a,b,d,f),g&&(void 0===f||f>0)&&x(a,b,d,f)))},n=function(){c(arguments[1])?o.apply(this,arguments):e(arguments[1])?p.apply(this,arguments):v.apply(this,arguments)},o=function(a,b){if(!(a instanceof String)&&(a instanceof Object||e(a)))if(e(a)){for(var c=[],d=0;d<a.length;d++)c.push(d);p(a,c,b)}else{var f=function(a){var c=[];for(var d in a)a.hasOwnProperty(d)&&(a[d]instanceof Object?f(a[d]):c.push(d));p(a,c,b)};f(a)}},p=function(a,b,c){for(var d in b)b.hasOwnProperty(d)&&v(a,b[d],c)},q=function(b,c,d,e){var f=b[c];u(b,c),b.watchers||i(b,"watchers",{}),b.watchers[c]||(b.watchers[c]=[]);for(var g=0;g<b.watchers[c].length;g++)if(b.watchers[c][g]===d)return;b.watchers[c].push(d);var j=function(){return f},l=function(g){var h=f;f=g,0!==e&&b[c]&&k(b[c],d,void 0===e?e:e-1),u(b,c),a.noMore||h!==g&&(r(b,c,"set",g,h),a.noMore=!1)};h(b,c,j,l)},r=function(a,b,c,d,e){if(void 0!==b)for(var f=0;f<a.watchers[b].length;f++)a.watchers[b][f].call(a,b,c,d,e);else for(var b in a)a.hasOwnProperty(b)&&r(a,b,c,d,e)},s=["pop","push","reverse","shift","sort","slice","unshift","splice"],t=function(a,b,c,d){i(a[b],d,function(){var e=c.apply(a[b],arguments);return m(a,a[b]),"slice"!==d&&r(a,b,d,arguments),e})},u=function(a,b){if(a[b]&&!(a[b]instanceof String)&&e(a[b]))for(var d,c=s.length;c--;)d=s[c],t(a,b,a[b][d],d)},v=function(a,b,c){for(var d=0;d<a.watchers[b].length;d++){var e=a.watchers[b][d];e==c&&a.watchers[b].splice(d,1)}y(a,b,c)},w=function(){for(var a=0;a<b.length;a++){var c=b[a];if("$$watchlengthsubjectroot"===c.prop){var d=f(c.obj,c.actual);(d.added.length||d.removed.length)&&(d.added.length&&l(c.obj,d.added,c.watcher,c.level-1,!0),c.watcher.call(c.obj,"root","differentattr",d,c.actual)),c.actual=g(c.obj)}else{var d=f(c.obj[c.prop],c.actual);if(d.added.length||d.removed.length){if(d.added.length)for(var e=0;e<c.obj.watchers[c.prop].length;e++)l(c.obj[c.prop],d.added,c.obj.watchers[c.prop][e],c.level-1,!0);r(c.obj,c.prop,"differentattr",d,c.actual)}c.actual=g(c.obj[c.prop])}}},x=function(a,c,d,e){var f;f="$$watchlengthsubjectroot"===c?g(a):g(a[c]),b.push({obj:a,prop:c,actual:f,watcher:d,level:e})},y=function(a,c,d){for(var e=0;e<b.length;e++){var f=b[e];f.obj==a&&f.prop==c&&f.watcher==d&&b.splice(e,1)}};return setInterval(w,50),a.watch=j,a.unwatch=n,a.callWatchers=r,a});