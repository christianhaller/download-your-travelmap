export function validateFn(url: URL, validHostnames: string[]) {
  const { hostname } = url;
  const hostnameWithoutWww = hostname.replace("www.", "");
  if (
    validHostnames.includes(hostname) ||
    validHostnames.includes(hostnameWithoutWww)
  ) {
  } else {
    throw new Error(`${hostname} is not a valid tripadvisor url`);
  }
}
