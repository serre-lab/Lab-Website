"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/debounce-fn";
exports.ids = ["vendor-chunks/debounce-fn"];
exports.modules = {

/***/ "(rsc)/./node_modules/debounce-fn/index.js":
/*!*******************************************!*\
  !*** ./node_modules/debounce-fn/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst mimicFn = __webpack_require__(/*! mimic-fn */ \"(rsc)/./node_modules/mimic-fn/index.js\");\n\nmodule.exports = (inputFunction, options = {}) => {\n\tif (typeof inputFunction !== 'function') {\n\t\tthrow new TypeError(`Expected the first argument to be a function, got \\`${typeof inputFunction}\\``);\n\t}\n\n\tconst {\n\t\twait = 0,\n\t\tbefore = false,\n\t\tafter = true\n\t} = options;\n\n\tif (!before && !after) {\n\t\tthrow new Error('Both `before` and `after` are false, function wouldn\\'t be called.');\n\t}\n\n\tlet timeout;\n\tlet result;\n\n\tconst debouncedFunction = function (...arguments_) {\n\t\tconst context = this;\n\n\t\tconst later = () => {\n\t\t\ttimeout = undefined;\n\n\t\t\tif (after) {\n\t\t\t\tresult = inputFunction.apply(context, arguments_);\n\t\t\t}\n\t\t};\n\n\t\tconst shouldCallNow = before && !timeout;\n\t\tclearTimeout(timeout);\n\t\ttimeout = setTimeout(later, wait);\n\n\t\tif (shouldCallNow) {\n\t\t\tresult = inputFunction.apply(context, arguments_);\n\t\t}\n\n\t\treturn result;\n\t};\n\n\tmimicFn(debouncedFunction, inputFunction);\n\n\tdebouncedFunction.cancel = () => {\n\t\tif (timeout) {\n\t\t\tclearTimeout(timeout);\n\t\t\ttimeout = undefined;\n\t\t}\n\t};\n\n\treturn debouncedFunction;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvZGVib3VuY2UtZm4vaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYixnQkFBZ0IsbUJBQU8sQ0FBQyx3REFBVTs7QUFFbEMsNkNBQTZDO0FBQzdDO0FBQ0EsNkVBQTZFLHFCQUFxQjtBQUNsRzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnJlLWxhYi1zaXRlLy4vbm9kZV9tb2R1bGVzL2RlYm91bmNlLWZuL2luZGV4LmpzPzFjNzYiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuY29uc3QgbWltaWNGbiA9IHJlcXVpcmUoJ21pbWljLWZuJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gKGlucHV0RnVuY3Rpb24sIG9wdGlvbnMgPSB7fSkgPT4ge1xuXHRpZiAodHlwZW9mIGlucHV0RnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKGBFeHBlY3RlZCB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYmUgYSBmdW5jdGlvbiwgZ290IFxcYCR7dHlwZW9mIGlucHV0RnVuY3Rpb259XFxgYCk7XG5cdH1cblxuXHRjb25zdCB7XG5cdFx0d2FpdCA9IDAsXG5cdFx0YmVmb3JlID0gZmFsc2UsXG5cdFx0YWZ0ZXIgPSB0cnVlXG5cdH0gPSBvcHRpb25zO1xuXG5cdGlmICghYmVmb3JlICYmICFhZnRlcikge1xuXHRcdHRocm93IG5ldyBFcnJvcignQm90aCBgYmVmb3JlYCBhbmQgYGFmdGVyYCBhcmUgZmFsc2UsIGZ1bmN0aW9uIHdvdWxkblxcJ3QgYmUgY2FsbGVkLicpO1xuXHR9XG5cblx0bGV0IHRpbWVvdXQ7XG5cdGxldCByZXN1bHQ7XG5cblx0Y29uc3QgZGVib3VuY2VkRnVuY3Rpb24gPSBmdW5jdGlvbiAoLi4uYXJndW1lbnRzXykge1xuXHRcdGNvbnN0IGNvbnRleHQgPSB0aGlzO1xuXG5cdFx0Y29uc3QgbGF0ZXIgPSAoKSA9PiB7XG5cdFx0XHR0aW1lb3V0ID0gdW5kZWZpbmVkO1xuXG5cdFx0XHRpZiAoYWZ0ZXIpIHtcblx0XHRcdFx0cmVzdWx0ID0gaW5wdXRGdW5jdGlvbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHNfKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0Y29uc3Qgc2hvdWxkQ2FsbE5vdyA9IGJlZm9yZSAmJiAhdGltZW91dDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuXG5cdFx0aWYgKHNob3VsZENhbGxOb3cpIHtcblx0XHRcdHJlc3VsdCA9IGlucHV0RnVuY3Rpb24uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzXyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fTtcblxuXHRtaW1pY0ZuKGRlYm91bmNlZEZ1bmN0aW9uLCBpbnB1dEZ1bmN0aW9uKTtcblxuXHRkZWJvdW5jZWRGdW5jdGlvbi5jYW5jZWwgPSAoKSA9PiB7XG5cdFx0aWYgKHRpbWVvdXQpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHRcdHRpbWVvdXQgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBkZWJvdW5jZWRGdW5jdGlvbjtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/debounce-fn/index.js\n");

/***/ })

};
;