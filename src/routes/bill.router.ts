import express from "express";
import BillController from "../controllers/bill.controller"; 
import { updateBillValidator, uploadBill } from "../middlewares/bill.middleware";

type billControllerType = InstanceType<typeof BillController>;

class BillRouter {
  private billController: billControllerType;

  constructor(billController: billControllerType) {
    this.billController = billController;
  }

  getRouter() {
    
    const router = express.Router();

    router.post('/bills',(req, res,next) => {
      uploadBill(req, res,next);
    },
    (req,res,next) => {
      this.billController.createBill(req,res)
    }
    );

    router.get("/bills", this.billController.getAllBills);
    router.get("/bills/:id", this.billController.getBillById);
    router.put(
      "/bills/:id",
      (req, res, next) => {
        updateBillValidator(req, res, next);
      },
      (req, res) => {
        this.billController.updateBill(req, res);
      }
    );

    router.delete("/bills/:id", this.billController.deleteBill);

    return router;
  }
}

export default BillRouter;
