import { Form } from "./form/Form";

const form = new Form(document).init();

const url = new URLSearchParams(window.location.search).get("url");
if (url) {
  form.autoSubmit(url);
}
