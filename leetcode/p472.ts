function findAllConcatenatedWordsInADict(words: string[]): string[] {
  words.sort((a, b) => a.length - b.length);
  const shortWords: string[] = [];
  const result: string[] = [];
  for (const word of words) {
    if (checkConcatened(word, shortWords)) {
      result.push(word);
    }
    shortWords.push(word);
  }
  return result;
}

function checkConcatened(word: string, shortWords: string[]) {
  if (word === "") {
    return true;
  }
  for (const shortWord of shortWords) {
    if (word.startsWith(shortWord) && checkConcatened(word.slice(shortWord.length), shortWords)) {
      return true;
    }
  }
  return false;
}
