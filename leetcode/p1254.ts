const dirs: number[][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function closedIsland(grid: number[][]): number {
  const row: number = grid.length;
  const col: number = grid[0].length;
  let result: number = 0;
  const isVisited: boolean[][] = [];
  for (let i = 0; i < row; i++) {
    isVisited.push(new Array(col).fill(false));
  }

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (grid[i][j] === 0 && !isVisited[i][j]) {
        const bool: boolean = bfs(grid, isVisited, i, j);
        result += bool ? 1 : 0;
      }
    }
  }
  return result;
}

function bfs(grid: number[][], isVisited: boolean[][], row: number, col: number): boolean {
  let result: boolean = true;
  const maxRow = grid.length;
  const maxCol = grid[0].length;
  const queue: LinkedList2<Point> = new LinkedList2();

  queue.add(new Point(row, col));
  isVisited[row][col] = true;
  while (queue.peek() !== null) {
    const p: Point = queue.pop() as Point;
    if (p.row === 0 || p.row === maxRow - 1 || p.col === 0 || p.col === maxCol - 1) {
      result = false;
    }
    for (const dir of dirs) {
      const [nextR, nextC] = [p.row + dir[0], p.col + dir[1]];
      if (
        inGrid(nextR, nextC, maxRow, maxCol) &&
        !isVisited[nextR][nextC] &&
        grid[nextR][nextC] === 0
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
