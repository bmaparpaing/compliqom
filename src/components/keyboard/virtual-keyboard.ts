import type { Cell } from "@/components/GameCell.vue";
import { useLayout } from "@/components/keyboard/keyboard-layout";
import type { VirtualKeyboardKey } from "@/components/keyboard/virtual-keyboard.model";
import { useGrid } from "@/grid";
import { watch } from "vue";

const { frenchLayout: keyLayout } = useLayout();

export function useVirtualKeyboard() {
  const { grid, currentLine } = useGrid();

  watch(currentLine, (newValue, oldValue) => {
    displayHints(grid, oldValue);
  });

  return { keyLayout };
}

function displayHints(grid: Cell[][], line: number): void {
  grid[line].forEach((cell) => {
    // on cherche dans les 3 lignes du clavier virtuel pour trouver la touche correspondant à la lettre de la cellule
    const key = keyLayout.flat().find((k) => k.value === cell.letter)!;
    setLetterHint(key, cell);
  });
}

function setLetterHint(key: VirtualKeyboardKey, cell: Cell): void {
  if (cell.correct) {
    key.letterHint = "CORRECT";
  } else if (cell.misplaced) {
    key.letterHint = key.letterHint === "CORRECT" ? "CORRECT" : "MISPLACED";
  } else {
    key.letterHint =
      key.letterHint === "CORRECT" || key.letterHint === "MISPLACED"
        ? key.letterHint
        : "ABSENT";
  }
}
