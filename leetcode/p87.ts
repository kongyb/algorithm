const aCode = "a".charCodeAt(0);
let isSameSum: boolean = false;

function isScramble(s1: string, s2: string): boolean {
  if (s1 === s2) {
    return true;
  }
  let sum1: number;
  let sum2: number;
  if (!isSameSum) {
    sum1 = getSum(s1);
    sum2 = getSum(s2);
    if (sum1 !== sum2) {
      return false;
    }
    isSameSum = true;
  }

  const len: number = s1.length;
  [sum1, sum2] = [0, 0];
  for (let i = 0; i < len - 1; i++) {
    sum1 += getSum(s1[i]);
    sum2 += getSum(s2[i]);
    if (
      sum1 === sum2 &&
      isScramble(s1.slice(0, i + 1), s2.slice(0, i + 1)) &&
      isScramble(s1.slice(i + 1), s2.slice(i + 1))
    ) {
      return true;
    }
  }

  [sum1, sum2] = [0, 0];
  for (let i = 0; i < len - 1; i++) {
    sum1 += getSum(s1[i]);
    sum2 += getSum(s2[len - i - 1]);
    if (
      sum1 === sum2 &&
      isScramble(s1.slice(0, i + 1), s2.slice(len - i - 1)) &&
      isScramble(s1.slice(i + 1), s2.slice(0, len - i - 1))
    ) {
      return true;
    }
  }
  return false;
}

function getSum(str: string): number {
  let result: number = 0;
  for (let i = 0; i < str.length; i++) {
    result += Math.pow(2, str.charCodeAt(i) - aCode);
  }
  return result;
}

console.log(isScramble("eebaacbcbcadaaedceaaacadccd", "eadcaacabaddaceacbceaabeccd"));
