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

  getClientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const client = await this.clientService.getClientById(Number(id));
    res.json(client);
  }

  createClient = async (req: Request, res: Response) => {
    const client = req.body;
    const newClient = await this.clientService.createClient(client);
    res.json(newClient);
  }

  updateClient = async (req: Request, res: Response) => {
    const client = req.body;
    const updatedClient = await this.clientService.updateClient(client);
    res.json(updatedClient);
  }

  deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const deletedClient = await this.clientService.deleteClient(Number(id));
    res.json(deletedClient);
  }
}

export default ClientController;