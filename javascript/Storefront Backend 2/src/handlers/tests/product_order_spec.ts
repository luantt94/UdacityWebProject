import supertest from "supertest";
import app from "../../server";
const request = supertest(app);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJ1c2VybmFtZSI6Imx1YW4iLCJlbWFpbCI6ImVtYWlsIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDRhSi5aYnA5RTdEdTJZRW42RjJENy50T04ydS81QlI3WjJGUkhlSFVrbnQ0ZFJXaVIvT1dpIn0sImlhdCI6MTcwODQzNjc0M30.15o4Fi1_vbcX2ly-NYrpt0C-UI0In7S63uzuQ91C3Yo";
describe("Product_product_order handler: ", () => {
  beforeAll(() => {
    const product_order1 = {
      order_id: "1",
      product_id: "1",
      quantity: "1",
    };
    request
      .post("/product_orders")
      .send(product_order1)
      .expect("Content-Type", /json/)
      .expect(200);
    const product_order2 = {
      order_id: "1",
      product_id: "1",
      quantity: "1",
    };
    request
      .post("/product_orders")
      .send(product_order2)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("create a new product_order", () => {
    const data = {
      order_id: "1",
      product_id: "1",
      quantity: "1",
    };
    request
      .post("/product_orders")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get all product_orders", () => {
    request
      .get("product_orders")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get product_order by id", () => {
    request
      .get("product_orders/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("get product_order by id", () => {
    request
      .delete("product_orders/2")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
