// Import de la Class
import Lightbox from "./Lightbox";

// Déclaration des variables
let photographers;
let medias;
let mediasReset;
let totalLike = [];

// Récupération de la data
async function fetchUser() {
  const response = await fetch("../FishEyeData.json");
  const data = await response.json();
  return data;
}

// On traite la Data
fetchUser().then((data) => {
  photographers = data.photographers;
  medias = data.media;
});

// On recupere le Hash
const recupHash = () => {
  let hash = window.location.hash.substr(1);
  return hash;
};

// Event pour l'affichage de la page
window.addEventListener("DOMContentLoaded", createPage());
async function createPage() {
  await fetchUser();
  recupHash();
  photographers = photographers.filter((element) => {
    return element.id == recupHash();
  });
  photographers.map((photographer) => createPhotographerInfo(photographer));
  photographers.map((photographer) => createFooter(photographer));
  medias = medias.filter((element) => {
    return element.photographerId == recupHash();
  });
  mediasReset = medias;
  medias.map((media) => createGallery(media));
  viewModal();
  addLike();
  Lightbox.init();
  menuFilter();
  filterReturn();
}

/// Creation de la partie info du photographe
const createPhotographerInfo = (photographer) => {
  const photographerInfo = document.querySelector(".infoPhotographer");
  photographerInfo.innerHTML += `
      <div class="photographer__infos">
        <p tabindex="0" aria-label="nom du photographe"
        class="photographer__name">${photographer.name}</p>
        <p tabindex="0" aria-label=" Localisation"
 class="photographer__city">${photographer.city}, ${photographer.country}</p>
        <p tabindex="0" aria-label="slogan"
        class="photographer__slogan">${photographer.tagline}</p>
        <div aria-label="Filtrez les photos par thème" class="photographer__tag">${createTags(
          photographer.tags
        )}</div>
      </div>
      <div class="photographer__btn">
        <button class="btn contact">Contactez-moi</button>
      </div>   
      <div class="photographer__pp">
        <img src="../img/IDPhotos/${photographer.portrait}" alt="portrait de ${
    photographer.portrait
  } " />
        </div>`;
};

// Creation de chaque Tag sur la card
const createTags = (tags) => {
  let addTag = "";
  tags.forEach((tag) => {
    addTag += `<a href="#" class="photographer__tag__filters">#${tag}</a>`;
  });
  return addTag;
};

// Creation de la  gallerie d'image
const createGallery = (media) => {
  const gallery = document.querySelector(".pictureGallery");
  if (media.video == undefined) {
    gallery.innerHTML += `
          <figure  class="cardphoto">
          <a  tabindex="-1" href="../img/gallerie/${media.image}">
                <img
                tabindex="0"
                  class="cardphoto__picture"
                  src="../img/gallerie/${media.image} "
                  alt="${media.title}"
                />
                </a>
                <figcaption class="cardphoto__info" >
                  <p  class="cardphoto__title">${media.title}</p>
                  <p tabindex="0" aria-label="nombre de like " class="cardphoto__numberlike">${media.likes}</p>
                  <i tabindex="0" role="button" aria-label="ajouter ou supprimer le like" class="cardphoto__icon fas fa-heart"></i>
                </figcaption>
              </figure>
          `;
  } else {
    gallery.innerHTML += `
          <figure class="cardphoto">
          <a tabindex="-1" href="../img/gallerie/${media.video}">
                <video
                  class="cardphoto__picture"
                  type="video/mp4"
                  src="../img/gallerie/${media.video} "
                  controls
                  alt="${media.title}"
                  />
                  </a>
                  <figcaption class="cardphoto__info" >
                  <p class="cardphoto__title">${media.title}</p>
                  <p tabindex="0" aria-label="nombre de like" class="cardphoto__numberlike">${media.likes}</p>
                  <i tabindex="0" role="button" aria-label="ajouter ou supprimer le like" class="cardphoto__icon fas fa-heart"></i>
                  </figcaption>
                  </figure>
                  `;
  }
  totalLike.push(media.likes);
  totalLikes();
};

// Création du footer
const createFooter = (photographer) => {
  const footer = document.querySelector("footer");
  footer.innerHTML += `
                <div class="like">
                <p tabindex="0" aria-label="Nombre total de like" class="like__compter"></p>
                <i class="like__icon fas fa-heart"></i>
                </div>
                <div>
                <p tabindex="0" aria-label="prix ${photographer.price} €/jour" class="price">${photographer.price}€/jour</p>
                </div>`;
};

// Creation de la modal de contact
const createModalContact = (photographer) => {
  document.body.innerHTML += `
  <div class="bground" aria-hidden="true" role="dialog" aria-labelby="modaltitle">
  <div class="modal">
    <button class="modal__close" aria-label="Fermer la modale"><i class="close fas fa-times"></i></button>
    <div id="modaltitle" class="modal__title">
      Contactez-moi <br />
      ${photographer.name}
    </div>
    <form action="">
      <label class="modal__label" for="first">Prénom</label>
      <div class="first"></div>
      <br />
      <input aria-required="true" aria-invalid="false" class="modal__input" type="text" id="first" name="first" />
      <br />
      <label class="modal__label" for="last">Nom</label>
      <div class="last"></div>
      <br />
      <input aria-required="true" aria-invalid="false" class="modal__input" type="text" id="last" name="last" />
      <br />
      <label class="modal__label" for="email">E-mail</label>
      <div class="email"></div>
      <br />
      <input aria-required="true" aria-invalid="false" class="modal__input" type="email" id="email" name="email" />
      <br />
      <label class="modal__label" for="message">Votre message</label>
      <div class="message"></div>
      <br />
      <textarea
        aria-required="true" 
        aria-invalid="false"
        class="modal__input"
        name=""
        id="message"
        min = "30"
        cols="25"
        rows="5"
      ></textarea>
      <input
        class="btn-submit"
        type="submit"
        class="button"
        value="Envoyer"
      />
      <button class="modal__message" role="alert" aria-label="Votre message a été envoyé">Votre message a été envoyé</button>
    </form>
  </div>
</div>
  `;
};
/// Gestion du formulaire de contact
const viewModal = () => {
  photographers.map((photographer) => createModalContact(photographer));
  const iconModal = document.querySelector(".modal__close");
  const btnContact = document.querySelector(".contact");
  const main = document.querySelector("main");

  // Ouverture modal
  btnContact.addEventListener("click", () => {
    const modal = document.querySelector(".bground");
    modal.style.display = "initial";
    modal.setAttribute("aria-hidden", "false");
    main.setAttribute("aria-hidden", "true");
    iconModal.focus();
  });

  //Fermeture modal
  iconModal.addEventListener("click", () => {
    const modal = document.querySelector(".bground");
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true");
    main.setAttribute("aria-hidden", "false");
    document.querySelector(".modal__message").style.display = "none";
    form.reset();
    resetError(first, errorFirst);
    resetError(last, errorLast);
    resetError(email, errorMail);
    resetError(message, errorMessage);
  });

  document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      const modal = document.querySelector(".bground");
      modal.style.display = "none";
      modal.setAttribute("aria-hidden", "true");
      main.setAttribute("aria-hidden", "false");
      document.querySelector(".modal__message").style.display = "none";
      form.reset();
      resetError(first, errorFirst);
      resetError(last, errorLast);
      resetError(email, errorMail);
      resetError(message, errorMessage);
    }
  });

  // Traitement du formulaire
  const form = document.querySelector("form"); // Formulaire
  // Regex
  const nameReg = new RegExp(/^[a-zA-Z\-]{2,}$/i); //Regex name qui ne doit comporter que des lettres et 2 caractères min
  const emailReg = new RegExp(/^[\w\_\.\-]+@[\w]+.[a-z]{2,3}$/i); //Regex mail
  const messReg = new RegExp(/^[\w\s\D]{30,}$/i); //Regex message 30 caractères min

  // DOM Formulaire
  const first = document.getElementById("first"); // DOM Formulaire Prénom
  const last = document.getElementById("last"); // DOM Formulaire Nom
  const email = document.getElementById("email"); // Formulaire E-mail
  const message = document.getElementById("message"); // Formulaire E-mail
  const errorFirst = document.querySelector(".first");
  const errorLast = document.querySelector(".last");
  const errorMail = document.querySelector(".email");
  const errorMessage = document.querySelector(".message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (isFormValid() === true) {
      document.querySelector(".modal__message").style.display = "initial";
      document.querySelector(".modal__message").focus();
      form.reset();
    }
  });

  // Verification du prémon
  function isFirstValid() {
    if (!nameReg.test(first.value)) {
      console.log(first.value);
      errorFirst.textContent = "Veuillez entrer au moins deux caractères";
      first.classList.add("error-input");
      first.setAttribute("aria-invalid", "true");
      first.setAttribute("role", "alert");
      first.setAttribute(
        "aria-label",
        "Veuillez entrer au moins deux caractères"
      );
      first.focus();
      return false;
    } else {
      resetError(first, errorFirst);
      return true;
    }
  }
  // Verification du nom
  function isLastValid() {
    if (!nameReg.test(last.value)) {
      errorLast.textContent = "Veuillez entrer au moins deux caractères";
      last.classList.add("error-input");
      last.setAttribute("aria-invalid", "true");
      last.setAttribute("role", "alert");
      last.setAttribute(
        "aria-label",
        "Veuillez entrer au moins deux caractères"
      );
      last.focus();
      return false;
    } else {
      resetError(last, errorLast);
      return true;
    }
  }
  // Verification de l'email
  function isEmailValid() {
    if (!emailReg.test(email.value)) {
      errorMail.textContent = "Veuillez entrer une adresse mail valide";
      email.classList.add("error-input");
      email.setAttribute("aria-invalid", "true");
      email.setAttribute("role", "alert");
      email.setAttribute(
        "aria-label",
        "Veuillez entrer une adresse mail valide"
      );
      email.focus();
      return false;
    } else {
      resetError(email, errorMail);
      return true;
    }
  }
  // Verification du message
  function isMessageValid() {
    if (!messReg.test(message.value)) {
      errorMessage.textContent =
        "Votre message doit comporter au moins 30 caractères";
      message.classList.add("error-input");
      message.setAttribute("aria-invalid", "true");
      message.focus();
      return false;
    } else {
      resetError(message, errorMessage);
      return true;
    }
  }

  // Verification du formulaire
  function isFormValid() {
    if (
      isFirstValid() === false ||
      isLastValid() === false ||
      isEmailValid() === false ||
      isMessageValid() === false
    ) {
      return false;
    } else {
      return true;
    }
  }
};

// On ajoute les likes au click
const addLike = () => {
  const iconsLike = document.querySelectorAll(".cardphoto__icon");
  const totalLike = document.querySelector(".like__compter");
  iconsLike.forEach((icon) =>
    icon.addEventListener("click", () => {
      icon.classList.toggle("click");
      if (icon.classList.contains("click")) {
        icon.previousElementSibling.innerText++;
        totalLike.innerText++;
      } else {
        icon.previousElementSibling.innerText--;
        totalLike.innerText--;
      }
    })
  );
  iconsLike.forEach((icon) => {
    icon.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        icon.classList.toggle("click");
        if (icon.classList.contains("click")) {
          icon.previousElementSibling.innerText++;
          totalLike.innerText++;
        } else {
          icon.previousElementSibling.innerText--;
          totalLike.innerText--;
        }
      }
    });
  });
};

//On compte le nombre total de likes
const totalLikes = () => {
  let total = 0;

  for (let i = 0; i < totalLike.length; i++) {
    total += totalLike[i];
  }
  document.querySelector(".like__compter").innerText = total;
  document
    .querySelector(".like__compter")
    .setAttribute("aria-label", "Nombre total de like " + total);
};

// Fonction pour le tri de la gallerie
const menuFilter = () => {
  const iconBtn = document.querySelector(".filterpicture__icon");
  const icon = document.querySelector(".fa-chevron-down");
  const menu = document.querySelector(".filterpicture__bloc");
  const gallery = document.querySelector(".pictureGallery");
  let links = Array.from(document.querySelectorAll(".filterpicture__link"));
  const input = document.querySelector(".filterpicture__select");
  let selected = document.querySelector(".select");

  let id;

  iconBtn.addEventListener("click", () => {
    menu.classList.toggle("invisible");
    menu.setAttribute("aria-expanded", "true");
    icon.classList.toggle("rotate");
    selected.classList.remove("select");
    input.style.display = "none";
  });

  iconBtn.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      menu.classList.toggle("invisible");
      menu.setAttribute("aria-expanded", "true");
      icon.classList.toggle("rotate");
      selected.classList.remove("select");
      input.style.display = "none";
    }
  });

  links.forEach((link) =>
    link.addEventListener("click", () => {
      menu.classList.add("invisible");
      menu.setAttribute("aria-expanded", "false");
      icon.classList.remove("rotate");
      link.classList.add("select");
      input.style.display = "initial";
      let texte = document.querySelector(".select").textContent;
      id = link.id;
      input.innerText = texte;
      totalLike = [];
      // tri par date
      if (id == "date") {
        medias.sort(function (a, b) {
          return new Date(b.date) - new Date(a.date);
        });
        gallery.innerHTML = "";
        medias.map((media) => createGallery(media));
        viewModal();
        addLike();
        Lightbox.init();
        menuFilter();
        filterReturn();
      }
      // tri par likes
      else if (id == "popular") {
        medias.sort(function (a, b) {
          if (a.likes > b.likes) {
            return -1;
          }
        });
        gallery.innerHTML = "";
        medias.map((media) => createGallery(media));
        viewModal();
        addLike();
        Lightbox.init();
        menuFilter();
        filterReturn();
      }
      // tri par titre
      else if (id == "title") {
        medias.sort(function (a, b) {
          if (a.title < b.title) {
            return -1;
          }
        });
        gallery.innerHTML = "";
        medias.map((media) => createGallery(media));
        viewModal();
        addLike();
        Lightbox.init();
        menuFilter();
        filterReturn();
      }
    })
  );
};

// Permet de filter les photos suivant le tag selectionné

function filterReturn() {
  const gallery = document.querySelector(".pictureGallery");
  const filters = Array.from(
    document.querySelectorAll(".photographer__tag__filters")
  );
  let filterSelected = null;
  filters.forEach((filter) =>
    filter.addEventListener("click", (e) => {
      e.preventDefault;
      if (filterSelected === null) {
        filter.classList.add("tagselect");
        filterSelected = e.target.textContent.slice(1);
        medias = medias.filter((media) => {
          return media.tags == filterSelected;
        });
        gallery.innerHTML = "";
        medias.map((media) => createGallery(media));
      } else if (filterSelected === e.target.textContent.slice(1)) {
        filter.classList.remove("tagselect");
        filterSelected === null;
        console.log(filterSelected);
        medias = mediasReset;
        gallery.innerHTML = "";
        medias.map((media) => createGallery(media));
      } else if (filterSelected != e.target.textContent.slice(1)) {
        filters.forEach((filter) => filter.classList.remove("tagselect"));
        filter.classList.add("tagselect");
        filterSelected = e.target.textContent.slice(1);
        medias = mediasReset;
        gallery.innerHTML = "";
        medias = medias.filter((media) => {
          return media.tags == filterSelected;
        });
        medias.map((media) => createGallery(media));
      }
    })
  );
}
