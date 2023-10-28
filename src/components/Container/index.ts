import { BaseElement } from "../BaseElement";
import template from "./index.html?raw";
import styles from "./index.css?inline";
import { createComponent } from "../../utils";

export class Container extends BaseElement {
  constructor() {
    super();
    this.template = template;
    this.styles = styles;
  }

  static get observedAttributes() {
    return [];
  }

  attributeChangedCallback(name: string, _: string, __: string) {
    switch (name) {
    }
  }
}

createComponent("drk-container", Container);
