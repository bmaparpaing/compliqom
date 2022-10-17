import { reactive, ref } from "vue";
import type { Cell } from "@/components/GameCell.vue";
import { useGameState } from "@/game-state";
import { useSolution } from "@/composables/solution/solution";
import { useDictionary } from "@/composables/dictionary/dictionary";

const { normalizedSolution: solution } = useSolution();

const { displayInvalidWordMessage, gameEnded, success } = useGameState();

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
  const { checkWordExists } = useDictionary();

  function handleLetter(letter: string): void {
    if (currentColumn.value === solution.length) return;
    insertLetter(letter);
    moveCursorToRight();
  }

  function handleBackspace(): void {
    moveCursorToLeft();
    if (currentColumn.value < 1) {
      currentColumn.value = 1;
    }

    const knownLetters = getKnownLetters();
    grid[currentLine.value][currentColumn.value].letter =
      knownLetters[currentColumn.value] ?? ".";
  }

  async function handleEnter() {
    if (currentColumn.value < solution.length) return;

    const word = grid[currentLine.value].map((cell) => cell.letter).join("");

    const isWordValid = await checkWordExists(word);

    //  si le mot est valide, affiche les indices visuels au joueur puis vérifie si le joueur a gagné,
    //  sinon annule le coup (efface le mot) et affiche un message d'erreur
    if (isWordValid) {
      displayInvalidWordMessage.value = false;
      displayHints();
      moveCursorToNextLine();
      if (word === solution) {
        // le joueur a gagné => saisie bloquée et affichage du message de succès
        gameEnded.value = true;
        success.value = true;
      } else {
        if (currentLine.value < grid.length) {
          // il reste des coups
          displayEmptyLine();
        } else {
          // plus de coups restants (le joueur a perdu) => saisie bloquée et affichage du message d'échec
          gameEnded.value = true;
        }
      }
    } else {
      displayInvalidWordMessage.value = true;
      discardPlayerInput();
    }
  }

  return {
    grid,
    currentLine,
    handleLetter,
    handleEnter,
    handleBackspace,
  };
}

function displayWordFirstLetterOnCurrentLine(): void {
  grid[currentLine.value][0].letter = solution.charAt(0);
}

function insertLetter(letter: string): void {
  grid[currentLine.value][currentColumn.value].letter = letter.toUpperCase();
}

function moveCursorToRight(): void {
  currentColumn.value++;
}

function moveCursorToLeft(): void {
  currentColumn.value--;
}

function moveCursorToNextLine(): void {
  currentLine.value++;
  currentColumn.value = 1;
}

function getKnownLetters() {
  return solution
    .split("")
    .map((letter, i) => (grid.find((line) => line[i].correct) ? letter : null));
}

function displayEmptyLine(): void {
  const knownLetters = getKnownLetters();

  grid[currentLine.value].forEach((cell, i) => {
    cell.letter = knownLetters[i] ?? ".";
  });
  displayWordFirstLetterOnCurrentLine();
}

/**
 * Affiche les indices visuels sur la grille
 */
function displayHints(): void {
  const solutionLetters = solution.split("");
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
      const findIndex = solutionLetters.findIndex(
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
