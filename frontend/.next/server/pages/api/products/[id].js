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
exports.id = "pages/api/products/[id]";
exports.ids = ["pages/api/products/[id]"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/products/[id].js":
/*!************************************!*\
  !*** ./pages/api/products/[id].js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst API_URL = process.env.NEXT_PUBLIC_API_URL || \"http://localhost:4000\";\nasync function handler(req, res) {\n    const { id  } = req.query;\n    if (req.method !== \"GET\") {\n        return res.status(405).json({\n            error: \"Method not allowed\"\n        });\n    }\n    try {\n        const resp = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(`${API_URL}/api/products/${id}`);\n        res.status(200).json(resp.data);\n    } catch (err) {\n        const status = err.response?.status || 500;\n        res.status(status).json({\n            error: \"Failed to fetch product\"\n        });\n    }\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvcHJvZHVjdHMvW2lkXS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUF5QjtBQUV6QixNQUFNQyxVQUFVQyxRQUFRQyxHQUFHLENBQUNDLG1CQUFtQixJQUFJO0FBRXBDLGVBQWVDLFFBQVFDLEdBQUcsRUFBRUMsR0FBRyxFQUFFO0lBQzlDLE1BQU0sRUFBRUMsR0FBRSxFQUFFLEdBQUdGLElBQUlHLEtBQUs7SUFFeEIsSUFBSUgsSUFBSUksTUFBTSxLQUFLLE9BQU87UUFDeEIsT0FBT0gsSUFBSUksTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztZQUFFQyxPQUFPO1FBQXFCO0lBQzVELENBQUM7SUFFRCxJQUFJO1FBQ0YsTUFBTUMsT0FBTyxNQUFNZCxpREFBUyxDQUFDLENBQUMsRUFBRUMsUUFBUSxjQUFjLEVBQUVPLEdBQUcsQ0FBQztRQUM1REQsSUFBSUksTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0UsS0FBS0UsSUFBSTtJQUNoQyxFQUFFLE9BQU9DLEtBQUs7UUFDWixNQUFNTixTQUFTTSxJQUFJQyxRQUFRLEVBQUVQLFVBQVU7UUFDdkNKLElBQUlJLE1BQU0sQ0FBQ0EsUUFBUUMsSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBMEI7SUFDN0Q7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWNvbS1mcm9udGVuZC8uL3BhZ2VzL2FwaS9wcm9kdWN0cy9baWRdLmpzPzgyZTgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF4aW9zIGZyb20gJ2F4aW9zJ1xyXG5cclxuY29uc3QgQVBJX1VSTCA9IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0FQSV9VUkwgfHwgJ2h0dHA6Ly9sb2NhbGhvc3Q6NDAwMCdcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICBjb25zdCB7IGlkIH0gPSByZXEucXVlcnlcclxuXHJcbiAgaWYgKHJlcS5tZXRob2QgIT09ICdHRVQnKSB7XHJcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSlcclxuICB9XHJcblxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwID0gYXdhaXQgYXhpb3MuZ2V0KGAke0FQSV9VUkx9L2FwaS9wcm9kdWN0cy8ke2lkfWApXHJcbiAgICByZXMuc3RhdHVzKDIwMCkuanNvbihyZXNwLmRhdGEpXHJcbiAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICBjb25zdCBzdGF0dXMgPSBlcnIucmVzcG9uc2U/LnN0YXR1cyB8fCA1MDBcclxuICAgIHJlcy5zdGF0dXMoc3RhdHVzKS5qc29uKHsgZXJyb3I6ICdGYWlsZWQgdG8gZmV0Y2ggcHJvZHVjdCcgfSlcclxuICB9XHJcbn1cclxuXHJcbiJdLCJuYW1lcyI6WyJheGlvcyIsIkFQSV9VUkwiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfQVBJX1VSTCIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJpZCIsInF1ZXJ5IiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsImVycm9yIiwicmVzcCIsImdldCIsImRhdGEiLCJlcnIiLCJyZXNwb25zZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/products/[id].js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/products/[id].js"));
module.exports = __webpack_exports__;

})();