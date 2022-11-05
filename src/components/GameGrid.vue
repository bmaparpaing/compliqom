<script setup lang="ts">
import { computed, reactive } from "vue";
import GameCell from "./GameCell.vue";
import { useGrid } from "@/grid";
import { useGameState } from "@/game-state";

const props = defineProps<{
  gamegrid: Array<Array<{ letter: string; index: number }>>;
}>();

const styleObject = reactive({
  gridTemplateColumns:
    "repeat(" + props.gamegrid[0].length + ", minmax(0, 1fr))",
  width: "calc(var(--cell-size) * " + props.gamegrid[0].length + ")",
});

const currentIndex = computed(() => {
  const { grid, currentLine, currentColumn } = useGrid();
  return (
    currentLine.value * grid[0].length +
    Math.min(grid[0].length - 1, currentColumn.value)
  );
});

const { gameEnded } = useGameState();
</script>

<template>
  <div class="game-grid" :style="styleObject">
    <template v-for="line in gamegrid">
      <GameCell
        v-for="item in line"
        :val="item"
        :key="item.index"
        :active="!gameEnded && currentIndex === item.index"
      />
    </template>
  </div>
</template>

<style scoped>
.game-grid {
  display: grid;
  margin-bottom: 40px;
}
</style>
