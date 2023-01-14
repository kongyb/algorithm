function smallestEquivalentString(s1: string, s2: string, baseStr: string): string {
  const charMap: Map<string, string> = new Map();
  const alphas: string = "abcdefghijklmnopqrstuvwxyz";
  for (const char of alphas) {
    charMap.set(char, char);
  }
  for (let i = 0; i < s1.length; i++) {
    const char1 = s1[i];
    const char2 = s2[i];
    const head1 = getHead(char1, charMap);
    const head2 = getHead(char2, charMap);
    if (head1 < head2) {
      charMap.set(head2, head1);
    }
    if (head2 < head1) {
      charMap.set(head1, head2);
    }
  }
  return baseStr
    .split("")
    .map((char) => getHead(char, charMap))
    .join("");
}

function getHead(char: string, charMap: Map<string, string>): string {
  const head: string = charMap.get(char) as string;
  if (head === char) {
    return char;
  }
  return getHead(head, charMap);
}
