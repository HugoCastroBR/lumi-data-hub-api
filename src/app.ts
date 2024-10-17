import express, { Application, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import swaggerUi from "swagger-ui-express";
import swagger from "./utils/swagger/swagger";

import healthCheck from "./routes/health.router";
import clientModule from "./modules/client.module";
import ucModule from "./modules/uc.module";


export const prisma = new PrismaClient();

const app:Application = express();



app.use(express.json());
app.use('/api', swaggerUi.serve, swaggerUi.setup(swagger));
app.use('/health', healthCheck);

// Routes
app.use(clientModule.router);
app.use(ucModule.router);
app.use(healthCheck);


app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

export default app;

