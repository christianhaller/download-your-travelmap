// @ts-ignore
import { validateFn } from "../../backend/validateFn.ts";
// @ts-ignore
import { validHostnames } from "../../backend/validHostnames.ts";

export function validate(url: URL) {
  validateFn(url, validHostnames);
}
