export function getWord(words, index) {
  if (index >= 0) {
    return words[index % words.length];
  }

  return words[(words.length - 1) + ((index + 1) % words.length)];
}
