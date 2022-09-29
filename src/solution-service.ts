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
    "UkVWT0xURQ==",
    "QVBQUklTRQ==",
    "Tk9ZQVVY",
    "RkFSQ0VVUg==",
    "REVQTEFDRVI=",
    "R0VOVElM",
    "TUlOSVRJRVVY",
    "TE9VUEVS",
  ];
}
