import { IClient, IUC,IBill } from "./types/models";

const verifyIfClientIsValid = (client: IClient) => {
  expect(client.id).toBeDefined();
  expect(client.name).toBeDefined();
  expect(client.createdAt).toBeDefined();
  expect(client.updatedAt).toBeDefined();
  expect(client.ucs).toBeDefined();
};

const verifyIfUCIsValid = (uc: IUC) => {
  expect(uc.id).toBeDefined();
  expect(uc.registerN).toBeDefined();
  expect(uc.createdAt).toBeDefined();
  expect(uc.updatedAt).toBeDefined();
  expect(uc.clientId).toBeDefined();
  expect(uc.bills).toBeDefined();
};


const verifyIfBillIsValid = (bill: IBill) => {
  expect(bill.id).toBeDefined();
  expect(bill.month).toBeDefined();
  expect(bill.year).toBeDefined();

  expect(bill.filename).toBeDefined
  
  expect(bill.electricity).toBeDefined();
  expect(bill.electricityCost).toBeDefined();

  expect(bill.electricityScee).toBeDefined();
  expect(bill.electricitySceeCost).toBeDefined();

  expect(bill.electricityCompensated).toBeDefined();
  expect(bill.electricityCompensatedCost).toBeDefined();

  expect(bill.electricityPublicCost).toBeDefined();

  expect(bill.createdAt).toBeDefined();
  expect(bill.updatedAt).toBeDefined();
  
  expect(bill.deletedAt).toBeUndefined(); 

  expect(bill.ucId).toBeDefined(); 
};


export {
  verifyIfClientIsValid,
  verifyIfUCIsValid,
  verifyIfBillIsValid
};