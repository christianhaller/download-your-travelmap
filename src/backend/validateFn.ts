export function validateFn(url: URL, validHostnames: string[]) {
  const { hostname } = url;
  const hostnameWithWww = `www.${hostname}`;
  if (
    !validHostnames.includes(hostname) &&
    !validHostnames.includes(hostnameWithWww)
  ) {
    throw new Error(`${hostname} is not a valid tripadvisor url`);
  }
}
