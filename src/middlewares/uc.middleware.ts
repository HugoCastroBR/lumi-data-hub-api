import { validateOrReject, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { CreateUCValidationSchema, UpdateUCValidationSchema } from '../utils/validation/uc.schema'; 

export const updateUcValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing request body."
    });
  }

  const uc = new UpdateUCValidationSchema();
  uc.registerN = req.body.registerN;

  try {
    await validateOrReject(uc);
    next();
  } catch (errors) {
    if (Array.isArray(errors)) {
      return res.status(400).json(errors);
    } else {
      return res.status(400).json([errors]);
    }
  }
};
