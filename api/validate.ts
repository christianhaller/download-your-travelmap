import { validHostnames } from "./validHostnames.ts";

const validate = (url: URL): void => {
  const { hostname } = url;
  const hostnameWithoutWww = hostname.replace("www.", "");
  if (
    validHostnames.includes(hostname) ||
    validHostnames.includes(hostnameWithoutWww)
  ) {
    console.log("valid hostame");
  } else {
    throw Error(`${hostname} is not a valid tripadvisor url`);
  }
};

export { validate };
