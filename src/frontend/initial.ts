import { Form } from "./form/Form";
import type { Success } from "./response/success/Success";

const form = new Form(document).init();

const url = new URLSearchParams(window.location.search).get("url");
if (url) {
  form.autoSubmit(url);
}
declare global {
  interface Window {
    success: Success;
  }
}
