<script setup lang="ts">
export interface Cell {
  letter: string;
  index: number;
  correct?: boolean;
  misplaced?: boolean;
}

defineProps<{
  val: Cell;
  active: boolean;
}>();
</script>

<template>
  <div class="cell" :class="{ correct: val.correct, misplaced: val.misplaced }">
    <div class="cell-content" :class="{ active }">{{ val.letter }}</div>
  </div>
</template>

<style scoped>
.cell {
  border: var(--cell-border-size) solid var(--color-main);
  width: var(--cell-size);
  height: var(--cell-size);
  font-size: var(--cell-content-size);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.cell-content {
  width: 75%;
  height: var(--cell-content-size);
  text-align: center;
  box-sizing: border-box;
  line-height: var(--cell-content-size);
}

.cell-content.active {
  border-bottom: var(--cell-cursor-size) solid var(--color-main);
  animation: 1.5s steps(2) infinite blink;
}

@keyframes blink {
  to {
    border-bottom-style: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cell-content.active {
    animation: none;
  }
}

.cell.correct {
  background-color: var(--color-correct-letter);
}

.cell.misplaced {
  background-color: var(--color-misplaced-letter);
}
</style>
