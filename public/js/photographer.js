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
    return element.photographerId == hash && !element.image == "";
  });
  medias.map((media) => createGallery(media));
  createModalContact();
  viewModal();
  btnContact();
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
            <img
              class="cardphoto__picture"
              src="../img/gallerie/${media.image}"
              alt=""
            />
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

const btnContact = () => {
  document.body.innerHTML += `
  <button class="btncontact">Contactez-moi</button>`;
  let btn = document.querySelector(".btncontact");

  btn.addEventListener("click", () => {
    const modal = document.querySelector(".bground");
    modal.style.display = "initial";
  });
  viewModal();
};
