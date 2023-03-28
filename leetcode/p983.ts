function mincostTickets(days: number[], costs: number[]): number {
  const MAX_DAY: number = days[days.length - 1];
  const dp: number[] = new Array(MAX_DAY + 1).fill(0);
  let index: number = 0;
  for (let i = 1; i <= MAX_DAY; i++) {
    if (i === days[index]) {
      const costBefore1: number = i - 1 >= 0 ? dp[i - 1] : dp[0];
      const costBefore7: number = i - 7 >= 0 ? dp[i - 7] : dp[0];
      const costBefore30: number = i - 30 >= 0 ? dp[i - 30] : dp[0];
      dp[i] = Math.min(costBefore1 + costs[0], costBefore7 + costs[1], costBefore30 + costs[2]);
      index++;
    } else {
      dp[i] = dp[i - 1];
    }
  }
  return dp[MAX_DAY];
}

mincostTickets([1, 4, 6, 7, 8, 20], [2, 7, 15]);
