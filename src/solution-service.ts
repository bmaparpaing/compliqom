export class SolutionService {
  static initialPuzzleDate: number = Date.parse("2022-09-29");
  static today: number = Date.now();

  static getTodaySolution(): string {
    return window.atob(
      this.solutions[(this.getPuzzleNumber() - 1) % this.solutions.length]
    );
  }

  static getPuzzleNumber(): number {
    return (
      Math.floor(
        Math.abs(this.today - this.initialPuzzleDate) / (1000 * 60 * 60 * 24)
      ) + 1
    );
  }

  static solutions = [
    "U1laWUdJRQ==",
    "RU5ORUFHT05F",
    "S0VOT1RST04=",
    "QU5BVEhFTUU=",
    "Q0FSWU9QU0U=",
    "SVJFTklTTUU=",
    "TElOSU1FTlQ=",
  ];
}
