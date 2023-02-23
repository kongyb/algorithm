// https://leetcode.com/problems/ipo/

function findMaximizedCapital(k: number, w: number, profits: number[], capital: number[]): number {
  const projects: Project[] = [];
  const heap: Heap<Project> = new Heap((p1: Project, p2: Project) => p1.profit > p2.profit);

  for (let i = 0; i < profits.length; i++) {
    projects.push(new Project(profits[i], capital[i]));
  }
  // capital순으로 정렬
  projects.sort((a, b) => a.capital - b.capital);

  let cnt: number = 0;
  let index: number = 0;
  while (index < projects.length && projects[index].capital <= w) {
    heap.add(projects[index]);
    index++;
  }
  while (cnt < k && heap.peek() != null) {
    const p: Project = heap.pop() as Project;
    w += p.profit;
    while (index < projects.length && projects[index].capital <= w) {
      heap.add(projects[index]);
      index++;
    }
    cnt++;
  }
  return w;
}

class Project {
  profit: number;
  capital: number;

  constructor(profit: number, capital: number) {
    this.profit = profit;
    this.capital = capital;
  }
}

class Heap<T> {
  arr: T[];
  compare: (obj1: T, obj2: T) => boolean;

  constructor(compare: (obj1: T, obj2: T) => boolean) {
    this.arr = [];
    this.compare = compare;
  }

  add(obj: T): void {
    this.arr.push(obj);
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
    const result: T = this.arr.pop() as T;
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
      let target = this.compare(this.arr[left], this.arr[right]) ? left : right;
      this.swap(target, parent);
      parent = target;
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

  swap(i1: number, i2: number): void {
    let temp: T = this.arr[i1];
    this.arr[i1] = this.arr[i2];
    this.arr[i2] = temp;
    return;
  }
}

console.log(findMaximizedCapital(2, 0, [1, 2, 3], [0, 1, 1]));
console.log(findMaximizedCapital(3, 0, [1, 2, 3], [0, 1, 1]));
