import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

class ClientService {

  static async getAllClients() {
    const clients = await prisma.client.findMany();
    return clients;
  }
}


export default ClientService;