import { BaseElement } from "../BaseElement";
import { createComponent } from "../../utils";
import template from "./index.html?raw";
import styles from "./index.css?inline";
import { Loader } from "../Loader";

const ATTRIBUTES = {
  COLOR: "color",
  BACKGROUND: "background",
  ONCLICK: "onclick",
} as const;

export class Button extends BaseElement {
  #onClick: (this: GlobalEventHandlers, ev: Event) => any = (_) => {};
  #color = "";
  #background = "";

  constructor() {
    super();
    this.template = template;
    this.styles = styles;
  }

  get color() {
    return this.#color;
  }

  set color(value: string) {
    this.#color = value;
  }

  get background() {
    return this.#background;
  }

  set background(value: string) {
    this.#background = value;
  }

  get onclick() {
    return this.#onClick;
  }

  set onclick(value: (this: GlobalEventHandlers, ev: Event) => any) {
    this.#onClick = value;
  }

  #getButton() {
    return this.shadowRoot?.querySelector("button");
  }

  #getLoader() {
    return this.shadowRoot?.querySelector<Loader>("drk-loader");
  }

  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
  }

  attributeChangedCallback(
    name: (typeof ATTRIBUTES)[keyof typeof ATTRIBUTES],
    _: string,
    newValue: string
  ) {
    if (name === "onclick") {
      this[name] = (event: Event) => new Function("event", newValue)(event);
      return;
    }

    this[name] = newValue;
  }

  changeButtonStyle(name: string, value: string) {
    this.#getButton()?.style.setProperty(name, value);
  }

  connectedCallback() {
    this.#getLoader()?.style.setProperty("display", "none");
    this.#getButton()?.addEventListener("click", this.handleClick);
  }

  disconnectedCallback() {
    this.#getButton()?.removeEventListener("click", this.handleClick);
  }

  handleClick = async (event: Event) => {
    event.stopPropagation();

    const button = this.#getButton();
    if (!button) return;

    button.disabled = true;
    this.#getLoader()?.style.setProperty("display", "block");
    button.querySelector("slot")?.style.setProperty("display", "none");

    await this.#onClick(event);

    button.disabled = false;
    this.#getLoader()?.style.setProperty("display", "none");
    button.querySelector("slot")?.style.setProperty("display", "block");
  };
}

createComponent("drk-button", Button);
