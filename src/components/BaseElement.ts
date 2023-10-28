export abstract class BaseElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  set template(value: string) {
    const template = document.createElement("template");
    template.innerHTML = value;
    this.shadowRoot?.appendChild(template.content.cloneNode(true));
  }

  set styles(value: string) {
    const style = document.createElement("style");
    style.innerHTML = value;
    this.shadowRoot?.appendChild(style);
  }
}
