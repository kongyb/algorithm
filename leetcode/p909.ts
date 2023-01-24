// function snakesAndLadders(board: number[][]): number {
//   const size: number = board.length;
//   const cntArr: number[][] = [];
//   for (let i = 0; i <= size * size; i++) {
//     cntArr.push([Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]);
//   }
//   for (let i = 1; i <= size * size; i++) {
//     let cnt = i === 1 ? 0 : Number.MAX_SAFE_INTEGER;
//     for (let j = i - 1; j >= Math.max(1, i - 6); j--) {
//       if (cntArr[j][0] + 1 < cnt) {
//         cnt = cntArr[j][0] + 1;
//       }
//       if (cntArr[j][1] + 1 < cnt) {
//         cnt = cntArr[j][1] + 1;
//       }
//     }
//     if (cnt === Number.MAX_SAFE_INTEGER) {
//       continue;
//     }
//     const [row, col] = indexToPos(size, i);
//     if (board[row][col] === -1) {
//       cntArr[i][0] = Math.min(cnt, cntArr[i][0]);
//       continue;
//     }
//     cntArr[board[row][col]][1] = Math.min(cntArr[board[row][col]][1], cnt);
//   }
//   console.log(cntArr);
//   const min = Math.min(...cntArr[size * size]);
//   return min === Number.MAX_SAFE_INTEGER ? -1 : min;
// }
function snakesAndLadders(board: number[][]): number {
  const size = board.length;
  const cntArr: Square[] = new Array(size * size + 1).fill(1).map((el, index) => new Square(index));
  cntArr[1].normalCnt = 0;
  for (let index = 2; index <= size * size; index++) {
    let cnt = Number.MAX_SAFE_INTEGER;
    for (let prev = index - 1; prev >= Math.max(index - 6, 1); prev--) {
      const min = Math.min(cntArr[prev].jumpCnt, cntArr[prev].normalCnt);
      cnt = Math.min(cnt, min + 1);
    }
    const [row, col] = indexToPos(size, index);
    if (board[row][col] === -1) {
      cntArr[index].normalCnt = Math.min(cnt, cntArr[index].normalCnt);
    } else {
      const next = board[row][col];
      if (cnt < cntArr[next].jumpCnt) {
        cntArr[next].jumpCnt = cnt;
        if (index > next) {
          index = next - 1;
        }
      }
    }
  }
  const min = Math.min(cntArr[size * size].normalCnt, cntArr[size * size].jumpCnt);
  return min === Number.MAX_SAFE_INTEGER ? -1 : min;
}

class Square {
  normalCnt: number;
  jumpCnt: number;
  num: number;

  constructor(num: number) {
    this.num = num;
    this.normalCnt = Number.MAX_SAFE_INTEGER;
    this.jumpCnt = Number.MAX_SAFE_INTEGER;
  }
}

function indexToPos(n: number, index: number): [number, number] {
  const fromBottom = Math.ceil(index / n);
  const fromLeft = fromBottom % 2 === 1 ? (index - 1) % n : n - 1 - ((index - 1) % n);
  return [n - fromBottom, fromLeft];
}

console.log(
  snakesAndLadders([
    [-1, -1, -1, -1, 48, 5, -1],
    [12, 29, 13, 9, -1, 2, 32],
    [-1, -1, 21, 7, -1, 12, 49],
    [42, 37, 21, 40, -1, 22, 12],
    [42, -1, 2, -1, -1, -1, 6],
    [39, -1, 35, -1, -1, 39, -1],
    [-1, 36, -1, -1, -1, -1, 5],
  ])
);
//4  3
