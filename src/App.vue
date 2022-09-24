<script setup lang="ts">
import GameGrid from "./components/GameGrid.vue";
import { onBeforeMount, onMounted, onUnmounted, reactive} from "vue";
import { DictionaryService } from "./dictionary-service";

const solution = "DIFFUSION";
const columnSize = solution.length;

const grid = reactive(
    [...Array(6).keys()].map((i) =>
        [...Array(solution.length).keys()].map((j) => ({
          letter: i === 0 ? "." : "",
          index: i * columnSize + j,
        }))
    )
);

let column = 0;
let line = 0;

function update(event: KeyboardEvent) {
  if (column < columnSize && event.key.match(/^[A-Za-z]$/)) {
    grid[line][column].letter = event.key.toUpperCase();
    column++;
  } else if (event.key === "Enter" && column === columnSize) {
    line++;
    column = 0;
    if (line > 6) {
      line = 6;
    }
    grid[line].forEach((cell) => (cell.letter = "."));
  } else if (event.key === "Backspace") {
    column--;
    if (column < 0) {
      column = 0;
    }
    grid[line][column].letter = ".";
  }
}

onBeforeMount(() => DictionaryService.initDictionaryFromFile());
onMounted(() => document.addEventListener("keydown", update));
onUnmounted(() => window.removeEventListener("keydown", update));
</script>

<template>
  <main>
    <GameGrid :gamegrid="grid"/>
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
