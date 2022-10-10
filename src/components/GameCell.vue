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
  border: 2px solid white;
  width: 4rem;
  height: 4rem;
  font-size: 3rem;
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
