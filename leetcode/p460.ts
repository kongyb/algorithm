class LFUCache {
  cntMap: Map<number, MyLinkedList>;
  nodeMap: Map<number, MyListNode>;
  capacity: number;
  nodeCnt: number;

  constructor(capacity: number) {
    this.capacity = capacity;
    this.cntMap = new Map();
    this.nodeMap = new Map();
    this.nodeCnt = 0;
  }

  get(key: number): number {
    const node: MyListNode | undefined = this.nodeMap.get(key);
    if (node === undefined) {
      return -1;
    }
    return this.update(node, node.value);
  }

  put(key: number, value: number): void {
    if (this.capacity === 0) {
      return;
    }
    if (this.nodeMap.has(key)) {
      const node: MyListNode = this.nodeMap.get(key) as MyListNode;
      this.update(node, value);
      return;
    }
    if (this.nodeCnt + 1 > this.capacity) {
      const minCnt = Math.min(...this.cntMap.keys());
      const list: MyLinkedList = this.cntMap.get(minCnt) as MyLinkedList;
      const head: MyListNode = list.head as MyListNode;
      this.nodeMap.delete(head.key);
      this.nodeCnt--;
      list.pop(head);
      if (list.len === 0) {
        this.cntMap.delete(minCnt);
      }
    }
    const node: MyListNode = new MyListNode(key, value, 1);
    this.nodeMap.set(key, node);
    if (!this.cntMap.has(1)) {
      this.cntMap.set(1, new MyLinkedList());
    }
    const list: MyLinkedList = this.cntMap.get(1) as MyLinkedList;
    list.add(node);
    this.nodeCnt++;
    return;
  }

  update(node: MyListNode, value: number): number {
    const cnt = node.cnt;
    const prevList: MyLinkedList = this.cntMap.get(cnt) as MyLinkedList;
    prevList.pop(node);
    if (prevList.len === 0) {
      this.cntMap.delete(cnt);
    }

    node.cnt++;
    node.value = value;
    if (!this.cntMap.has(node.cnt)) {
      this.cntMap.set(node.cnt, new MyLinkedList());
    }
    const newList: MyLinkedList = this.cntMap.get(node.cnt) as MyLinkedList;
    newList.add(node);
    return node.value;
  }
}

class MyLinkedList {
  head: MyListNode | null;
  tail: MyListNode | null;
  len: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.len = 0;
  }

  add(node: MyListNode): void {
    this.len++;
    if (this.tail === null) {
      this.head = node;
      this.tail = node;
      return;
    }
    node.prev = this.tail;
    node.next = this.tail.next;
    if (this.tail.next !== null) {
      this.tail.next.prev = node;
    }
    this.tail.next = node;
    this.tail = node;
  }

  pop(node: MyListNode): MyListNode {
    const prev: MyListNode | null = node.prev;
    const next: MyListNode | null = node.next;

    if (prev !== null) {
      prev.next = next;
    } else {
      this.head = next;
    }
    if (next !== null) {
      next.prev = prev;
    } else {
      this.tail = prev;
    }
    node.prev = null;
    node.next = null;
    this.len--;
    return node;
  }
}

class MyListNode {
  prev: MyListNode | null;
  next: MyListNode | null;
  key: number;
  value: number;
  cnt: number;

  constructor(key: number, value: number, cnt: number) {
    this.key = key;
    this.value = value;
    this.cnt = cnt;
    this.prev = null;
    this.next = null;
  }
}

const cache = new LFUCache(0);
cache.put(0, 0);
cache.get(0);
