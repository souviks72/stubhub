import request from "supertest";
import { app } from "../../app";

it("fails when an email that doesnot exist is supplied", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test1@test.com",
      password: "password",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test2@test.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test2@test.com",
      password: "passwordwrong",
    })
    .expect(400);
});

it("responds with a cookie when given valid credentials", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test3@test.com",
      password: "password",
    })
    .expect(201);

  const res = await request(app)
    .post("/api/users/signin")
    .send({
      email: "test3@test.com",
      password: "password",
    })
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
});
