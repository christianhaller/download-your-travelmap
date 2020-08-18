//@ts-ignore
import { Form } from "./Form/Form";
import { Success } from "./response/success/Success";

new Form(document, new Success(".success", document)).init();
