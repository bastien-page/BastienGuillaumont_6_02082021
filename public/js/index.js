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
let photographersReset;
let media;
fetchUser("FishEyeData.json").then((data) => {
  photographers = data.photographers;
  photographersReset = data.photographers;
  media = data.media;
  photographers.map((photographer) => createPhotographerProfile(photographer));

  // photographers = photographers.filter((element) => {
  //   return element.tags.includes("fashion");
  // });
  // photographers.map((photographer) => createPhotographerProfile(photographer));
  console.log(photographers);
  console.log(media);
  btnScroll();
  addfilter();
});

/* *******************************
 *         PAGE INDEX            *
 ****************************** */

// photographers = photographers.filter((element) => {
//   return element.tags.includes("sport");
// });

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

// Filters selection

function addfilter() {
  let activeFilters = null;
  const filters = Array.from(document.querySelectorAll(".filter"));
  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      if (activeFilters === null) {
        activeFilters = e.target.id;
        photographers = photographers.filter((element) => {
          return element.tags.includes(activeFilters);
        });
        main.innerHTML = "";
        photographers.map((photographer) =>
          createPhotographerProfile(photographer)
        );
        filter.classList.add("filter-selected");
      } else if (activeFilters === e.target.id) {
        activeFilters = null;
        filter.classList.remove("filter-selected");
        main.innerHTML = "";
        photographers = photographersReset;
        photographers.map((photographer) =>
          createPhotographerProfile(photographer)
        );
      } else if (activeFilters != e.target.id) {
        console.log("dlkvhefobi");
        filters.forEach((filter) => filter.classList.remove("filter-selected"));
        filter.classList.add("filter-selected");
        photographers = photographersReset;
        activeFilters = e.target.id;
        photographers = photographers.filter((element) => {
          return element.tags.includes(activeFilters);
        });
        main.innerHTML = "";
        photographers.map((photographer) =>
          createPhotographerProfile(photographer)
        );
      }
    });
  });
}

// Création du Bouton scroll et ajout de l'écouteur
const btnScroll = () => {
  document.body.innerHTML += `
    <div class="btn_scroll">
      <a href="#main">Passer au contenu</a>
    </div>
    `;
  let btn = document.querySelector(".btn_scroll");
  document.addEventListener("scroll", (e) => {
    if (window.scrollY > 5) {
      btn.style.top = "10px";
    } else {
      btn.style.top = "-100px";
    }
  });
};
