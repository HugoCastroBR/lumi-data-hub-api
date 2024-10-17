import { IClient, IUC } from "./types/models";

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


export {
  verifyIfClientIsValid,
  verifyIfUCIsValid
};