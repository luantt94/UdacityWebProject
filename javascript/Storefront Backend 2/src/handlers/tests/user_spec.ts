import supertest from "supertest";
import app from "../../server";
const request = supertest(app);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJ1c2VybmFtZSI6Imx1YW4iLCJlbWFpbCI6ImVtYWlsIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJDRhSi5aYnA5RTdEdTJZRW42RjJENy50T04ydS81QlI3WjJGUkhlSFVrbnQ0ZFJXaVIvT1dpIn0sImlhdCI6MTcwODQzNjc0M30.15o4Fi1_vbcX2ly-NYrpt0C-UI0In7S63uzuQ91C3Yo";
describe("User handler: ", () => {
  beforeAll(() => {
    const user1 = {
      username: "luan",
      password: "password1",
      email: "email1",
    };
    request
      .post("/users")
      .send(user1)
      .expect("Content-Type", /json/)
      .expect(200);
    const user2 = {
      username: "luan2",
      password: "password1",
      email: "email1",
    };
    request
      .post("/users")
      .send(user2)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("create a new user", () => {
    const data = {
      username: "luan",
      password: "password1",
      email: "email1",
    };
    request
      .post("/users")
      .send(data)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get all users", () => {
    request
      .get("users")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it("get user by id", () => {
    request
      .get("users/1")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });
  it("get user by id", () => {
    request
      .delete("users/2")
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
