import UcController from "../controllers/uc.controller";
import UcRouter from "../routes/uc.router";
import UcService from "../services/uc.service";

const ucService = new UcService();
const ucController = new UcController(ucService);
const ucRouter = new UcRouter(ucController);

export default {
  service: ucService,
  controller: ucController,
  router: ucRouter.getRouter(),
}