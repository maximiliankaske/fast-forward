class Widget extends HTMLElement {
  connectedCallback() {
    const userName = this.attributes.username.value;
    this.innerHTML = `<button>Hello World... ${userName}</button>`;
    this.style.color = "red";
  }
}

customElements.define("feedback-widget", Widget);
