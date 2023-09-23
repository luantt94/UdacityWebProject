import { checkForName } from "../src/client/js/nameChecker";
// The describe() function takes two arguments - a string description, and a test suite as a callback function.
// A test suite may contain one or more related tests
describe("Testing the Name Checker functionality", () => {
  // The test() function has one argument - a string
  test("Testing the checkForName() function", () => {
    expect(checkForName("")).toBe(false);
    expect(
      checkForName("I absolutely loved the movie! The plot was captivating")
    ).toBe(true);
  });
});
