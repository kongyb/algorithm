function tribonacci(n: number): number {
  let nums: number[] = [0, 1, 1];
  while (nums.length < n + 1) {
    const len = nums.length;
    nums.push(nums[len - 1] + nums[len - 2] + nums[len - 3]);
  }
  return nums[n];
}
