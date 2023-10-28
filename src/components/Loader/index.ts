import { BaseElement } from "../BaseElement";
import template from "./index.html?raw";
import styles from "./index.css?inline";
import { createComponent } from "../../utils";

const ATTRIBUTES = {
  COLOR: "color",
  SIZE: "size",
  TYPE: "type",
} as const;

const BUTTON_TYPES = ["circle", "horizontal"] as const;
type ButtonType = (typeof BUTTON_TYPES)[number];

export class Loader extends BaseElement {
  #color = "";
  #size = "";
  #type: ButtonType = "circle";

  constructor() {
    super();
    this.template = template;
    this.styles = styles;
  }

  get type() {
    return this.#type;
  }

  set type(value: string) {
    const loader = this.#getLoader();
    if (loader?.classList.contains(this.#type)) {
      loader.classList.remove(this.#type);
    }
    loader?.classList.add(value);
    this.#type = value as ButtonType;
  }

  get color() {
    return this.#color;
  }

  set color(value: string) {
    this.#color = value;
    this.#getPieces()?.forEach((piece) =>
      piece.style.setProperty("--color", value)
    );
  }

  get size() {
    return this.#size;
  }

  set size(value: string) {
    this.#size = value;
    this.#getLoader()?.style.setProperty("--size", value);
  }

  #getLoader() {
    return this.shadowRoot?.querySelector<HTMLDivElement>(".loader");
  }

  #getPieces() {
    return this.#getLoader()?.querySelectorAll<HTMLDivElement>(".piece");
  }

  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
  }

  attributeChangedCallback(
    name: (typeof ATTRIBUTES)[keyof typeof ATTRIBUTES],
    _: string,
    newValue: string
  ) {
    this[name] = newValue;
  }
}

createComponent("drk-loader", Loader);
