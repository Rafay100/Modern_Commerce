"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/products";
exports.ids = ["pages/api/products"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/products.js":
/*!*******************************!*\
  !*** ./pages/api/products.js ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst API_URL = process.env.NEXT_PUBLIC_API_URL || \"http://localhost:4000\";\nasync function handler(req, res) {\n    try {\n        const resp = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(`${API_URL}/api/products`, {\n            params: req.query\n        });\n        res.status(200).json(resp.data);\n    } catch (err) {\n        res.status(500).json({\n            error: \"Failed to fetch products\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcHJvZHVjdHMuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBeUI7QUFFekIsTUFBTUMsVUFBVUMsUUFBUUMsR0FBRyxDQUFDQyxtQkFBbUIsSUFBSTtBQUVwQyxlQUFlQyxRQUFRQyxHQUFHLEVBQUVDLEdBQUcsRUFBRTtJQUM5QyxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNUixpREFBUyxDQUFDLENBQUMsRUFBRUMsUUFBUSxhQUFhLENBQUMsRUFBRTtZQUFFUyxRQUFRSixJQUFJSyxLQUFLO1FBQUM7UUFDNUVKLElBQUlLLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNMLEtBQUtNLElBQUk7SUFDaEMsRUFBRSxPQUFPQyxLQUFLO1FBQ1pSLElBQUlLLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUcsT0FBTztRQUEyQjtJQUMzRDtBQUNGLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lY29tLWZyb250ZW5kLy4vcGFnZXMvYXBpL3Byb2R1Y3RzLmpzPzQ5Y2IiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xuXG5jb25zdCBBUElfVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo0MDAwJ1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgcmVzcCA9IGF3YWl0IGF4aW9zLmdldChgJHtBUElfVVJMfS9hcGkvcHJvZHVjdHNgLCB7IHBhcmFtczogcmVxLnF1ZXJ5IH0pXG4gICAgcmVzLnN0YXR1cygyMDApLmpzb24ocmVzcC5kYXRhKVxuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXMuc3RhdHVzKDUwMCkuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGZldGNoIHByb2R1Y3RzJyB9KVxuICB9XG59XG4iXSwibmFtZXMiOlsiYXhpb3MiLCJBUElfVVJMIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0FQSV9VUkwiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwicmVzcCIsImdldCIsInBhcmFtcyIsInF1ZXJ5Iiwic3RhdHVzIiwianNvbiIsImRhdGEiLCJlcnIiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/products.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/products.js"));
module.exports = __webpack_exports__;

})();