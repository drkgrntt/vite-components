import { BaseElement } from "../BaseElement";
import template from "./index.html?raw";
import styles from "./index.css?inline";
import { createComponent } from "../../utils";

const ATTRIBUTES = {
  VALIDATION: "validation",
  TYPE: "type",
  LABEL: "label",
  NAME: "name",
  ID: "id",
} as const;

export class Field extends BaseElement {
  #validation = "";
  #type = "";
  #label = "";
  #name = "";
  #id = "";

  constructor() {
    super();
    this.template = template;
    this.styles = styles;
  }

  get validation() {
    return this.#validation;
  }

  set validation(value: string) {
    this.#validation = value;
    const validator = this.#getValidator();
    if (validator) validator.textContent = value;
  }

  get type() {
    return this.#type;
  }

  set type(value: string) {
    if (this.#type !== "textarea" && value === "textarea") {
      const textarea = document.createElement("textarea");
      textarea.setAttribute("data-input", "");
      textarea.setAttribute("cols", "5");
      this.#getInput()?.replaceWith(textarea);
      this.#resetInputAttributes();
      return;
    } else if (this.#type === "textarea" && value !== "textarea") {
      const input = document.createElement("input");
      input.setAttribute("data-input", "");
      this.#getInput()?.replaceWith(input);
      this.#resetInputAttributes();
    }
    this.#type = value;
    this.#getInput()?.setAttribute("type", value);
  }

  get name() {
    return this.#name;
  }

  set name(value: string) {
    this.#name = value;
    this.#getInput()?.setAttribute("name", value);
  }

  get id() {
    return this.#id;
  }

  set id(value: string) {
    this.#id = value;
    this.#getInput()?.setAttribute("id", value);
    this.#getLabel()?.setAttribute("for", value);
  }

  get label() {
    return this.#label;
  }

  set label(value: string) {
    this.#label = value;
    const label = this.#getLabel();
    if (label) label.textContent = value;
  }

  #getValidator() {
    return this.shadowRoot?.querySelector("[data-validation]");
  }

  #getInput() {
    return this.shadowRoot?.querySelector("[data-input]");
  }

  #getLabel() {
    return this.shadowRoot?.querySelector("[data-label]");
  }

  #resetInputAttributes() {
    this.id = this.id;
    this.name = this.name;
  }

  connectedCallback() {}

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

createComponent("drk-field", Field);
