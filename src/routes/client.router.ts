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
     *      
     */
    router.get("/clients", this.clientController.getAllClients);
    return router;
  }
}

export default ClientRouter;