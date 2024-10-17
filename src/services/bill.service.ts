import { PrismaClient } from '@prisma/client';
import { IBill } from '../utils/types/models'; // Adjust the import path as needed

const prisma = new PrismaClient();

class BillService {

  async getAllBills() {
    const bills = await prisma.bill.findMany({
      include: {
        uc: true // Include related UC data
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
          uc: true // Include related UC data
        }
      });
      return bill;
    } catch (error) {
      return null; // Return null if not found
    }
  }

  async createBill(bill: IBill) {
    try {
      const newBill = await prisma.bill.create({
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
          ucId: bill.ucId, // Associate with a UC
        },
      });
      return newBill; // Return the created entry for further use if needed
    } catch (error) {
      console.error('Error creating Bill:', error);
      throw new Error('Could not create Bill'); // Throw a more user-friendly error
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
          ucId: bill.ucId, // Update UC association if necessary
        },
      });
      return updatedBill; // Return the updated entry for further use if needed
    } catch (error) {
      throw new Error('Could not update Bill'); // Throw a more user-friendly error
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
      throw new Error('Could not delete Bill'); // Throw a more user-friendly error
    }
  }

}

export default BillService;
