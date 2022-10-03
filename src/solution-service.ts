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
    "U1laWUdJRQ==",
    "RU5ORUFHT05F",
    "S0VOT1RST04=",
    "QU5BVEhFTUU=",
    "Q0FSWU9QU0U=",
    "SVJFTklTTUU=",
    "TElOSU1FTlQ=",
  ];
}
