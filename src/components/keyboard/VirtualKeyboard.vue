<script setup lang="ts">
import { useVirtualKeyboard } from "@/components/keyboard/virtual-keyboard";
import VirtualKey from "@/components/keyboard/VirtualKey.vue";

const { keyLayout } = useVirtualKeyboard();
</script>

<template>
  <div class="virtual-keyboard">
    <div
      v-for="(keyboardLine, index) of keyLayout"
      class="virtual-keyboard-line"
      :key="index"
    >
      <VirtualKey
        v-for="key in keyboardLine"
        :virtual-key="key"
        :key="key.value"
      />
    </div>
  </div>
</template>

<style scoped>
.virtual-keyboard {
  margin-bottom: 20px;
}

.virtual-keyboard-line {
  margin-bottom: 5px;
  display: flex;
  gap: 0.5rem;
}
</style>
