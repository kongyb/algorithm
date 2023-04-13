// vals: node의 값
// edges: node간의 연결정보
// goodpath란 시작노드와 끝노드의 값이 같으며 path에 속하는 node의 값들은 시작노드의 값보다 작거나 같아야한다.
// 노드하나로 이루어져도 goodpath => 최소 vals.length만큼 goodpath를 갖는다.
function numberOfGoodPaths(vals: number[], edges: number[][]): number {
  const nodes: Map<number, MyTreeNode> = new Map();
  const len = vals.length;
  let cnt = vals.length;
}

class MyTreeNode {
  index: number;
  val: number;
  neighbor: MyTreeNode[];
  isVisited: boolean;

  constructor(index: number, val: number) {
    this.index = index;
    this.val = val;
    this.neighbor = [];
    this.isVisited = false;
  }

  addNeighbor(node: MyTreeNode): void {
    this.neighbor.push(node);
  }
}

console.log(
  numberOfGoodPaths(
    [1, 3, 2, 1, 3],
    [
      [0, 1],
      [0, 2],
      [2, 3],
      [2, 4],
    ]
  )
);
console.log(
  numberOfGoodPaths(
    [1, 1, 2, 2, 3],
    [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
    ]
  )
);
console.log(numberOfGoodPaths([1], []));
