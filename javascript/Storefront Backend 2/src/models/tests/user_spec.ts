import { UserStore } from "../user";

const store = new UserStore();
describe("User Model: ", () => {
  beforeAll(() => {
    store.create({
      id: 1,
      username: "luan",
      password: "password",
      password_digest: "",
      email: "email1@gmail.com",
    });
    store.create({
      id: 2,
      username: "test_delete",
      password: "Abc12345",
      password_digest: "",
      email: "email2@gmail.com",
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

  it("create method should add a user", async () => {
    const result = await store.create({
      id: 1,
      username: "name",
      password: "Abc12345",
      password_digest: "",
      email: "email@gmail.com",
    });
    expect(result.username).toEqual("name");
    expect(result.email).toEqual("email@gmail.com");
  });

  it("index method should return a list of users", async () => {
    const result = await store.index();
    expect(Array.isArray(result)).toBe(true);
  });

  it("show method should return the correct user", async () => {
    const result = await store.show(1);
    expect(result.username).toEqual("test_show");
    expect(result.email).toEqual("email1@gmail.com");
  });

  it("delete method should remove the user", async () => {
    const result = await store.delete(2);

    expect(result).toBeGreaterThan(-1);
  });
});
