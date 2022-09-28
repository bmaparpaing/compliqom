<script setup lang="ts">
import GameGrid from "./components/GameGrid.vue";
import {
  onBeforeMount,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import { DictionaryService } from "./dictionary-service";
import type { Cell } from "@/components/GameCell.vue";

const solution = "DIFFUSION";
const columnSize = solution.length;

const grid = reactive(
  [...Array(6).keys()].map((i) =>
    [...Array(solution.length).keys()].map(
      (j): Cell => ({
        letter: i === 0 ? "." : "",
        index: i * columnSize + j,
      })
    )
  )
);

let column = 0;
let line = 0;

let isWordValid = ref(true);
let gameEnded = ref(false);
let success = ref(false);

function update(event: KeyboardEvent) {
  if (column < columnSize && event.key.match(/^[A-Za-z]$/)) {
    grid[line][column].letter = event.key.toUpperCase();
    column++;
  } else if (event.key === "Enter" && column === columnSize) {
    const word = grid[line].map((cell) => cell.letter).join("");

    checkWordValidity(word);

    //  si le mot est valide, affiche les indices visuels au joueur puis vérifie si le joueur a gagné,
    //  sinon annule le coup (efface le mot) et affiche un message d'erreur
    if (isWordValid.value) {
      giveHint();

      if (word === solution) {
        // le joueur a gagné => saisie bloquée et affichage du message de succès
        gameEnded.value = true;
        success.value = true;
      } else {
        if (line < grid.length - 1) {
          // il reste des coups => on affiche la ligne suivante
          line++;
          column = 0;
          grid[line].forEach((cell) => (cell.letter = "."));
        } else {
          // plus de coups restants (le joueur a perdu) => saisie bloquée et affichage du message d'échec
          gameEnded.value = true;
        }
      }
    } else {
      discardPlayerInput();
    }
  } else if (event.key === "Backspace") {
    column--;
    if (column < 0) {
      column = 0;
    }
    grid[line][column].letter = ".";
  }
}

/**
 * Vérifie la validité du mot tapé par le joueur.
 */
function checkWordValidity(word: string): void {
  isWordValid.value = DictionaryService.isWordValid(word);
  console.log(
    `Le mot ${word} est ${isWordValid.value ? "valide" : "invalide"}`
  );
}

/**
 * Efface la saisie du joueur en cas de mot invalide et lui affiche à nouveau la ligne vide
 */
function discardPlayerInput(): void {
  column = 0;
  grid[line].forEach((cell) => (cell.letter = "."));
}

function giveHint(): void {
  let solutionLetters = solution.split("");
  grid[line].forEach((cell, index) => {
    // Pour chaque lettre correspondant à la solution à la même place, déclarer la lettre correcte et effacer la lettre
    // de la solution pour ne plus la prendre en compte dans les calculs des lettres mal placées.
    if (solutionLetters[index] === cell.letter) {
      cell.correct = true;
      solutionLetters[index] = "";
    }
  });
  grid[line]
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

watch(gameEnded, (gameEnded) => {
  if (gameEnded) {
    document.removeEventListener("keydown", update);
  }
});

onBeforeMount(() => DictionaryService.initDictionaryFromFile());
onMounted(() => document.addEventListener("keydown", update));
onUnmounted(() => document.removeEventListener("keydown", update));
</script>

<template>
  <main>
    <GameGrid :gamegrid="grid" />
    <div v-if="!gameEnded && !isWordValid" class="invalid-word">
      Le mot n'est pas dans le dictionnaire !
    </div>
    <div v-else-if="gameEnded">
      <div v-if="success" class="game-success">
        Bravo ! Vous avez trouvé le mot du jour.
      </div>
      <div v-else class="game-failure">
        Dommage ! Le mot du jour était : {{ solution }}
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.invalid-word {
  margin-top: 20px;
  font-size: 1.8rem;
}

.game-success {
  margin-top: 20px;
  font-size: 1.8rem;
}

.game-failure {
  margin-top: 20px;
  font-size: 1.8rem;
}
</style>
