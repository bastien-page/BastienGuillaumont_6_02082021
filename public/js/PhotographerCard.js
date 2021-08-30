class PhotographerCreateCard {
  constructor(selector, photographer) {
    this.selector = selector;
    this.photographer = photographer;
    this.buildCard(photographer);
  }

  buildCard(photographer) {
    const card = document.createElement("div");
    card.classList.add("card");
    const link = document.createElement("a");
    const pictureProfil = document.createElement("img");
    pictureProfil.classList.add("card__photo");
    const name = document.createElement("p");
    name.classList.add("card__name");
    const city = document.createElement("p");
    city.classList.add("card__location");
    const slogan = document.createElement("p");
    slogan.classList.add("card__slogan");
    const price = document.createElement("p");
    price.classList.add("card__price");
    const tags = document.createElement("div");
    tags.classList.add("card__tag");

    this.selector.appendChild(card);
    card.appendChild(link);
    link.appendChild(pictureProfil);
    link.appendChild(name);
    link.appendChild(city);
    link.appendChild(slogan);
    link.appendChild(price);
    link.appendChild(tags);

    link.setAttribute(
      "href",
      "./html/photographerpage.html#" + photographer.id
    );
    pictureProfil.setAttribute(
      "src",
      "../img/IDPhotos/" + photographer.portrait
    );
    name.innerText = photographer.name;
    city.innerText = photographer.city + ", " + photographer.country;
    slogan.innerText = photographer.tagline;
    price.innerText = photographer.price + "€/jour";

    tags.innerHTML = this.createTag(photographer.tags);

    return card;
  }

  createTag(tags) {
    let addTag = "";
    tags.forEach((tag) => {
      addTag += `<div class="card__tag-filter">#${tag}</div>`;
    });
    return addTag;
  }
}