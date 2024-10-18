import { monthToNumber } from "../utils/files";

describe("Utils", () => {
  describe("Convert month to number", () => {
    it("should return the correct number for the month", () => {
      expect(monthToNumber('JAN')).toBe(1);
      expect(monthToNumber('FEV')).toBe(2);
      expect(monthToNumber('MAR')).toBe(3);
      expect(monthToNumber('ABR')).toBe(4);
      expect(monthToNumber('MAI')).toBe(5);
      expect(monthToNumber('JUN')).toBe(6);
      expect(monthToNumber('JUL')).toBe(7);
      expect(monthToNumber('AGO')).toBe(8);
      expect(monthToNumber('SET')).toBe(9);
      expect(monthToNumber('OUT')).toBe(10);
      expect(monthToNumber('NOV')).toBe(11);
      expect(monthToNumber('DEZ')).toBe(12);
    });

    it("should return 0 for an invalid month", () => {
      expect(monthToNumber('INVALID')).toBe(0);
    });
  });
});