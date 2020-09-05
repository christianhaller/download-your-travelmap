import { Form } from "./Form";

describe("Form", () => {
  document.body.innerHTML = "<form><input id='url'/><button></button></form>";
  test("init", () => {
    new Form(document).init(document);
    expect(true).toBe(true);
  });
});
