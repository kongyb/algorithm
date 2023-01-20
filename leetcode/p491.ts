function findSubsequences(nums: number[]): number[][] {
  const map: Map<string, boolean> = new Map();
  const len = nums.length;
  const queue = new LinkedList();
  queue.push(new MyListNode([], 1));
  queue.push(new MyListNode([nums[0]], 1));
  while (queue.head !== null) {
    const { arr, index } = queue.pop() as MyListNode;
    if (arr.length >= 2) {
      map.set(JSON.stringify(arr), true);
    }
    if (index === len) {
      continue;
    }
    queue.push(new MyListNode([...arr], index + 1));
    if (nums[index] >= (arr.length === 0 ? -101 : arr[arr.length - 1])) {
      queue.push(new MyListNode([...arr, nums[index]], index + 1));
    }
  }
  return [...map.keys()].map((key) => JSON.parse(key));
}

class MyListNode {
  arr: number[];
  index: number;
  next: MyListNode | null;

  constructor(arr: number[], index: number) {
    this.arr = arr;
    this.index = index;
    this.next = null;
  }
}

class LinkedList {
  head: MyListNode | null;
  tail: MyListNode | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  push(node: MyListNode) {
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = node;
  }

  pop(): MyListNode | null {
    if (this.head === null) {
      return null;
    }
    const result = this.head;
    this.head = this.head.next;
    return result;
  }
}

console.log(findSubsequences([4, 6, 7, 7]));
console.log(findSubsequences([4, 4, 3, 2, 1]));
