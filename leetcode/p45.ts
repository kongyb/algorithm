function jump(nums: number[]): number {
  const dp: number[] = new Array(nums.length).fill(0);
  for (let i = 0; i < nums.length; i++) {
    const max = nums[i];
    for (let j = 1; j <= max; j++) {
      dp[i + j] = dp[i + j] === 0 ? dp[i] + 1 : Math.min(dp[i] + 1, dp[i + j]);
    }
  }
  return dp[nums.length - 1];
}
