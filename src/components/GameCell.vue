<script setup lang="ts">
export interface Cell {
  letter: string;
  index: number;
  correct?: boolean;
  misplaced?: boolean;
}

defineProps<{
  val: Cell;
}>();
</script>

<template>
  <div class="cell" :class="{ correct: val.correct, misplaced: val.misplaced }">
    <div class="cell-content">{{ val.letter }}</div>
  </div>
</template>

<style scoped>
.cell {
  border: var(--cell-border-size) solid white;
  width: var(--cell-size);
  height: var(--cell-size);
  font-size: calc(var(--cell-size) - 1rem);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cell.correct {
  background-color: var(--color-correct-letter);
}

.cell.misplaced {
  background-color: var(--color-misplaced-letter);
}
</style>
