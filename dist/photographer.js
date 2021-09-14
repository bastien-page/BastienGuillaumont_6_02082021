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

/***/ "./public/js/Lightbox.js":
/*!*******************************!*\
  !*** ./public/js/Lightbox.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Lightbox)\n/* harmony export */ });\nclass Lightbox {\n  static init() {\n    const links = Array.from(\n      document.querySelectorAll('a[href$=\".jpg\"], a[href$=\".mp4\"]')\n    );\n    const images = links.map((link) => link.getAttribute(\"href\"));\n    const titles = links.map(\n      (link) => link.firstElementChild.attributes.alt.value\n    );\n    links.forEach((link) =>\n      link.addEventListener(\"click\", (e) => {\n        e.preventDefault();\n        new Lightbox(e.currentTarget.getAttribute(\"href\"), images, titles);\n        document.querySelector(\"main\").setAttribute(\"aria-hidden\", \"true\");\n      })\n    );\n  }\n\n  constructor(url, images, titles) {\n    this.element = this.buildDOM(url);\n    this.images = images;\n    this.titles = titles;\n    this.loadImage(url);\n    this.onKeyUp = this.onKeyUp.bind(this);\n    document.body.appendChild(this.element);\n    document.addEventListener(\"keyup\", this.onKeyUp);\n    document.querySelector(\".lightbox__close\").focus();\n  }\n\n  loadImage(url) {\n    // Avoir pour optimiser\n    const links = Array.from(\n      document.querySelectorAll('a[href$=\".jpg\"], a[href$=\".mp4\"]')\n    );\n    const images = links.map((link) => link.getAttribute(\"href\"));\n    ////\n    this.url = null;\n    const image = document.createElement(\"img\");\n    const video = document.createElement(\"video\");\n    video.setAttribute(\"type\", \"video/mp4\");\n    video.setAttribute(\"controls\", \"controls\");\n    const container = this.element.querySelector(\".lightbox__container\");\n    const imageTitle = document.createElement(\"p\");\n    imageTitle.classList.add(\"lightbox__title\");\n    imageTitle.textContent = \"\";\n    container.innerHTML = \"\";\n    this.url = url;\n    imageTitle.textContent = this.titles[images.indexOf(url)];\n    if (url.includes(\".mp4\")) {\n      container.appendChild(video);\n      video.src = url;\n    } else {\n      container.appendChild(image);\n      image.src = url;\n    }\n    container.appendChild(imageTitle);\n  }\n\n  onKeyUp(e) {\n    if (e.key === \"Escape\") {\n      this.close(e);\n    } else if (e.key === \"ArrowRight\") {\n      this.next(e);\n    } else if (e.key === \"ArrowLeft\") {\n      this.prev(e);\n    }\n  }\n\n  close(e) {\n    e.preventDefault();\n    this.element.classList.add(\"fadeOut\");\n    window.setTimeout(() => {\n      this.element.parentElement.removeChild(this.element);\n    }, 500);\n    document.removeEventListener(\"keyup\", this.onKeyUp);\n    document.querySelector(\"main\").setAttribute(\"aria-hidden\", \"false\");\n  }\n\n  next(e) {\n    e.preventDefault();\n    let i = this.images.findIndex((i) => i === this.url);\n    if (i === this.images.length - 1) {\n      i = -1;\n    }\n    this.loadImage(this.images[i + 1]);\n  }\n\n  prev(e) {\n    e.preventDefault();\n    let i = this.images.findIndex((i) => i === this.url);\n    if (i === 0) {\n      i = this.images.length;\n    }\n    this.loadImage(this.images[i - 1]);\n  }\n\n  buildDOM(url) {\n    const lightbox = document.createElement(\"div\");\n    lightbox.classList.add(\"lightbox\");\n    lightbox.setAttribute(\"role\", \"dialog\");\n    lightbox.setAttribute(\"aria-hidden\", \"false\");\n    lightbox.innerHTML = `<button class=\"lightbox__close\" aria-label=\"Fermer\"><i  class=\" fas fa-times\" ></i></button>\n      <button tabindex=\"0\" aria-label=\"Précédent\" class=\"lightbox__prev\"><i class=\"fas fa-chevron-left\" ></i></button>\n      <button tabindex=\"0\" aria-label=\"Suivant\" class=\"lightbox__next\"><i class=\"fas fa-chevron-right\" ></i></button>\n      <div class=\"lightbox__container\">\n      </div>\n      `;\n\n    lightbox\n      .querySelector(\".lightbox__close\")\n      .addEventListener(\"click\", this.close.bind(this));\n    lightbox\n      .querySelector(\".lightbox__next\")\n      .addEventListener(\"click\", this.next.bind(this));\n    lightbox\n      .querySelector(\".lightbox__prev\")\n      .addEventListener(\"click\", this.prev.bind(this));\n    return lightbox;\n  }\n}\n\n\n//# sourceURL=webpack://bastienguillaumont_6_02082021/./public/js/Lightbox.js?");

/***/ }),

/***/ "./public/js/photographer.js":
/*!***********************************!*\
  !*** ./public/js/photographer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Lightbox__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Lightbox */ \"./public/js/Lightbox.js\");\n// Import de la Class\n\n\n// Déclaration des variables\nlet photographers;\nlet medias;\nlet mediasReset;\nlet totalLike = [];\n\n// Récupération de la data\nasync function fetchUser() {\n  const response = await fetch(\"../FishEyeData.json\");\n  const data = await response.json();\n  return data;\n}\n\n// On traite la Data\nfetchUser().then((data) => {\n  photographers = data.photographers;\n  medias = data.media;\n});\n\nwindow.addEventListener(\"DOMContentLoaded\", createPage());\nasync function createPage() {\n  await fetchUser();\n  recupHash();\n\n  photographers = photographers.filter((element) => {\n    return element.id == recupHash();\n  });\n  photographers.map((photographer) => createPhotographerInfo(photographer));\n  photographers.map((photographer) => createFooter(photographer));\n  medias = medias.filter((element) => {\n    return element.photographerId == recupHash();\n  });\n  mediasReset = medias;\n  medias.map((media) => createGallery(media));\n  viewModal();\n  addLike();\n  _Lightbox__WEBPACK_IMPORTED_MODULE_0__.default.init();\n  menuFilter();\n  filterReturn();\n}\n\n// On recupere le Hash\nconst recupHash = () => {\n  let hash = window.location.hash.substr(1);\n  return hash;\n};\n\n/// Creation de la partie info du photographe\nconst createPhotographerInfo = (photographer) => {\n  const photographerInfo = document.querySelector(\".infoPhotographer\");\n  photographerInfo.innerHTML += `\n      <div class=\"photographer__infos\">\n        <p tabindex=\"0\" aria-label=\"${\n          photographer.name\n        }\" class=\"photographer__name\">${photographer.name}</p>\n        <p tabindex=\"0\" aria-label=\"${photographer.city}, ${\n    photographer.country\n  }\" class=\"photographer__city\">${photographer.city}, ${\n    photographer.country\n  }</p>\n        <p tabindex=\"0\" aria-label=\"${\n          photographer.tagline\n        }\"class=\"photographer__slogan\">${photographer.tagline}</p>\n        <div aria-label=\"Filtrez les photos par themes\" class=\"photographer__tag\">${createTags(\n          photographer.tags\n        )}</div>\n      </div>\n\n\n      <div class=\"photographer__btn\">\n        <button class=\"btn contact\">Contactez-moi</button>\n      </div>\n\n      \n      <div class=\"photographer__pp\">\n        <img src=\"../img/IDPhotos/${photographer.portrait}\" alt=\"portrait de ${\n    photographer.portrait\n  } \" />\n        </div>`;\n};\n\n// Creation de chaque Tag sur la card\nconst createTags = (tags) => {\n  let addTag = \"\";\n  tags.forEach((tag) => {\n    addTag += `<a href=\"#\" class=\"photographer__tag__filters\">#${tag}</a>`;\n  });\n  return addTag;\n};\n\n// Creation de la  gallerie d'image\nconst createGallery = (media) => {\n  const gallery = document.querySelector(\".pictureGallery\");\n  if (media.video == undefined) {\n    gallery.innerHTML += `\n          <figure  class=\"cardphoto\">\n          <a  tabindex=\"-1\" href=\"../img/gallerie/${media.image}\">\n                <img\n                tabindex=\"0\"\n                  class=\"cardphoto__picture\"\n                  src=\"../img/gallerie/${media.image} \"\n                  alt=\"${media.title}\"\n                />\n                </a>\n                <figcaption class=\"cardphoto__info\" >\n                  <p aria-label=\"nom de la photo\" class=\"cardphoto__title\">${media.title}</p>\n                  <p tabindex=\"0\" aria-label=\"nombre de like ${media.likes}\" class=\"cardphoto__numberlike\">${media.likes}</p>\n                  <i tabindex=\"0\" role=\"button\" aria-label=\"ajouter ou supprimer le like\" class=\"cardphoto__icon fas fa-heart\"></i>\n                </figcaption>\n              </figure>\n          `;\n  } else {\n    gallery.innerHTML += `\n          <figure class=\"cardphoto\">\n          <a tabindex=\"-1\" href=\"../img/gallerie/${media.video}\">\n                <video\n                  class=\"cardphoto__picture\"\n                  type=\"video/mp4\"\n                  src=\"../img/gallerie/${media.video} \"\n                  controls\n                  alt=\"${media.title}\"\n                />\n                </a>\n                <figcaption class=\"cardphoto__info\" >\n                  <p aria-label=\"nom de la video \"class=\"cardphoto__title\">${media.title}</p>\n                  <p tabindex=\"0\" aria-label=\"nombre de like ${media.likes}\" class=\"cardphoto__numberlike\">${media.likes}</p>\n                  <i tabindex=\"0\" role=\"button\" aria-label=\"ajouter ou supprimer le like\" class=\"cardphoto__icon fas fa-heart\"></i>\n                </figcaption>\n              </figure>\n          `;\n  }\n\n  totalLike.push(media.likes);\n  totalLikes();\n};\n\n// Creation de la modal de contact\nconst createModalContact = (photographer) => {\n  document.body.innerHTML += `\n  <div class=\"bground\" aria-hidden=\"true\" role=\"dialog\" aria-labelby=\"modaltitle\">\n  <div class=\"modal\">\n    <button class=\"modal__close\" aria-label=\"Fermer la modale\"><i class=\"close fas fa-times\"></i></button>\n    <div id=\"modaltitle\" class=\"modal__title\">\n      Contactez-moi <br />\n      ${photographer.name}\n    </div>\n    <form action=\"\">\n      <label class=\"modal__label\" for=\"first\">Prénom</label>\n      <div class=\"first\"></div>\n      <br />\n      <input aria-required=\"true\" aria-invalid=\"false\" class=\"modal__input\" type=\"text\" id=\"first\" name=\"first\" />\n      <br />\n      <label class=\"modal__label\" for=\"last\">Nom</label>\n      <div class=\"last\"></div>\n      <br />\n      <input aria-required=\"true\" aria-invalid=\"false\" class=\"modal__input\" type=\"text\" id=\"last\" name=\"last\" />\n      <br />\n      <label class=\"modal__label\" for=\"email\">E-mail</label>\n      <div class=\"email\"></div>\n      <br />\n      <input aria-required=\"true\" aria-invalid=\"false\" class=\"modal__input\" type=\"email\" id=\"email\" name=\"email\" />\n      <br />\n      <label class=\"modal__label\" for=\"message\">Votre message</label>\n      <div class=\"message\"></div>\n      <br />\n      <textarea\n        aria-required=\"true\" \n        aria-invalid=\"false\"\n        class=\"modal__input\"\n        name=\"\"\n        id=\"message\"\n        min = \"30\"\n        cols=\"25\"\n        rows=\"5\"\n      ></textarea>\n      <input\n        class=\"btn-submit\"\n        type=\"submit\"\n        class=\"button\"\n        value=\"Envoyer\"\n      />\n      <p class=\"modal__message\" role=\"alert\" aria-label=\"Votre message a été envoyé\">Votre message a été envoyé</p>\n    </form>\n  </div>\n</div>\n  `;\n};\n\nconst createFooter = (photographer) => {\n  const footer = document.querySelector(\"footer\");\n  footer.innerHTML += `\n  <div class=\"like\">\n  <p tabindex=\"0\" aria-label=\"Nombre total de like\" class=\"like__compter\"></p>\n  <i class=\"like__icon fas fa-heart\"></i>\n  </div>\n  <div>\n  <p tabindex=\"0\" aria-label=\"prix ${photographer.price} €/jour\" class=\"price\">${photographer.price}€/jour</p>\n  </div>`;\n};\n\n/// GESTION DU FORMULAIRE\n\nconst viewModal = () => {\n  photographers.map((photographer) => createModalContact(photographer));\n  const iconModal = document.querySelector(\".modal__close\");\n  const btnContact = document.querySelector(\".contact\");\n  const main = document.querySelector(\"main\");\n\n  // Ouverture modal\n  btnContact.addEventListener(\"click\", () => {\n    const modal = document.querySelector(\".bground\");\n    modal.style.display = \"initial\";\n    modal.setAttribute(\"aria-hidden\", \"false\");\n    main.setAttribute(\"aria-hidden\", \"true\");\n    iconModal.focus();\n  });\n\n  //Fermeture modal\n  iconModal.addEventListener(\"click\", () => {\n    const modal = document.querySelector(\".bground\");\n    modal.style.display = \"none\";\n    modal.setAttribute(\"aria-hidden\", \"true\");\n    main.setAttribute(\"aria-hidden\", \"false\");\n    document.querySelector(\".modal__message\").style.display = \"none\";\n    form.reset();\n    resetError(first, errorFirst);\n    resetError(last, errorLast);\n    resetError(email, errorMail);\n    resetError(message, errorMessage);\n  });\n\n  document.addEventListener(\"keyup\", (e) => {\n    if (e.key === \"Escape\") {\n      const modal = document.querySelector(\".bground\");\n      modal.style.display = \"none\";\n      modal.setAttribute(\"aria-hidden\", \"true\");\n      main.setAttribute(\"aria-hidden\", \"false\");\n      document.querySelector(\".modal__message\").style.display = \"none\";\n      form.reset();\n      resetError(first, errorFirst);\n      resetError(last, errorLast);\n      resetError(email, errorMail);\n      resetError(message, errorMessage);\n    }\n  });\n\n  // Traitement du formulaire\n  const form = document.querySelector(\"form\"); // Formulaire\n  // Regex\n  const nameReg = new RegExp(/^[a-zA-Z\\-]{2,}$/i); //Regex name qui ne doit comporter que des lettres et 2 caractères min\n  const emailReg = new RegExp(/^[\\w\\_\\.\\-]+@[\\w]+.[a-z]{2,3}$/i); //Regex mail\n  const messReg = new RegExp(/^[\\w\\s\\D]{30,}$/i); //Regex message 30 caractères min\n\n  // DOM Formulaire\n  const first = document.getElementById(\"first\"); // DOM Formulaire Prénom\n  const last = document.getElementById(\"last\"); // DOM Formulaire Nom\n  const email = document.getElementById(\"email\"); // Formulaire E-mail\n  const message = document.getElementById(\"message\"); // Formulaire E-mail\n  const errorFirst = document.querySelector(\".first\");\n  const errorLast = document.querySelector(\".last\");\n  const errorMail = document.querySelector(\".email\");\n  const errorMessage = document.querySelector(\".message\");\n\n  function resetError(selector, selectorError) {\n    selector.classList.remove(\"error-input\");\n    selector.setAttribute(\"aria-invalid\", \"false\");\n    selectorError.textContent = \"\";\n  }\n\n  form.addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    if (isFormValid() === true) {\n      document.querySelector(\".modal__message\").style.display = \"initial\";\n      document.querySelector(\".modal__message\").focus();\n      form.reset();\n    }\n  });\n\n  // Verification du prémon\n  function isFirstValid() {\n    if (!nameReg.test(first.value)) {\n      console.log(first.value);\n      errorFirst.textContent = \"Veuillez entrer au moins deux caractères\";\n      first.classList.add(\"error-input\");\n      first.setAttribute(\"aria-invalid\", \"true\");\n      first.setAttribute(\"role\", \"alert\");\n      first.setAttribute(\n        \"aria-label\",\n        \"Veuillez entrer au moins deux caractères\"\n      );\n      first.focus();\n      return false;\n    } else {\n      resetError(first, errorFirst);\n      return true;\n    }\n  }\n  // Verification du nom\n  function isLastValid() {\n    if (!nameReg.test(last.value)) {\n      errorLast.textContent = \"Veuillez entrer au moins deux caractères\";\n      last.classList.add(\"error-input\");\n      last.setAttribute(\"aria-invalid\", \"true\");\n      last.setAttribute(\"role\", \"alert\");\n      last.setAttribute(\n        \"aria-label\",\n        \"Veuillez entrer au moins deux caractères\"\n      );\n      last.focus();\n      return false;\n    } else {\n      resetError(last, errorLast);\n      return true;\n    }\n  }\n  // Verification de l'email\n  function isEmailValid() {\n    if (!emailReg.test(email.value)) {\n      errorMail.textContent = \"Veuillez entrer une adresse mail valide\";\n      email.classList.add(\"error-input\");\n      email.setAttribute(\"aria-invalid\", \"true\");\n      email.setAttribute(\"role\", \"alert\");\n      email.setAttribute(\n        \"aria-label\",\n        \"Veuillez entrer une adresse mail valide\"\n      );\n      email.focus();\n      return false;\n    } else {\n      resetError(email, errorMail);\n      return true;\n    }\n  }\n  // Verification du message\n  function isMessageValid() {\n    if (!messReg.test(message.value)) {\n      errorMessage.textContent =\n        \"Votre message doit comporter au moins 30 caractères\";\n      message.classList.add(\"error-input\");\n      message.setAttribute(\"aria-invalid\", \"true\");\n      message.focus();\n      return false;\n    } else {\n      resetError(message, errorMessage);\n      return true;\n    }\n  }\n\n  // Verification du formulaire\n  function isFormValid() {\n    if (\n      isFirstValid() === false ||\n      isLastValid() === false ||\n      isEmailValid() === false ||\n      isMessageValid() === false\n    ) {\n      return false;\n    } else {\n      return true;\n    }\n  }\n};\n\n// On ajoute les likes au click\nconst addLike = () => {\n  const iconsLike = document.querySelectorAll(\".cardphoto__icon\");\n  const totalLike = document.querySelector(\".like__compter\");\n  iconsLike.forEach((icon) =>\n    icon.addEventListener(\"click\", () => {\n      icon.classList.toggle(\"click\");\n      if (icon.classList.contains(\"click\")) {\n        icon.previousElementSibling.innerText++;\n        totalLike.innerText++;\n      } else {\n        icon.previousElementSibling.innerText--;\n        totalLike.innerText--;\n      }\n    })\n  );\n  iconsLike.forEach((icon) => {\n    icon.addEventListener(\"keyup\", (e) => {\n      if (e.key === \"Enter\") {\n        icon.classList.toggle(\"click\");\n        if (icon.classList.contains(\"click\")) {\n          icon.previousElementSibling.innerText++;\n          totalLike.innerText++;\n        } else {\n          icon.previousElementSibling.innerText--;\n          totalLike.innerText--;\n        }\n      }\n    });\n  });\n};\n\n//On compte le nombre total de likes\nconst totalLikes = () => {\n  let total = 0;\n  for (let i = 0; i < totalLike.length; i++) {\n    total += totalLike[i];\n  }\n  document.querySelector(\".like__compter\").innerText = total;\n  document\n    .querySelector(\".like__compter\")\n    .setAttribute(\"aria-label\", \"Nombre total de like \" + total);\n};\n\n// Fonction pour le tri de la gallerie\nconst menuFilter = () => {\n  const iconBtn = document.querySelector(\".filterpicture__icon\");\n  const icon = document.querySelector(\".fa-chevron-down\");\n  const menu = document.querySelector(\".filterpicture__bloc\");\n  const gallery = document.querySelector(\".pictureGallery\");\n  let links = Array.from(document.querySelectorAll(\".filterpicture__link\"));\n  const input = document.querySelector(\".filterpicture__select\");\n  let selected = document.querySelector(\".select\");\n\n  let id;\n\n  iconBtn.addEventListener(\"click\", () => {\n    menu.classList.toggle(\"invisible\");\n    menu.setAttribute(\"aria-expanded\", \"true\");\n    icon.classList.toggle(\"rotate\");\n    selected.classList.remove(\"select\");\n    input.style.display = \"none\";\n  });\n\n  iconBtn.addEventListener(\"keyup\", (e) => {\n    if (e.key === \"Enter\") {\n      menu.classList.toggle(\"invisible\");\n      menu.setAttribute(\"aria-expanded\", \"true\");\n      icon.classList.toggle(\"rotate\");\n      selected.classList.remove(\"select\");\n      input.style.display = \"none\";\n    }\n  });\n\n  links.forEach((link) =>\n    link.addEventListener(\"click\", () => {\n      menu.classList.add(\"invisible\");\n      menu.setAttribute(\"aria-expanded\", \"false\");\n      icon.classList.remove(\"rotate\");\n      link.classList.add(\"select\");\n      input.style.display = \"initial\";\n      let texte = document.querySelector(\".select\").textContent;\n      id = link.id;\n      input.innerText = texte;\n      // tri par date\n      if (id == \"date\") {\n        medias.sort(function (a, b) {\n          return new Date(b.date) - new Date(a.date);\n        });\n        gallery.innerHTML = \"\";\n        medias.map((media) => createGallery(media));\n        viewModal();\n        addLike();\n        _Lightbox__WEBPACK_IMPORTED_MODULE_0__.default.init();\n        menuFilter();\n        filterReturn();\n      }\n      // tri par likes\n      else if (id == \"popular\") {\n        medias.sort(function (a, b) {\n          if (a.likes > b.likes) {\n            return -1;\n          }\n        });\n        gallery.innerHTML = \"\";\n        medias.map((media) => createGallery(media));\n        viewModal();\n        addLike();\n        _Lightbox__WEBPACK_IMPORTED_MODULE_0__.default.init();\n        menuFilter();\n        filterReturn();\n      }\n      // tri par titre\n      else if (id == \"title\") {\n        medias.sort(function (a, b) {\n          if (a.title < b.title) {\n            return -1;\n          }\n        });\n        gallery.innerHTML = \"\";\n        medias.map((media) => createGallery(media));\n        viewModal();\n        addLike();\n        _Lightbox__WEBPACK_IMPORTED_MODULE_0__.default.init();\n        menuFilter();\n        filterReturn();\n      }\n    })\n  );\n};\n\n// Permet de filter les photos suivant le tag selectionné\n\nfunction filterReturn() {\n  const gallery = document.querySelector(\".pictureGallery\");\n  const filters = Array.from(\n    document.querySelectorAll(\".photographer__tag__filters\")\n  );\n  let filterSelected = null;\n  filters.forEach((filter) =>\n    filter.addEventListener(\"click\", (e) => {\n      e.preventDefault;\n      if (filterSelected === null) {\n        filter.classList.add(\"tagselect\");\n        filterSelected = e.target.textContent.slice(1);\n        medias = medias.filter((media) => {\n          return media.tags == filterSelected;\n        });\n        gallery.innerHTML = \"\";\n        medias.map((media) => createGallery(media));\n      } else if (filterSelected === e.target.textContent.slice(1)) {\n        filter.classList.remove(\"tagselect\");\n        filterSelected === null;\n        console.log(filterSelected);\n        medias = mediasReset;\n        gallery.innerHTML = \"\";\n        medias.map((media) => createGallery(media));\n      } else if (filterSelected != e.target.textContent.slice(1)) {\n        filters.forEach((filter) => filter.classList.remove(\"tagselect\"));\n        filter.classList.add(\"tagselect\");\n        filterSelected = e.target.textContent.slice(1);\n        medias = mediasReset;\n        gallery.innerHTML = \"\";\n        medias = medias.filter((media) => {\n          return media.tags == filterSelected;\n        });\n        medias.map((media) => createGallery(media));\n      }\n    })\n  );\n}\n\n\n//# sourceURL=webpack://bastienguillaumont_6_02082021/./public/js/photographer.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/photographer.js");
/******/ 	
/******/ })()
;