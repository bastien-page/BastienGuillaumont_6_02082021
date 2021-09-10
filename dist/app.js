/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/PhotographerCard.js":
/*!***************************************!*\
  !*** ./public/js/PhotographerCard.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ PhotographerCreateCard)\n/* harmony export */ });\nclass PhotographerCreateCard {\n  constructor(selector, photographer) {\n    this.selector = selector;\n    this.photographer = photographer;\n    this.buildCard(photographer);\n  }\n\n  buildCard(photographer) {\n    const card = document.createElement(\"article\");\n    card.classList.add(\"card\");\n    card.setAttribute(\"aria-label\", \"information photographe\");\n    const link = document.createElement(\"a\");\n    link.setAttribute(\"aria-label\", photographer.name);\n    const pictureProfil = document.createElement(\"img\");\n    pictureProfil.classList.add(\"card__photo\");\n    pictureProfil.setAttribute(\"aria-label\", \"portrait du photographe\");\n    const name = document.createElement(\"p\");\n    name.classList.add(\"card__name\");\n    const city = document.createElement(\"p\");\n    city.classList.add(\"card__location\");\n    const slogan = document.createElement(\"p\");\n    slogan.classList.add(\"card__slogan\");\n    const price = document.createElement(\"p\");\n    price.classList.add(\"card__price\");\n    const tags = document.createElement(\"div\");\n    tags.classList.add(\"card__tag\");\n    tags.setAttribute(\"aria-label\", \"centre d'interet\");\n\n    this.selector.appendChild(card);\n    card.appendChild(link);\n    link.appendChild(pictureProfil);\n    link.appendChild(name);\n    link.appendChild(city);\n    link.appendChild(slogan);\n    link.appendChild(price);\n    link.appendChild(tags);\n\n    link.setAttribute(\n      \"href\",\n      \"./html/photographerpage.html#\" + photographer.id\n    );\n    pictureProfil.setAttribute(\n      \"src\",\n      \"../public/img/IDPhotos/\" + photographer.portrait\n    );\n    name.innerText = photographer.name;\n    city.innerText = photographer.city + \", \" + photographer.country;\n    slogan.innerText = photographer.tagline;\n    price.innerText = photographer.price + \"€/jour\";\n\n    tags.innerHTML = this.createTag(photographer.tags);\n\n    return card;\n  }\n\n  createTag(tags) {\n    let addTag = \"\";\n    tags.forEach((tag) => {\n      addTag += `<div role=\"button\" class=\"card__tag-filter\">#${tag}</div>`;\n    });\n    return addTag;\n  }\n}\n\n\n//# sourceURL=webpack://bastienguillaumont_6_02082021/./public/js/PhotographerCard.js?");

/***/ }),

/***/ "./public/js/index.js":
/*!****************************!*\
  !*** ./public/js/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PhotographerCard */ \"./public/js/PhotographerCard.js\");\n/* harmony import */ var _photographer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./photographer */ \"./public/js/photographer.js\");\n/* harmony import */ var _photographer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_photographer__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\n/* *******************************\n *     RECUPERATION DE LA DATA   *\n ****************************** */\n\n// On recupère la data\nconst fetchUser = async (url) => {\n  const response = await fetch(url);\n  const data = await response.json();\n  return data;\n};\n\n// On traite la Data\nlet photographers;\nlet photographersReset;\nlet media;\nfetchUser(\"FishEyeData.json\").then((data) => {\n  photographers = data.photographers;\n  photographersReset = data.photographers;\n  media = data.media;\n  photographers.map(\n    (photographer) =>\n      new _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__.default(document.querySelector(\"main\"), photographer)\n  );\n  console.log(photographers);\n  console.log(media);\n  btnScroll();\n  addfilter();\n  if (!_photographer__WEBPACK_IMPORTED_MODULE_1__.filterSelected == null) {\n    activeFilters = _photographer__WEBPACK_IMPORTED_MODULE_1__.filterSelected;\n  }\n  //filterReturn();\n});\n\n// Filters selection des photographes\nfunction addfilter() {\n  let activeFilters = null;\n  let main = document.querySelector(\"main\");\n  const filters = Array.from(document.querySelectorAll(\".filter\"));\n  filters.forEach((filter) => {\n    filter.addEventListener(\"click\", (e) => {\n      if (activeFilters === null) {\n        activeFilters = e.target.id;\n        photographers = photographers.filter((element) => {\n          return element.tags.includes(activeFilters);\n        });\n        main.innerHTML = \"\";\n        console.log(photographers);\n        photographers.map(\n          (photographer) => new _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__.default(main, photographer)\n        );\n        filter.classList.add(\"filter-selected\");\n      } else if (activeFilters === e.target.id) {\n        activeFilters = null;\n        filter.classList.remove(\"filter-selected\");\n        main.innerHTML = \"\";\n        photographers = photographersReset;\n        photographers.map(\n          (photographer) => new _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__.default(main, photographer)\n        );\n      } else if (activeFilters != e.target.id) {\n        filters.forEach((filter) => filter.classList.remove(\"filter-selected\"));\n        filter.classList.add(\"filter-selected\");\n        photographers = photographersReset;\n        activeFilters = e.target.id;\n        photographers = photographers.filter((element) => {\n          return element.tags.includes(activeFilters);\n        });\n        main.innerHTML = \"\";\n        photographers.map(\n          (photographer) => new _PhotographerCard__WEBPACK_IMPORTED_MODULE_0__.default(main, photographer)\n        );\n      }\n    });\n  });\n}\n\n// Création du Bouton scroll et ajout de l'écouteur\nconst btnScroll = () => {\n  document.body.innerHTML += `\n    <div role=\"button\" class=\"btn_scroll\">\n      <a href=\"#main\">Passer au contenu</a>\n    </div>\n    `;\n  let btn = document.querySelector(\".btn_scroll\");\n  document.addEventListener(\"scroll\", (e) => {\n    if (window.scrollY > 5) {\n      btn.style.top = \"10px\";\n    } else {\n      btn.style.top = \"-100px\";\n    }\n  });\n};\n\n\n//# sourceURL=webpack://bastienguillaumont_6_02082021/./public/js/index.js?");

/***/ }),

/***/ "./public/js/photographer.js":
/*!***********************************!*\
  !*** ./public/js/photographer.js ***!
  \***********************************/
/***/ (() => {

eval("//export { filterSelected };\n\n/* *******************************\n *     RECUPERATION DE LA DATA   *\n ****************************** */\n\nasync function fetchUser() {\n  const response = await fetch(\"../FishEyeData.json\");\n  const data = await response.json();\n  return data;\n}\n\nlet photographers;\nlet medias;\n\n// On traite la Data\nfetchUser().then((data) => {\n  photographers = data.photographers;\n  medias = data.media;\n});\n\nwindow.addEventListener(\"DOMContentLoaded\", createPage());\nasync function createPage() {\n  await fetchUser();\n  recupHash();\n  photographers = photographers.filter((element) => {\n    return element.id == recupHash();\n  });\n  photographers.map((photographer) => createPhotographerInfo(photographer));\n  photographers.map((photographer) => createFooter(photographer));\n  medias = medias.filter((element) => {\n    return element.photographerId == recupHash();\n  });\n  console.log(medias);\n  medias.map((media) => createGallery(media));\n  viewModal();\n  totalLikes();\n  addLike();\n  Lightbox.init();\n  menuFilter();\n  filterReturn();\n}\n\n// On recupere le Hash\nconst recupHash = () => {\n  hash = window.location.hash.substr(1);\n  return hash;\n};\n\n/// Creation de la partie info du photographe\nconst createPhotographerInfo = (photographer) => {\n  const photographerInfo = document.querySelector(\".infoPhotographer\");\n  photographerInfo.innerHTML += `\n      <div class=\"photographer__infos\">\n        <p aria-label=\"nom du photographe\" class=\"photographer__name\">${\n          photographer.name\n        }</p>\n        <p aria-label=\"ville\" class=\"photographer__city\">${\n          photographer.city\n        }, ${photographer.country}</p>\n        <p class=\"photographer__slogan\">${photographer.tagline}</p>\n        <div aria-label=\"centre d'interet\" class=\"photographer__tag\">${createTags(\n          photographer.tags\n        )}</div>\n      </div>\n\n\n      <div class=\"photographer__btn\">\n        <button class=\"btn contact\">Contactez-moi</button>\n      </div>\n\n      \n      <div class=\"photographer__pp\">\n        <img src=\"../img/IDPhotos/${photographer.portrait}\" alt=\"portrait de ${\n    photographer.portrait\n  } \" />\n        </div>`;\n};\n\n// Creation de chaque Tag sur la card\nconst createTags = (tags) => {\n  let addTag = \"\";\n  tags.forEach((tag) => {\n    addTag += `<a href=\"../index.html\" class=\"photographer__tag__filters\">#${tag}</a>`;\n  });\n  return addTag;\n};\n\nlet totalLike = [];\n\n// Creation de la  gallerie d'image\nconst createGallery = (media) => {\n  const gallery = document.querySelector(\".pictureGallery\");\n  if (media.video == undefined) {\n    gallery.innerHTML += `\n          <figure class=\"cardphoto\">\n          <a href=\"../img/gallerie/${media.image}\">\n                <img\n                  class=\"cardphoto__picture\"\n                  src=\"../img/gallerie/${media.image} \"\n                  alt=\"${media.title}\"\n                />\n                \n                </a>\n                <figcaption class=\"cardphoto__info\" >\n                  <p aria-label=\"nom de la photo\" class=\"cardphoto__title\">${media.title}</p>\n                  <p tabindex=\"0\" aria-label=\"nombre de likes\" class=\"cardphoto__numberlike\">${media.likes}</p>\n                  <i tabindex=\"0\" role=\"button\" aria-label=\"ajouter ou supprimer le like\" class=\"cardphoto__icon fas fa-heart\"></i>\n                </figcaption>\n              </figure>\n          `;\n  } else {\n    gallery.innerHTML += `\n          <figure class=\"cardphoto\">\n          <a href=\"../img/gallerie/${media.video}\">\n                <video\n                  class=\"cardphoto__picture\"\n                  type=\"video/mp4\"\n                  src=\"../img/gallerie/${media.video} \"\n                  controls\n                  alt=\"${media.title}\"\n                />\n                </a>\n                <figcaption class=\"cardphoto__info\" >\n                  <p aria-label=\"nom de la video \"class=\"cardphoto__title\">${media.title}</p>\n                  <p tabindex=\"0\" aria-label=\"nombre de likes\" class=\"cardphoto__numberlike\">${media.likes}</p>\n                  <i tabindex=\"0\" role=\"button\" aria-label=\"ajouter ou supprimer le like\" class=\"cardphoto__icon fas fa-heart\"></i>\n                </figcaption>\n              </figure>\n          `;\n  }\n\n  totalLike.push(media.likes);\n};\n\n// Creation de la modal de contact\nconst createModalContact = (photographer) => {\n  document.body.innerHTML += `\n  <div class=\"bground\" aria-hidden=\"true\" role=\"dialog\" aria-labelby=\"modaltitle\">\n  <div class=\"modal\">\n    <button class=\"modal__close\"><i class=\"close fas fa-times\"></i></button>\n    <div id=\"modaltitle\" class=\"modal__title\">\n      Contactez-moi <br />\n      ${photographer.name}\n    </div>\n    <form action=\"\">\n      <label class=\"modal__label\" for=\"first\">Prénom</label>\n      <div class=\"first\"></div>\n      <br />\n      <input aria-required=\"true\" aria-invalid=\"false\" class=\"modal__input\" type=\"text\" id=\"first\" name=\"first\" />\n      <br />\n      <label class=\"modal__label\" for=\"last\">Nom</label>\n      <div class=\"last\"></div>\n      <br />\n      <input aria-required=\"true\" aria-invalid=\"false\" class=\"modal__input\" type=\"text\" id=\"last\" name=\"last\" />\n      <br />\n      <label class=\"modal__label\" for=\"email\">E-mail</label>\n      <div class=\"email\"></div>\n      <br />\n      <input aria-required=\"true\" aria-invalid=\"false\" class=\"modal__input\" type=\"email\" id=\"email\" name=\"email\" />\n      <br />\n      <label class=\"modal__label\" for=\"message\">Votre message</label>\n      <div class=\"message\"></div>\n      <br />\n      <textarea\n        aria-required=\"true\" \n        aria-invalid=\"false\"\n        class=\"modal__input\"\n        name=\"\"\n        id=\"message\"\n        min = \"30\"\n        cols=\"25\"\n        rows=\"5\"\n      ></textarea>\n      <input\n        class=\"btn-submit\"\n        type=\"submit\"\n        class=\"button\"\n        value=\"Envoyer\"\n      />\n      <p class=\"modal__message\">Votre message a été envoyé</p>\n    </form>\n  </div>\n</div>\n  `;\n};\n\nconst createFooter = (photographer) => {\n  const footer = document.querySelector(\"footer\");\n  footer.innerHTML += `\n  <div class=\"like\">\n  <p tabindex=\"0\" aria-label=\"Nombre total de likes\" class=\"like__compter\"></p>\n  <i class=\"like__icon fas fa-heart\"></i>\n  </div>\n  <div>\n  <p tabindex=\"0\" aria-label=\"prix\" class=\"price\">${photographer.price}€/jour</p>\n  </div>`;\n};\n\n/// GESTION DU FORMULAIRE\n\nconst viewModal = () => {\n  photographers.map((photographer) => createModalContact(photographer));\n  const iconModal = document.querySelector(\".modal__close\");\n  const btnContact = document.querySelector(\".contact\");\n  const main = document.querySelector(\"main\");\n\n  // Ouverture modal\n  btnContact.addEventListener(\"click\", () => {\n    const modal = document.querySelector(\".bground\");\n    modal.style.display = \"initial\";\n    modal.setAttribute(\"aria-hidden\", \"false\");\n    main.setAttribute(\"aria-hidden\", \"true\");\n    iconModal.focus();\n  });\n\n  //Fermeture modal\n  iconModal.addEventListener(\"click\", () => {\n    const modal = document.querySelector(\".bground\");\n    modal.style.display = \"none\";\n    modal.setAttribute(\"aria-hidden\", \"true\");\n    main.setAttribute(\"aria-hidden\", \"false\");\n    document.querySelector(\".modal__message\").style.display = \"none\";\n    form.reset();\n  });\n\n  // Traitement du formulaire\n  const form = document.querySelector(\"form\"); // Formulaire\n  // Regex\n  const nameReg = new RegExp(/^[a-zA-Z\\-]{2,}$/i); //Regex name qui ne doit comporter que des lettres et 2 caractères min\n  const emailReg = new RegExp(/^[\\w\\_\\.\\-]+@[\\w]+.[a-z]{2,3}$/i); //Regex mail\n  const messReg = new RegExp(/^[\\w\\s\\D]{30,}$/i); //Regex message 30 caractères min\n\n  // DOM Formulaire\n  const first = document.getElementById(\"first\"); // DOM Formulaire Prénom\n  const last = document.getElementById(\"last\"); // DOM Formulaire Nom\n  const email = document.getElementById(\"email\"); // Formulaire E-mail\n  const message = document.getElementById(\"message\"); // Formulaire E-mail\n\n  form.addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    if (isFormValid() === true) {\n      document.querySelector(\".modal__message\").style.display = \"initial\";\n      form.reset();\n    }\n  });\n\n  // Verification du prémon\n  function isFirstValid() {\n    let error = document.querySelector(\".first\");\n\n    console.log(first);\n    if (!nameReg.test(first.value)) {\n      console.log(first.value);\n      error.textContent = \"Veuillez entrer au moins deux caractères\";\n      first.classList.add(\"error-input\");\n      first.setAttribute(\"aria-invalid\", \"true\");\n      return false;\n    } else {\n      first.classList.remove(\"error-input\");\n      first.setAttribute(\"aria-invalid\", \"false\");\n      error.textContent = \"\";\n      return true;\n    }\n  }\n  // Verification du nom\n  function isLastValid() {\n    let error = document.querySelector(\".last\");\n    if (!nameReg.test(last.value)) {\n      error.textContent = \"Veuillez entrer au moins deux caractères\";\n      last.classList.add(\"error-input\");\n      last.setAttribute(\"aria-invalid\", \"true\");\n      return false;\n    } else {\n      last.classList.remove(\"error-input\");\n      last.setAttribute(\"aria-invalid\", \"false\");\n      error.textContent = \"\";\n      return true;\n    }\n  }\n  // Verification de l'email\n  function isEmailValid() {\n    let error = document.querySelector(\".email\");\n    if (!emailReg.test(email.value)) {\n      error.textContent = \"Veuillez entrer une adresse mail valide\";\n      email.classList.add(\"error-input\");\n      email.setAttribute(\"aria-invalid\", \"true\");\n      return false;\n    } else {\n      email.classList.remove(\"error-input\");\n      email.setAttribute(\"aria-invalid\", \"false\");\n      error.textContent = \"\";\n      return true;\n    }\n  }\n  // Verification du message\n  function isMessageValid() {\n    let error = document.querySelector(\".message\");\n    if (!messReg.test(message.value)) {\n      error.textContent = \"Votre message doit comporter au moins 30 caractères\";\n      message.classList.add(\"error-input\");\n      message.setAttribute(\"aria-invalid\", \"true\");\n      return false;\n    } else {\n      message.classList.remove(\"error-input\");\n      message.setAttribute(\"aria-invalid\", \"false\");\n      error.textContent = \"\";\n      return true;\n    }\n  }\n  // Verification du formulaire\n  function isFormValid() {\n    if (\n      isFirstValid() === false ||\n      isLastValid() === false ||\n      isEmailValid() === false ||\n      isMessageValid() === false\n    ) {\n      return false;\n    } else {\n      return true;\n    }\n  }\n};\n\n// On ajoute les likes au click\nconst addLike = () => {\n  const iconsLike = document.querySelectorAll(\".cardphoto__icon\");\n  const totalLike = document.querySelector(\".like__compter\");\n  iconsLike.forEach((icon) =>\n    icon.addEventListener(\"click\", () => {\n      icon.classList.toggle(\"click\");\n      if (icon.classList.contains(\"click\")) {\n        icon.previousElementSibling.innerText++;\n        totalLike.innerText++;\n      } else {\n        icon.previousElementSibling.innerText--;\n        totalLike.innerText--;\n      }\n    })\n  );\n  iconsLike.forEach((icon) => {\n    icon.addEventListener(\"keyup\", (e) => {\n      if (e.key === \"Enter\") {\n        icon.classList.toggle(\"click\");\n        if (icon.classList.contains(\"click\")) {\n          icon.previousElementSibling.innerText++;\n          totalLike.innerText++;\n        } else {\n          icon.previousElementSibling.innerText--;\n          totalLike.innerText--;\n        }\n      }\n    });\n  });\n};\n\n//On compte le nombre de likes\nconst totalLikes = () => {\n  let total = 0;\n  for (i = 0; i < totalLike.length; i++) {\n    total += totalLike[i];\n  }\n  document.querySelector(\".like__compter\").innerText = total;\n};\n\n// Creation de la Lightbox\nclass Lightbox {\n  static init() {\n    const links = Array.from(\n      document.querySelectorAll('a[href$=\".jpg\"], a[href$=\".mp4\"]')\n    );\n    const images = links.map((link) => link.getAttribute(\"href\"));\n    const titles = links.map(\n      (link) => link.firstElementChild.attributes.alt.value\n    );\n    links.forEach((link) =>\n      link.addEventListener(\"click\", (e) => {\n        e.preventDefault();\n        new Lightbox(e.currentTarget.getAttribute(\"href\"), images, titles);\n        document.querySelector(\"main\").setAttribute(\"aria-hidden\", \"true\");\n      })\n    );\n  }\n\n  constructor(url, images, titles) {\n    this.element = this.buildDOM(url);\n    this.images = images;\n    this.titles = titles;\n    this.loadImage(url);\n    this.onKeyUp = this.onKeyUp.bind(this);\n    document.body.appendChild(this.element);\n    document.addEventListener(\"keyup\", this.onKeyUp);\n    document.querySelector(\".lightbox__close\").focus();\n  }\n\n  loadImage(url) {\n    // Avoir pour optimiser\n    const links = Array.from(\n      document.querySelectorAll('a[href$=\".jpg\"], a[href$=\".mp4\"]')\n    );\n    const images = links.map((link) => link.getAttribute(\"href\"));\n    ////\n    this.url = null;\n    const image = document.createElement(\"img\");\n    const video = document.createElement(\"video\");\n    video.setAttribute(\"type\", \"video/mp4\");\n    video.setAttribute(\"controls\", \"controls\");\n    const container = this.element.querySelector(\".lightbox__container\");\n    const imageTitle = document.createElement(\"p\");\n    imageTitle.classList.add(\"lightbox__title\");\n    imageTitle.textContent = \"\";\n    container.innerHTML = \"\";\n    this.url = url;\n    imageTitle.textContent = this.titles[images.indexOf(url)];\n    if (url.includes(\".mp4\")) {\n      container.appendChild(video);\n      video.src = url;\n    } else {\n      container.appendChild(image);\n      image.src = url;\n    }\n    container.appendChild(imageTitle);\n  }\n\n  onKeyUp(e) {\n    if (e.key === \"Escape\") {\n      this.close(e);\n    } else if (e.key === \"ArrowRight\") {\n      this.next(e);\n    } else if (e.key === \"ArrowLeft\") {\n      this.prev(e);\n    }\n  }\n\n  close(e) {\n    e.preventDefault();\n    this.element.classList.add(\"fadeOut\");\n    window.setTimeout(() => {\n      this.element.parentElement.removeChild(this.element);\n    }, 500);\n    document.removeEventListener(\"keyup\", this.onKeyUp);\n    document.querySelector(\"main\").setAttribute(\"aria-hidden\", \"false\");\n  }\n\n  next(e) {\n    e.preventDefault();\n    let i = this.images.findIndex((i) => i === this.url);\n    if (i === this.images.length - 1) {\n      i = -1;\n    }\n    this.loadImage(this.images[i + 1]);\n  }\n\n  prev(e) {\n    e.preventDefault();\n    let i = this.images.findIndex((i) => i === this.url);\n    if (i === 0) {\n      i = this.images.length;\n    }\n    this.loadImage(this.images[i - 1]);\n  }\n\n  buildDOM(url) {\n    const lightbox = document.createElement(\"div\");\n    lightbox.classList.add(\"lightbox\");\n    lightbox.setAttribute(\"role\", \"dialog\");\n    lightbox.setAttribute(\"aria-hidden\", \"false\");\n    lightbox.innerHTML = `<button class=\"lightbox__close\" aria-label=\"Fermer\"><i  class=\" fas fa-times\" ></i></button>\n      <button tabindex=\"0\" aria-label=\"Précédent\" class=\"lightbox__prev\"><i class=\"fas fa-chevron-left\" ></i></button>\n      <button tabindex=\"0\" aria-label=\"Suivant\" class=\"lightbox__next\"><i class=\"fas fa-chevron-right\" ></i></button>\n      <div class=\"lightbox__container\">\n      </div>\n      `;\n\n    lightbox\n      .querySelector(\".lightbox__close\")\n      .addEventListener(\"click\", this.close.bind(this));\n    lightbox\n      .querySelector(\".lightbox__next\")\n      .addEventListener(\"click\", this.next.bind(this));\n    lightbox\n      .querySelector(\".lightbox__prev\")\n      .addEventListener(\"click\", this.prev.bind(this));\n    return lightbox;\n  }\n}\n\n// Fonction pour le tri de la gallerie\nconst menuFilter = () => {\n  const iconBtn = document.querySelector(\".filterpicture__icon\");\n  const icon = document.querySelector(\".fas\");\n  const menu = document.querySelector(\".filterpicture__bloc\");\n  const gallery = document.querySelector(\".pictureGallery\");\n  let links = Array.from(document.querySelectorAll(\".filterpicture__link\"));\n  const input = document.querySelector(\".filterpicture__select\");\n  let selected = document.querySelector(\".select\");\n\n  let id;\n\n  iconBtn.addEventListener(\"click\", () => {\n    menu.classList.toggle(\"invisible\");\n    menu.setAttribute(\"aria-expanded\", \"true\");\n    icon.classList.toggle(\"rotate\");\n    selected.classList.remove(\"select\");\n    input.style.display = \"none\";\n  });\n\n  links.forEach((link) =>\n    link.addEventListener(\"click\", (e) => {\n      menu.classList.add(\"invisible\");\n      menu.setAttribute(\"aria-expanded\", \"false\");\n      icon.classList.remove(\"rotate\");\n      link.classList.add(\"select\");\n      input.style.display = \"initial\";\n\n      let texte = document.querySelector(\".select\").textContent;\n      id = link.id;\n      input.innerText = texte;\n      // tri par date\n      if (id == \"date\") {\n        medias.sort(function (a, b) {\n          return new Date(b.date) - new Date(a.date);\n        });\n        gallery.innerHTML = \"\";\n        medias.map((media) => createGallery(media));\n        viewModal();\n        addLike();\n        Lightbox.init();\n        menuFilter();\n      }\n      // tri par likes\n      else if (id == \"popular\") {\n        medias.sort(function (a, b) {\n          if (a.likes > b.likes) {\n            return -1;\n          }\n        });\n        gallery.innerHTML = \"\";\n        medias.map((media) => createGallery(media));\n        viewModal();\n        addLike();\n        Lightbox.init();\n        menuFilter();\n      }\n      // tri par titre\n      else if (id == \"title\") {\n        medias.sort(function (a, b) {\n          if (a.title < b.title) {\n            return -1;\n          }\n        });\n        gallery.innerHTML = \"\";\n        medias.map((media) => createGallery(media));\n        viewModal();\n        addLike();\n        Lightbox.init();\n        menuFilter();\n      }\n    })\n  );\n};\n\nlet filterSelected = null;\n\nfunction filterReturn() {\n  const filters = Array.from(\n    document.querySelectorAll(\".photographer__tag__filters\")\n  );\n  filters.forEach((filter) =>\n    filter.addEventListener(\"click\", (e) => {\n      filterSelected = e.target.textContent.slice(1);\n      console.log(filterSelected);\n      return filterSelected;\n    })\n  );\n}\n\n\n//# sourceURL=webpack://bastienguillaumont_6_02082021/./public/js/photographer.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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