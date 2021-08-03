/* *******************************
 *     RECUPERATION DE LA DATA   *
 ****************************** */

// On recupère la data
const fetchUser = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// On traite la Data
let photographers;
let media;
fetchUser("FishEyeData.json").then((data) => {
  photographers = data.photographers;
  media = data.media;
  photographers.map((photographer) => createPhotographerProfile(photographer));
  console.log(photographers);
  console.log(media);
});

/* *******************************
 *         PAGE INDEX            *
 ****************************** */

// Creation de cards Profil Photographe

const createPhotographerProfile = (photographer) => {
  const main = document.querySelector("main");
  main.setAttribute("id", "main");
  main.innerHTML += `
  <div class="card">
    <a href="./html/photographerpage.html#${photographer.id}">
      <img
        class="card__photo"
        src="./img/IDPhotos/${photographer.portrait}".jpg"
        alt="Photo de profil"
      />
      <p class="card__name">${photographer.name}</p>
      <p class="card__location">${photographer.city}, ${
    photographer.country
  }</p>
      <p class="card__slogan">${photographer.tagline}</p>
      <p class="card__price">${photographer.price}€/jour</p>
      <div class="card__tag">${createTags(photographer.tags)}</div>
    </a>
  </div>`;
};

// Creation de chaque tag sur la card
const createTags = (tags) => {
  let addTag = "";
  tags.forEach((tag) => {
    addTag += `<div class="card__tag-filter">#${tag}</div>`;
  });
  return addTag;
};
