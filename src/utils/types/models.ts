export interface IUC {
  id?: number;
  registerN: string;
  clientId?: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  bills?: IBill[];
  client: IClient;
}
export type PartialUC = Partial<IUC>

export interface IClient {
  id?: number;
  registerN: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  ucs?: Partial<IUC>[];
}
export type PartialClient = Partial<IClient>;

export interface IBill {
  id?: number;
  month: number;
  year: number;
  filename: string;
  electricity: number;
  electricityCost: number;
  electricityScee: number;
  electricitySceeCost: number;
  electricityCompensated: number;
  electricityCompensatedCost: number;
  electricityPublicCost: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  uc: IUC;
  ucId?: number;
}
export type PartialBill = Partial<IBill>;


