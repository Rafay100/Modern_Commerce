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
exports.id = "pages/api/orders";
exports.ids = ["pages/api/orders"];
exports.modules = {

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ "(api)/./pages/api/orders.js":
/*!*****************************!*\
  !*** ./pages/api/orders.js ***!
  \*****************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"axios\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);\naxios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\nconst API_URL = process.env.NEXT_PUBLIC_API_URL || \"http://localhost:4000\";\nasync function handler(req, res) {\n    if (req.method === \"POST\") {\n        try {\n            const resp = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].post(`${API_URL}/api/orders`, req.body);\n            res.status(201).json(resp.data);\n        } catch (err) {\n            const status = err.response?.status || 500;\n            res.status(status).json({\n                error: \"Failed to create order\",\n                details: err.response?.data\n            });\n        }\n        return;\n    }\n    if (req.method === \"GET\") {\n        const { orderNumber  } = req.query;\n        if (!orderNumber) {\n            return res.status(400).json({\n                error: \"orderNumber is required\"\n            });\n        }\n        try {\n            const resp = await axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].get(`${API_URL}/api/orders/${orderNumber}`);\n            res.status(200).json(resp.data);\n        } catch (err) {\n            const status = err.response?.status || 500;\n            res.status(status).json({\n                error: \"Failed to fetch order\"\n            });\n        }\n        return;\n    }\n    res.status(405).json({\n        error: \"Method not allowed\"\n    });\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvb3JkZXJzLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXlCO0FBRXpCLE1BQU1DLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0MsbUJBQW1CLElBQUk7QUFFcEMsZUFBZUMsUUFBUUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDOUMsSUFBSUQsSUFBSUUsTUFBTSxLQUFLLFFBQVE7UUFDekIsSUFBSTtZQUNGLE1BQU1DLE9BQU8sTUFBTVQsa0RBQVUsQ0FBQyxDQUFDLEVBQUVDLFFBQVEsV0FBVyxDQUFDLEVBQUVLLElBQUlLLElBQUk7WUFDL0RKLElBQUlLLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUNKLEtBQUtLLElBQUk7UUFDaEMsRUFBRSxPQUFPQyxLQUFLO1lBQ1osTUFBTUgsU0FBU0csSUFBSUMsUUFBUSxFQUFFSixVQUFVO1lBQ3ZDTCxJQUFJSyxNQUFNLENBQUNBLFFBQVFDLElBQUksQ0FBQztnQkFBRUksT0FBTztnQkFBMEJDLFNBQVNILElBQUlDLFFBQVEsRUFBRUY7WUFBSztRQUN6RjtRQUNBO0lBQ0YsQ0FBQztJQUVELElBQUlSLElBQUlFLE1BQU0sS0FBSyxPQUFPO1FBQ3hCLE1BQU0sRUFBRVcsWUFBVyxFQUFFLEdBQUdiLElBQUljLEtBQUs7UUFDakMsSUFBSSxDQUFDRCxhQUFhO1lBQ2hCLE9BQU9aLElBQUlLLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7Z0JBQUVJLE9BQU87WUFBMEI7UUFDakUsQ0FBQztRQUVELElBQUk7WUFDRixNQUFNUixPQUFPLE1BQU1ULGlEQUFTLENBQUMsQ0FBQyxFQUFFQyxRQUFRLFlBQVksRUFBRWtCLFlBQVksQ0FBQztZQUNuRVosSUFBSUssTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQ0osS0FBS0ssSUFBSTtRQUNoQyxFQUFFLE9BQU9DLEtBQUs7WUFDWixNQUFNSCxTQUFTRyxJQUFJQyxRQUFRLEVBQUVKLFVBQVU7WUFDdkNMLElBQUlLLE1BQU0sQ0FBQ0EsUUFBUUMsSUFBSSxDQUFDO2dCQUFFSSxPQUFPO1lBQXdCO1FBQzNEO1FBQ0E7SUFDRixDQUFDO0lBRURWLElBQUlLLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFBRUksT0FBTztJQUFxQjtBQUNyRCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWNvbS1mcm9udGVuZC8uL3BhZ2VzL2FwaS9vcmRlcnMuanM/MWE4OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSAnYXhpb3MnXHJcblxyXG5jb25zdCBBUElfVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fCAnaHR0cDovL2xvY2FsaG9zdDo0MDAwJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gIGlmIChyZXEubWV0aG9kID09PSAnUE9TVCcpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBheGlvcy5wb3N0KGAke0FQSV9VUkx9L2FwaS9vcmRlcnNgLCByZXEuYm9keSlcclxuICAgICAgcmVzLnN0YXR1cygyMDEpLmpzb24ocmVzcC5kYXRhKVxyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGVyci5yZXNwb25zZT8uc3RhdHVzIHx8IDUwMFxyXG4gICAgICByZXMuc3RhdHVzKHN0YXR1cykuanNvbih7IGVycm9yOiAnRmFpbGVkIHRvIGNyZWF0ZSBvcmRlcicsIGRldGFpbHM6IGVyci5yZXNwb25zZT8uZGF0YSB9KVxyXG4gICAgfVxyXG4gICAgcmV0dXJuXHJcbiAgfVxyXG5cclxuICBpZiAocmVxLm1ldGhvZCA9PT0gJ0dFVCcpIHtcclxuICAgIGNvbnN0IHsgb3JkZXJOdW1iZXIgfSA9IHJlcS5xdWVyeVxyXG4gICAgaWYgKCFvcmRlck51bWJlcikge1xyXG4gICAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDApLmpzb24oeyBlcnJvcjogJ29yZGVyTnVtYmVyIGlzIHJlcXVpcmVkJyB9KVxyXG4gICAgfVxyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBheGlvcy5nZXQoYCR7QVBJX1VSTH0vYXBpL29yZGVycy8ke29yZGVyTnVtYmVyfWApXHJcbiAgICAgIHJlcy5zdGF0dXMoMjAwKS5qc29uKHJlc3AuZGF0YSlcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBjb25zdCBzdGF0dXMgPSBlcnIucmVzcG9uc2U/LnN0YXR1cyB8fCA1MDBcclxuICAgICAgcmVzLnN0YXR1cyhzdGF0dXMpLmpzb24oeyBlcnJvcjogJ0ZhaWxlZCB0byBmZXRjaCBvcmRlcicgfSlcclxuICAgIH1cclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBlcnJvcjogJ01ldGhvZCBub3QgYWxsb3dlZCcgfSlcclxufVxyXG5cclxuIl0sIm5hbWVzIjpbImF4aW9zIiwiQVBJX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BUElfVVJMIiwiaGFuZGxlciIsInJlcSIsInJlcyIsIm1ldGhvZCIsInJlc3AiLCJwb3N0IiwiYm9keSIsInN0YXR1cyIsImpzb24iLCJkYXRhIiwiZXJyIiwicmVzcG9uc2UiLCJlcnJvciIsImRldGFpbHMiLCJvcmRlck51bWJlciIsInF1ZXJ5IiwiZ2V0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/api/orders.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/orders.js"));
module.exports = __webpack_exports__;

})();