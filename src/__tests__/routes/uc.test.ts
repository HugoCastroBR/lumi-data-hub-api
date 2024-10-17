import { IUC } from '../../utils/types/models';
import request from "supertest";
import app from "../../app";
import { verifyIfUCIsValid } from "../../utils/validators";

describe("UC", () => {

  let TestingUcID: number;

  describe("Get all UCs", () => {
    it("should return a 200 status and JSON content type", async () => {
      const res = await request(app)
        .get("/ucs")
        .expect("Content-Type", /json/)
        .expect(200);
      expect(res.statusCode).toBe(200);
    });

    it("should return an array of UCs", async () => {
      const res = await request(app)
        .get("/ucs")
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.body).toBeInstanceOf(Array);

      if (res.body.length > 0) {
        const uc: IUC = res.body[0];
        verifyIfUCIsValid(uc);
      }
    });
  });

  describe("Create a new UC", () => {
    it("should create a new UC", async () => {
      const res = await request(app)
        .post("/ucs")
        .send({
          registerN: "1234567890",
          clientId: 0,
        })
        .expect(201);

      expect(res.body.registerN).toBe("1234567890");
      TestingUcID = res.body.id;
    });

    it("should not create a new UC", async () => {
      const res = await request(app)
        .post("/ucs")
        .send({
          registerN: "222",
        })
        .expect(400);
    });
  });

  describe("UC with specific id", () => {
    it("should return a 404 status", async () => {
      const res = await request(app).get("/ucs/123").expect(404);
      expect(res.statusCode).toBe(404);
    });

    it("should return a 200 status and JSON content type", async () => {
      const res = await request(app).get(`/ucs/${TestingUcID}`).expect(200);
      expect(res.statusCode).toBe(200);
    });

    it("should return a specific UC", async () => {
      const res = await request(app).get(`/ucs/${TestingUcID}`).expect(200);
      expect(res.body.id).toBe(TestingUcID);
    });
  });

  describe("Update a UC with specific id", () => {
    it("should update a UC", async () => {
      const res = await request(app)
        .put(`/ucs/${TestingUcID}`)
        .send({
          registerN: "1234567891",
        })
        .expect(200);

      expect(res.body.registerN).toBe("1234567891");
    });

    it("should not find a UC and update a UC", async () => {
      const res = await request(app)
        .put(`/ucs/123`)
        .send({
          registerN: 'Full Test'
        })
        .expect(404);
    });
  });

  describe("Delete a UC with specific id", () => {
    it("should delete a UC with specific id", async () => {
      const res = await request(app)
        .delete(`/ucs/${TestingUcID}`)
        .expect(204);
    });

    it("should not find and delete a UC with specific id", async () => {
      const res = await request(app)
        .delete(`/ucs/123`)
        .expect(404);
    });
  });
});
