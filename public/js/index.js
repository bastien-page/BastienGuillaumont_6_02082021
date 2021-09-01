import PhotographerCreateCard from "./PhotographerCard.js";

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
  photographers.map(
    (photographer) =>
      new PhotographerCreateCard(document.querySelector("main"), photographer)
  );
  console.log(photographers);
  console.log(media);
  btnScroll();
  addfilter();
  filterReturn();
});

// Filters selection des photographes
function addfilter() {
  let activeFilters = null;
  let main = document.querySelector("main");
  const filters = Array.from(document.querySelectorAll(".filter"));
  filters.forEach((filter) => {
    filter.addEventListener("click", (e) => {
      if (activeFilters === null) {
        activeFilters = e.target.id;
        photographers = photographers.filter((element) => {
          return element.tags.includes(activeFilters);
        });
        main.innerHTML = "";
        console.log(photographers);
        photographers.map(
          (photographer) => new PhotographerCreateCard(main, photographer)
        );
        filter.classList.add("filter-selected");
      } else if (activeFilters === e.target.id) {
        activeFilters = null;
        filter.classList.remove("filter-selected");
        main.innerHTML = "";
        photographers = photographersReset;
        photographers.map(
          (photographer) => new PhotographerCreateCard(main, photographer)
        );
      } else if (activeFilters != e.target.id) {
        filters.forEach((filter) => filter.classList.remove("filter-selected"));
        filter.classList.add("filter-selected");
        photographers = photographersReset;
        activeFilters = e.target.id;
        photographers = photographers.filter((element) => {
          return element.tags.includes(activeFilters);
        });
        main.innerHTML = "";
        photographers.map(
          (photographer) => new PhotographerCreateCard(main, photographer)
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
