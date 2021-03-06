export default class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
    );
    const images = links.map((link) => link.getAttribute("href"));
    const titles = links.map(
      (link) => link.firstElementChild.attributes.alt.value
    );
    links.forEach((link) =>
      link.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("href"), images, titles);
        document.querySelector("main").setAttribute("aria-hidden", "true");
        document.querySelector("header").setAttribute("aria-hidden", "true");
        document.querySelector("footer").setAttribute("aria-hidden", "true");
      })
    );
    links.forEach((link) =>
      link.addEventListener("keyup", (e) => {
        e.preventDefault();
        if (e.key === "Enter") {
          new Lightbox(e.currentTarget.getAttribute("href"), images, titles);
          document.querySelector("main").setAttribute("aria-hidden", "true");
          document.querySelector("header").setAttribute("aria-hidden", "true");
          document.querySelector("footer").setAttribute("aria-hidden", "true");
        }
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
    document.querySelector(".lightbox__close").focus();
  }

  loadImage(url) {
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
    );
    const images = links.map((link) => link.getAttribute("href"));

    this.url = null;
    const image = document.createElement("img");
    const video = document.createElement("video");
    video.setAttribute("type", "video/mp4");
    video.setAttribute("controls", "controls");
    const container = this.element.querySelector(".lightbox__container");
    const imageTitle = document.createElement("p");
    imageTitle.classList.add("lightbox__title");
    imageTitle.textContent = "";
    container.innerHTML = "";
    this.url = url;
    imageTitle.textContent = this.titles[images.indexOf(url)];
    if (url.includes(".mp4")) {
      container.appendChild(video);
      video.src = url;
    } else {
      container.appendChild(image);
      image.src = url;
    }
    container.appendChild(imageTitle);
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
    e.preventDefault();
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
    document.querySelector("main").setAttribute("aria-hidden", "false");
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

  buildDOM() {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-hidden", "false");
    lightbox.innerHTML = `<button class="lightbox__close" aria-label="Fermer"><i  class=" fas fa-times" ></i></button>
      <button tabindex="0" aria-label="Pr??c??dent" class="lightbox__prev"><i class="fas fa-chevron-left" ></i></button>
      <button tabindex="0" aria-label="Suivant" class="lightbox__next"><i class="fas fa-chevron-right" ></i></button>
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
