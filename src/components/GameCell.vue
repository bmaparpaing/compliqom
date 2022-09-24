<script setup lang="ts">
defineProps<{
  val: { letter: string; index: number };
}>();
</script>

<template>
  <div class="cell">
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
</style>
