import supertest from "supertest";
import app from "../index";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=200&height=200"
    );
    expect(response.status).toBe(200);
  });

  it("Validate the height param", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=200&height=aaa"
    );
    expect(response.status).toBe(400);
  });

  it("Validate the width param", async () => {
    const response = await request.get(
      "/api/images?filename=palmtunnel&width=ppp&height=200"
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
