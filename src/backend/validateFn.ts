export function validateFn(url: URL, validHostnames: string[]) {
  const { hostname } = url;
  const hostnameWithtWww = `www.${hostname}`;
  if (
    validHostnames.includes(hostname) ||
    validHostnames.includes(hostnameWithtWww)
  ) {
  } else {
    throw new Error(`${hostname} is not a valid tripadvisor url`);
  }
}
