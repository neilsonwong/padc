//get GET Params
$.extend({getUrlVars:function(){for(var b,a=[],c=window.location.href.slice(window.location.href.indexOf("?")+1).split("&"),d=0;d<c.length;d++)b=c[d].split("="),a.push(b[0]),a[b[0]]=b[1];return a},getUrlVar:function(a){return $.getUrlVars()[a]}});
//hash function
String.prototype.hashCode=function(){var b,c,d,a=0;if(0==this.length)return a;for(b=0,d=this.length;d>b;b++)c=this.charCodeAt(b),a=(a<<5)-a+c,a|=0;return a};



/* object.watch polyfill
 * 2012-04-03
 * By Eli Grey, http://eligrey.com
 * Public Domain. NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK. */
if(!Object.prototype.watch){Object.defineProperty(Object.prototype,"watch",{enumerable:false,configurable:true,writable:false,value:function(e,t){var n=this[e],r=n,i=function(){return r},s=function(i){n=r;return r=t.call(this,e,n,i)};if(delete this[e]){Object.defineProperty(this,e,{get:i,set:s,enumerable:true,configurable:true})}}})}if(!Object.prototype.unwatch){Object.defineProperty(Object.prototype,"unwatch",{enumerable:false,configurable:true,writable:false,value:function(e){var t=this[e];delete this[e];this[e]=t}})}