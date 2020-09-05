import { validate } from "./validate";

describe("validate", () => {
  test("should work", () => {
    expect(() => {
      validate(new URL("https://tripadvisor.com/members/christian"));
    }).not.toThrow();
  });

  test("should throw", () => {
    expect(() => {
      validate(new URL("https://tripadvisor.ddr/members/christian"));
    }).toThrowErrorMatchingInlineSnapshot(
      `"tripadvisor.ddr is not a valid tripadvisor url"`
    );
  });
});
