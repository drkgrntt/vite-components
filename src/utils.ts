export const createComponent = (
  name: string,
  Component: CustomElementConstructor,
  options?: ElementDefinitionOptions
) => {
  customElements.get(name) ?? customElements.define(name, Component, options);
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const parseBool = (value: string): boolean => {
  return value.toLowerCase() === "true";
};
