import express from "express";
import ClientController from "../controllers/client.controller";
import { createClientValidator, updateClientValidator } from "../middlewares/client.middleware";



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
    router.post("/clients",
      (req,res,next) => {
        createClientValidator(req,res,next)
      },
      (req,res) => {
        this.clientController.createClient(req,res)
      }
    )
    router.put("/clients/:id", (req,res,next) => {
      updateClientValidator(req,res,next)
    },
      (req,res) => {
        this.clientController.updateClient(req,res)
      }
    );
    router.delete("/clients/:id", this.clientController.deleteClient);
    return router;
  }
}

export default ClientRouter;