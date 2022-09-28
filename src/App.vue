<script setup lang="ts">
import GameGrid from "./components/GameGrid.vue";
import { onBeforeMount, onMounted, onUnmounted, reactive, ref } from "vue";
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

function update(event: KeyboardEvent) {
  if (column < columnSize && event.key.match(/^[A-Za-z]$/)) {
    grid[line][column].letter = event.key.toUpperCase();
    column++;
  } else if (event.key === "Enter" && column === columnSize) {
    checkWordValidity();
    //  si le mot est valide, passe à la ligne suivante, sinon annule le coup (efface le mot) et affiche un message d'erreur
    if (isWordValid.value) {
      giveHint();
      if (line < grid.length - 1) {
        line++;
        column = 0;
        grid[line].forEach((cell) => (cell.letter = "."));
      } else {
        // TODO gérer fin de partie car on est au dernier coup (voir issue #4)
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
function checkWordValidity(): void {
  const word = grid[line].map((cell) => cell.letter).join("");
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

onBeforeMount(() => DictionaryService.initDictionaryFromFile());
onMounted(() => document.addEventListener("keydown", update));
onUnmounted(() => window.removeEventListener("keydown", update));
</script>

<template>
  <main>
    <GameGrid :gamegrid="grid" />
    <div v-if="!isWordValid" class="invalid-word">
      Le mot n'est pas dans le dictionnaire !
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
</style>
