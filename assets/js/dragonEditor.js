!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.dragonEditor=e():t.dragonEditor=e()}(window,(function(){return function(t){var e={};function n(o){if(e[o])return e[o].exports;var r=e[o]={i:o,l:!1,exports:{}};return t[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(o,r,function(e){return t[e]}.bind(null,r));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";function o(t,e){if("string"==typeof e){if(typeof t!=e)throw`invaild type ${t} : ${e}`}else if(!(t instanceof e))throw`invaild type ${t} : ${e}`;return t}function r(t,e){if("string"==typeof e){if(typeof t!=e)return!1}else if(!(t instanceof e))return!1;return!0}n.r(e),n.d(e,"typeCheckThrow",(function(){return o})),n.d(e,"typeCheckBoolean",(function(){return r}))},function(t,e,n){t.exports=n(2)},function(t,e,n){(function(e){const{typeCheckThrow:o}=n(0),{condition:r}=n(4),{makeView:i}=n(6);t.exports=class{constructor(t="",n={},u=o(t,"string"),c=o(n,"object")){return e.editorCondition=new r(t,n),i(),this}}}).call(this,n(3))},function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";n.r(e),n.d(e,"condition",(function(){return i}));const{typeCheckBoolean:o}=n(0),{checkElement:r}=n(5);class i{constructor(t,e){this.wrap=r(t,".editor-dragon",!1),this.setStatus(e),console.log(this.wrap)}setStatus(t){console.log(t)}}},function(t,e,n){"use strict";n.r(e),n.d(e,"getElement",(function(){return r})),n.d(e,"checkElement",(function(){return i}));const{typeCheckThrow:o}=n(0);function r(t,e=!0,n=o(t,"string"),r=o(e,"boolean")){return 1==e?document.querySelectorAll(t):document.querySelector(t)}function i(t="",e,n=!0,i=o(t,"string"),u=o(e,"string"),c=o(n,"boolean")){return r(0==(""!=t&&function(t,e=o(t,"string")){return null!==document.querySelector(t)}(t))?e:t,n)}},function(t,e,n){"use strict";function o(){console.log("make view")}n.r(e),n.d(e,"makeView",(function(){return o}))}])}));