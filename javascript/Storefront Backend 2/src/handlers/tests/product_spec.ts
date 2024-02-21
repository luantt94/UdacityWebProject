import supertest from "supertest";
import app from "../../server";
const request = supertest(app);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJ1c2VybmFtZSI6Imx1YW4iLCJlbWFpbCI6ImVtYWlsIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDRhSi5aYnA5RTdEdTJZRW42RjJENy50T04ydS81QlI3WjJGUkhlSFVrbnQ0ZFJXaVIvT1dpIn0sImlhdCI6MTcwODQzNjc0M30.15o4Fi1_vbcX2ly-NYrpt0C-UI0In7S63uzuQ91C3Yo";
describe("Product handler: ", () => {
  beforeAll(() => {
    const product1 = {
      name: "nokia",
      price: 22,
      quantity: 12,
    };
    request
      .post("/products")
      .send(product1)
      .expect("Content-Type", /json/)
      .expect(200);
    const product2 = {
      name: "ipad",
      price: 22,
      quantity: 12,
    };
    request
      .post("/products")
      .send(product2)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("create a new product", () => {
    const data = {
      name: "iphone",
      price: 22,
      quantity: 12,
    };
    request
      .post("/products")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get all products", () => {
    request
      .get("products")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get product by id", () => {
    request
      .get("products/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("get product by id", () => {
    request
      .delete("products/2")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
