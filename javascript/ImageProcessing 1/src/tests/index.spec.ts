import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("Create image endpoint", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=200&height=200"
    );
    expect(response.status).toBe(200);
  });

  it("Validate the height = aaa", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=200&height=aaa"
    );
    expect(response.status).toBe(400);
  });

  it("Validate the width = ppp", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=ppp&height=200"
    );
    expect(response.status).toBe(400);
  });

  it("Validate the width = 0", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=0&height=22"
    );
    expect(response.status).toBe(400);
  });

  it("Validate the height = 00", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=22&height=00"
    );
    expect(response.status).toBe(400);
  });

  it("Validate the filename param", async () => {
    const response = await request.get(
      "/api/images?filename=aaa&width=200&height=200"
    );
    expect(response.status).toBe(400);
  });
});
