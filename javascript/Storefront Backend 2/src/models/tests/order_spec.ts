import { OrderStore } from "../order";

const store = new OrderStore();

describe("Test for Order Model", () => {
  beforeAll(() => {
    store.create({
      id: 1,
      user_id: 1,
      total_price: 0,
      status: 0,
    });
    store.create({
      id: 2,
      user_id: 1,
      total_price: 0,
      status: 0,
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

  it("create method should add a order", async () => {
    const result = await store.create({
      id: 1,
      user_id: 1,
      total_price: 0,
      status: 0,
    });
    expect(result.total_price).toEqual(0);
    expect(result.status).toEqual(0);
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(Array.isArray(result)).toBe(true);
  });

  it("show method should return the correct order", async () => {
    const result = await store.show(1);
    expect(result.total_price).toEqual(0);
    expect(result.status).toEqual(0);
  });

  it("delete method should remove the order", async () => {
    const result = await store.delete(2);

    expect(result).toBeGreaterThan(-1);
  });
});
