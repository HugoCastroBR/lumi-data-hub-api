import express from "express";
import BillController from "../controllers/bill.controller"; 
import { createBillValidator, updateBillValidator } from "../middlewares/bill.middleware";

type billControllerType = InstanceType<typeof BillController>;

class BillRouter {
  private billController: billControllerType;

  constructor(billController: billControllerType) {
    this.billController = billController;
  }

  getRouter() {
    const router = express.Router();

    router.get("/bills", this.billController.getAllBills);
    router.get("/bills/:id", this.billController.getBillById);

    router.post(
      "/bills",
      (req, res, next) => {
        createBillValidator(req, res, next);
      },
      (req, res) => {
        this.billController.createBill(req, res);
      }
    );

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
