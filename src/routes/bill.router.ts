import express from "express";
import BillController from "../controllers/bill.controller"; 
import { createBillValidator, updateBillValidator } from "../middlewares/bill.middleware";
import multer from "multer";

type billControllerType = InstanceType<typeof BillController>;

class BillRouter {
  private billController: billControllerType;

  constructor(billController: billControllerType) {
    this.billController = billController;
  }

  getRouter() {
    const router = express.Router();
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'data/uploads/')
      },
      filename: (req, file, cb) => {
        cb(null, file.originalname)
      }
    })

    const upload = multer({ storage: storage })


    router.get("/bills", this.billController.getAllBills);
    router.get("/bills/:id", this.billController.getBillById);

    router.post('/bills',upload?.single('file'), (req, res) => {
      try {
        if(!req.file){
           res.status(400).json({error: 'File not found'})
        }else{
          const uploadedFile = req.file;
          const fileName = uploadedFile.originalname;
          const filePath = uploadedFile.path;
          res.status(200).send({message:"Success"})
        }
      } catch (error) {
        console.log(error)
      }
    });
    

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
