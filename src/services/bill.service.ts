import { PrismaClient } from '@prisma/client';
import { IBill } from '../utils/types/models';

const prisma = new PrismaClient();

class BillService {

  async getAllBills() {
    const bills = await prisma.bill.findMany({
      include: {
        uc: true
      }
    });
    return bills;
  }

  async getBillById(id: number) {
    try {
      const bill = await prisma.bill.findUnique({
        where: {
          id: id
        },
        include: {
          uc: true
        }
      });
      return bill;
    } catch (error) {
      return null;
    }
  }

  async createBill(bill: IBill) {
    const verifyIfBillExists = await prisma.bill.findUnique({
      where: {
        filename: bill.filename
      }
    });

    if (verifyIfBillExists != null) {
      throw new Error("Bill already exists");
    }

    const getUC = await prisma.uC.findUnique({
      where: {
        registerN: bill.uc.registerN
      }, include: {
        client: {
          include: {
            ucs: true
          }
        }
      }
    });

    if (getUC != null) {
      const currentYear = new Date().getFullYear();
      const newBill = await prisma.bill.create({
        data: {
          month: bill.month,
          year: bill.year || currentYear,
          filename: bill.filename,
          electricity: bill.electricity,
          electricityCost: bill.electricityCost,
          electricityScee: bill.electricityScee,
          electricitySceeCost: bill.electricitySceeCost || 0,
          electricityCompensated: bill.electricityCompensated,
          electricityCompensatedCost: bill.electricityCompensatedCost || 0,
          electricityPublicCost: bill.electricityPublicCost,
          uc: {
            connect: {
              id: getUC.id
            }
          }
        },
      });
      return newBill;
    } else {
      const getClient = await prisma.client.findFirst({
        where: {
          name: bill.uc.client.name
        },
        include: {
          ucs: true
        }
      });

      if (getClient != null) {
        const newUC = await prisma.uC.create({
          data: {
            registerN: bill.uc.registerN,
            clientId: getClient.id
          }
        });

        const newBill = await prisma.bill.create({
          data: {
            month: bill.month,
            year: bill.year,
            filename: bill.filename,
            electricity: bill.electricity,
            electricityCost: bill.electricityCost,
            electricityScee: bill.electricityScee,
            electricitySceeCost: bill.electricitySceeCost,
            electricityCompensated: bill.electricityCompensated,
            electricityCompensatedCost: bill.electricityCompensatedCost,
            electricityPublicCost: bill.electricityPublicCost,
            ucId: newUC.id,
          },
        });
        return newBill;
      } else {
        const newClient = await prisma.client.create({
          data: {
            name: bill.uc.client.name,
            registerN: bill.uc.client.registerN
          }
        });

        const newUC = await prisma.uC.create({
          data: {
            registerN: bill.uc.registerN,
            clientId: newClient.id,
          },
        });

        const newBill = await prisma.bill.create({
          data: {
            month: bill.month,
            year: bill.year,
            filename: bill.filename,
            electricity: bill.electricity,
            electricityCost: bill.electricityCost,
            electricityScee: bill.electricityScee,
            electricitySceeCost: bill.electricitySceeCost,
            electricityCompensated: bill.electricityCompensated,
            electricityCompensatedCost: bill.electricityCompensatedCost,
            electricityPublicCost: bill.electricityPublicCost,
            ucId: newUC.id,
          },
        });
        return newBill;
      }
    }
  }

  async updateBill(id: number, bill: IBill) {
    const billExists = await this.getBillById(id);
    if (!billExists) {
      throw new Error("Bill not found");
    }
    try {
      const updatedBill = await prisma.bill.update({
        where: {
          id: id,
        },
        data: {
          month: bill.month,
          year: bill.year,
          electricity: bill.electricity,
          electricityCost: bill.electricityCost,
          electricityScee: bill.electricityScee,
          electricitySceeCost: bill.electricitySceeCost,
          electricityCompensated: bill.electricityCompensated,
          electricityCompensatedCost: bill.electricityCompensatedCost,
          electricityPublicCost: bill.electricityPublicCost,
          ucId: bill.ucId,
        },
      });
      return updatedBill;
    } catch (error) {
      throw new Error('Could not update Bill');
    }
  }

  async deleteBill(id: number) {
    const billExists = await this.getBillById(id);
    if (!billExists) {
      throw new Error("Bill not found");
    }
    try {
      await prisma.bill.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error('Error deleting Bill:', error);
      throw new Error('Could not delete Bill');
    }
  }
}

export default BillService;
