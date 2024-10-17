import request from "supertest";
import app from "../app";
describe("Health check", () => {
 
  test("Should return a 200 status", async () => {
    const res = await request(app).get("/health").expect(200);
  });

  test("Should return a JSON content type", async () => {
    const res = await request(app).get("/health").expect("Content-Type", /json/);
  });

  test("Should return an object with the correct properties", async () => {
    const res = await request(app).get("/health").expect(200);
    expect(res.body).toHaveProperty("uptime");
    expect(res.body).toHaveProperty("status");
    expect(res.body).toHaveProperty("date");
  });

});