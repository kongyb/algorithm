function minimumFuelCost(roads: number[][], seats: number): number {
  const nodes: MyTreeNode[] = [];
  for (let i = 0; i <= roads.length; i++) {
    nodes.push(new MyTreeNode(i));
  }
  const nodeInfo: Map<number, number[]> = new Map();
  for (const road of roads) {
    const [p1, p2] = road;
    if (!nodeInfo.has(p1)) {
      nodeInfo.set(p1, []);
    }
    if (!nodeInfo.has(p2)) {
      nodeInfo.set(p2, []);
    }
    nodeInfo.get(p1)?.push(p2);
    nodeInfo.get(p2)?.push(p1);
  }
  makeTree(nodes, nodeInfo);

  let sum = 0;
  for (const c of nodes[0].child) {
    sum += c.getFuel(seats);
  }
  return sum;
}

function makeTree(nodes: MyTreeNode[], nodeInfo: Map<number, number[]>): void {
  const queue = new LinkedList<number>();
  nodes[0].depth = 0;
  queue.add(0);
  while (queue.peek() !== null) {
    const curr: number = queue.pop() as number;
    const currNode: MyTreeNode = nodes[curr];
    const currDepth: number = currNode.depth;
    const childArr: number[] | undefined = nodeInfo.get(curr);
    if (!childArr) {
      continue;
    }
    for (const c of childArr) {
      const node: MyTreeNode = nodes[c];
      if (node.depth === -1) {
        node.depth = currDepth + 1;
        currNode.addChild(node);
        queue.add(c);
      }
    }
  }
  return;
}

class LinkedList<T> {
  head: MyListNode<T> | null;
  tail: MyListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value: T) {
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
    const result: MyListNode<T> = this.head;
    this.head = this.head.next;
    if (this.tail === result) {
      this.tail = null;
    }
    return result.value;
  }

  peek(): MyListNode<T> | null {
    return this.head;
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

class MyTreeNode {
  index: number;
  child: MyTreeNode[];
  peopleCnt: number;
  depth: number;

  constructor(index: number) {
    this.index = index;
    this.child = [];
    this.peopleCnt = 0;
    this.depth = -1;
  }

  addChild(node: MyTreeNode): void {
    this.child.push(node);
    return;
  }

  getPeople(): number {
    if (this.peopleCnt !== 0) {
      return this.peopleCnt;
    }
    this.peopleCnt = 1;
    for (const c of this.child) {
      this.peopleCnt += c.getPeople();
    }
    return this.peopleCnt;
  }

  getFuel(seats: number): number {
    let fuel: number = Math.ceil(this.getPeople() / seats);
    for (const c of this.child) {
      fuel += c.getFuel(seats);
    }
    return fuel;
  }
}
