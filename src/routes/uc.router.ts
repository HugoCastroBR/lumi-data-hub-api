import express from 'express';
import UcController from '../controllers/uc.controller'
import { createUcValidator, updateUcValidator } from '../middlewares/uc.middleware';

type ucControllerType = InstanceType<typeof UcController>;

class UcRouter {
  private ucController: ucControllerType;

  constructor(ucController:ucControllerType){
    this.ucController = ucController
  }

  getRouter(){
    const router = express.Router();
    router.get("/ucs",this.ucController.getAllUcs)
    router.get("/ucs/:id",this.ucController.getUcById)
    // router.post("/ucs",
    //   (req,res,next) => {
    //     createUcValidator(req,res,next)
    //   },
    //   (req,res) => {
    //     this.ucController.createUc(req,res)
    //   }
    // )
    router.put("/ucs/:id",
      (req,res,next) => {
        updateUcValidator(req,res,next)
      },
      (req,res) => {
        this.ucController.updateUc(req,res)
      }
    )
    router.delete("/ucs/:id",this.ucController.deleteUc)
    return router;
  }
}

export default UcRouter;
