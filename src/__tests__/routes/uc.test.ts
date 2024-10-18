import { IUC } from '../../utils/types/models';
import request from "supertest";
import app from "../../app";
import { verifyIfUCIsValid } from "../../utils/validators";

describe("UC", () => {

  describe("Get all UCs", () => {
    it("should return a 200 status and JSON content type", async () => {
      const res = await request(app)
        .get("/ucs")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.statusCode).toBe(200);
    });

    it("should return an Object", async () => {
      const res = await request(app)
        .get("/ucs")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body).toBeInstanceOf(Object);
    });
  });
});
