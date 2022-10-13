import { solutions } from "@/composables/solution/solution-list";

export function useSolution(
  options: { initialPuzzleDate?: number; currentDate?: number } = {}
) {
  const {
    initialPuzzleDate = Date.parse(import.meta.env.VITE_REFERENCE_DATE),
    currentDate = Date.now(),
  } = options;
  const puzzleNumber: number = getPuzzleNumber(initialPuzzleDate, currentDate);
  const rawSolution = getTodaySolution(puzzleNumber);
  const normalizedSolution = getNormalizedSolution(rawSolution);
  return {
    puzzleNumber,
    rawSolution,
    normalizedSolution,
  };
}

function getTodaySolution(puzzleNumber: number): string {
  return decodeURIComponent(
    window.atob(solutions[(puzzleNumber - 1) % solutions.length])
  );
}

function getPuzzleNumber(
  initialPuzzleDate: number,
  currentDate: number
): number {
  return (
    Math.floor(
      Math.abs(currentDate - initialPuzzleDate) / (1000 * 60 * 60 * 24)
    ) + 1
  );
}

function getNormalizedSolution(rawSolution: string): string {
  // Normalise la solution, pour la rendre prête à être utilisée dans le jeu (en majuscules et sans accents/diacritiques/ligatures)
  return rawSolution
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/æ/g, "ae")
    .replace(/œ/g, "oe")
    .replace(/Œ/g, "OE")
    .toUpperCase();
}
