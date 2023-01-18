function maxSubarraySumCircular(nums: number[]): number {
  const sum: number = nums.reduce((acc, curr) => acc + curr, 0);
  let min: number = nums[0];
  let max: number = nums[0];
  const minDP: number[] = [min];
  const maxDP: number[] = [max];
  for (let i = 1; i < nums.length; i++) {
    minDP.push(Math.min(nums[i], minDP[i - 1] + nums[i]));
    maxDP.push(Math.max(nums[i], maxDP[i - 1] + nums[i]));
    min = Math.min(minDP[i], min);
    max = Math.max(maxDP[i], max);
  }
  if (min === sum) {
    return max;
  }
  return Math.max(max, sum - min);
}
