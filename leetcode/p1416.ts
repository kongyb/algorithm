const zero: number = "0".charCodeAt(0);
const DIV: number = Math.pow(10, 9) + 7;
let MAXLEN: number;

function numberOfArrays(s: string, k: number): number {
  const len: number = s.length;
  const dp: number[] = new Array(len).fill(0);
  MAXLEN = (k + "").length;
  dp[0] = s.charCodeAt(0) - zero <= k ? 1 : 0;
  for (let i = 1; i < len; i++) {
    dp[i] = getCnt(dp, s, i, k);
  }
  return dp[len - 1];
}

function getCnt(dp: number[], s: string, index: number, max: number) {
  let start: number = index;
  let cnt: number = 0;
  while (start >= 0 && index - start + 1 <= MAXLEN) {
    if (s[start] !== "0") {
      let num = Number(s.slice(start, index + 1));
      if (num >= 1 && num <= max) {
        cnt += start === 0 ? 1 : dp[start - 1];
        cnt %= DIV;
      }
      if (num > max) {
        break;
      }
    }
    start--;
  }
  return cnt;
}
