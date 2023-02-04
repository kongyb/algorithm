function checkInclusion(s1: string, s2: string): boolean {
  const charArr: number[] = new Array(26).fill(0);
  for (const char of s1) {
    const index: number = char.charCodeAt(0) - "a".charCodeAt(0);
    charArr[index]++;
  }
  const len = s1.length;
  for (let i = 0; i <= s2.length - len; i++) {
    const index = s2.charCodeAt(i) - "a".charCodeAt(0);
    if (charArr[index] !== 0 && check([...charArr], s2, i, len)) {
      return true;
    }
  }
  return false;
}

function check(charArr: number[], str: string, start: number, len: number): boolean {
  for (let i = 0; i < len; i++) {
    const index = str.charCodeAt(start + i) - "a".charCodeAt(0);
    if (charArr[index] === 0) {
      return false;
    }
    charArr[index]--;
  }
  return true;
}
