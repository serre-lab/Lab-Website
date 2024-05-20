"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-shared-array-buffer";
exports.ids = ["vendor-chunks/is-shared-array-buffer"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-shared-array-buffer/index.js":
/*!******************************************************!*\
  !*** ./node_modules/is-shared-array-buffer/index.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar callBound = __webpack_require__(/*! call-bind/callBound */ \"(ssr)/./node_modules/call-bind/callBound.js\");\n\nvar $byteLength = callBound('SharedArrayBuffer.prototype.byteLength', true);\n\n/** @type {import('.')} */\nmodule.exports = $byteLength\n\t? function isSharedArrayBuffer(obj) {\n\t\tif (!obj || typeof obj !== 'object') {\n\t\t\treturn false;\n\t\t}\n\t\ttry {\n\t\t\t$byteLength(obj);\n\t\t\treturn true;\n\t\t} catch (e) {\n\t\t\treturn false;\n\t\t}\n\t}\n\t: function isSharedArrayBuffer(obj) { // eslint-disable-line no-unused-vars\n\t\treturn false;\n\t};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtc2hhcmVkLWFycmF5LWJ1ZmZlci9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyx3RUFBcUI7O0FBRTdDOztBQUVBLFdBQVcsYUFBYTtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VycmUtbGFiLXNpdGUvLi9ub2RlX21vZHVsZXMvaXMtc2hhcmVkLWFycmF5LWJ1ZmZlci9pbmRleC5qcz9mZWEzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC9jYWxsQm91bmQnKTtcblxudmFyICRieXRlTGVuZ3RoID0gY2FsbEJvdW5kKCdTaGFyZWRBcnJheUJ1ZmZlci5wcm90b3R5cGUuYnl0ZUxlbmd0aCcsIHRydWUpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSAkYnl0ZUxlbmd0aFxuXHQ/IGZ1bmN0aW9uIGlzU2hhcmVkQXJyYXlCdWZmZXIob2JqKSB7XG5cdFx0aWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdFx0dHJ5IHtcblx0XHRcdCRieXRlTGVuZ3RoKG9iaik7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cdDogZnVuY3Rpb24gaXNTaGFyZWRBcnJheUJ1ZmZlcihvYmopIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-shared-array-buffer/index.js\n");

/***/ })

};
;