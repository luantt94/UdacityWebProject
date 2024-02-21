import { ProductStore } from "../product";

const store = new ProductStore();

describe("Test for Product Model", () => {
  beforeAll(() => {
    store.create({
      id: 1,
      name: "iphone",
      price: 10,
      quantity: 10,
    });
    store.create({
      id: 2,
      name: "nokia",
      price: 10,
      quantity: 10,
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

  it("create method should add a product", async () => {
    const result = await store.create({
      id: 1,
      name: "ipad",
      price: 10,
      quantity: 10,
    });
    expect(result.name).toEqual("ipad");
    expect(result.price).toEqual(10);
    expect(result.quantity).toEqual(10);
  });

  it("index method should return a list of products", async () => {
    const result = await store.index();
    expect(Array.isArray(result)).toBe(true);
  });

  it("show method should return the correct product", async () => {
    const result = await store.show(1);
    expect(result.name).toEqual("iphone");
    expect(result.price).toEqual(10);
    expect(result.quantity).toEqual(10);
  });

  it("delete method should remove the product", async () => {
    const result = await store.delete(2);

    expect(result).toBeGreaterThan(-1);
  });
});
