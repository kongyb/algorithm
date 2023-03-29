function maxSatisfaction(satisfaction: number[]): number {
  satisfaction.sort((a, b) => a - b);
  const len = satisfaction.length;
  let max: number = 0;
  for (let start = 0; start < len; start++) {
    let sum: number = 0;
    for (let i = 0; start + i < len; i++) {
      sum += (i + 1) * satisfaction[start + i];
    }
    max = Math.max(sum, max);
  }
  return max;
}
