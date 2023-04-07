const dirs: number[][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function numEnclaves(grid: number[][]): number {
  const [row, col] = [grid.length, grid[0].length];
  const isVisited: boolean[][] = getMatrix(row, col);

  let result: number = 0;
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      result += grid[i][j] === 1 ? 1 : 0;
    }
  }

  for (let i = 0; i < row; i++) {
    if (grid[i][0] === 1 && !isVisited[i][0]) {
      result -= bfs(grid, isVisited, new Point(i, 0));
    }
    if (grid[i][col - 1] === 1 && !isVisited[i][col - 1]) {
      result -= bfs(grid, isVisited, new Point(i, col - 1));
    }
  }

  for (let i = 1; i < col - 1; i++) {
    if (grid[0][i] === 1 && !isVisited[0][i]) {
      result -= bfs(grid, isVisited, new Point(0, i));
    }
    if (grid[row - 1][i] === 1 && !isVisited[row - 1][i]) {
      result -= bfs(grid, isVisited, new Point(row - 1, i));
    }
  }

  return result;
}

function bfs(grid: number[][], isVisited: boolean[][], start: Point): number {
  const queue: LinkedList2<Point> = new LinkedList2();
  queue.add(start);
  isVisited[start.row][start.col] = true;
  let result = 0;
  while (queue.peek() !== null) {
    const p: Point = queue.pop() as Point;
    result++;
    for (const dir of dirs) {
      const [nextR, nextC] = [p.row + dir[0], p.col + dir[1]];
      if (
        inGrid(nextR, nextC, grid.length, grid[0].length) &&
        grid[nextR][nextC] === 1 &&
        !isVisited[nextR][nextC]
      ) {
        isVisited[nextR][nextC] = true;
        queue.add(new Point(nextR, nextC));
      }
    }
  }
  return result;
}

function inGrid(row: number, col: number, maxRow: number, maxCol: number): boolean {
  return row >= 0 && row < maxRow && col >= 0 && col < maxCol;
}

function getMatrix(row: number, col: number): boolean[][] {
  const result: boolean[][] = [];
  for (let i = 0; i < row; i++) {
    result.push(new Array(col).fill(false));
  }
  return result;
}

class LinkedList2<T> {
  head: ListNode2<T> | null;
  tail: ListNode2<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(val: T): void {
    const node: ListNode2<T> = new ListNode2(val);
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = node;
    return;
  }

  pop(): T | null {
    if (this.head === null) {
      return null;
    }
    const node: ListNode2<T> = this.head;
    this.head = this.head.next;
    if (this.tail === node) {
      this.tail = null;
    }
    return node.val;
  }

  peek(): ListNode2<T> | null {
    return this.head;
  }
}

class ListNode2<T> {
  val: T;
  next: ListNode2<T> | null;

  constructor(val: T) {
    this.val = val;
    this.next = null;
  }
}

class Point {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }
}
