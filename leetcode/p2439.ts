function minimizeArrayValue(nums: number[]): number {
  let max: number = nums[0];
  let rest: number = 0;
  for (let i = 1; i < nums.length; i++) {
    const num: number = nums[i];
    if (num > max) {
      while (rest < num - max) {
        max++;
        rest += i;
      }
    }
    rest -= num - max;
  }
  return max;
}
