function maxDistance(grid: number[][]): number {
  const ones: number[][] = [];
  const N = grid.length;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === 1) {
        ones.push([i, j]);
      }
    }
  }
  let max = -1;
  if (ones.length === 0) {
    return max;
  }
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (grid[i][j] === 1) {
        continue;
      }
      max = Math.max(getMinDistance(i, j, ones), max);
    }
  }
  return max;
}

function getMinDistance(i: number, j: number, ones: number[][]): number {
  return ones.reduce((acc, curr) => {
    const dist = Math.abs(curr[0] - i) + Math.abs(curr[1] - j);
    return Math.min(acc, dist);
  }, 200);
}
