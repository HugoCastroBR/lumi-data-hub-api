import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { CreateBillValidationSchema, UpdateBillValidationSchema } from '../utils/validation/bill.schema';
import multer from 'multer';

const uploadFolder = process.env.UPLOAD_FILES_DIR || "";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadFolder)
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

export const uploadBill = (req: Request, res: Response, next: NextFunction) => {
  upload.single('file')(req, res, (err) => {
    try {
      if (!req.file) {
        console.log(req.file)
        return res.status(400).json({ error: 'File not found' })
      } else {
        const uploadedFile = req.file;
        const fileName = uploadedFile.originalname;
        const filePath = uploadedFile.path;
        next()
      }
    } catch (error) {
      return res.status(400).send({ message: error })
    }
  })
}

export const createBillValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing request body."
    });
  }

  const bill = new CreateBillValidationSchema();

  bill.month = req.body.month;
  bill.year = req.body.year;
  bill.electricity = req.body.electricity;
  bill.electricityCost = req.body.electricityCost;
  bill.electricityScee = req.body.electricityScee;
  bill.electricitySceeCost = req.body.electricitySceeCost;
  bill.electricityCompensated = req.body.electricityCompensated;
  bill.electricityCompensatedCost = req.body.electricityCompensatedCost;
  bill.electricityPublicCost = req.body.electricityPublicCost;
  bill.ucId = req.body.ucId;

  try {
    await validateOrReject(bill);
    next();
  } catch (errors) {
    if (Array.isArray(errors)) {
      return res.status(400).json(errors);
    } else {
      return res.status(400).json([errors]);
    }
  }
};

export const updateBillValidator = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Missing request body."
    });
  }

  const bill = new UpdateBillValidationSchema();

  bill.month = req.body.month;
  bill.year = req.body.year;
  bill.electricity = req.body.electricity;
  bill.electricityCost = req.body.electricityCost;
  bill.electricityScee = req.body.electricityScee;
  bill.electricitySceeCost = req.body.electricitySceeCost;
  bill.electricityCompensated = req.body.electricityCompensated;
  bill.electricityCompensatedCost = req.body.electricityCompensatedCost;
  bill.electricityPublicCost = req.body.electricityPublicCost;
  bill.ucId = req.body.ucId;

  try {
    await validateOrReject(bill);
    next();
  } catch (errors) {
    if (Array.isArray(errors)) {
      return res.status(400).json(errors);
    } else {
      return res.status(400).json([errors]);
    }
  }
};




