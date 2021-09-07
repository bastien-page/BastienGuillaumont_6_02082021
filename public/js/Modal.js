class Modal {
  constructor(photographer) {
    this.photographer = photographer;
    this.element = this.build(photographer);
    document.body.appendChild(this.element);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.addEventListener("keyup", this.onKeyUp);
  }

  build(photographer) {
    //Creation du background
    const modal = document.createElement("div");

    modal.classList.add("modal");
    modal.setAttribute("id", "modal");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-labelby", "modal__title");

    // Creation de la modal
    const modalContent = document.createElement("div");
    modal.appendChild(modalContent);
    modalContent.classList.add("modal__content");

    //Creation de l'icone de fermeture
    const modalClose = document.createElement("i");
    modalContent.appendChild(modalClose);
    modalClose.classList.add("fas", "fa-times", "modal__close");
    modalClose.setAttribute("role", "button");
    modalClose.setAttribute("aria-label", "Fermer la fenêtre");

    //Creation du titre
    const modalTitle = document.createElement("div");
    modalContent.appendChild(modalTitle);
    modalTitle.classList.add("modal__title");
    modalTitle.setAttribute("id", "modal__title");
    modalTitle.innerHTML = "Contactez-moi <br/>" + photographer.name;

    //Création du formulaire
    const form = document.createElement("form");
    form.setAttribute("action", "");
    modalContent.appendChild(form);

    //Creation champs Prénom
    const labelFirst = document.createElement("label");
    form.appendChild(labelFirst);
    labelFirst.setAttribute("for", "first");
    labelFirst.classList.add("modal__label");
    labelFirst.textContent = "Prénom";
    const firstError = document.createElement("div");
    form.appendChild(firstError);
    firstError.classList.add("modal__error");
    const firstInput = document.createElement("input");
    form.appendChild(firstInput);
    firstInput.classList.add("modal__input");
    firstInput.setAttribute("aria-required", "true");
    firstInput.setAttribute("aria-invalid", "false");
    firstInput.setAttribute("type", "text");
    firstInput.setAttribute("id", "first");
    firstInput.setAttribute("name", "first");

    //Creation champs Nom
    const labelLast = document.createElement("label");
    form.appendChild(labelLast);
    labelLast.classList.add("modal__label");
    labelLast.setAttribute("for", "last");
    labelLast.classList.add("modal__label");
    labelLast.textContent = "Nom";
    const lastError = document.createElement("div");
    form.appendChild(lastError);
    lastError.classList.add("modal__error");
    const lastInput = document.createElement("input");
    form.appendChild(lastInput);
    lastInput.classList.add("modal__input");
    lastInput.setAttribute("aria-required", "true");
    lastInput.setAttribute("aria-invalid", "false");
    lastInput.setAttribute("type", "text");
    lastInput.setAttribute("id", "last");
    lastInput.setAttribute("name", "last");

    //Creation champs Email
    const labelEmail = document.createElement("label");
    form.appendChild(labelEmail);
    labelFirst.setAttribute("for", "email");
    labelEmail.classList.add("modal__label");
    labelEmail.textContent = "E-mail";
    const emailError = document.createElement("div");
    form.appendChild(emailError);
    emailError.classList.add("modal__error");
    const emailInput = document.createElement("input");
    form.appendChild(emailInput);
    emailInput.classList.add("modal__input");
    emailInput.setAttribute("aria-required", "true");
    emailInput.setAttribute("aria-invalid", "false");
    emailInput.setAttribute("type", "email");
    emailInput.setAttribute("id", "email");
    emailInput.setAttribute("name", "email");

    //Creation champs Message
    const labelMessage = document.createElement("label");
    form.appendChild(labelMessage);
    labelMessage.setAttribute("for", "message");
    labelMessage.classList.add("modal__label");
    labelMessage.textContent = "Votre message";
    const messageError = document.createElement("div");
    form.appendChild(messageError);
    messageError.classList.add("modal__error");
    const messageInput = document.createElement("textarea");
    form.appendChild(messageInput);
    messageInput.classList.add("modal__input");
    messageInput.setAttribute("aria-required", "true");
    messageInput.setAttribute("aria-invalid", "false");
    messageInput.setAttribute("id", "message");
    messageInput.setAttribute("name", "message");
    messageInput.setAttribute("min", "30");
    messageInput.setAttribute("cols", "25");
    messageInput.setAttribute("rows", "5");

    //Creation du bouton de validation
    const submit = document.createElement("input");
    form.appendChild(submit);
    submit.classList.add("btn-submit", "button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Envoyer");

    //Creation message de validation
    const modalMessage = document.createElement("p");
    form.appendChild(modalMessage);
    modalMessage.classList.add("modal__message");
    modalMessage.textContent = "Votre message a été envoyé";

    // Event fermeture de la modal
    modal
      .querySelector(".modal__close")
      .addEventListener("click", this.close.bind(this));

    return modal;
  }

  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    }
  }

  close(e) {
    e.preventDefault();
    this.element.classList.remove("modalopen");
    this.element.setAttribute("aria-hidden", "true");
  }
}
