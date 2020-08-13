import { validateFn } from "../backend/validateFn";
import { validHostnames } from "../backend/validHostnames";

export function validate(urlString: string): URL {
  const url = new URL(urlString);
  validateFn(url, validHostnames);
  return url;
}
