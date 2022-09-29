import { SolutionService } from "@/solution-service";
import { describe, expect, it } from "vitest";

describe("SolutionService", function () {
  SolutionService.solutions = [window.btoa("PERDRE"), window.btoa("GAGNER")];
  SolutionService.initialPuzzleDate = Date.now();

  it("checks if today is puzzle #1", function () {
    SolutionService.today = Date.now();
    expect(SolutionService.getPuzzleNumber()).toEqual(1);
  });

  it("checks that today solution is PERDRE", function () {
    SolutionService.today = Date.now();
    expect(SolutionService.getTodaySolution()).toEqual("PERDRE");
  });

  it("checks if tomorrow is puzzle #2", function () {
    SolutionService.today = new Date().setDate(new Date().getDate() + 1);
    expect(SolutionService.getPuzzleNumber()).toEqual(2);
  });

  it("checks that tomorrow solution is GAGNER", function () {
    SolutionService.today = new Date().setDate(new Date().getDate() + 1);
    expect(SolutionService.getTodaySolution()).toEqual("GAGNER");
  });

  it("checks that the day after tomorrow cycle back to PERDRE", function () {
    SolutionService.today = new Date().setDate(new Date().getDate() + 2);
    expect(SolutionService.getTodaySolution()).toEqual("PERDRE");
  });
});
