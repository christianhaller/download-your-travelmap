import { Form } from "./form/Form";

(() => {
  const form = new Form(document).init();
  const url = new URLSearchParams(window.location.search).get("url");
  const now = new Date().getTime();
  const page_load_time = now - performance.timing.navigationStart;
  document.querySelector(
    ".js-rendered-in"
  ).innerHTML = `rendered in ${page_load_time}ms`;

  if (url) {
    form.autoSubmit(url);
  }
})();
