import express, { Application, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import swaggerUi from "swagger-ui-express";
import swagger from "./utils/swagger/swagger";
import cors from "cors";
import healthCheck from "./routes/health.router";
import ucModule from "./modules/uc.module";
import billModule from "./modules/bill.module";
import { createUploadsFolderIfNotExists } from "./utils/files";

export const prisma = new PrismaClient();

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type",
}));

app.use(healthCheck);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swagger));
app.use('/health', healthCheck);
app.use(billModule.router)
app.use(ucModule.router);

createUploadsFolderIfNotExists();

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

export default app;

