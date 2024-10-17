import { IClient } from '../../utils/types/models';
import request from "supertest";
import app from "../../app";
import { verifyIfClientIsValid } from "../../utils/validators";



describe("Client", () => {

  let TestingClientID:number;

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

  describe("Create a new client", () => {
    it("should create a new client", async () => {
      const res = await request(app)
        .post("/clients")
        .send({
          registerN: "222",
          name: "Test Client",
        })
        .expect(201);

      expect(res.body.name).toBe("Test Client");
      TestingClientID = res.body.id
    });

    it("should not create a new client", async () => {
      const res = await request(app)
        .post("/clients")
        .send({
          registerN: "222",
          name: "Test Client",
        })
        .expect(409);
    })
  });
  
  describe("Client with specific id", () => {
    it ("should return a 404 status", async () => {
      const res = await request(app).get("/clients/123").expect(404);
      expect(res.statusCode).toBe(404);
    });
  
    it("should return a 200 status and JSON content type", async () => {
      const res = await request(app).get(`/clients/${TestingClientID}`).expect(200);
      expect(res.statusCode).toBe(200);
    });
  
    it("should return a specific client", async () => {
      const res = await request(app).get(`/clients/${TestingClientID}`).expect(200);
      expect(res.body.id).toBe(TestingClientID);
    });
  });

  describe("Update a client with specific id", () => {
    it("Should update a client", async () => {
      const res = await request(app)
      .put(`/clients/${TestingClientID}`)
      .send({
        name: 'Full Test',
        registerN: "333",
      })
      .expect(200)

      expect(res.body.name).toBe("Full Test")
      expect(res.body.registerN).toBe("333")
    })

    it("Should not find a client and update a client", async () => {
      const res = await request(app)
      .put(`/clients/123`)
      .send({
        name: 'Full Test'
      })
      .expect(404)
    })
  })

  describe("Delete a client with specific id", () => {
    it("Should delete a client with specific id", async () => {
      const res = await request(app)
      .delete(`/clients/${TestingClientID}`)
      .expect(204)
    })
    it("Should not find and delete a client with specific id", async () => {
      const res = await request(app)
      .delete(`/clients/123`)
      .expect(404)
    })
  })
});