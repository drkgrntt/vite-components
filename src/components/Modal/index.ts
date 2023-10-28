import { BaseElement } from "../BaseElement";
import template from "./index.html?raw";
import styles from "./index.css?inline";
import { createComponent, parseBool } from "../../utils";

const ATTRIBUTES = {
  OPEN: "open",
} as const;

export class Modal extends BaseElement {
  #open = false;

  constructor() {
    super();
    this.styles = styles;
    this.template = template;
  }

  get open() {
    return this.#open;
  }

  set open(value: boolean) {
    this.#open = value;
    if (this.#open) {
      this.#getDialog()?.showModal();
    } else {
      this.#getDialog()?.close();
    }
  }

  #getDialog() {
    return this.shadowRoot?.querySelector("dialog");
  }

  #getCloseButton() {
    return this.shadowRoot?.querySelector<HTMLAnchorElement>(".close");
  }

  handleClose = () => {
    this.open = false;
  };

  connectedCallback() {
    this.#getCloseButton()?.addEventListener("click", this.handleClose);
  }

  disconnectedCallback() {
    this.#getCloseButton()?.removeEventListener("click", this.handleClose);
  }

  static get observedAttributes() {
    return Object.values(ATTRIBUTES);
  }

  attributeChangedCallback(
    name: (typeof ATTRIBUTES)[keyof typeof ATTRIBUTES],
    _: string,
    newValue: string
  ) {
    if (name === "open") {
      this.open = parseBool(newValue);
      return;
    }

    // this[name] = newValue;
  }
}

createComponent("drk-modal", Modal);
