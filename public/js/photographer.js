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
  console.log(medias);
  console.log("======");
  medias = medias.filter((element) => {
    return element.photographerId == hash;
  });
  console.log(medias);
  medias.map((media) => createGallery(media));
}

// On recupere le Hash
function recupHash() {
  hash = window.location.hash.substr(1);
  return hash;
}

/// Creation de la partie info du photographe
function createPhotographerInfo(photographer) {
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
  // Creation de chaque Tag sur la card
  function createTags(tags) {
    let addTag = "";
    tags.forEach((tag) => {
      addTag += `<div class="photographer__tag__filters">#${tag}</div>`;
    });
    return addTag;
  }
}

function createGallery(media) {
  const gallery = document.querySelector(".pictureGallery");
  gallery.innerHTML += `
      <figure class="cardphoto">
            <img
              class="cardphoto__picture"
              src="../img/gallerie/${media.image}"
              alt=""
            />
            <figcaption class="cardphoto__title">
            ${media.title}
              <p class="cardphoto__numberlike">${media.likes}</p>
              <i class="cardphoto__icon fas fa-heart"></i>
            </figcaption>
          </figure>
      `;
}
