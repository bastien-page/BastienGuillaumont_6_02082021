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
  photographers.map((photographer) => createFooter(photographer));
  medias = medias.filter((element) => {
    return element.photographerId == hash;
  });
  medias.map((media) => createGallery(media));
  viewModal();
  totalLikes();
  addLike();
  Lightbox.init();
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

let totalLike = [];

// Creation de la  gallerie d'image
const createGallery = (media) => {
  const gallery = document.querySelector(".pictureGallery");
  if (media.video == undefined) {
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
  } else {
    gallery.innerHTML += `
          <figure class="cardphoto">
          <a href="../img/gallerie/${media.image}">
                <video
                  class="cardphoto__picture"
                  src="../img/gallerie/${media.video} "
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
  }

  totalLike.push(media.likes);
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

const createFooter = (photographer) => {
  const footer = document.querySelector("footer");
  footer.innerHTML += `
  <div class="like">
  <p class="like__compter"></p>
  <i class="like__icon fas fa-heart"></i>
  </div>
  <div>
  <p class="price">${photographer.price}€/jour</p>
  </div>`;
};

// Affichage de la modal
const viewModal = () => {
  createModalContact();
  const iconModal = document.querySelector(".modal__close");
  const btnContact = document.querySelector(".contact");
  // OUverture modal
  btnContact.addEventListener("click", () => {
    const modal = document.querySelector(".bground");
    modal.style.display = "initial";
  });
  //Fermeture modal
  window.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
      modal.style.display = "none";
    }
  });
  iconModal.addEventListener("click", () => {
    const modal = document.querySelector(".bground");
    modal.style.display = "none";
    form.reset();
  });
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
};

//On compte le nombre de likes
const totalLikes = () => {
  let total = 0;
  for (i = 0; i < totalLike.length; i++) {
    total += totalLike[i];
  }
  document.querySelector(".like__compter").innerText = total;
};

// Creation de la Lightbox

class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll(
        'a[href$=".jpg"], a[href$=".jpeg"],a[href$=".png"]'
      )
    );
    const images = links.map((link) => link.getAttribute("href"));
    const titles = links.map((link) => link.lastElementChild.alt);
    console.log(titles);
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("href"), images, titles);
      })
    );
  }

  constructor(url, images, titles) {
    this.element = this.buildDOM(url);
    this.images = images;
    this.titles = titles;
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightbox__container");
    const imageTitle = document.createElement("p");
    imageTitle.classList.add("lightbox__title");
    imageTitle.textContent = "";
    container.innerHTML = "";
    image.onload = () => {
      container.appendChild(image);
      container.appendChild(imageTitle);
      this.url = url;
      imageTitle.textContent = this.titles;
    };
    image.src = url;
  }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    }
  }

  close(e) {
    e.preventDefault;
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

  next(e) {
    e.preventDefault();
    let i = this.images.findIndex((i) => i === this.url);
    if (i === this.images.length - 1) {
      i = -1;
    }
    this.loadImage(this.images[i + 1]);
  }

  prev(e) {
    e.preventDefault();
    let i = this.images.findIndex((i) => i === this.url);
    if (i === 0) {
      i = this.images.length;
    }
    this.loadImage(this.images[i - 1]);
  }

  buildDOM(url) {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `<i class="lightbox__close fas fa-times"></i>
    <i class="lightbox__prev fas fa-chevron-left"></i>
    <i class="lightbox__next fas fa-chevron-right"></i>
    <div class="lightbox__container">
    </div>
    `;

    lightbox
      .querySelector(".lightbox__close")
      .addEventListener("click", this.close.bind(this));
    lightbox
      .querySelector(".lightbox__next")
      .addEventListener("click", this.next.bind(this));
    lightbox
      .querySelector(".lightbox__prev")
      .addEventListener("click", this.prev.bind(this));
    return lightbox;
  }
}
