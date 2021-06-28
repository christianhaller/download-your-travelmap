/* istanbul ignore file */
import { Form } from "./form/Form";
import { Highscore } from "./highscore/highscore";

const form = new Form(document).init();
new Highscore(document).init();
const url = new URLSearchParams(window.location.search).get("url");

if (url) {
  form.autoSubmit(url);
}

window.addEventListener("popstate", () => {
  const url = new URLSearchParams(window.location.search).get("url");
  if (!url) {
    document.dispatchEvent(new CustomEvent("success.hide"));
  } else {
    form.autoSubmit(url);
  }
});
