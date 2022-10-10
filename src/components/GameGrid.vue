<script setup lang="ts">
import { reactive } from "vue";
import GameCell from "./GameCell.vue";

const props = defineProps<{
  gamegrid: Array<Array<{ letter: string; index: number }>>;
}>();

const styleObject = reactive({
  gridTemplateColumns:
    "repeat(" + props.gamegrid[0].length + ", minmax(0, 1fr))",
  width: props.gamegrid[0].length * 4 + "rem",
});
</script>

<template>
  <div class="game-grid" :style="styleObject">
    <template v-for="line in gamegrid">
      <GameCell v-for="item in line" :val="item" :key="item.index" />
    </template>
  </div>
</template>

<style scoped>
.game-grid {
  width: 16rem;
  display: grid;
  margin-bottom: 40px;
}
</style>
