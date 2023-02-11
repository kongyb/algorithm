const RED: string = "R";
const BLUE: string = "B";

function shortestAlternatingPaths(
  n: number,
  redEdges: number[][],
  blueEdges: number[][]
): number[] {
  const points: Point[] = [];
  for (let i = 0; i < n; i++) {
    points.push(new Point());
  }

  for (const edge of redEdges) {
    const [src, dst] = edge;
    points[src].addEdge(RED, dst);
  }
  for (const edge of blueEdges) {
    const [src, dst] = edge;
    points[src].addEdge(BLUE, dst);
  }

  const queue: LinkedList<Info> = new LinkedList();
  queue.add(new Info(RED, 0, 0));
  queue.add(new Info(BLUE, 0, 0));
  while (queue.head !== null) {
    const info: Info = queue.pop() as Info;
    const { requiredType, length, curr } = info;
    const p = points[curr];
    if (p.getLength(requiredType) === -1 || p.getLength(requiredType) > length) {
      p.setLength(requiredType, length);
      for (const next of p.getEdges(requiredType)) {
        queue.add(new Info(requiredType === RED ? BLUE : RED, length + 1, next));
      }
    }
  }
  return points.map((p) => p.getShortestLength());
}

class Info {
  requiredType: string;
  length: number;
  curr: number;

  constructor(requiredType: string, length: number, curr: number) {
    this.requiredType = requiredType;
    this.length = length;
    this.curr = curr;
  }
}

class LinkedList<T> {
  head: MyListNode<T> | null;
  tail: MyListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value: T): void {
    const node: MyListNode<T> = new MyListNode(value);
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
    const node = this.head;
    this.head = this.head.next;
    if (this.tail === node) {
      this.tail = null;
    }
    return node.value;
  }
}

class MyListNode<T> {
  value: T;
  next: MyListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

class Point {
  blueLength: number;
  redLength: number;
  blueEdges: number[];
  redEdges: number[];

  constructor() {
    this.blueLength = -1;
    this.redLength = -1;
    this.blueEdges = [];
    this.redEdges = [];
  }

  setLength(type: string, length: number) {
    if (type === RED) {
      this.blueLength = length;
      return;
    }
    this.redLength = length;
    return;
  }

  getLength(type: string): number {
    return type === RED ? this.blueLength : this.redLength;
  }

  addEdge(type: string, dst: number): void {
    const edges: number[] = this.getEdges(type);
    edges.push(dst);
  }

  getEdges(type: string): number[] {
    return type === RED ? this.redEdges : this.blueEdges;
  }

  getShortestLength(): number {
    if (this.blueLength === -1 && this.redLength === -1) {
      return -1;
    }
    if (this.blueLength * this.redLength < 0) {
      return Math.max(this.blueLength, this.redLength);
    }
    return Math.min(this.blueLength, this.redLength);
  }
}

console.log(
  shortestAlternatingPaths(
    5,
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    [
      [1, 2],
      [2, 3],
      [3, 1],
    ]
  )
);
