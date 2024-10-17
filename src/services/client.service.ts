import { PrismaClient } from "@prisma/client";
import { IClient } from "../utils/types/models";


const prisma = new PrismaClient();

class ClientService {


  async getAllClients() {
    const clients = await prisma.client.findMany({
      include:{
        ucs:{
          include:{
            bills:true,
          }
        },
      }
    })
    return clients;
  }


  async getClientById(id: number) {
    const client = await prisma.client.findUnique({
      where: {
        id: id,
      },
      include:{
        ucs:{
          include:{
            bills:true,
          }
        },
      }
    });
    return client;
  }

  async createClient(client: IClient) {

    console.log(`create ${client}`)

    const clientExists = await prisma.client.findUnique({
      where: {
          registerN: client.registerN // Ensure 'client.registerN' is defined and correct
      }
    });
  
    if (clientExists) {
      throw new Error("Client already exists");
    } else{
      console.log(client)
      const newClient = await prisma.client.create({
        data: {
          registerN: client.registerN,
          name: client.name,
        }
      })
      return newClient;
    }
  }

  async updateClient(clientId:number,client: IClient) {
    const clientExists = await this.getClientById(clientId);

    if(clientExists){
      const updatedClient = await prisma.client.update({
        where: {
          id: clientId,
        },
        data: {
          name: client.name,
          updatedAt: new Date(),
          registerN: client.registerN
        }
      })
      return updatedClient;
    }else{
      throw new Error("Client not found");
    }
  }

  async deleteClient(id: number) {
    const clientExists = await this.getClientById(id);
    if(!clientExists){
      throw new Error("Client not found");
    } 
    const deletedClient = await prisma.client.delete({
      where: {
        id: id,
      }
    })
    return deletedClient;
  }
}


export default ClientService;