import { IClient } from '../../utils/types/models';
import request from "supertest";
import app from "../../app";
import { verifyIfClientIsValid } from "../../utils/validators";



describe("Client", () => {
  describe("Get all clients", () => {
    it("should return a 200 status and JSON content type", async () => {
      const res = await request(app)
        .get("/clients")
        .expect("Content-Type", /json/)
        .expect(200);
        expect(res.statusCode).toBe(200);
    });
  
    it("should return an array of clients", async () => {
      const res = await request(app)
        .get("/clients")
        .expect("Content-Type", /json/)
        .expect(200);
  
      expect(res.body).toBeInstanceOf(Array);
      
      if (res.body.length > 0) {
        const client: IClient = res.body[0];
        verifyIfClientIsValid(client);
      }
    });
  });

  describe("Client with specific id", () => {
    it ("should return a 404 status", async () => {
      const res = await request(app).get("/clients/123").expect(404);
      expect(res.statusCode).toBe(404);
    });
  
    it("should return a 200 status and JSON content type", async () => {
      const res = await request(app).get("/clients/1").expect(200);
      expect(res.statusCode).toBe(200);
    });
  
    it("should return a specific client", async () => {
      const res = await request(app).get("/clients/1").expect(200);
      expect(res.body.id).toBe(1);
    });
  });

  describe("Create a new client", () => {
    it("should return a 404 status", async () => {
      const res = await request(app).post("/clients").expect(404);
      expect(res.statusCode).toBe(404);
    });
  });
});