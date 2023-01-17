function minFlipsMonoIncr(s: string): number {
  let sum = 0;
  for (const char of s) {
    if (char === "1") {
      sum++;
    }
  }

  let prev = 0;
  let after = s.length - sum;
  let min = after;
  let index = 0;
  while (index < s.length) {
    if (s[index] === "1") {
      prev++;
    }
    if (s[index] === "0") {
      after--;
    }
    min = Math.min(min, prev + after);
    index++;
  }
  return min;
}
