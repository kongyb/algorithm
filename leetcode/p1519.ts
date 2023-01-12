function countSubTrees(n: number, edges: number[][], labels: string): number[] {
  const nodes = new Map<number, MyTreeNode>();
  for (const edge of edges) {
    const num1 = edge[0];
    const num2 = edge[1];
    if (!nodes.has(num1)) {
      nodes.set(num1, new MyTreeNode(labels[num1]));
    }
    if (!nodes.has(num2)) {
      nodes.set(num2, new MyTreeNode(labels[num2]));
    }
    nodes.get(num1)?.addNeighbor(nodes.get(num2));
    nodes.get(num2)?.addNeighbor(nodes.get(num1));
  }
  const result: number[] = [];
  for (let i = 0; i < n; i++) {
    const node = nodes.get(i);
    if (node) {
      result.push(node.getCnt()[node.label.charCodeAt(0) - "a".charCodeAt(0)]);
    }
  }
  return result;
}

class MyTreeNode {
  isVisited: boolean;
  label: string;
  neighbor: MyTreeNode[];
  cnt: number[];

  constructor(label: string) {
    this.isVisited = false;
    this.label = label;
    this.neighbor = [];
    this.cnt = new Array(26).fill(0);
    this.cnt[this.label.charCodeAt(0) - "a".charCodeAt(0)] = 1;
  }

  getCnt(): number[] {
    if (this.isVisited) {
      return this.cnt;
    }
    this.isVisited = true;
    this.neighbor.forEach((node) => {
      if (node.isVisited) {
        return;
      }
      this.cnt = addArrays(this.cnt, node.getCnt());
    });
    return this.cnt;
  }

  addNeighbor(nearNode: MyTreeNode | undefined) {
    if (!nearNode) {
      return;
    }
    this.neighbor.push(nearNode);
    return;
  }
}

function addArrays(arr1: number[], arr2: number[]) {
  return arr1.map((el, index) => {
    return el + arr2[index];
  });
}

console.log(
  countSubTrees(
    7,
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 6],
    ],
    "aaabaaa"
  )
);
console.log(
  countSubTrees(
    5,
    [
      [0, 1],
      [0, 2],
      [1, 3],
      [0, 4],
    ],
    "aabab"
  )
);
