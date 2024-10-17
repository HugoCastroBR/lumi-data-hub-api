import { PrismaClient } from "@prisma/client";
import { IClient } from "../utils/types/models";


const prisma = new PrismaClient();

class ClientService {

  async getAllClients() {
    const clients = await prisma.client.findMany();
    return clients;
  }

  async getClientById(id: number) {
    const client = await prisma.client.findUnique({
      where: {
        id: id,
      },
    });
    return client;
  }

  async createClient(client: IClient) {
    const newClient = await prisma.client.create({
      data: {
        id: client.id,
        name: client.name,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
        bills: undefined,
        uc: undefined,
      }
    })
    return newClient;
  }

  async updateClient(client: IClient) {
    const updatedClient = await prisma.client.update({
      where: {
        id: client.id,
      },
      data: {
        name: client.name,
        createdAt: client.createdAt,
        updatedAt: client.updatedAt,
      }
    })
    return updatedClient;
  }

  async deleteClient(id: number) {
    const deletedClient = await prisma.client.delete({
      where: {
        id: id,
      }
    })
    return deletedClient;
  }
}


export default ClientService;