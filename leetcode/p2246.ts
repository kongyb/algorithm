function longestPath(parent: number[], s: string): number {
  const nodes: MyTreeNode[] | null[] = new Array(parent.length).fill(null);
  nodes[0] = new MyTreeNode(null, s[0]);
  for (let i = 1; i < parent.length; i++) {
    if (nodes[i] !== null) {
      continue;
    }
    generateNode(parent, s, nodes, i);
  }

  for (const node of nodes) {
    if (!node?.isVisited) {
      node?.findLength();
    }
  }

  let max = 1;
  nodes.forEach((node: MyTreeNode | null) => {
    if (!node) {
      return;
    }
    max = Math.max(max, node.getLongestPathLength());
  });
  return max;
}

function generateNode(
  parent: number[],
  s: string,
  nodes: MyTreeNode[] | null[],
  index: number
): void {
  if (nodes[parent[index]] === null) {
    generateNode(parent, s, nodes, parent[index]);
  }
  nodes[index] = new MyTreeNode(nodes[parent[index]], s[index]);
  return;
}

class MyTreeNode {
  parent: MyTreeNode | null;
  child: MyTreeNode[];
  value: string;
  pathLength: number[];
  isVisited: boolean;

  constructor(parent: MyTreeNode | null, value: string) {
    this.parent = parent;
    this.value = value;
    this.child = [];
    this.isVisited = false;
    this.pathLength = [];
    if (this.parent) {
      this.parent.addChild(this);
    }
  }

  addChild(node: MyTreeNode) {
    if (this.value !== node.value) {
      this.child.push(node);
      return;
    }
  }

  findLength(): void {
    this.isVisited = true;
    for (const node of this.child) {
      this.pathLength.push(node.getLongestThroughLength() + 1);
    }
  }

  getLongestThroughLength(): number {
    if (!this.isVisited) {
      this.findLength();
    }
    return this.pathLength.length === 0 ? 1 : Math.max(...this.pathLength);
  }

  getLongestPathLength(): number {
    if (this.pathLength.length === 0) {
      return 1;
    }
    if (this.pathLength.length === 1) {
      return this.pathLength[0];
    }
    this.pathLength.sort((a, b) => b - a);
    return this.pathLength[0] + this.pathLength[1] - 1;
  }
}

// console.log(longestPath([-1, 0, 0, 1, 1, 2], "abacbe"));
// console.log(longestPath([-1, 0, 0, 0], "aabc"));
console.log(longestPath([-1, 0, 1, 2, 3, 4], "zzabab"));
