export class SolutionService {
  static initialPuzzleDate: number = Date.parse("2022-10-03");
  static today: number = Date.now();
  static rawSolution: string;
  static normalizedSolution: string;

  static getRawSolution(): string {
    if (!this.rawSolution) this.rawSolution = this.getTodaySolution();
    return this.rawSolution;
  }

  static getNormalizedSolution(): string {
    if (!this.normalizedSolution) {
      // Normalise la solution, pour la rendre prête à être utilisée dans le jeu (en majuscules et sans accents/diacritiques/ligatures)
      this.normalizedSolution = this.getRawSolution()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/æ/g, "ae")
        .replace(/œ/g, "oe")
        .toUpperCase();
    }
    return this.normalizedSolution;
  }

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
    "U3l6eWdpZQ==",
    "RW5u6WFnb25l",
    "S+lub3Ryb24=",
    "QW5hdGjobWU=",
    "Q2FyeW9wc2U=",
    "SXLpbmlzbWU=",
    "TGluaW1lbnQ=",
  ];
}
