function minPathSum(grid: number[][]): number {
  const row: number = grid.length;
  const col: number = grid[0].length;
  const matrix: number[][] = getMatrix(row, col);
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (i === 0 && j === 0) {
        matrix[i][j] = grid[i][j];
        continue;
      }
      let left: number = Number.MAX_SAFE_INTEGER;
      let top: number = Number.MAX_SAFE_INTEGER;
      if (i > 0) {
        top = matrix[i - 1][j];
      }
      if (j > 0) {
        left = matrix[i][j - 1];
      }
      matrix[i][j] = Math.min(left, top) + grid[i][j];
    }
  }
  return matrix[row - 1][col - 1];
}

function getMatrix(row: number, col: number): number[][] {
  const result: number[][] = [];
  for (let i = 0; i < row; i++) {
    result.push(new Array(col).fill(0));
  }
  return result;
}
