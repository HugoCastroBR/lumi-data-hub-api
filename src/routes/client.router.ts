import express from "express";
import ClientController from "../controllers/client.controller";

// const router = express.Router();

// /**
//  * @swagger
//  * /clients:
//  *   get:
//  *     summary: Returns a sample message
//  *     responses:
//  *       200:
//  *         description: A successful response
//  */
// router.get("/clients", clientController.getAllClients);


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
     *     summary: Returns a sample message
     *     responses:
     *       200:
     *         description: A successful response
     */
    router.get("/clients", this.clientController.getAllClients);
    return router;
  }
}

export default ClientRouter;