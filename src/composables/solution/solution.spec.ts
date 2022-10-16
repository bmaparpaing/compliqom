import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";
import { useSolution } from "@/composables/solution/solution";

vi.mock("@/composables/solution/solution-list");

describe("useSolution", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const refDate = new Date(import.meta.env.VITE_REFERENCE_DATE);
  const refDatePlus = (dayAmount: number): Date => {
    const newDate = new Date(refDate);
    newDate.setDate(refDate.getDate() + dayAmount);
    return newDate;
  };

  it("returns correct solution data for reference date", () => {
    vi.setSystemTime(refDate);
    expect(useSolution()).toEqual({
      puzzleNumber: 1,
      rawSolution: "Gagner",
      normalizedSolution: "GAGNER",
    });
  });

  it("returns correct solution data for the day after reference date", () => {
    vi.setSystemTime(refDatePlus(1));
    expect(useSolution()).toEqual({
      puzzleNumber: 2,
      rawSolution: "Perdre",
      normalizedSolution: "PERDRE",
    });
  });

  it("returns correct solution data for reference date + 2 days", () => {
    vi.setSystemTime(refDatePlus(2));
    expect(useSolution()).toEqual({
      puzzleNumber: 3,
      rawSolution: "Gâteau",
      normalizedSolution: "GATEAU",
    });
  });

  it("returns correct solution data for reference date + 3 days", () => {
    vi.setSystemTime(refDatePlus(3));
    expect(useSolution()).toEqual({
      puzzleNumber: 4,
      rawSolution: "garçonnière",
      normalizedSolution: "GARCONNIERE",
    });
  });

  it("returns correct solution data for reference date + 4 days", () => {
    vi.setSystemTime(refDatePlus(4));
    expect(useSolution()).toEqual({
      puzzleNumber: 5,
      rawSolution: "Nævus",
      normalizedSolution: "NAEVUS",
    });
  });

  it("returns correct solution data for reference date + 5 days", () => {
    vi.setSystemTime(refDatePlus(5));
    expect(useSolution()).toEqual({
      puzzleNumber: 6,
      rawSolution: "Écœurer",
      normalizedSolution: "ECOEURER",
    });
  });

  it("returns correct solution data for reference date + 6 days", () => {
    vi.setSystemTime(refDatePlus(6));
    expect(useSolution()).toEqual({
      puzzleNumber: 7,
      rawSolution: "Œcuménisme",
      normalizedSolution: "OECUMENISME",
    });
  });

  it("cycles back to solution 1 when overflowing solution list by 1", () => {
    vi.setSystemTime(refDatePlus(7));
    expect(useSolution()).toEqual({
      puzzleNumber: 8,
      rawSolution: "Gagner",
      normalizedSolution: "GAGNER",
    });
  });
});
