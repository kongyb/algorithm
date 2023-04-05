const aCode = "a".charCodeAt(0);

function partitionString(s: string): number {
  let cnt: number = 0;
  const linkedListArr: LinkedList[] = [];
  for (let i = 0; i < 26; i++) {
    linkedListArr.push(new LinkedList());
  }

  for (let i = 0; i < s.length; i++) {
    const code: number = s.charCodeAt(i) - aCode;
    linkedListArr[code].add(i);
  }

  for (const list of linkedListArr) {
    list.popHead();
  }

  let end = s.length;
  for (let i = 0; i < s.length; i++) {
    if (end === i) {
      cnt++;
      end = s.length;
    }
    const code: number = s.charCodeAt(i) - aCode;
    const list: LinkedList = linkedListArr[code];
    if (!list.isEmpty()) {
      end = Math.min(end, list.popHead());
    }
  }
  return cnt + 1;
}

class ListNode2 {
  val: number;
  next: ListNode2 | null;

  constructor(val: number) {
    this.val = val;
    this.next = null;
  }
}

class LinkedList {
  head: ListNode2 | null;
  tail: ListNode2 | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  add(val: number) {
    const node: ListNode2 = new ListNode2(val);
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    this.tail.next = node;
    this.tail = node;
    return;
  }

  popHead(): number {
    if (this.head === null) {
      return -1;
    }
    const result: ListNode2 = this.head;
    this.head = this.head.next;
    if (this.tail === result) {
      this.tail = null;
    }
    return result.val;
  }
}
