// @ts-ignore
import { validHostnames } from "./validHostnames.ts";
// @ts-ignore
import { validateFn } from "./validateFn.ts";

const validate = (url: URL): void => {
  validateFn(url, validHostnames);
};

export { validate };
