import ClientService from "../services/client.service";
import { Request, Response } from "express";

type clientServiceType = InstanceType<typeof ClientService>;

class ClientController {
  private clientService: clientServiceType;

  constructor(clientService:clientServiceType) {
    this.clientService = clientService;
  }

   getAllClients = async (req: Request, res: Response) => {
    const clients = await this.clientService.getAllClients();
    res.json(clients);
  }
}

export default ClientController;