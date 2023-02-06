function shuffle(nums: number[], n: number): number[] {
  const len: number = n;
  const result: number[] = [];
  for (let i = 0; i < len; i++) {
    result.push(nums[i]);
    result.push(nums[len + i]);
  }
  return result;
}
