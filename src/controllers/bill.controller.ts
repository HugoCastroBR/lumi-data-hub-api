import BillService from "../services/bill.service"; // Adjust the import path as needed
import { Request, Response } from "express";
import { extractDataFromPDF } from "../utils/files";

type billServiceType = InstanceType<typeof BillService>;

class BillController {
  private billService: billServiceType;

  readBill = async (req: Request, res: Response) => {
    
    if(req.file == undefined){
      res.status(201).send(req.file);
    }else{
      const dataParsed = await extractDataFromPDF(req.file.path);
      res.status(201).send(dataParsed);
    }
    
  }

  constructor(billService: billServiceType) {
    this.billService = billService;
  }

  getAllBills = async (req: Request, res: Response) => {
    const bills = await this.billService.getAllBills();
    res.json(bills);
  }

  getBillById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const bill = await this.billService.getBillById(Number(id));
    if (bill == null) {
      res.status(404).send("Bill not found");
    } else {
      res.json(bill);
    }
  }

  createBill = async (req: Request, res: Response) => {
    const bill = req.body;
    try {
      const newBill = await this.billService.createBill(bill);
      res.status(201).send(newBill);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        res.status(500).send("Could not create Bill");
      }
    }
  }

  updateBill = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Missing request body."
      });
    }

    const bill = req.body;
    const billId = Number(req.params.id);

    try {
      const updatedBill = await this.billService.updateBill(billId, bill);
      res.status(200).send(updatedBill);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Bill not found") {
          res.status(404).send("Bill not found");
        } else {
          console.error(error.message);
          res.status(500).send("Could not update Bill");
        }
      }
    }
  }

  deleteBill = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.billService.deleteBill(Number(id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Bill not found") {
          res.status(404).send("Bill not found");
        } else {
          console.error(error.message);
          res.status(500).send("Could not delete Bill");
        }
      }
    }
  }
}

export default BillController;
