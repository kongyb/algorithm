const MAX: number = 1000000001;
const MIN: number = -1;

function minimumDeviation(nums: number[]): number {
  const offSet: number = getOffSet(nums.length);
  const tree: MyTreeNode[] = new Array(offSet * 2);

  // 초기화
  for (let i = 2 * offSet - 1; i >= offSet; i--) {
    const num = nums[i - offSet];
    tree[i] = new MyTreeNode(i, num % 2 === 1, getDivBy2(num), getDivBy2(num));
    tree[i].originNum = num;
  }
  for (let i = offSet - 1; i > 0; i--) {
    const left: MyTreeNode = tree[2 * i];
    const right: MyTreeNode = tree[2 * i + 1];
    const node: MyTreeNode = new MyTreeNode(i, false, getMin(left, right), getMax(left, right));
    tree[i] = node;
  }

  const root: MyTreeNode = tree[1];
  let result: number = root.max - root.min;
  const max = root.max;
  while (root.min !== max) {
    // 모든 수를 2로 최대한 나누었음. 초기에는 모든 수가 홀수
    // min을 증가시킨다. 홀수면 *2 짝수일때 isOdd가 false일 때만 증가
    // 짝수면서 isOdd가 true라면 break;
    const min = root.min;
    const nodes: MyTreeNode[] = find(tree, min, offSet);
    for (const node of nodes) {
      if (node.isOdd && min % 2 === 0) {
        return result;
      }
      if (!node.isOdd && min === node.originNum) {
        return result;
      }
      update(tree, min * 2, node.index);
    }
    result = Math.min(root.max - root.min, result);
  }
  return result;
}

function getDivBy2(num: number) {
  while (num % 2 === 0) {
    num /= 2;
  }
  return num;
}

function update(tree: MyTreeNode[], value: number, index: number) {
  let curr: MyTreeNode = tree[index];
  curr.min = value;
  curr.max = value;
  let parent: number = Math.floor(index / 2);
  while (parent > 0) {
    tree[parent].min = getMin(tree[parent * 2], tree[parent * 2 + 1]);
    tree[parent].max = getMax(tree[parent * 2], tree[parent * 2 + 1]);
    parent = Math.floor(parent / 2);
  }
  return;
}

// value값을 갖는 리프노드를 모두 찾아 반환
function find(tree: MyTreeNode[], value: number, offSet: number): MyTreeNode[] {
  const result: MyTreeNode[] = [];
  const queue: LinkedList<MyTreeNode> = new LinkedList();
  queue.add(tree[1]);
  while (queue.len > 0) {
    const curr: MyTreeNode = queue.pop() as MyTreeNode;
    if (curr.index >= offSet && curr.min === value && curr.max === value) {
      result.push(curr);
      continue;
    }
    if (curr.min <= value && curr.max >= value) {
      const left: MyTreeNode = tree[curr.index * 2];
      const right: MyTreeNode = tree[curr.index * 2 + 1];
      queue.add(left);
      queue.add(right);
    }
  }
  return result;
}

function getMin(node1: MyTreeNode, node2: MyTreeNode) {
  return Math.min(node1.min, node2.min);
}

function getMax(node1: MyTreeNode, node2: MyTreeNode) {
  return Math.max(node1.max, node2.max);
}

function getOffSet(len: number) {
  let result: number = 1;
  while (result < len) {
    result *= 2;
  }
  return result;
}

class MyTreeNode {
  index: number;
  min: number;
  max: number;
  isOdd: boolean;
  originNum: number;

  constructor(index: number, isOdd: boolean, min: number, max: number) {
    this.index = index;
    this.min = min !== undefined ? min : MAX;
    this.max = max !== undefined ? max : MIN;
    this.isOdd = isOdd;
    this.originNum = -1;
  }
}

class LinkedList<T> {
  arr: T[];
  len: number;
  head: MyListNode<T> | null;
  tail: MyListNode<T> | null;

  constructor() {
    this.arr = [];
    this.len = 0;
    this.head = null;
    this.tail = null;
  }

  add(value: T): void {
    const node: MyListNode<T> = new MyListNode(value);
    this.len++;
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
    const result: T = this.head.value;
    this.len--;
    this.head = this.head.next;
    if (this.len === 0) {
      this.tail = null;
    }
    return result;
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
