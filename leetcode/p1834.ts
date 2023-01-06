function getOrder(tasks: [number, number][]): number[] {
  const taskArr: Task[] = tasks
    .map((task, index) => [...task, index] as Task)
    .sort((a, b) => a[0] - b[0]);
  const heap = new Heap<Task>(compareProcessTime);
  let time: number = taskArr[0][0];
  let index: number = 0;
  const result: number[] = [];

  while (true) {
    while (index < taskArr.length && time >= taskArr[index][0]) {
      heap.push(taskArr[index]);
      index++;
    }
    if (index < taskArr.length && heap.peek() === null) {
      heap.push(taskArr[index]);
      time = taskArr[index][0];
      index++;
      continue;
    }
    const complete = heap.pop();
    if (complete === null) {
      continue;
    }
    result.push(complete[2]);
    time += complete[1];
    if (index === taskArr.length && heap.peek() === null) {
      break;
    }
  }
  return result;
}

const compareProcessTime: CompareFunc<Task> = (task1: Task, task2: Task) => {
  if (task1[1] === task2[1]) {
    return task1[2] < task2[2] ? true : false;
  }
  return task1[1] < task2[1] ? true : false;
};

interface CompareFunc<T> {
  (obj1: T, obj2: T): boolean;
}

type Task = [number, number, number];

class Heap<T> {
  arr: T[];
  compare: CompareFunc<T>;

  constructor(compare: CompareFunc<T>) {
    this.arr = [];
    this.compare = compare;
  }

  swap(index1: number, index2: number): void {
    const temp: T = this.arr[index1];
    this.arr[index1] = this.arr[index2];
    this.arr[index2] = temp;
    return;
  }

  push(value: T): void {
    this.arr.push(value);
    let child: number = this.arr.length - 1;
    let parent: number = Math.floor((child - 1) / 2);
    while (parent >= 0 && this.compare(this.arr[child], this.arr[parent])) {
      this.swap(child, parent);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
    return;
  }

  pop(): T | null {
    if (this.arr.length === 0) {
      return null;
    }
    this.swap(0, this.arr.length - 1);
    const result = this.arr.pop() as T;
    if (this.arr.length === 0) {
      return result;
    }
    let parent = 0;
    let left = parent * 2 + 1 >= this.arr.length ? parent : parent * 2 + 1;
    let right = parent * 2 + 2 >= this.arr.length ? parent : parent * 2 + 2;
    while (
      this.compare(this.arr[left], this.arr[parent]) ||
      this.compare(this.arr[right], this.arr[parent])
    ) {
      if (this.compare(this.arr[left], this.arr[right])) {
        this.swap(parent, left);
        parent = left;
      } else {
        this.swap(parent, right);
        parent = right;
      }
      left = parent * 2 + 1 >= this.arr.length ? parent : parent * 2 + 1;
      right = parent * 2 + 2 >= this.arr.length ? parent : parent * 2 + 2;
    }
    return result;
  }

  peek(): T | null {
    if (this.arr.length === 0) {
      return null;
    }
    return this.arr[0];
  }
}

console.log(
  getOrder([
    [19, 13],
    [16, 9],
    [21, 10],
    [32, 25],
    [37, 4],
    [49, 24],
    [2, 15],
    [38, 41],
    [37, 34],
    [33, 6],
    [45, 4],
    [18, 18],
    [46, 39],
    [12, 24],
  ])
);
