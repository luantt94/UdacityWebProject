import supertest from "supertest";
import app from "../../server";
const request = supertest(app);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJ1c2VybmFtZSI6Imx1YW4iLCJlbWFpbCI6ImVtYWlsIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDRhSi5aYnA5RTdEdTJZRW42RjJENy50T04ydS81QlI3WjJGUkhlSFVrbnQ0ZFJXaVIvT1dpIn0sImlhdCI6MTcwODQzNjc0M30.15o4Fi1_vbcX2ly-NYrpt0C-UI0In7S63uzuQ91C3Yo";
describe("Order handler: ", () => {
  beforeAll(() => {
    const order1 = {
      user_id: "1",
    };
    request
      .post("/orders")
      .send(order1)
      .expect("Content-Type", /json/)
      .expect(200);
    const order2 = {
      user_id: "2",
    };
    request
      .post("/orders")
      .send(order2)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("create a new order", () => {
    const data = {
      user_id: "2",
    };
    request
      .post("/orders")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get all orders", () => {
    request
      .get("orders")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get order by id", () => {
    request
      .get("orders/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("get order by id", () => {
    request
      .delete("orders/2")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
