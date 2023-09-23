import { validateInput } from "../src/client/js/formHandler";
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the Name validateInput functionality", () => {
  // The test() function has one argument - a string
  test("Testing the validateInput function", () => {
    expect(validateInput("")).toBe(false);
    expect(
      validateInput("I absolutely loved the movie! The plot was captivating")
    ).toBe(true);
  });
});
