import { PrismaClient } from '@prisma/client';
import { IClient, IUC } from '../utils/types/models';

const prisma = new PrismaClient();

class UcService {

  async getAllUcs() {
    const ucs = await prisma.uC.findMany({
      include: {
        client:true,
        bills: true
      }
    })
    return ucs
  }

  async getUcById(id:number) {
    try {
      const uc = await prisma.uC.findUnique({
        where: {
          id: id
        },
        include: {
          client:true,
          bills: true
        }
      })
      return uc
    } catch (error) {
      return []
    }
    
  }

  // async createUc(uc: IUC) {
  //   try {
  //     const newUc = await prisma.uC.create({
  //       data: {
  //         registerN: uc.registerN,
  //         clientId: uc.clientId,
  //         client: {} 
  //       },
  //     });
  //     return newUc; // Return the created entry for further use if needed
  //   } catch (error) {
  //     console.error('Error creating UC:', error);
  //     throw new Error('Could not create UC'); // Throw a more user-friendly error
  //   }
  // }

  async updateUc(id: number, uc: IUC) {
    const ucExists = await this.getUcById(id);
    if(!ucExists){
      throw new Error("UC not found");
    }
    try {
      const updatedUc = await prisma.uC.update({
        where: {
          id: id,
        },
        data: {
          registerN: uc.registerN,
          clientId: uc.clientId,
        },
      });
      return updatedUc; // Return the updated entry for further use if needed
    } catch (error) {
      throw new Error('Could not update UC'); // Throw a more user-friendly error
    }
  }

  async deleteUc(id: number) {
    const ucExists = await this.getUcById(id);
    if(!ucExists){
      throw new Error("UC not found");
    }
    try {
      await prisma.uC.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.error('Error deleting UC:', error);
      throw new Error('Could not delete UC'); // Throw a more user-friendly error
    }
  }

}

export default UcService;