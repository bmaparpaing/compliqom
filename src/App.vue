<script setup lang="ts">
import { useGrid } from "@/grid";
import { SolutionService } from "@/solution-service";
import {
  computed,
  onBeforeMount,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from "vue";
import GameGrid from "./components/GameGrid.vue";
import { DictionaryService } from "./dictionary-service";

// TODO remplacer les appels à SolutionService par un composable useSolution pour récupérer 'rawSolution' et 'solution'
const rawSolution = SolutionService.getRawSolution();
const solution = SolutionService.getNormalizedSolution();
const {
  grid,
  currentLine,
  currentColumn,
  insertLetter,
  moveCursorToRight,
  moveCursorToNextLine,
  displayEmptyLine,
  displayHints,
  discardPlayerInput,
} = useGrid();

let isWordValid = ref(true);
let gameEnded = ref(false);
let success = ref(false);

const wikipediaDefinitionLink = computed(() => {
  return `https://fr.wikipedia.org/wiki/${rawSolution}`;
});

function update(event: KeyboardEvent) {
  if (currentLine.value >= grid.length) return;
  if (currentColumn.value < solution.length && event.key.match(/^[A-Za-z]$/)) {
    insertLetter(event.key);
    moveCursorToRight();
  } else if (event.key === "Enter" && currentColumn.value === solution.length) {
    const word = grid[currentLine.value].map((cell) => cell.letter).join("");

    checkWordValidity(word);

    //  si le mot est valide, affiche les indices visuels au joueur puis vérifie si le joueur a gagné,
    //  sinon annule le coup (efface le mot) et affiche un message d'erreur
    if (isWordValid.value) {
      displayHints();
      moveCursorToNextLine();
      if (word === solution) {
        // le joueur a gagné => saisie bloquée et affichage du message de succès
        gameEnded.value = true;
        success.value = true;
      } else {
        if (currentLine.value < grid.length) {
          // il reste des coups
          displayEmptyLine();
        } else {
          // plus de coups restants (le joueur a perdu) => saisie bloquée et affichage du message d'échec
          gameEnded.value = true;
        }
      }
    } else {
      discardPlayerInput();
    }
  } else if (event.key === "Backspace") {
    currentColumn.value--;
    if (currentColumn.value < 1) {
      currentColumn.value = 1;
    }
    grid[currentLine.value][currentColumn.value].letter = ".";
  }
}

/**
 * Vérifie la validité du mot tapé par le joueur.
 */
function checkWordValidity(word: string): void {
  isWordValid.value = DictionaryService.isWordValid(word);
}

const copied = ref(false);

function share(): void {
  let text =
    "COMPLIQOM #" +
    SolutionService.getPuzzleNumber() +
    " " +
    (success.value ? currentLine.value : "X") +
    "/" +
    grid.length +
    "\n\n";
  text += grid
    .slice(0, currentLine.value)
    .map((row) =>
      row
        .map((cell) => {
          if (cell.correct) return "🟥";
          if (cell.misplaced) return "🟨";
          else return "🟦";
        })
        .join("")
    )
    .join("\n");
  navigator.clipboard.writeText(text).then(() => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 3000);
  });
}

watch(gameEnded, (gameEnded) => {
  if (gameEnded) {
    document.removeEventListener("keydown", update);
  }
});

onBeforeMount(() => DictionaryService.initDictionaryFromFile());
onMounted(() => document.addEventListener("keydown", update));
onUnmounted(() => document.removeEventListener("keydown", update));
</script>

<template>
  <main>
    <GameGrid :gamegrid="grid" />
    <div v-if="!gameEnded && !isWordValid" class="invalid-word">
      Le mot n'est pas dans le dictionnaire !
    </div>
    <div v-else-if="gameEnded">
      <div v-if="success" class="game-success">
        Bravo ! Vous avez trouvé le mot du jour.
        <a href="#" @click.prevent="share">Partager</a>
        <Transition>
          <div v-if="copied">Copié dans le presse-papier !</div>
        </Transition>
      </div>
      <div v-else class="game-failure">
        Dommage ! Le mot du jour était :
        <span class="solution">{{ solution }}</span
        >&nbsp;
        <a href="#" @click.prevent="share">Partager</a>
        <Transition>
          <div v-if="copied">Copié dans le presse-papier !</div>
        </Transition>
      </div>
      <div class="definition">
        <a target="_blank" :href="wikipediaDefinitionLink"
          >Définition Wikipédia (lien externe)</a
        >
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.invalid-word {
  margin-top: 20px;
  font-size: 1.8rem;
}

.game-success {
  margin-top: 20px;
  font-size: 1.8rem;
  text-align: center;
}

.game-failure {
  margin-top: 20px;
  font-size: 1.8rem;
  text-align: center;
}

.solution {
  font-weight: bold;
}

.definition {
  margin-top: 20px;
  font-size: 1.4rem;
  text-align: center;
}

.v-leave-active {
  transition: opacity 1s ease;
}

.v-leave-to {
  opacity: 0;
}
</style>
