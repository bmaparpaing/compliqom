import dictionaryUrl from "@/assets/allowed_words.txt";

export function useDictionary() {
  const checkWordExists = async (word: string) => {
    const allowedWords = await dictionaryPromise;
    return !!word && allowedWords.includes(word.toUpperCase());
  };
  return { checkWordExists };
}

const dictionaryPromise = fetchDictionary();

async function fetchDictionary(): Promise<string[]> {
  const allowedWordsFile: Response = await fetch(dictionaryUrl);
  const allowedWordsFileContent = await allowedWordsFile.text();
  return allowedWordsFileContent.split("\n");
}
