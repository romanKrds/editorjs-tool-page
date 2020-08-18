!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Page=t():e.Page=t()}(window,(function(){return function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){function o(e){return function(e){if(Array.isArray(e))return i(e)}(e)||function(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function r(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function a(e,t,n){return t&&r(e.prototype,t),n&&r(e,n),e}n(1).toString();var l=function(){function e(t){var n=t.data,o=t.config,i=t.api;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.api=i,this._nodes={wrapper:null,container:null,input:null,inputHolder:null,content:null,contentHolder:null},this._CSS={baseClass:this.api.styles.block,input:this.api.styles.input,container:"page-tool",inputEl:"page-tool__input",inputHolder:"page-tool__input-holder",inputError:"page-tool__input-holder--error",contentEl:"page-tool__content",contentHolder:"page-tool__content-holder",linkText:"page-tool__anchor"},this._data={},this._placeholder=o.placeholder?o.placeholder:e.DEFAULT_PLACEHOLDER,this._preserveBlank=void 0!==o.preserveBlank&&o.preserveBlank,this.data=n}return a(e,null,[{key:"toolbox",get:function(){return{icon:n(5).default,title:"Nested page"}}},{key:"DEFAULT_PLACEHOLDER",get:function(){return'Set a page title and click the "Enter" button to create it'}}]),a(e,[{key:"makeInputHolder",value:function(){var e=this.make("div",this._CSS.inputHolder);return this._nodes.input=this.make("div",[this._CSS.input,this._CSS.inputEl],{contentEditable:!0}),this._nodes.input.dataset.placeholder=this.api.i18n.t(this._placeholder),this._nodes.input.addEventListener("keydown",this.handleEnterKeeDown.bind(this)),e.appendChild(this._nodes.input),e}},{key:"prepareLinkPreview",value:function(){var e=this.make("div",this._CSS.contentHolder);return this._nodes.content=this.make("a",[this._CSS.input,this._CSS.contentEl],{href:"javascript:void(0)"}),this._nodes.content.textContent=this.data.title||"Untitled page",e.appendChild(this._nodes.content),this._nodes.content.addEventListener("click",this.handleLinkClick.bind(this)),e}},{key:"handleEnterKeeDown",value:function(e){"Enter"===e.code&&this._nodes.input.textContent&&(this.data={isPageTitleCompleted:!0})}},{key:"handleLinkClick",value:function(){var e=this.api.blocks.getBlockByIndex(this.api.blocks.getCurrentBlockIndex()),t=new CustomEvent("pageToolClick",{bubbles:!0,detail:{serviceKey:e.holder.id}});e.holder.dispatchEvent(t)}},{key:"render",value:function(){return this._nodes.wrapper=this.make("div",this._CSS.baseClass),this._nodes.container=this.make("div",this._CSS.container),this.data.isPageTitleCompleted?(this._nodes.contentHolder=this.prepareLinkPreview(),this._nodes.container.appendChild(this._nodes.contentHolder)):(this._nodes.inputHolder=this.makeInputHolder(),this._nodes.container.appendChild(this._nodes.inputHolder)),this._nodes.wrapper.appendChild(this._nodes.container),this._nodes.wrapper}},{key:"validate",value:function(e){return!(""===e.title.trim()&&!this._preserveBlank)}},{key:"save",value:function(){var e,t={title:(this.data.title||(null===(e=this._nodes.input)||void 0===e?void 0:e.textContent)||"").trim(),isPageTitleCompleted:this.data.isPageTitleCompleted};return Object.keys(t).forEach((function(e){[void 0,!1].includes(t[e])&&delete t[e]})),t}},{key:"removed",value:function(){this._nodes.input&&this._nodes.input.removeEventListener("keydown",this.handleEnterKeeDown.bind(this)),this._nodes.content&&this._nodes.content.removeEventListener("click",this.handleLinkClick.bind(this))}},{key:"onPaste",value:function(e){this.data={title:e.detail.data.innerHTML}}},{key:"make",value:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=document.createElement(e);Array.isArray(n)?(t=r.classList).add.apply(t,o(n)):n&&r.classList.add(n);for(var a in i)r[a]=i[a];return r}},{key:"data",set:function(e){this._data=Object.assign({},{title:e.title||this._data.title,isPageTitleCompleted:e.isPageTitleCompleted||Boolean(e.title)})},get:function(){return this._data}}],[{key:"sanitize",get:function(){return{text:{b:!0}}}},{key:"pasteConfig",get:function(){return{tags:["P"]}}}]),e}();e.exports=l},function(e,t,n){var o=n(2),i=n(3);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var r={insert:"head",singleton:!1};o(i,r);e.exports=i.locals||{}},function(e,t,n){"use strict";var o,i=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},r=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function l(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function s(e,t){for(var n={},o=[],i=0;i<e.length;i++){var r=e[i],s=t.base?r[0]+t.base:r[0],c=n[s]||0,u="".concat(s," ").concat(c);n[s]=c+1;var d=l(u),p={css:r[1],media:r[2],sourceMap:r[3]};-1!==d?(a[d].references++,a[d].updater(p)):a.push({identifier:u,updater:g(p,t),references:1}),o.push(u)}return o}function c(e){var t=document.createElement("style"),o=e.attributes||{};if(void 0===o.nonce){var i=n.nc;i&&(o.nonce=i)}if(Object.keys(o).forEach((function(e){t.setAttribute(e,o[e])})),"function"==typeof e.insert)e.insert(t);else{var a=r(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var u,d=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function p(e,t,n,o){var i=n?"":o.media?"@media ".concat(o.media," {").concat(o.css,"}"):o.css;if(e.styleSheet)e.styleSheet.cssText=d(t,i);else{var r=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}function f(e,t,n){var o=n.css,i=n.media,r=n.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),r&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r))))," */")),e.styleSheet)e.styleSheet.cssText=o;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(o))}}var h=null,v=0;function g(e,t){var n,o,i;if(t.singleton){var r=v++;n=h||(h=c(t)),o=p.bind(null,n,r,!1),i=p.bind(null,n,r,!0)}else n=c(t),o=f.bind(null,n,t),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else i()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=i());var n=s(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var o=0;o<n.length;o++){var i=l(n[o]);a[i].references--}for(var r=s(e,t),c=0;c<n.length;c++){var u=l(n[c]);0===a[u].references&&(a[u].updater(),a.splice(u,1))}n=r}}}},function(e,t,n){(t=n(4)(!1)).push([e.i,".page-tool {\n  position: relative;\n}\n\n.page-tool__input {\n  padding-left: 38px;\n  background-image: url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='14pt' height='14pt' viewBox='0 0 14 14' version='1.1' fill='rgb(128, 128, 128)'%3E%3Cg id='surface1'%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill-opacity:1;' d='M 10.46875 0.875 L 3.53125 0.875 C 2.855469 0.875 2.304688 1.421875 2.304688 2.101562 L 2.304688 11.898438 C 2.304688 12.578125 2.855469 13.125 3.53125 13.125 L 10.46875 13.125 C 11.144531 13.125 11.695312 12.578125 11.695312 11.898438 L 11.695312 2.101562 C 11.695312 1.421875 11.144531 0.875 10.46875 0.875 Z M 10.878906 11.898438 C 10.878906 12.125 10.695312 12.308594 10.46875 12.308594 L 3.53125 12.308594 C 3.304688 12.308594 3.121094 12.125 3.121094 11.898438 L 3.121094 2.101562 C 3.121094 1.875 3.304688 1.691406 3.53125 1.691406 L 10.46875 1.691406 C 10.695312 1.691406 10.878906 1.875 10.878906 2.101562 Z M 10.878906 11.898438 '/%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill-opacity:1;' d='M 9.550781 4.550781 L 4.449219 4.550781 C 4.292969 4.535156 4.140625 4.609375 4.058594 4.742188 C 3.976562 4.875 3.976562 5.042969 4.058594 5.175781 C 4.140625 5.308594 4.292969 5.382812 4.449219 5.367188 L 9.550781 5.367188 C 9.707031 5.382812 9.859375 5.308594 9.941406 5.175781 C 10.023438 5.042969 10.023438 4.875 9.941406 4.742188 C 9.859375 4.609375 9.707031 4.535156 9.550781 4.550781 Z M 9.550781 4.550781 '/%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill-opacity:1;' d='M 9.550781 6.59375 L 4.449219 6.59375 C 4.226562 6.59375 4.042969 6.773438 4.042969 7 C 4.042969 7.226562 4.226562 7.40625 4.449219 7.40625 L 9.550781 7.40625 C 9.773438 7.40625 9.957031 7.226562 9.957031 7 C 9.957031 6.773438 9.773438 6.59375 9.550781 6.59375 Z M 9.550781 6.59375 '/%3E%3Cpath style=' stroke:none;fill-rule:nonzero;fill-opacity:1;' d='M 9.550781 8.632812 L 4.449219 8.632812 C 4.292969 8.617188 4.140625 8.691406 4.058594 8.824219 C 3.976562 8.957031 3.976562 9.125 4.058594 9.257812 C 4.140625 9.390625 4.292969 9.464844 4.449219 9.449219 L 9.550781 9.449219 C 9.707031 9.464844 9.859375 9.390625 9.941406 9.257812 C 10.023438 9.125 10.023438 8.957031 9.941406 8.824219 C 9.859375 8.691406 9.707031 8.617188 9.550781 8.632812 Z M 9.550781 8.632812 '/%3E%3C/g%3E%3C/svg%3E\");\n  background-repeat: no-repeat;\n  background-position: 10px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n\n.page-tool__input-holder {\n  position: relative;\n}\n\n.page-tool__input-holder--error {\n  background-color: #fff3f6;\n  border-color: #f3e0e0;\n  color: #a95a5a;\n  box-shadow: inset 0 1px 3px 0 rgba(146, 62, 62, .05);\n}\n\n.page-tool__input[contentEditable=true][data-placeholder]::before {\n  position: absolute;\n  content: attr(data-placeholder);\n  color: #707684;\n  font-weight: normal;\n  opacity: 0;\n}\n\n.page-tool__input[contentEditable=true][data-placeholder]:empty::before {\n  opacity: 1;\n}\n\n.page-tool__input[contentEditable=true][data-placeholder]:empty:focus::before {\n  opacity: 0;\n}\n\n.page-tool__content {\n  padding-left: 38px;\n  background-image: url(\"data:image/svg+xml,%3Csvg width='13' height='14' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.567 13.629c.728.464 1.581.65 2.41.558l-.873.873A3.722 3.722 0 1 1 4.84 9.794L6.694 7.94a3.722 3.722 0 0 1 5.256-.008L10.484 9.4a5.209 5.209 0 0 1-.017.016 1.625 1.625 0 0 0-2.29.009l-1.854 1.854a1.626 1.626 0 0 0 2.244 2.35zm2.766-7.358a3.722 3.722 0 0 0-2.41-.558l.873-.873a3.722 3.722 0 1 1 5.264 5.266l-1.854 1.854a3.722 3.722 0 0 1-5.256.008L9.416 10.5a5.2 5.2 0 0 1 .017-.016 1.625 1.625 0 0 0 2.29-.009l1.854-1.854a1.626 1.626 0 0 0-2.244-2.35z' fill='rgb(128, 128, 128)' transform='translate(-3.667 -2.7)'/%3E%3C/svg%3E%0A\");\n  background-repeat: no-repeat;\n  background-position: 13px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: block;\n}\n\n.page-tool__content-holder {\n  position: relative;\n}\n",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",o=e[3];if(!o)return n;if(t&&"function"==typeof btoa){var i=(a=o,l=btoa(unescape(encodeURIComponent(JSON.stringify(a)))),s="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(s," */")),r=o.sources.map((function(e){return"/*# sourceURL=".concat(o.sourceRoot||"").concat(e," */")}));return[n].concat(r).concat([i]).join("\n")}var a,l,s;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,o){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(o)for(var r=0;r<this.length;r++){var a=this[r][0];null!=a&&(i[a]=!0)}for(var l=0;l<e.length;l++){var s=[].concat(e[l]);o&&i[s[0]]||(n&&(s[2]?s[2]="".concat(n," and ").concat(s[2]):s[2]=n),t.push(s))}},t}},function(e,t,n){"use strict";n.r(t),t.default='<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="14pt" height="14pt" viewBox="0 0 14 14" version="1.1">\n<g id="surface1">\n<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 10.46875 0.875 L 3.53125 0.875 C 2.855469 0.875 2.304688 1.421875 2.304688 2.101562 L 2.304688 11.898438 C 2.304688 12.578125 2.855469 13.125 3.53125 13.125 L 10.46875 13.125 C 11.144531 13.125 11.695312 12.578125 11.695312 11.898438 L 11.695312 2.101562 C 11.695312 1.421875 11.144531 0.875 10.46875 0.875 Z M 10.878906 11.898438 C 10.878906 12.125 10.695312 12.308594 10.46875 12.308594 L 3.53125 12.308594 C 3.304688 12.308594 3.121094 12.125 3.121094 11.898438 L 3.121094 2.101562 C 3.121094 1.875 3.304688 1.691406 3.53125 1.691406 L 10.46875 1.691406 C 10.695312 1.691406 10.878906 1.875 10.878906 2.101562 Z M 10.878906 11.898438 "/>\n<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 9.550781 4.550781 L 4.449219 4.550781 C 4.292969 4.535156 4.140625 4.609375 4.058594 4.742188 C 3.976562 4.875 3.976562 5.042969 4.058594 5.175781 C 4.140625 5.308594 4.292969 5.382812 4.449219 5.367188 L 9.550781 5.367188 C 9.707031 5.382812 9.859375 5.308594 9.941406 5.175781 C 10.023438 5.042969 10.023438 4.875 9.941406 4.742188 C 9.859375 4.609375 9.707031 4.535156 9.550781 4.550781 Z M 9.550781 4.550781 "/>\n<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 9.550781 6.59375 L 4.449219 6.59375 C 4.226562 6.59375 4.042969 6.773438 4.042969 7 C 4.042969 7.226562 4.226562 7.40625 4.449219 7.40625 L 9.550781 7.40625 C 9.773438 7.40625 9.957031 7.226562 9.957031 7 C 9.957031 6.773438 9.773438 6.59375 9.550781 6.59375 Z M 9.550781 6.59375 "/>\n<path style=" stroke:none;fill-rule:nonzero;fill-opacity:1;" d="M 9.550781 8.632812 L 4.449219 8.632812 C 4.292969 8.617188 4.140625 8.691406 4.058594 8.824219 C 3.976562 8.957031 3.976562 9.125 4.058594 9.257812 C 4.140625 9.390625 4.292969 9.464844 4.449219 9.449219 L 9.550781 9.449219 C 9.707031 9.464844 9.859375 9.390625 9.941406 9.257812 C 10.023438 9.125 10.023438 8.957031 9.941406 8.824219 C 9.859375 8.691406 9.707031 8.617188 9.550781 8.632812 Z M 9.550781 8.632812 "/>\n</g>\n</svg>\n'}])}));