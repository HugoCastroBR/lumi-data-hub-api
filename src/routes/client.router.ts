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
    router.get("/clients", this.clientController.getAllClients);
    router.get("/clients/:id", this.clientController.getClientById);
    router.post("/clients", this.clientController.createClient);
    router.put("/clients/:id", this.clientController.updateClient);
    router.delete("/clients/:id", this.clientController.deleteClient);
    return router;
  }
}

export default ClientRouter;