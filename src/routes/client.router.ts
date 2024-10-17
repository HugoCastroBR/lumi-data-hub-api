import express from "express";
import ClientController from "../controllers/client.controller";



type clientControllerType = InstanceType<typeof ClientController>;
class ClientRouter {
  
  private clientController: clientControllerType;
  constructor(clientController:clientControllerType) {
    this.clientController = clientController;
  }

  getRouter() {
    const router = express.Router();
    /**
     * @swagger
     * components:
     *   schemas:
     *     Client:
     *       type: object
     *       properties:
     *         id:
     *           type: integer
     *         name:
     *           type: string
     *         createdAt:
     *           type: string
     *         updatedAt:
     *           type: string
     *         deletedAt:
     *           type: string
     *         bills:
     *           type: array
     *           items: []
     *         uc:
     *           type: array
     *           items: []
     *             
     * /clients:
     *   get:
     *     summary: Returns an array of clients
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Client'
     *   post:
     *     summary: Create a new client
     *     responses:
     *       201:
     *         description: Successful creation
     *         content:
     *           application/json:
     *             schema: {$ref: '#/components/schemas/Client'}
     * 
     * /clients/{id}:
     *   get:
     *     summary: Returns a client by id
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: A successful response
     *         content:
     *           application/json:
     *             schema:  
     *               type: object
     *   put:
     *     summary: Update a client
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       200:
     *         description: Successful update
     *         content:
     *           application/json:
     *             schema: {$ref: '#/components/schemas/Client'}
     * 
     *   delete:
     *     summary: Delete a client
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *     responses:
     *       204:
     *         description: No content
     *         content:
     *           application/json:
     *             schema:  
     *               type: object
     * 
     */
    router.get("/clients", this.clientController.getAllClients);
    router.get("/clients/:id", this.clientController.getClientById);
    router.post("/clients", this.clientController.createClient);
    router.put("/clients/:id", this.clientController.updateClient);
    router.delete("/clients/:id", this.clientController.deleteClient);
    return router;
  }
}

export default ClientRouter;