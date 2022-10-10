import { ref } from "vue";

const displayInvalidWordMessage = ref(false);
const gameEnded = ref(false);
const success = ref(false);

export function useGameState() {
  return { displayInvalidWordMessage, gameEnded, success };
}
