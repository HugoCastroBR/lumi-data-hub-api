import { IBill } from '../../utils/types/models'; // Adjust the import path as needed
import request from "supertest";
import app from "../../app";
import { verifyIfBillIsValid } from "../../utils/validators"; // Adjust the import path as needed

describe("Bill", () => {
  let TestingBillID: number;

  describe("Get all bills", () => {
    it("should return a 200 status and JSON content type", async () => {
      const res = await request(app)
        .get("/bills")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.statusCode).toBe(200);
    });

    it("should return an array of bills", async () => {
      const res = await request(app)
        .get("/bills")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body).toBeInstanceOf(Array);

      if (res.body.length > 0) {
        const bill: IBill = res.body[0];
        verifyIfBillIsValid(bill);
      }
    });
  });
});
