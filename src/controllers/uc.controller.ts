import UcService  from '../services/uc.service';
import e, { Request, Response } from "express";

class UcController {
  private ucService: UcService;

  constructor(ucService: UcService) {
    this.ucService = ucService;
  }

  getAllUcs = async (req: Request, res: Response) => {
    const ucs = await this.ucService.getAllUcs();
    res.json(ucs);
  }

  getUcById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const uc = await this.ucService.getUcById(Number(id));
    if(uc == null){
      res.status(404).send("UC not found");
    }else{
      res.json(uc);
    }
  }

  // createUc = async (req: Request, res: Response) => {
  //   const uc = req.body;
  //   try {
  //     const newUc = await this.ucService.createUc(uc);
  //     res.status(201).send(newUc);
  //   } catch (error) {
  //     if(error instanceof Error){
  //       res.status(500).send(error.message);
  //     }else{
  //       res.status(500)
  //     }
  //   }
  // }

  updateUc = async (req: Request, res: Response) => {
    if(!req.body) {
      return res.status(400).send({
        message: "Missing request body."
      })
    }

    const uc = req.body;
    const ucId = Number(req.params.id)
    
    try {
      const updatedUc = await this.ucService.updateUc(ucId,uc);
      res.status(200).send(updatedUc);
    } catch (error) {
      if(error instanceof Error){
        if(error.message === "UC not found") {
          res.status(404).send();
        }
      }else{
        res.status(500)
      }
    }
  }

  deleteUc = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.ucService.deleteUc(Number(id));
      res.status(204).send();
    } catch (error) {
      if(error instanceof Error){
        if(error.message == "UC not found"){
          res.status(404).send()
        }
      }else{
        res.status(500)
      }
    }
  }

  
}

export default UcController