import request from "supertest";
import { app } from "../../app";

it("cookie is cleared after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  console.log(res.get("Set-Cookie"));
});
