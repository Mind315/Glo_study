/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3DGlo"]("main",{

/***/ "./src/modules/toggleMenu.js":
/*!***********************************!*\
  !*** ./src/modules/toggleMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nvar toggleMenu = function toggleMenu() {\n  var menu = document.querySelector(\"menu\");\n\n  var handlerMenu = function handlerMenu(event) {\n    var target = event.target;\n\n    if (target.closest(\".menu\") || !target.closest(\"menu\") && menu.classList.contains(\"active-menu\")) {\n      menu.classList.toggle(\"active-menu\");\n    } else if (target.closest(\"menu\") && target.closest('[href^=\"#\"]')) {\n      menu.classList.toggle(\"active-menu\");\n    }\n  };\n\n  document.body.addEventListener(\"click\", handlerMenu);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleMenu);\n\n//# sourceURL=webpack://3DGlo/./src/modules/toggleMenu.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("3c4ac9741221b2f0419d")
/******/ })();
/******/ 
/******/ }
);