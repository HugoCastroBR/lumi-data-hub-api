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
    if(client == null){
      res.status(404).send("Client not found");
    }else{
      res.json(client);
    }
  }

  createClient = async (req: Request, res: Response) => {


    const client = req.body;
    try {
      const newClient = await this.clientService.createClient(client);
      console.log(2)
      res.status(201).send(newClient);
    } catch (error) {
      if(error instanceof Error){
        if(error.message === "Client already exists") {
          res.status(409).send(error.message);
        }
      }else{
        res.status(500)
      }
    }
  }
  
  updateClient = async (req: Request, res: Response) => {
    if(!req.body) {
      return res.status(400).send({
        message: "Missing request body."
      })
    }

    const client = req.body;
    const clientId = Number(req.params.id)
    
    try {
      const updatedClient = await this.clientService.updateClient(clientId,client);
      res.status(200).send(updatedClient);
    } catch (error) {
      if(error instanceof Error){
        if(error.message === "Client not found"){
          res.status(404).send()
        }else{
          console.log(error.message)
          res.status(500).send()
        }
      }
    }
  }

  deleteClient = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.clientService.deleteClient(Number(id));
      res.status(204).send()
    } catch (error) {
      if(error instanceof Error){
        if(error.message == "Client not found"){
          res.status(404).send(error.message)
        }
      }
    }
  }
}

export default ClientController;