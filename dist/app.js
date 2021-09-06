/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/PhotographerCard.js":
/*!***************************************!*\
  !*** ./public/js/PhotographerCard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PhotographerCreateCard)\n/* harmony export */ });\nclass PhotographerCreateCard {\n  constructor(selector, photographer) {\n    this.selector = selector;\n    this.photographer = photographer;\n    this.buildCard(photographer);\n  }\n\n  buildCard(photographer) {\n    const card = document.createElement(\"div\");\n    card.classList.add(\"card\");\n    const link = document.createElement(\"a\");\n    const pictureProfil = document.createElement(\"img\");\n    pictureProfil.classList.add(\"card__photo\");\n    const name = document.createElement(\"p\");\n    name.classList.add(\"card__name\");\n    const city = document.createElement(\"p\");\n    city.classList.add(\"card__location\");\n    const slogan = document.createElement(\"p\");\n    slogan.classList.add(\"card__slogan\");\n    const price = document.createElement(\"p\");\n    price.classList.add(\"card__price\");\n    const tags = document.createElement(\"div\");\n    tags.classList.add(\"card__tag\");\n\n    this.selector.appendChild(card);\n    card.appendChild(link);\n    link.appendChild(pictureProfil);\n    link.appendChild(name);\n    link.appendChild(city);\n    link.appendChild(slogan);\n    link.appendChild(price);\n    link.appendChild(tags);\n\n    link.setAttribute(\n      \"href\",\n      \"./html/photographerpage.html#\" + photographer.id\n    );\n    pictureProfil.setAttribute(\n      \"src\",\n      \"../public/img/IDPhotos/\" + photographer.portrait\n    );\n    name.innerText = photographer.name;\n    city.innerText = photographer.city + \", \" + photographer.country;\n    slogan.innerText = photographer.tagline;\n    price.innerText = photographer.price + \"€/jour\";\n\n    tags.innerHTML = this.createTag(photographer.tags);\n\n    return card;\n  }\n\n  createTag(tags) {\n    let addTag = \"\";\n    tags.forEach((tag) => {\n      addTag += `<div class=\"card__tag-filter\">#${tag}</div>`;\n    });\n    return addTag;\n  }\n}\n\n\n//# sourceURL=webpack://bastienguillaumont_6_02082021/./public/js/PhotographerCard.js?");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotographerCard */ \"./public/js/PhotographerCard.js\");\n\n//import { filterReturn } from \"./photographer\";\n\n/* *******************************\n *     RECUPERATION DE LA DATA   *\n ****************************** */\n\n// On recupère la data\nconst fetchUser = async (url) => {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n};\n\n// On traite la Data\nlet photographers;\nlet photographersReset;\nlet media;\nfetchUser(\"FishEyeData.json\").then((data) => {\n  photographers = data.photographers;\n  photographersReset = data.photographers;\n  media = data.media;\n  photographers.map(\n    (photographer) =>\n      new _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__.default(document.querySelector(\"main\"), photographer)\n  );\n  console.log(photographers);\n  console.log(media);\n  btnScroll();\n  addfilter();\n  //filterReturn();\n});\n\n// Filters selection des photographes\nfunction addfilter() {\n  let activeFilters = null;\n  let main = document.querySelector(\"main\");\n  const filters = Array.from(document.querySelectorAll(\".filter\"));\n  filters.forEach((filter) => {\n    filter.addEventListener(\"click\", (e) => {\n      if (activeFilters === null) {\n        activeFilters = e.target.id;\n        photographers = photographers.filter((element) => {\n          return element.tags.includes(activeFilters);\n        });\n        main.innerHTML = \"\";\n        console.log(photographers);\n        photographers.map(\n          (photographer) => new _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__.default(main, photographer)\n        );\n        filter.classList.add(\"filter-selected\");\n      } else if (activeFilters === e.target.id) {\n        activeFilters = null;\n        filter.classList.remove(\"filter-selected\");\n        main.innerHTML = \"\";\n        photographers = photographersReset;\n        photographers.map(\n          (photographer) => new _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__.default(main, photographer)\n        );\n      } else if (activeFilters != e.target.id) {\n        filters.forEach((filter) => filter.classList.remove(\"filter-selected\"));\n        filter.classList.add(\"filter-selected\");\n        photographers = photographersReset;\n        activeFilters = e.target.id;\n        photographers = photographers.filter((element) => {\n          return element.tags.includes(activeFilters);\n        });\n        main.innerHTML = \"\";\n        photographers.map(\n          (photographer) => new _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__.default(main, photographer)\n        );\n      }\n    });\n  });\n}\n\n// Création du Bouton scroll et ajout de l'écouteur\nconst btnScroll = () => {\n  document.body.innerHTML += `\n    <div class=\"btn_scroll\">\n      <a href=\"#main\">Passer au contenu</a>\n    </div>\n    `;\n  let btn = document.querySelector(\".btn_scroll\");\n  document.addEventListener(\"scroll\", (e) => {\n    if (window.scrollY > 5) {\n      btn.style.top = \"10px\";\n    } else {\n      btn.style.top = \"-100px\";\n    }\n  });\n};\n\n\n//# sourceURL=webpack://bastienguillaumont_6_02082021/./public/js/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/index.js");
/******/ 	
/******/ })()
;