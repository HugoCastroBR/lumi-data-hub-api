import ClientController from "../controllers/client.controller";
import ClientService from "../services/client.service";
import ClientRouter from "../routes/client.router";


const clientService = new ClientService();
const clientController = new ClientController(clientService);
const clientRouter = new ClientRouter(clientController);


export default {
  service: clientService,
  controller: clientController,
  router: clientRouter.getRouter(),
}