
import { validateOrReject, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { CreateClientValidationSchema, UpdateClientValidationSchema } from '../utils/validation/client.schema';

export const createClientValidator = async (req: Request, res: Response, next: NextFunction) => {
  
  if(!req.body) {
    return res.status(400).send({
      message: "Missing request body."
    })
  }
  const client = new CreateClientValidationSchema()
  
  client.name = req.body.name
  client.registerN = req.body.registerN

  try {
    await validateOrReject(client)
    next()
  } catch (errors) {
      if(Array.isArray(errors)){
        return res.status(400).json(errors);
      }else{
        return res.status(400).json([errors]);
      }
    }

}

export const updateClientValidator = async (req: Request, res: Response, next: NextFunction) => {
  
  if(!req.body) {
    return res.status(400).send({
      message: "Missing request body."
    })
  }
  const client = new UpdateClientValidationSchema()
  
  client.name = req.body.name
  client.registerN = req.body.registerN

  try {
    await validateOrReject(client)
    next()
  } catch (errors) {
      if(Array.isArray(errors)){
        return res.status(400).json(errors);
      }else{
        return res.status(400).json([errors]);
      }
    }

}