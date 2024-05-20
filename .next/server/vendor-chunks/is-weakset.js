"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/is-weakset";
exports.ids = ["vendor-chunks/is-weakset"];
exports.modules = {

/***/ "(ssr)/./node_modules/is-weakset/index.js":
/*!******************************************!*\
  !*** ./node_modules/is-weakset/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar GetIntrinsic = __webpack_require__(/*! get-intrinsic */ \"(ssr)/./node_modules/get-intrinsic/index.js\");\nvar callBound = __webpack_require__(/*! call-bind/callBound */ \"(ssr)/./node_modules/call-bind/callBound.js\");\n\nvar $WeakSet = GetIntrinsic('%WeakSet%', true);\n\nvar $setHas = callBound('WeakSet.prototype.has', true);\n\nif ($setHas) {\n\tvar $mapHas = callBound('WeakMap.prototype.has', true);\n\n\t/** @type {import('.')} */\n\tmodule.exports = function isWeakSet(x) {\n\t\tif (!x || typeof x !== 'object') {\n\t\t\treturn false;\n\t\t}\n\t\ttry {\n\t\t\t$setHas(x, $setHas);\n\t\t\tif ($mapHas) {\n\t\t\t\ttry {\n\t\t\t\t\t$mapHas(x, $mapHas);\n\t\t\t\t} catch (e) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t}\n\t\t\t// @ts-expect-error TS can't figure out that $WeakSet is always truthy here\n\t\t\treturn x instanceof $WeakSet; // core-js workaround, pre-v3\n\t\t} catch (e) {}\n\t\treturn false;\n\t};\n} else {\n\t/** @type {import('.')} */\n\t// eslint-disable-next-line no-unused-vars\n\tmodule.exports = function isWeakSet(x) {\n\t\t// `WeakSet` does not exist, or does not have a `has` method\n\t\treturn false;\n\t};\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvaXMtd2Vha3NldC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxrRUFBZTtBQUMxQyxnQkFBZ0IsbUJBQU8sQ0FBQyx3RUFBcUI7O0FBRTdDOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsWUFBWSxhQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyxJQUFJO0FBQ0o7QUFDQTtBQUNBLEVBQUU7QUFDRixZQUFZLGFBQWE7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc2VycmUtbGFiLXNpdGUvLi9ub2RlX21vZHVsZXMvaXMtd2Vha3NldC9pbmRleC5qcz82ODA0Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcbnZhciBjYWxsQm91bmQgPSByZXF1aXJlKCdjYWxsLWJpbmQvY2FsbEJvdW5kJyk7XG5cbnZhciAkV2Vha1NldCA9IEdldEludHJpbnNpYygnJVdlYWtTZXQlJywgdHJ1ZSk7XG5cbnZhciAkc2V0SGFzID0gY2FsbEJvdW5kKCdXZWFrU2V0LnByb3RvdHlwZS5oYXMnLCB0cnVlKTtcblxuaWYgKCRzZXRIYXMpIHtcblx0dmFyICRtYXBIYXMgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLmhhcycsIHRydWUpO1xuXG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5cdG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNXZWFrU2V0KHgpIHtcblx0XHRpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHRcdHRyeSB7XG5cdFx0XHQkc2V0SGFzKHgsICRzZXRIYXMpO1xuXHRcdFx0aWYgKCRtYXBIYXMpIHtcblx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHQkbWFwSGFzKHgsICRtYXBIYXMpO1xuXHRcdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdC8vIEB0cy1leHBlY3QtZXJyb3IgVFMgY2FuJ3QgZmlndXJlIG91dCB0aGF0ICRXZWFrU2V0IGlzIGFsd2F5cyB0cnV0aHkgaGVyZVxuXHRcdFx0cmV0dXJuIHggaW5zdGFuY2VvZiAkV2Vha1NldDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjNcblx0XHR9IGNhdGNoIChlKSB7fVxuXHRcdHJldHVybiBmYWxzZTtcblx0fTtcbn0gZWxzZSB7XG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bnVzZWQtdmFyc1xuXHRtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzV2Vha1NldCh4KSB7XG5cdFx0Ly8gYFdlYWtTZXRgIGRvZXMgbm90IGV4aXN0LCBvciBkb2VzIG5vdCBoYXZlIGEgYGhhc2AgbWV0aG9kXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9O1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/is-weakset/index.js\n");

/***/ })

};
;