import { connect } from 'http2';
import { PrismaClient } from '@prisma/client';
import { IClient, IUC } from '../utils/types/models';
import { IPagination } from '../utils/types/pagination';

const prisma = new PrismaClient();



export type UcOrderBy = 'id' | 'UcRegisterN' | 'clientName';

class UcService {


  async getAllUcs(pagination: IPagination<UcOrderBy>) {
    try {
      const PrismaPaginationQuery = {
        skip: (pagination.page - 1) * 10,
        take: 10,
      };
  
      let orderBy = {};
  
      switch (pagination.orderby) {
        case 'clientName':
          orderBy = {
            client: {
              name: pagination.order,
            },
          };
          break;
        case 'UcRegisterN':
          orderBy = {
            registerN: pagination.order,
          };
          break;
        default:
          orderBy = {
            [pagination.orderby]: pagination.order,
          };
          break;
      }
  
      const [ucs, count] = await prisma.$transaction([
        prisma.uC.findMany({
          include: {
            client: true,
            bills: true,
          },
          ...PrismaPaginationQuery,
          orderBy,
          where: {
            OR: [
              {
                registerN: {
                  contains: pagination.search,
                  mode: 'insensitive',
                },
              },
              {
                client: {
                  name: {
                    contains: pagination.search,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }
        }),
        prisma.uC.count({
          ...PrismaPaginationQuery,
          where: {
            OR: [
              {
                registerN: {
                  contains: pagination.search,
                  mode: 'insensitive',
                },
              },
              {
                client: {
                  name: {
                    contains: pagination.search,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }
        }),
      ]);
  
      return {
        data: ucs,
        ...pagination,
        total: count,
        totalPages: Math.ceil(count / PrismaPaginationQuery.take),
      };
  
    } catch (error) {
      console.log(error);
      throw new Error('Could not get UCs');
    }
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


  async createUc(uc: IUC) {
    try {
      const existingUc = await prisma.uC.findUnique({
        where: {
          registerN: uc.registerN,
        },
      });
  
      if (existingUc) {
        throw new Error('UC already exists');
      }
  
      const existingClient = await prisma.client.findUnique({
        where: {
          id: uc.clientId,
        },
      });
  
      if (existingClient) {
        const newUc = await prisma.uC.create({
          data: {
            registerN: uc.registerN,
            client: {
              connect: {
                id: existingClient.id,
              },
            },
          },
        });
        return newUc;
      } else {
        const newUc = await prisma.uC.create({
          data: {
            registerN: uc.registerN,
            client: {
              create: {
                name: uc.client.name,
                registerN: uc.client.name
              },
            },
          },
        });
  
        return newUc;
      }
    } catch (error) {
      console.error('Error creating UC:', error);
      throw new Error('Could not create UC');
    }
  }
  


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
      return updatedUc; 
    } catch (error) {
      throw new Error('Could not update UC'); 
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
      throw new Error('Could not delete UC'); 
    }
  }

}

export default UcService;