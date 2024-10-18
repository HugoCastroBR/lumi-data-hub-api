import fs from 'fs/promises';
import { IBill } from '../../utils/types/models';
import request from "supertest";
import app from "../../app";
import { verifyIfBillIsValid } from "../../utils/validators";
import { createUploadsFolderIfNotExists } from '../../utils/files';

describe("Bill", () => {

  let billId: number;

  describe("Should verify if the upload folder exists", () => {
    it("Should find the uploads folder", async () => {
      fs.access(`data/uploads`).then(() => { }).catch((err) => {
        expect(err).toBeUndefined();
      });
    });
  })
  describe("Should upload a file to uploads folder", () => {

    it("Should return a 201 status", async () => {
      await createUploadsFolderIfNotExists();
      const res = await request(app)
        .post("/bills")
        .attach("file", "src/__tests__/mock/test.pdf")
        .expect(201)
        .expect("Content-Type", /json/);

      billId = res.body.id;

      expect(res.statusCode).toBe(201);
    });
  });

  describe("Verify Folder and File", () => {
    it("Should find the file in the uploads folder", async () => {
      fs.access(`data/uploads/test.pdf`).then(() => { }).catch((err) => {
        expect(err).toBeUndefined();
      });
    });
    it("Should compare the file size", async () => {
      const file = await fs.readFile("src/__tests__/mock/test.pdf");
      const uploadedFile = await fs.readFile(`data/uploads/test.pdf`);
      expect(file.byteLength).toBe(uploadedFile.byteLength);
    });

    it("Should compare the file content", async () => {
      const file = await fs.readFile("src/__tests__/mock/test.pdf");
      const uploadedFile = await fs.readFile(`data/uploads/test.pdf`);
      expect(file).toEqual(uploadedFile);
    });

    it("Should delete the file", async () => {
      fs.unlink(`data/uploads/test.pdf`).then(() => { }).catch((err) => {
        expect(err).toBeUndefined();
      });
    });
  })

  describe("Get a bill by id", () => {
    it("should return a 200 status and JSON content type", async () => {
      const res = await request(app)
        .get(`/bills/${billId}`)
        .expect("Content-Type", /json/)
        .expect(200);

      expect(res.statusCode).toBe(200);
    });

    it("should return a bill", async () => {
      const res = await request(app)
        .get(`/bills/${billId}`)
        .expect("Content-Type", /json/)
        .expect(200);

      const bill: IBill = res.body;
      verifyIfBillIsValid(bill);
    });
  })

  describe("Update a bill with specific id", () => {
    it("should update a bill", async () => {
      const res = await request(app)
        .put(`/bills/${billId}`)
        .send({
          month: 2,
          year: 2025,
          electricity: "100",
          electricityCost: "100",
          electricityScee: "100",
          electricitySceeCost: "100",
          electricityCompensated: "100",
          electricityCompensatedCost: "100",
          electricityPublicCost: "100",
        })
        .expect(200);

      expect(res.body.month).toBe(2);
      expect(res.body.year).toBe(2025);
      expect(res.body.electricity).toBe("100");
      expect(res.body.electricityCost).toBe("100");
      expect(res.body.electricityScee).toBe("100");
      expect(res.body.electricitySceeCost).toBe("100");
      expect(res.body.electricityCompensated).toBe("100");
      expect(res.body.electricityCompensatedCost).toBe("100");
      expect(res.body.electricityPublicCost).toBe("100");
    });

    it("should not find a bill and update a bill", async () => {
      const res = await request(app)
        .put(`/bills/123`)
        .send({
          month: 2,
          year: 2025,
          electricity: "100",
          electricityCost: "100",
          electricityScee: "100",
          electricitySceeCost: "100",
          electricityCompensated: "100",
          electricityCompensatedCost: "100",
          electricityPublicCost: "100",
        })
        .expect(404);
    });
  });

  describe("Delete a bill by id", () => {
    it("should return a 204 status", async () => {
      const res = await request(app)
        .delete(`/bills/${billId}`)
        .expect(204);

      expect(res.statusCode).toBe(204);
    });

    it("should not find a bill and delete a bill", async () => {
      const res = await request(app)
        .delete(`/bills/${billId}`)
        .expect(404);
    });
  });

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
