
export interface IUC {
  id: number;
  clientId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  bills?: IBill[];
}

export interface IClient {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  ucs?: IUC[];
}


export interface IBill {
  id: number;
  month: number;
  year: number;
  electricity: number;
  electricityCost: number;
  electricityScee: number;
  electricitySceeCost: number;
  electricityCompensated: number;
  electricityCompensatedCost: number;
  electricityPublicCost: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  uc: IUC;
  ucId: number;
}

