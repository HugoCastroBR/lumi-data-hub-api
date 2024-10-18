import UcService, { UcOrderBy } from '../services/uc.service';
import { Request, Response } from "express";
import { IPagination } from '../utils/types/pagination';

class UcController {
  private ucService: UcService;

  constructor(ucService: UcService) {
    this.ucService = ucService;
  }
  getAllUcs = async (req: Request, res: Response) => {
    try {
      const ucs = await this.ucService.getAllUcs(
        {
          page: Number(req.query.page) || 1,
          order: req.query.order || 'asc',
          orderby: req.query.orderby || 'id',
          search: req.query.search || '',
        } as IPagination<UcOrderBy>
      );
      res.json(ucs);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      } else {
        res.status(500)

      }
    }
  }

  getUcById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const uc = await this.ucService.getUcById(Number(id));
    if (uc == null) {
      res.status(404).send("UC not found");
    } else {
      res.json(uc);
    }
  }

  updateUc = async (req: Request, res: Response) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Missing request body."
      })
    }

    const uc = req.body;
    const ucId = Number(req.params.id)

    try {
      const updatedUc = await this.ucService.updateUc(ucId, uc);
      res.status(200).send(updatedUc);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "UC not found") {
          res.status(404).send();
        }
      } else {
        res.status(500)
      }
    }
  }

  deleteUc = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      await this.ucService.deleteUc(Number(id));
      res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        if (error.message == "UC not found") {
          res.status(404).send()
        }
      } else {
        res.status(500)
      }
    }
  }


}

export default UcController