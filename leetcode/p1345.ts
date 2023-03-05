function minJumps(arr: number[]): number {
  const queue = new LinkedList<Move>();
  const len = arr.length;
  const dp: number[] = new Array(len).fill(50000);
  const map: Map<number, number[]> = new Map();
  for (let i = 0; i < len; i++) {
    const num = arr[i];
    if (!map.has(num)) {
      map.set(num, []);
    }
    map.get(num)?.push(i);
  }

  dp[0] = 0;
  queue.add(new Move(0, 0));
  while (queue.head !== null) {
    const curr: Move = queue.pop() as Move;
    const { index, cnt } = curr;
    if (index === len - 1) {
      return cnt;
    }
    if (index - 1 >= 0 && dp[index - 1] > cnt + 1) {
      dp[index - 1] = cnt + 1;
      queue.add(new Move(index - 1, cnt + 1));
    }
    if (index + 1 < len && dp[index + 1] > cnt + 1) {
      dp[index + 1] = cnt + 1;
      queue.add(new Move(index + 1, cnt + 1));
    }
    if (map.has(arr[index])) {
      const next: number[] = map.get(arr[index]) as number[];
      for (const i of next) {
        if (dp[i] > cnt + 1) {
          dp[i] = cnt + 1;
          queue.add(new Move(i, cnt + 1));
        }
      }
      map.delete(arr[index]);
    }
  }
  return dp[len - 1];
}

class Move {
  index: number;
  cnt: number;

  constructor(index: number, cnt: number) {
    this.index = index;
    this.cnt = cnt;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value: T): void {
    const node: ListNode<T> = new ListNode(value);
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
    const node: ListNode<T> = this.head;
    this.head = this.head.next;
    if (this.tail === node) {
      this.tail = null;
    }
    return node.value;
  }
}

class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}
