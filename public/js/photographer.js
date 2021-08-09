/* *******************************
 *     RECUPERATION DE LA DATA   *
 ****************************** */

async function fetchUser() {
  const response = await fetch("../FishEyeData.json");
  const data = await response.json();
  return data;
}

let photographers;
let medias;

// On traite la Data
fetchUser().then((data) => {
  photographers = data.photographers;
  medias = data.media;
});

window.addEventListener("load", createPage());
async function createPage() {
  await fetchUser();
  recupHash();
  photographers = photographers.filter((element) => {
    return element.id == hash;
  });
  photographers.map((photographer) => createPhotographerInfo(photographer));
  medias = medias.filter((element) => {
    return element.photographerId == hash;
  });
  medias.map((media) => createGallery(media));
  createFooter();
  createModalContact();
  viewModal();
  viewLightbox();
  compterLike();
}

// On recupere le Hash
const recupHash = () => {
  hash = window.location.hash.substr(1);
  return hash;
};

/// Creation de la partie info du photographe
const createPhotographerInfo = (photographer) => {
  const photographerInfo = document.querySelector(".infoPhotographer");
  photographerInfo.innerHTML += `
      <div class="photographer__infos">
        <p class="photographer__name">${photographer.name}</p>
        <p class="photographer__city">${photographer.city}, ${
    photographer.country
  }</p>
        <p class="photographer__slogan">${photographer.tagline}</p>
        <div class="photographer__tag">${createTags(photographer.tags)}</div>
      </div>
      <div class="photographer__btn">
        <button class="btn contact">Contactez-moi</button>
      </div>
      <div class="photographer__pp">
        <img src="../img/IDPhotos/${photographer.portrait}" alt="" />
        </div>`;
};

// Creation de chaque Tag sur la card
const createTags = (tags) => {
  let addTag = "";
  tags.forEach((tag) => {
    addTag += `<div class="photographer__tag__filters">#${tag}</div>`;
  });
  return addTag;
};

// Creation de la  gallerie d'image
const createGallery = (media) => {
  const gallery = document.querySelector(".pictureGallery");
  gallery.innerHTML += `
      <figure class="cardphoto">
      <a href="../img/gallerie/${media.image}">
            <img
              class="cardphoto__picture"
              src="../img/gallerie/${media.image} "
              alt="${media.title}"
            />
            </a>
            <figcaption class="cardphoto__info" >
              <p class="cardphoto__title">${media.title}</p>
              <p class="cardphoto__numberlike">${media.likes}</p>
              <i class="cardphoto__icon fas fa-heart"></i>
            </figcaption>
          </figure>
      `;
};

// Creation de la modal de contact
const createModalContact = () => {
  const main = document.querySelector("main");
  main.innerHTML += `
  <div class="bground">
  <div class="modal">
    <span class="modal__close"></span>
    <div class="modal__title">
      Contactez-moi <br />
      A MODIFIER 
    </div>
    <form action="">
      <label class="modal__label" for="first">Prénom</label>
      <div class="first"></div>
      <br />
      <input class="modal__input" type="text" id="first" name="first" />
      <br />
      <label class="modal__label" for="last">Nom</label>
      <div class="last"></div>
      <br />
      <input class="modal__input" type="text" id="last" name="last" />
      <br />
      <label class="modal__label" for="email">E-mail</label>
      <div class="email"></div>
      <br />
      <input class="modal__input" type="email" id="email" name="email" />
      <br />
      <label class="modal__label" for="message">Votre message</label>
      <div class="message"></div>
      <br />
      <textarea
        class="modal__input"
        name=""
        id="message"
        cols="25"
        rows="5"
      ></textarea>
      <input
        class="btn-submit"
        type="submit"
        class="button"
        value="Envoyer"
      />
    </form>
  </div>
</div>
  `;
};

const createLightbox = () => {
  const main = document.querySelector("main");
  main.innerHTML += `
  <div class="lightbox">
  <div class="lightbox__content">
  <i class="lightbox__content__close fas fa-times"></i>  
  <img
    class=""
    src=""
      alt=""
    />
    <i class="lightbox__content__direction__left fas fa-chevron-left"></i>
    <i class="lightbox__content__direction__right fas fa-chevron-right"></i>
    </div>
    </div>`;
};

const createFooter = () => {
  const footer = document.querySelector("footer");
  footer.innerHTML += `
  <div class="like">
        <p class="like__compter">29890</p>
        <i class="like__icon fas fa-heart"></i>
      </div>
      <div>
        <p class="price">300€/jour</p>
      </div>`;
};

// Affichage de la modal
const viewModal = () => {
  const iconModal = document.querySelector(".modal__close");
  const btnContact = document.querySelector(".contact");
  // OUverture modal
  btnContact.addEventListener("click", () => {
    const modal = document.querySelector(".bground");
    modal.style.display = "initial";
  });
  //Fermeture modal
  iconModal.addEventListener("click", () => {
    const modal = document.querySelector(".bground");
    modal.style.display = "none";
    form.reset();
  });
};

const viewLightbox = () => {
  createLightbox();
  const iconLightbox = document.querySelector(".lightbox__content__close");
  const links = document.querySelectorAll(".cardphoto a");
  const lightbox = document.querySelector(".lightbox");
  const navLeft = document.querySelector(".lightbox__content__direction__left");
  const navRight = document.querySelector(
    ".lightbox__content__direction__right"
  );

  for (let link of links) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const img = document.querySelector(".lightbox__content img");
      img.src = this.href;
      lightbox.style.display = "initial";
    });
  }

  iconLightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
};

const compterLike = () => {
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
};
