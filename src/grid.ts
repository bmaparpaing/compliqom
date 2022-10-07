import type { Cell } from "@/components/GameCell.vue";
import { reactive, ref } from "vue";
import { SolutionService } from "@/solution-service";

// TODO utiliser à la place un composable useSolution()
const solution = SolutionService.getNormalizedSolution();

const grid: Cell[][] = reactive(
  [...Array(6).keys()].map((i) =>
    [...Array(solution.length).keys()].map(
      (j): Cell => ({
        letter: i === 0 ? "." : "",
        index: i * solution.length + j,
      })
    )
  )
);

const currentLine = ref(0);
const currentColumn = ref(1);

displayWordFirstLetterOnCurrentLine();

export function useGrid() {
  function insertLetter(letter: string): void {
    grid[currentLine.value][currentColumn.value].letter = letter.toUpperCase();
  }

  function moveCursorToRight(): void {
    currentColumn.value++;
  }

  function moveCursorToNextLine(): void {
    currentLine.value++;
    currentColumn.value = 1;
  }

  function displayEmptyLine(): void {
    grid[currentLine.value].forEach((cell) => (cell.letter = "."));
    displayWordFirstLetterOnCurrentLine();
  }

  function displayHints(): void {
    let solutionLetters = solution.split("");
    grid[currentLine.value].forEach((cell, index) => {
      // Pour chaque lettre correspondant à la solution à la même place, déclarer la lettre correcte et effacer la lettre
      // de la solution pour ne plus la prendre en compte dans les calculs des lettres mal placées.
      if (solutionLetters[index] === cell.letter) {
        cell.correct = true;
        solutionLetters[index] = "";
      }
    });
    grid[currentLine.value]
      .filter((cell) => !cell.correct)
      .forEach((cell) => {
        // Pour chaque lettre correspondant à une lettre de la solution à une autre position, déclarer la lettre mal
        // placée et effacer la lettre de la solution pour ne plus la détecter si cette lettre revient à nouveau dans
        // le mot proposé par le joueur.
        let findIndex = solutionLetters.findIndex(
          (letter) => letter === cell.letter
        );
        if (findIndex >= 0) {
          cell.misplaced = true;
          solutionLetters[findIndex] = "";
        }
      });
  }

  /**
   * Efface la saisie du joueur et lui affiche à nouveau la ligne vide
   */
  function discardPlayerInput(): void {
    currentColumn.value = 1;
    displayEmptyLine();
  }

  return {
    grid,
    currentLine,
    currentColumn,
    insertLetter,
    moveCursorToRight,
    moveCursorToNextLine,
    displayEmptyLine,
    displayHints,
    discardPlayerInput,
  };
}

function displayWordFirstLetterOnCurrentLine(): void {
  grid[currentLine.value][0].letter = solution.charAt(0);
}
