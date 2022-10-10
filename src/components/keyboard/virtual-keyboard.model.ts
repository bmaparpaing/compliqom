import { useGrid } from "@/grid";

const { handleLetter } = useGrid();

export type HintType = "NO_INFORMATION" | "ABSENT" | "CORRECT" | "MISPLACED";

export type CustomStyle = { width: string };

export abstract class VirtualKeyboardKey {
  value: string;
  letterHint: HintType;
  style?: { width: string };

  abstract handleKey(): void;

  protected constructor(value: string) {
    this.value = value;
    this.letterHint = "NO_INFORMATION";
  }
}

export class LetterKey extends VirtualKeyboardKey {
  handleKey: () => void;

  constructor(value: string) {
    super(value);
    this.handleKey = () => handleLetter(this.value);
  }
}

export class ActionKey extends VirtualKeyboardKey {
  handleKey: () => void;

  constructor(value: string, style: CustomStyle, keyHandler: () => void) {
    super(value);
    this.style = style;
    this.handleKey = keyHandler;
  }
}
