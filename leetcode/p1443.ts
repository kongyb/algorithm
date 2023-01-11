function minTime(n: number, edges: number[][], hasApple: boolean[]): number {
  const nodes = new Map<number, MyTreeNode>();
  for (const edge of edges) {
    const num1 = edge[0];
    const num2 = edge[1];
    if (!nodes.has(num1)) {
      nodes.set(num1, new MyTreeNode(hasApple[num1]));
    }
    if (!nodes.has(num2)) {
      nodes.set(num2, new MyTreeNode(hasApple[num2]));
    }
    nodes.get(num1)?.addNeighbor(nodes.get(num2));
    nodes.get(num2)?.addNeighbor(nodes.get(num1));
  }
  const time: number = nodes.get(0)?.getTime() as number;
  return Math.max(0, time);
}

class MyTreeNode {
  isVisited: boolean;
  hasApple: boolean;
  neighbor: MyTreeNode[];

  constructor(hasApple: boolean) {
    this.isVisited = false;
    this.hasApple = hasApple;
    this.neighbor = [];
  }

  getTime(): number {
    this.isVisited = true;
    const times: number[] = [];
    this.neighbor.forEach((node) => {
      if (node.isVisited) {
        return;
      }
      const time: number = node.getTime();
      if (time !== -1) {
        times.push(time + 2);
      }
    });
    if (!this.hasApple && times.length === 0) {
      return -1;
    }
    return times.reduce((acc: number, curr: number): number => acc + curr, 0);
  }

  addNeighbor(nearNode: MyTreeNode | undefined) {
    if (!nearNode) {
      return;
    }
    this.neighbor.push(nearNode);
    return;
  }
}

console.log(
  minTime(
    7,
    [
      [0, 1],
      [0, 2],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 6],
    ],
    [false, false, true, false, true, true, false]
  )
);
console.log(
  minTime(
    7,
    [
      [0, 1],
      [0, 2],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 6],
    ],
    [false, false, true, false, false, true, false]
  )
);
console.log(
  minTime(
    7,
    [
      [0, 1],
      [0, 2],
      [1, 4],
      [1, 5],
      [2, 3],
      [2, 6],
    ],
    [false, false, false, false, false, false, false]
  )
);
