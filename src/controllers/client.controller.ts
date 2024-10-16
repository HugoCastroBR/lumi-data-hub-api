import ClientService from "../services/client.service";
import { Request, Response } from "express";
import { prisma } from "../server";

type clientServiceType = InstanceType<typeof ClientService>;


class ClientController {

  private clientService: clientServiceType;
  constructor(clientService:clientServiceType) {
    this.clientService = clientService;
  }

  async getAllClients(req: Request, res: Response) {
    const clients = await ClientService.getAllClients();
    res.json(clients);
  }
}

export default ClientController;