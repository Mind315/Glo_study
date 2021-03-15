/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3DGlo"]("main",{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_countTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/countTimer */ \"./src/modules/countTimer.js\");\n/* harmony import */ var _modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/toggleMenu */ \"./src/modules/toggleMenu.js\");\n/* harmony import */ var _modules_togglePopup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/togglePopup */ \"./src/modules/togglePopup.js\");\n/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ \"./src/modules/tabs.js\");\n/* harmony import */ var _modules_newDot__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/newDot */ \"./src/modules/newDot.js\");\n/* harmony import */ var _modules_changeImage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/changeImage */ \"./src/modules/changeImage.js\");\n/* harmony import */ var _modules_validCalc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/validCalc */ \"./src/modules/validCalc.js\");\n/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calc */ \"./src/modules/calc.js\");\n/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/sendForm */ \"./src/modules/sendForm.js\");\n/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/slider */ \"./src/modules/slider.js\");\n\n\n\n\n\n\n\n\n\n\n\n //  TIMER\n\n(0,_modules_countTimer__WEBPACK_IMPORTED_MODULE_0__.default)(\"27 march 2021\"); //  MENU\n\n(0,_modules_toggleMenu__WEBPACK_IMPORTED_MODULE_1__.default)(); //  POPUP\n\n(0,_modules_togglePopup__WEBPACK_IMPORTED_MODULE_2__.default)(); //  TABS\n\n(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__.default)(); //  ADD DOTS\n\n(0,_modules_newDot__WEBPACK_IMPORTED_MODULE_4__.default)(); //  Change Image \n\n(0,_modules_changeImage__WEBPACK_IMPORTED_MODULE_5__.default)(); //  Valid Calc\n\n(0,_modules_validCalc__WEBPACK_IMPORTED_MODULE_6__.default)(); //  Calculator \n\n(0,_modules_calc__WEBPACK_IMPORTED_MODULE_7__.default)(100); //  Send-ajax-form\n\n(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_8__.default)(); //  SLIDER\n\n(0,_modules_slider__WEBPACK_IMPORTED_MODULE_9__.default)();\n\n//# sourceURL=webpack://3DGlo/./src/index.js?");

/***/ }),

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
/******/ 	__webpack_require__.h = () => ("bb38e4ce67c597138719")
/******/ })();
/******/ 
/******/ }
);