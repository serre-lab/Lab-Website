"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/which-boxed-primitive";
exports.ids = ["vendor-chunks/which-boxed-primitive"];
exports.modules = {

/***/ "(ssr)/./node_modules/which-boxed-primitive/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/which-boxed-primitive/index.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isString = __webpack_require__(/*! is-string */ \"(ssr)/./node_modules/is-string/index.js\");\nvar isNumber = __webpack_require__(/*! is-number-object */ \"(ssr)/./node_modules/is-number-object/index.js\");\nvar isBoolean = __webpack_require__(/*! is-boolean-object */ \"(ssr)/./node_modules/is-boolean-object/index.js\");\nvar isSymbol = __webpack_require__(/*! is-symbol */ \"(ssr)/./node_modules/is-symbol/index.js\");\nvar isBigInt = __webpack_require__(/*! is-bigint */ \"(ssr)/./node_modules/is-bigint/index.js\");\n\n// eslint-disable-next-line consistent-return\nmodule.exports = function whichBoxedPrimitive(value) {\n\t// eslint-disable-next-line eqeqeq\n\tif (value == null || (typeof value !== 'object' && typeof value !== 'function')) {\n\t\treturn null;\n\t}\n\tif (isString(value)) {\n\t\treturn 'String';\n\t}\n\tif (isNumber(value)) {\n\t\treturn 'Number';\n\t}\n\tif (isBoolean(value)) {\n\t\treturn 'Boolean';\n\t}\n\tif (isSymbol(value)) {\n\t\treturn 'Symbol';\n\t}\n\tif (isBigInt(value)) {\n\t\treturn 'BigInt';\n\t}\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvd2hpY2gtYm94ZWQtcHJpbWl0aXZlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGVBQWUsbUJBQU8sQ0FBQywwREFBVztBQUNsQyxlQUFlLG1CQUFPLENBQUMsd0VBQWtCO0FBQ3pDLGdCQUFnQixtQkFBTyxDQUFDLDBFQUFtQjtBQUMzQyxlQUFlLG1CQUFPLENBQUMsMERBQVc7QUFDbEMsZUFBZSxtQkFBTyxDQUFDLDBEQUFXOztBQUVsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3NlcnJlLWxhYi1zaXRlLy4vbm9kZV9tb2R1bGVzL3doaWNoLWJveGVkLXByaW1pdGl2ZS9pbmRleC5qcz81NTU5Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGlzU3RyaW5nID0gcmVxdWlyZSgnaXMtc3RyaW5nJyk7XG52YXIgaXNOdW1iZXIgPSByZXF1aXJlKCdpcy1udW1iZXItb2JqZWN0Jyk7XG52YXIgaXNCb29sZWFuID0gcmVxdWlyZSgnaXMtYm9vbGVhbi1vYmplY3QnKTtcbnZhciBpc1N5bWJvbCA9IHJlcXVpcmUoJ2lzLXN5bWJvbCcpO1xudmFyIGlzQmlnSW50ID0gcmVxdWlyZSgnaXMtYmlnaW50Jyk7XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb25zaXN0ZW50LXJldHVyblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3aGljaEJveGVkUHJpbWl0aXZlKHZhbHVlKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBlcWVxZXFcblx0aWYgKHZhbHVlID09IG51bGwgfHwgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbHVlICE9PSAnZnVuY3Rpb24nKSkge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcblx0XHRyZXR1cm4gJ1N0cmluZyc7XG5cdH1cblx0aWYgKGlzTnVtYmVyKHZhbHVlKSkge1xuXHRcdHJldHVybiAnTnVtYmVyJztcblx0fVxuXHRpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuXHRcdHJldHVybiAnQm9vbGVhbic7XG5cdH1cblx0aWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuXHRcdHJldHVybiAnU3ltYm9sJztcblx0fVxuXHRpZiAoaXNCaWdJbnQodmFsdWUpKSB7XG5cdFx0cmV0dXJuICdCaWdJbnQnO1xuXHR9XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/which-boxed-primitive/index.js\n");

/***/ })

};
;