import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import swaggerUi from "swagger-ui-express";
import clientModule from "./modules/client.module";
import swagger from "./utils/swagger";

export const prisma = new PrismaClient();

const app = express();
const port = 8080;


async function main() {
  
  app.use(express.json());
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swagger));


  // Routes
  app.use(clientModule.router);


  app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ error: `Route ${req.originalUrl} not found` });
  });

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
