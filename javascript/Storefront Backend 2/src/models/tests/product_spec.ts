import { Product, ProductStore } from "../product";

const store = new ProductStore();

describe("Test for Product Model", () => {
  it("Should have an index method", () => {
    expect(store.index).toBeDefined();
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });
});
