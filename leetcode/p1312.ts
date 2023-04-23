function minInsertions(s: string): number {
  const len: number = s.length;
  const arr: string[] = [];
  for (let i = len - 1; i >= 0; i--) {
    arr.push(s[i]);
  }
  const r: string = arr.join("");

  const dp: number[][] = [];
  for (let i = 0; i < len; i++) {
    dp.push(new Array(len).fill(0));
  }

  dp[0][0] = s[0] === r[0] ? 1 : 0;
  for (let i = 1; i < len; i++) {
    if (dp[i - 1][0] === 1) {
      dp[i][0] = 1;
      continue;
    }
    dp[i][0] = s[i] === r[0] ? 1 : 0;
  }
  for (let i = 1; i < len; i++) {
    if (dp[0][i - 1] === 1) {
      dp[0][i] = 1;
      continue;
    }
    dp[0][i] = s[0] === r[i] ? 1 : 0;
  }

  let max: number = 1;
  for (let i = 1; i < len; i++) {
    for (let j = 1; j < len; j++) {
      if (s[i] === r[j]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      max = Math.max(max, dp[i][j]);
    }
  }
  return len - max;
}
