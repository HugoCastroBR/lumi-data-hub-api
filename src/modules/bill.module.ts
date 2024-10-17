import BillController from "../controllers/bill.controller"; 
import BillService from "../services/bill.service"; 
import BillRouter from "../routes/bill.router"; 

const billService = new BillService();
const billController = new BillController(billService);
const billRouter = new BillRouter(billController);

export default {
  service: billService,
  controller: billController,
  router: billRouter.getRouter(),
};
