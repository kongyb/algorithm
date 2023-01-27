function findCheapestPrice(
  n: number,
  flights: number[][],
  src: number,
  dst: number,
  k: number
): number {
  let result = -1;
  const heap: Heap<Path> = new Heap((obj1: Path, obj2: Path) => {
    return obj1.stops < obj2.stops;
  });
  const memoArr: number[] = new Array(n).fill(Number.MAX_SAFE_INTEGER);
  const flightMap: Map<number, number[][]> = new Map<number, number[][]>();
  for (const flight of flights) {
    const [src, dst, cost] = flight;
    if (!flightMap.has(src)) {
      flightMap.set(src, []);
    }
    flightMap.get(src)?.push([dst, cost]);
  }

  heap.push(new Path(src, 0, 0));
  memoArr[src] = 0;

  while (heap.peek()) {
    const { curr, stops, cost } = heap.pop() as Path;

    // dst도착하면 result갱신
    if (curr === dst && stops <= k + 1) {
      result = result === -1 ? cost : Math.min(result, cost);
      continue;
    }
    // dst에 도착하지 못하고 k번 넘게 경유할 경우 더이상 탐색하지 않음
    if (stops > k) {
      continue;
    }
    const nextFlights: number[][] | undefined = flightMap.get(curr);
    if (!nextFlights) {
      continue;
    }
    // heap으로 인해 cost가 작은 순으로 탐색
    for (const nextFlight of nextFlights) {
      const [nextDst, nextCost] = nextFlight;
      const newStops = stops + 1;
      const newCost = cost + nextCost;
      if (memoArr[nextDst] > newCost) {
        memoArr[nextDst] = newCost;
        heap.push(new Path(nextDst, newStops, newCost));
      }
    }
  }

  return result;
}

class Heap<T> {
  arr: T[];
  compare: CompareFunc<T>;

  constructor(compare: CompareFunc<T>) {
    this.arr = [];
    this.compare = compare;
  }

  push(val: T) {
    this.arr.push(val);
    let child: number = this.arr.length - 1;
    let parent: number = Math.floor((child - 1) / 2);

    while (parent >= 0 && this.compare(this.arr[child], this.arr[parent])) {
      this.swap(child, parent);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
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
      if (this.compare(this.arr[left], this.arr[right])) {
        this.swap(left, parent);
        parent = left;
      } else {
        this.swap(right, parent);
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

  private swap(index1: number, index2: number) {
    const temp: T = this.arr[index1];
    this.arr[index1] = this.arr[index2];
    this.arr[index2] = temp;
    return;
  }
}

interface CompareFunc<T> {
  (obj1: T, obj2: T): boolean;
}

class Path {
  curr: number;
  stops: number;
  cost: number;

  constructor(curr: number, stops: number, cost: number) {
    this.curr = curr;
    this.stops = stops;
    this.cost = cost;
  }
}

console.log(
  findCheapestPrice(
    11,
    [
      [0, 3, 3],
      [3, 4, 3],
      [4, 1, 3],
      [0, 5, 1],
      [5, 1, 100],
      [0, 6, 2],
      [6, 1, 100],
      [0, 7, 1],
      [7, 8, 1],
      [8, 9, 1],
      [9, 1, 1],
      [1, 10, 1],
      [10, 2, 1],
      [1, 2, 100],
    ],
    0,
    2,
    4
  )
);
