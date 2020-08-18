import { Form } from "./Form/Form.ts";
import { Success } from "./response/success/Success";

new Form(document, new Success(".success", document)).init();
