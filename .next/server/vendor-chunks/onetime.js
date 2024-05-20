"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/onetime";
exports.ids = ["vendor-chunks/onetime"];
exports.modules = {

/***/ "(rsc)/./node_modules/onetime/index.js":
/*!***************************************!*\
  !*** ./node_modules/onetime/index.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst mimicFn = __webpack_require__(/*! mimic-fn */ \"(rsc)/./node_modules/onetime/node_modules/mimic-fn/index.js\");\n\nconst calledFunctions = new WeakMap();\n\nconst onetime = (function_, options = {}) => {\n\tif (typeof function_ !== 'function') {\n\t\tthrow new TypeError('Expected a function');\n\t}\n\n\tlet returnValue;\n\tlet callCount = 0;\n\tconst functionName = function_.displayName || function_.name || '<anonymous>';\n\n\tconst onetime = function (...arguments_) {\n\t\tcalledFunctions.set(onetime, ++callCount);\n\n\t\tif (callCount === 1) {\n\t\t\treturnValue = function_.apply(this, arguments_);\n\t\t\tfunction_ = null;\n\t\t} else if (options.throw === true) {\n\t\t\tthrow new Error(`Function \\`${functionName}\\` can only be called once`);\n\t\t}\n\n\t\treturn returnValue;\n\t};\n\n\tmimicFn(onetime, function_);\n\tcalledFunctions.set(onetime, callCount);\n\n\treturn onetime;\n};\n\nmodule.exports = onetime;\n// TODO: Remove this for the next major release\nmodule.exports[\"default\"] = onetime;\n\nmodule.exports.callCount = function_ => {\n\tif (!calledFunctions.has(function_)) {\n\t\tthrow new Error(`The given function \\`${function_.name}\\` is not wrapped by the \\`onetime\\` package`);\n\t}\n\n\treturn calledFunctions.get(function_);\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvb25ldGltZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLGdCQUFnQixtQkFBTyxDQUFDLDZFQUFVOztBQUVsQzs7QUFFQSx3Q0FBd0M7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixpQ0FBaUMsYUFBYTtBQUM5Qzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXNCOztBQUV0Qix3QkFBd0I7QUFDeEI7QUFDQSwwQ0FBMEMsZUFBZTtBQUN6RDs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VycmUtbGFiLXNpdGUvLi9ub2RlX21vZHVsZXMvb25ldGltZS9pbmRleC5qcz84NjIxIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmNvbnN0IG1pbWljRm4gPSByZXF1aXJlKCdtaW1pYy1mbicpO1xuXG5jb25zdCBjYWxsZWRGdW5jdGlvbnMgPSBuZXcgV2Vha01hcCgpO1xuXG5jb25zdCBvbmV0aW1lID0gKGZ1bmN0aW9uXywgb3B0aW9ucyA9IHt9KSA9PiB7XG5cdGlmICh0eXBlb2YgZnVuY3Rpb25fICE9PSAnZnVuY3Rpb24nKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgYSBmdW5jdGlvbicpO1xuXHR9XG5cblx0bGV0IHJldHVyblZhbHVlO1xuXHRsZXQgY2FsbENvdW50ID0gMDtcblx0Y29uc3QgZnVuY3Rpb25OYW1lID0gZnVuY3Rpb25fLmRpc3BsYXlOYW1lIHx8IGZ1bmN0aW9uXy5uYW1lIHx8ICc8YW5vbnltb3VzPic7XG5cblx0Y29uc3Qgb25ldGltZSA9IGZ1bmN0aW9uICguLi5hcmd1bWVudHNfKSB7XG5cdFx0Y2FsbGVkRnVuY3Rpb25zLnNldChvbmV0aW1lLCArK2NhbGxDb3VudCk7XG5cblx0XHRpZiAoY2FsbENvdW50ID09PSAxKSB7XG5cdFx0XHRyZXR1cm5WYWx1ZSA9IGZ1bmN0aW9uXy5hcHBseSh0aGlzLCBhcmd1bWVudHNfKTtcblx0XHRcdGZ1bmN0aW9uXyA9IG51bGw7XG5cdFx0fSBlbHNlIGlmIChvcHRpb25zLnRocm93ID09PSB0cnVlKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoYEZ1bmN0aW9uIFxcYCR7ZnVuY3Rpb25OYW1lfVxcYCBjYW4gb25seSBiZSBjYWxsZWQgb25jZWApO1xuXHRcdH1cblxuXHRcdHJldHVybiByZXR1cm5WYWx1ZTtcblx0fTtcblxuXHRtaW1pY0ZuKG9uZXRpbWUsIGZ1bmN0aW9uXyk7XG5cdGNhbGxlZEZ1bmN0aW9ucy5zZXQob25ldGltZSwgY2FsbENvdW50KTtcblxuXHRyZXR1cm4gb25ldGltZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gb25ldGltZTtcbi8vIFRPRE86IFJlbW92ZSB0aGlzIGZvciB0aGUgbmV4dCBtYWpvciByZWxlYXNlXG5tb2R1bGUuZXhwb3J0cy5kZWZhdWx0ID0gb25ldGltZTtcblxubW9kdWxlLmV4cG9ydHMuY2FsbENvdW50ID0gZnVuY3Rpb25fID0+IHtcblx0aWYgKCFjYWxsZWRGdW5jdGlvbnMuaGFzKGZ1bmN0aW9uXykpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoYFRoZSBnaXZlbiBmdW5jdGlvbiBcXGAke2Z1bmN0aW9uXy5uYW1lfVxcYCBpcyBub3Qgd3JhcHBlZCBieSB0aGUgXFxgb25ldGltZVxcYCBwYWNrYWdlYCk7XG5cdH1cblxuXHRyZXR1cm4gY2FsbGVkRnVuY3Rpb25zLmdldChmdW5jdGlvbl8pO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/onetime/index.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/onetime/node_modules/mimic-fn/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/onetime/node_modules/mimic-fn/index.js ***!
  \*************************************************************/
/***/ ((module) => {

eval("\n\nconst mimicFn = (to, from) => {\n\tfor (const prop of Reflect.ownKeys(from)) {\n\t\tObject.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));\n\t}\n\n\treturn to;\n};\n\nmodule.exports = mimicFn;\n// TODO: Remove this for the next major release\nmodule.exports[\"default\"] = mimicFn;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvb25ldGltZS9ub2RlX21vZHVsZXMvbWltaWMtZm4vaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VycmUtbGFiLXNpdGUvLi9ub2RlX21vZHVsZXMvb25ldGltZS9ub2RlX21vZHVsZXMvbWltaWMtZm4vaW5kZXguanM/MjYwNiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1pbWljRm4gPSAodG8sIGZyb20pID0+IHtcblx0Zm9yIChjb25zdCBwcm9wIG9mIFJlZmxlY3Qub3duS2V5cyhmcm9tKSkge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0bywgcHJvcCwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihmcm9tLCBwcm9wKSk7XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1pbWljRm47XG4vLyBUT0RPOiBSZW1vdmUgdGhpcyBmb3IgdGhlIG5leHQgbWFqb3IgcmVsZWFzZVxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IG1pbWljRm47XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/onetime/node_modules/mimic-fn/index.js\n");

/***/ })

};
;