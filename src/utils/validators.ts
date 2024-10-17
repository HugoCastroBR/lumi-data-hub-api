import { IClient } from "./types/models";

const verifyIfClientIsValid = (client: IClient) => {
  expect(client.id).toBeDefined();
  expect(client.name).toBeDefined();
  expect(client.createdAt).toBeDefined();
  expect(client.updatedAt).toBeDefined();
  expect(client.bills).toBeDefined();
};

export {verifyIfClientIsValid};