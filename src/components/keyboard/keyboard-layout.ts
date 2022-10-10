import { reactive } from "vue";
import {
  ActionKey,
  LetterKey,
} from "@/components/keyboard/virtual-keyboard.model";
import { useGrid } from "@/grid";
import type { VirtualKeyboardKey } from "@/components/keyboard/virtual-keyboard.model";

const { handleBackspace, handleEnter } = useGrid();

export function useLayout() {
  const frenchLayout: VirtualKeyboardKey[][] = reactive([
    [
      new LetterKey("A"),
      new LetterKey("Z"),
      new LetterKey("E"),
      new LetterKey("R"),
      new LetterKey("T"),
      new LetterKey("Y"),
      new LetterKey("U"),
      new LetterKey("I"),
      new LetterKey("O"),
      new LetterKey("P"),
    ],
    [
      new LetterKey("Q"),
      new LetterKey("S"),
      new LetterKey("D"),
      new LetterKey("F"),
      new LetterKey("G"),
      new LetterKey("H"),
      new LetterKey("J"),
      new LetterKey("K"),
      new LetterKey("L"),
      new LetterKey("M"),
    ],
    [
      new LetterKey("W"),
      new LetterKey("X"),
      new LetterKey("C"),
      new LetterKey("V"),
      new LetterKey("B"),
      new LetterKey("N"),
      new ActionKey("⌫", { width: "1.5rem" }, handleBackspace), // touche Backspace
      new ActionKey("↲", { width: "2rem" }, handleEnter), // touche Entrée
    ],
  ]);

  return { frenchLayout };
}
