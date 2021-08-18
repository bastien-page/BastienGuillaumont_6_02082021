class Lightbox {
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
    // Avoir pour optimiser
    const links = Array.from(
      document.querySelectorAll('a[href$=".jpg"], a[href$=".mp4"]')
    );
    const images = links.map((link) => link.getAttribute("href"));
    ////
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
