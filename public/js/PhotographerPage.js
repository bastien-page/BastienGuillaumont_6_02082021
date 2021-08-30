class PhotographerPage {
  constructor(selector, photographer, media) {
    this.selector = selector;
    this.photographer = photographer;
    this.media = media;
  }

  recupHash() {
    const hash = window.location.hash.substr(1);
    photographers = photographers.filter((element) => {
      return element.id == hash;
    });
  }

  buildInfo(photographer) {
    const bloc = document.createElement("div");
    bloc.classList.add("infoPhotographer");

    const blocInfo = document.createElement("div");
    blocInfo.classList.add("photographer__infos");

    const name = document.createElement("p");
    name.classList.add("photographer__name");
    name.innerText = photographer.name;

    const city = document.createElement("p");
    city.classList.add("photographer__city");
    city.innerText = photographer.city;

    const slogan = document.createElement("p");
    slogan.classList.add("photographer__slogan");
    slogan.innerText = photographer.tagline;

    const tags = document.createElement("div");
    tags.classList.add("photographer__tag");
    tags.innerHTML = this.createTag(photographer.tags);

    const blocBtn = document.createElement("div");
    blocBtn.classList.add("photographer__btn");

    const btn = document.createElement("button");
    btn.classList.add("btn", "contact");
    btn.innerText = "Contactez-moi";

    const profilePicture = document.createElement("div");
    profilePicture.classList.add("photographer__pp");
    const photo = document.createElement("img");
    photo.setAttribute("src", "../img/IDPhotos/" + photographer.portrait);
    photo.setAttribute("alt", "Photo de" + photographer.name);

    bloc.appendChild(blocInfo);
    bloc.appendChild(blocBtn);
    bloc.appendChild(profilePicture);
    blocInfo.appendChild(name);
    blocInfo.appendChild(city);
    blocInfo.appendChild(slogan);
    blocInfo.appendChild(tags);
    blocBtn.appendChild(btn);
    profilePicture.appendChild(photo);

    this.selector.appendChild(bloc);

    return bloc;
  }

  createTag(tags) {
    let addTag = "";
    tags.forEach((tag) => {
      addTag += `<div class="card__tag-filter">#${tag}</div>`;
    });
    return addTag;
  }

  buildGallery(media) {
    const gallery = document.createElement("div");
    gallery.classList.add("pictureGallery");

    const card = document.createElement("figure");
    card.classList("cardphoto");

    const link = document.createElement("a");
    link.setAttribute("href", "../img/gallerie/" + href);

    const info = document.createElement("figcaption");
    info.classList.add("cardphoto__info");
    const name = document.createElement("p");
    name.classList.add("cardphoto__title");
    const title = document.createElement("p");
    title.classList.add("cardphoto__numberlike");
    const icon = document.createElement("i");
    icon.classList.add("cardphoto__icon", "fas", "fa-heart");

    if (media.video == undefined) {
      const img = document.createElement("img");
      img.classList.add("cardphoto__picture");
      img.setAttribute("src", "../img/gallerie/" + media.image);
      img.setAttribute("alt", media.title);
      link.appendChild(img);
    } else {
      const video = document.createElement("video");
      video.classList.add("cardphoto__picture");
      video.setAttribute("src", "../img/gallerie/" + media.video);
      video.setAttribute("alt", media.video);
      video.setAttribute("type", "video/mp4");
      link.appendChild(video);
    }

    card.appendChild(link);
    info.appendChild(name);
    info.appendChild(title);
    info.appendChild(icon);
    card.appendChild(info);
    gallery.appendChild(card);

    return gallery;
  }

  createFooter(photographer) {
    const footer = document.querySelector("footer");
    const like = document.createElement("div");
    like.classList.add("like");
    const compter = document.createElement("p");
    compter.classList.add("like__compter");
    const icon = document.createElement("i");
    icon.classList.add("like__icon", "fas", "fa-heart");

    like.appendChild(compter);
    like.appendChild(icon);

    const divPrice = document.createElement("div");
    const price = document.createElement("p");
    price.classList.add("price");
    price.innerText = photographer.price + "€/jour";

    divPrice.appendChild(price);
    like.appendChild(divPrice);

    footer.appendChild(like);

    compter.innerText = totalLikes();

    return footer;
  }

  totalLikes() {
    let total = 0;
    for (i = 0; i < totalLike.length; i++) {
      total += totalLike[i];
    }
    return total;
  }
}
