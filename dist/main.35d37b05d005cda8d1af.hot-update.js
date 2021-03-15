/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3DGlo"]("main",{

/***/ "./src/modules/togglePopup.js":
/*!************************************!*\
  !*** ./src/modules/togglePopup.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nvar togglePopup = function togglePopup() {\n  var popup = document.querySelector(\".popup\"),\n      popupBtn = document.querySelectorAll(\".popup-btn\"),\n      popUpClose = document.querySelector(\".popup-close\");\n  var popupStartPos = 700,\n      popupCount = 700; //----------------------- Аниммм\n\n  var animPopup = function animPopup() {\n    if (popupStartPos > 0) {\n      popupCount -= 20;\n    } else {\n      popupCount += 20;\n    }\n\n    document.querySelector(\".popup-content\").style.transform = \"translateY(\".concat(popupCount, \"px)\");\n\n    if (popupStartPos > 0 ? popupCount > 0 : popupCount < 0) {\n      requestAnimationFrame(animPopup);\n    }\n  }; //----------------------- Аниммм\n\n\n  popupBtn.forEach(function (elem) {\n    elem.addEventListener(\"click\", function () {\n      popup.style.display = \"block\";\n\n      if (screen.width >= 768) {\n        popupCount = popupStartPos;\n        requestAnimationFrame(animPopup);\n      }\n    });\n  });\n  popup.addEventListener(\"click\", function (event) {\n    var target = event.target;\n\n    if (target.classList.contains(\"popup-close\")) {\n      popup.style.display = \"none\";\n    } else {\n      target = target.closest(\".popup-content\");\n\n      if (!target) {\n        popup.style.display = \"none\";\n      }\n    }\n  });\n  var formBtn = document.querySelector('.form-btn');\n  formBtn.addEventListener('click', function (event) {\n    console.log('сработала кнопка отправить');\n    console.log(event.target);\n    setTimeout(function () {\n      popup.style.display = \"none\";\n    }, 2000);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopup);\n\n//# sourceURL=webpack://3DGlo/./src/modules/togglePopup.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("d8acf57f652ed47e94fb")
/******/ })();
/******/ 
/******/ }
);