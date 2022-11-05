<script setup lang="ts">
import type { VirtualKeyboardKey } from "@/components/keyboard/virtual-keyboard.model";
import { useGameState } from "@/game-state";

defineProps<{
  virtualKey: VirtualKeyboardKey;
}>();

const { gameEnded } = useGameState();
</script>

<template>
  <div
    class="virtual-key"
    :class="{
      'default-cursor': gameEnded,
      correct: virtualKey.letterHint === 'CORRECT',
      misplaced: virtualKey.letterHint === 'MISPLACED',
      absent: virtualKey.letterHint === 'ABSENT',
    }"
    :style="virtualKey.style"
    @click="gameEnded ? null : virtualKey.handleKey()"
  >
    {{ virtualKey.value }}
  </div>
</template>

<style scoped>
.virtual-key {
  border: 1px solid var(--color-main);
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 20px;
  cursor: pointer;
}

.virtual-key.correct {
  background-color: var(--color-correct-letter);
}

.virtual-key.misplaced {
  background-color: var(--color-misplaced-letter);
}

.virtual-key.absent {
  opacity: 50%;
}

.virtual-key.default-cursor {
  cursor: default;
}
</style>
