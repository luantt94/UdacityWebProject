import { ProductOrderStore } from "../product_order";

const store = new ProductOrderStore();

describe("Test for ProductOrder Model", () => {
  beforeAll(() => {
    store.create({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 1,
    });
    store.create({
      id: 2,
      order_id: 1,
      product_id: 1,
      quantity: 1,
    });
  });
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

  it("create method should add a product_order", async () => {
    const result = await store.create({
      id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 1,
    });
    expect(Number(result.order_id)).toEqual(1);
    expect(Number(result.product_id)).toEqual(1);
    expect(result.quantity).toEqual(1);
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(Array.isArray(result)).toBe(true);
  });

  it("show method should return the correct product_order", async () => {
    const result = await store.show(1);
    expect(Number(result.order_id)).toEqual(1);
    expect(Number(result.product_id)).toEqual(1);
    expect(result.quantity).toEqual(1);
  });

  it("delete method should remove the product_order", async () => {
    const result = await store.delete(2);

    expect(result).toBeGreaterThan(-1);
  });
});
