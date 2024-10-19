import { PrismaClient } from '@prisma/client';
import { IUC } from '../utils/types/models';
import { IPagination } from '../utils/types/pagination';

const prisma = new PrismaClient();

export type UcOrderBy = 'id' | 'UcRegisterN' | 'clientName';

class UcService {
  async getAllUcs(pagination: IPagination<UcOrderBy>) {

    const year = Number(pagination.year) || Number(new Date().getFullYear());

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
            AND: [
              {
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
              },
              {
                bills: {
                  some: {
                    year: year,
                  },
                },
              },
            ],
          },
        }),
        prisma.uC.count({
          ...PrismaPaginationQuery,
          where: {
            AND: [
              {
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
              },
              {
                bills: {
                  some: {
                    year: year,
                  },
                },
              },
            ],
          },
        }),
      ]);
      return {
        data: ucs,
        ...pagination,
        total: count,
        totalPages: Math.ceil(count / PrismaPaginationQuery.take),
      };

    } catch (error) {
      throw new Error('Could not get UCs');
    }
  }

  async getUcById(id: number) {
    try {
      const uc = await prisma.uC.findUnique({
        where: {
          id: id
        },
        include: {
          client: true,
          bills: true
        }
      })
      return uc
    } catch (error) {
      return []
    }
  }

  async updateUc(id: number, uc: IUC) {
    const ucExists = await this.getUcById(id);
    if (!ucExists) {
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
    if (!ucExists) {
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