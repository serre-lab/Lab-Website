"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/path-exists";
exports.ids = ["vendor-chunks/path-exists"];
exports.modules = {

/***/ "(rsc)/./node_modules/path-exists/index.js":
/*!*******************************************!*\
  !*** ./node_modules/path-exists/index.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst {promisify} = __webpack_require__(/*! util */ \"util\");\n\nconst pAccess = promisify(fs.access);\n\nmodule.exports = async path => {\n\ttry {\n\t\tawait pAccess(path);\n\t\treturn true;\n\t} catch (_) {\n\t\treturn false;\n\t}\n};\n\nmodule.exports.sync = path => {\n\ttry {\n\t\tfs.accessSync(path);\n\t\treturn true;\n\t} catch (_) {\n\t\treturn false;\n\t}\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvcGF0aC1leGlzdHMvaW5kZXguanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYixXQUFXLG1CQUFPLENBQUMsY0FBSTtBQUN2QixPQUFPLFdBQVcsRUFBRSxtQkFBTyxDQUFDLGtCQUFNOztBQUVsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zZXJyZS1sYWItc2l0ZS8uL25vZGVfbW9kdWxlcy9wYXRoLWV4aXN0cy9pbmRleC5qcz9hNTk2Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcbmNvbnN0IGZzID0gcmVxdWlyZSgnZnMnKTtcbmNvbnN0IHtwcm9taXNpZnl9ID0gcmVxdWlyZSgndXRpbCcpO1xuXG5jb25zdCBwQWNjZXNzID0gcHJvbWlzaWZ5KGZzLmFjY2Vzcyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5bmMgcGF0aCA9PiB7XG5cdHRyeSB7XG5cdFx0YXdhaXQgcEFjY2VzcyhwYXRoKTtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoXykge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMuc3luYyA9IHBhdGggPT4ge1xuXHR0cnkge1xuXHRcdGZzLmFjY2Vzc1N5bmMocGF0aCk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKF8pIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/path-exists/index.js\n");

/***/ })

};
;