import { User, UserStore } from "../user";

const store = new UserStore();

describe("Test for User Model", () => {
  it("Should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("Should have an create method", () => {
    expect(store.create).toBeDefined();
  });

  it("Should have an destroy method", () => {
    expect(store.delete).toBeDefined();
  });

  it("Should have an show method", () => {
    expect(store.show).toBeDefined();
  });

  it("index method should return a list of users", async () => {
    try {
      const result = await store.index();
      expect(result).toEqual([]);
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  });
});
