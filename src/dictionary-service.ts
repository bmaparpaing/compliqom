export class DictionaryService {
  static allowedWords: string[] = []; // la liste des mots autorisés pour la saisie par le joueur

  static async initDictionaryFromFile(): Promise<void> {
    const allowedWordsFile: Response = await fetch(
      "/src/assets/allowed_words.txt"
    );
    const allowedWordsFileContent = await allowedWordsFile.text();
    this.allowedWords = allowedWordsFileContent.split("\n");
  }

  /*
   * Vérifie si le mot passé en paramètre est ou non un mot valide
   */
  static isWordValid(word: string): boolean {
    return !!word && this.allowedWords.includes(word.toUpperCase());
  }
}
