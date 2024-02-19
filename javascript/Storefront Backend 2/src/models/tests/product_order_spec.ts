import { ProductOrder, ProductOrderStore } from "../product_order";

const store = new ProductOrderStore();

describe("Test for ProductOrder Model", () => {
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

  it("index method should return a list of ProductOrders", async () => {
    try {
      const result = await store.index();
      expect(result).toEqual([]);
    } catch (err) {
      throw new Error(`Error: ${err}`);
    }
  });
});
