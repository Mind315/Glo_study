/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_3DGlo"]("main",{

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n\nvar sendForm = function sendForm() {\n  // ---- сообщекния которые будем показывать пользователю\n  var errorMessage = 'Что-то пошло не так...',\n      loadMessage = 'Загрузка...',\n      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';\n\n  var postData = function postData(body) {\n    return fetch('./server.php', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'multipart/from-data'\n      },\n      body: JSON.stringify(body)\n    });\n  }; // ----------- -----------------очистка инпутов.\n\n\n  var clearInput = function clearInput(clearIdForm) {\n    var form = document.getElementById(clearIdForm);\n    form.reset();\n  }; // ---------------------------------------валидация форм\n\n\n  var validationForm = function validationForm(event) {\n    // ------ перенес условия из прошлой валидации\n    var target = event.target;\n\n    if (target.name === \"user_name\" || target.name === \"user_message\") {\n      target.value = target.value.replace(/[^а-я\\s-]/gi, \"\");\n    } else if (target.name === \"user_phone\") {\n      target.value = target.value.replace(/[^\\d()-]/gi, \"\");\n    } else if (target.name === \"user_email\") {\n      target.value = target.value.replace(/[^a-z@_\\-\\.!\\~\\*']/gi, \"\");\n    } else {\n      return;\n    }\n  };\n\n  var actionsForm = function actionsForm(selectedForm) {\n    var form = document.getElementById(selectedForm);\n    var statusMessage = document.createElement('div');\n    statusMessage.style.cssText = 'font-size: 2rem; color: #fff';\n    form.addEventListener('submit', function (event) {\n      var formData = new FormData(form);\n      var body = {};\n      statusMessage.textContent = '';\n      statusMessage.className = 'sk-rotating-plane'; // statusMessage.textContent = loadMessage;\n\n      event.preventDefault();\n      form.appendChild(statusMessage);\n      formData.forEach(function (val, key) {\n        body[key] = val;\n      });\n      postData(body).then(function (response) {\n        if (response.status !== 200) {\n          throw new Error('status network is not 200');\n        }\n\n        statusMessage.className = '';\n        statusMessage.textContent = successMessage;\n        clearInput(selectedForm);\n      })[\"catch\"](function (error) {\n        statusMessage.className = '';\n        statusMessage.textContent = errorMessage;\n        console.error(error);\n      }); //  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!\n      //  .then(setTimeout(() => {\n      //   (statusMessage.textContent = '', 5000);\n      //  }));\n    });\n    form.addEventListener('input', validationForm);\n  };\n\n  actionsForm('form1');\n  actionsForm('form2');\n  actionsForm('form3');\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://3DGlo/./src/modules/sendForm.js?");

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ "use strict";
/******/ 
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("4f21832584ac7f025af2")
/******/ })();
/******/ 
/******/ }
);