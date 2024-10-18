import { extractDataFromPDF, readFileAsBuffer } from "../utils/files";

describe("Pdf Parse", () => {
  describe("Should read a pdf file", () => {

    it("Should return a buffer", async () => {
      readFileAsBuffer("src/__tests__/mock/test.pdf").then((buffer) => {
        expect(buffer).toBeInstanceOf(Buffer);
      });
    });

    it("Should throw an error if the file does not exist", async () => {
      await expect(readFileAsBuffer("src/__tests__/mock/invalid.pdf")).rejects.toThrow(/no such file or directory/);
    });

    it("Should throw an error if the file is not a pdf", async () => {
      await expect(readFileAsBuffer("src/__tests__/mock/test.txt")).rejects.toThrow(/no such file or directory/);
    });

    it("Should Read and Parse the PDF file and have correct properties", async () => {
      const data = await extractDataFromPDF("src/__tests__/mock/test.pdf");
      expect(data).toBeInstanceOf(Object);
      expect(data).toHaveProperty("filename");
      expect(data).toHaveProperty("month");
      expect(data).toHaveProperty("year");
      expect(data).toHaveProperty("electricity");
      expect(data).toHaveProperty("electricityCost");
      expect(data).toHaveProperty("electricityScee");
      expect(data).toHaveProperty("electricitySceeCost");
      expect(data).toHaveProperty("electricityCompensated");
      expect(data).toHaveProperty("electricityCompensatedCost");
      expect(data).toHaveProperty("electricityPublicCost");
      expect(data).toHaveProperty("uc");
    });

    it("Should Read and Parse the PDF file and have correct values", async () => {
      const data = await extractDataFromPDF("src/__tests__/mock/test.pdf");
      if (data) {
        expect(data.filename).toBe('src/__tests__/mock/test.pdf');
        expect(data.month).toBe(1);
        expect(data.year).toBe(2024);
        expect(data.electricity).toBe(50);
        expect(data.electricityCost).toBe(47.75);
        expect(data.electricityScee).toBe(456);
        expect(data.electricitySceeCost).toBe(232.42);
        expect(data.electricityCompensated).toBe(456);
        expect(data.electricityCompensatedCost).toBe(-222.22);
        expect(data.electricityPublicCost).toBe(49.43);
        expect(data.uc.registerN).toBe('3001116735');
        expect(data.uc.client.name).toBe('JOSE MESALY FONSECA DE CARVALHO');
        expect(data.uc.client.registerN).toBe('7204076116');
      } else {
        throw new Error('Data is null');
      }
    });
  });
});