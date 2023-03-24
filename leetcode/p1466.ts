function minReorder(n: number, connections: number[][]): number {
  const nodes: GraphNode[] = [];
  for (let i = 0; i < n; i++) {
    nodes.push(new GraphNode(i));
  }

  for (const conn of connections) {
    const [c1, c2] = conn;
    nodes[c1].addChild(nodes[c2]);
    nodes[c2].addChild(nodes[c1]);
  }

  nodes[0].setDepth(0);
  let result: number = 0;
  for (const conn of connections) {
    const [from, to] = conn;
    const fromNode: GraphNode = nodes[from];
    const toNode: GraphNode = nodes[to];
    if (fromNode.depth < toNode.depth) {
      result++;
    }
  }
  return result;
}

class GraphNode {
  index: number;
  neighbor: GraphNode[];
  depth: number;

  constructor(index: number) {
    this.index = index;
    this.neighbor = [];
    this.depth = -1;
  }

  addChild(child: GraphNode): void {
    this.neighbor.push(child);
  }

  setDepth(depth: number) {
    this.depth = depth;
    for (const node of this.neighbor) {
      if (node.depth !== -1) {
        continue;
      }
      node.setDepth(depth + 1);
    }
  }
}
