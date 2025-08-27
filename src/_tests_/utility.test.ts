import { describe, it, expect } from "vitest";
import {
  maskCardNumber,
  generateCardNumber,
  generateExpiryDate,
} from "../util/utility";

describe("maskCardNumber", () => {
  it("masks all digits except last 4", () => {
    const num = "1234567812345678";
    expect(maskCardNumber(num)).toBe("************5678");
  });

  it("returns empty string if input is empty", () => {
    expect(maskCardNumber("")).toBe("");
    expect(maskCardNumber(null as any)).toBe("");
    expect(maskCardNumber(undefined as any)).toBe("");
  });
});

describe("generateCardNumber", () => {
  it("generates a 16-digit number as string", () => {
    const card = generateCardNumber();
    expect(card).toHaveLength(16);
    expect(/^\d{16}$/.test(card)).toBe(true);
  });
});

describe("generateExpiryDate", () => {
  it("returns a valid MM/YY string", () => {
    const expiry = generateExpiryDate();
    expect(/^\d{2}\/\d{2}$/.test(expiry)).toBe(true);

    const [monthStr, yearStr] = expiry.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);
    expect(month).toBeGreaterThanOrEqual(1);
    expect(month).toBeLessThanOrEqual(12);
    expect(year).toBeGreaterThanOrEqual(new Date().getFullYear() % 100);
  });
});
