export default class PhotographerCreateCard {
  constructor(selector, photographer) {
    this.selector = selector;
    this.photographer = photographer;
    this.buildCard(photographer);
  }

  buildCard(photographer) {
    const card = document.createElement("article");
    card.classList.add("card");
    card.setAttribute("aria-label", "information photographe");
    const link = document.createElement("a");
    link.setAttribute("aria-label", photographer.name);
    const pictureProfil = document.createElement("img");
    pictureProfil.classList.add("card__photo");
    pictureProfil.setAttribute("aria-label", "portrait du photographe");
    const name = document.createElement("p");
    name.classList.add("card__name");
    const city = document.createElement("p");
    city.classList.add("card__location");
    city.setAttribute("tabindex", "0");
    city.setAttribute(
      "aria-label",
      `Localisation ${photographer.city}, ${photographer.country}`
    );
    const slogan = document.createElement("p");
    slogan.classList.add("card__slogan");
    slogan.setAttribute("tabindex", "0");
    slogan.setAttribute("aria-label", `Slogan ${photographer.tagline}`);
    const price = document.createElement("p");
    price.classList.add("card__price");
    price.setAttribute("tabindex", "0");
    price.setAttribute("aria-label", `Prix${photographer.price}euros par jour`);
    const tags = document.createElement("div");
    tags.classList.add("card__tag");
    this.selector.appendChild(card);
    card.appendChild(link);
    link.appendChild(pictureProfil);
    card.appendChild(name);
    card.appendChild(city);
    card.appendChild(slogan);
    card.appendChild(price);
    card.appendChild(tags);

    link.setAttribute(
      "href",
      `public/html/photographerpage.html#${photographer.id}`
    );

    pictureProfil.setAttribute(
      "src",
      `./public/img/IDPhotos/${photographer.portrait}`
    );
    name.innerText = photographer.name;
    city.innerText = `${photographer.city}, ${photographer.country}`;
    slogan.innerText = photographer.tagline;
    price.innerText = `${photographer.price}€/jour`;

    tags.innerHTML = this.createTag(photographer.tags);

    return card;
  }

  createTag(tags) {
    let addTag = "";
    tags.forEach((tag) => {
      addTag += `<div role="button" class="card__tag-filter">#${tag}</div>`;
    });
    return addTag;
  }
}
