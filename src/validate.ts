import { validHostnames } from "./validHostnames.ts";
import * as log from "https://deno.land/std/log/mod.ts";

const validate = (url: URL): void => {
  const { hostname } = url;
  const hostnameWithoutWww = hostname.replace("www.", "");
  if (
    validHostnames.includes(hostname) ||
    validHostnames.includes(hostnameWithoutWww)
  ) {
    log.debug("valid hostame");
  } else {
    throw new Error(`${hostname} is not a valid tripadvisor url`);
  }
};

export { validate };
