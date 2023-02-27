/**
 * Definition for Node.
 */
class MyNode {
  val: boolean;
  isLeaf: boolean;
  topLeft: MyNode | null;
  topRight: MyNode | null;
  bottomLeft: MyNode | null;
  bottomRight: MyNode | null;
  constructor(
    val?: boolean,
    isLeaf?: boolean,
    topLeft?: MyNode,
    topRight?: MyNode,
    bottomLeft?: MyNode,
    bottomRight?: MyNode
  ) {
    this.val = val === undefined ? false : val;
    this.isLeaf = isLeaf === undefined ? false : isLeaf;
    this.topLeft = topLeft === undefined ? null : topLeft;
    this.topRight = topRight === undefined ? null : topRight;
    this.bottomLeft = bottomLeft === undefined ? null : bottomLeft;
    this.bottomRight = bottomRight === undefined ? null : bottomRight;
  }
}
// https://leetcode.com/problems/construct-quad-tree/

class Info {
  rowS: number;
  rowE: number;
  colS: number;
  colE: number;
  val?: boolean;

  constructor(rowS: number, rowE: number, colS: number, colE: number) {
    this.rowS = rowS;
    this.rowE = rowE;
    this.colS = colS;
    this.colE = colE;
  }

  setVal(grid: number[][]): void {
    if (this.rowE - this.rowS === 1 && this.colE - this.colS === 1) {
      this.val = grid[this.rowS][this.colS] === 1 ? true : false;
    }
    return;
  }
}

function check(tl: MyNode, tr: MyNode, bl: MyNode, br: MyNode): boolean {
  if (!tl.isLeaf || !tr.isLeaf || !bl.isLeaf || !br.isLeaf) {
    return false;
  }
  return tl.val === tr.val && tl.val === bl.val && tl.val === br.val;
}

function construct(grid: number[][]): MyNode | null {
  const len: number = grid.length;
  const N: number = Math.log2(len);
  const infos: Info[] = [];
  infos.push(new Info(0, len, 0, len));
  let index: number = 0;
  while (index < infos.length) {
    const i: Info = infos[index];
    if (i.rowE - i.rowS === 1 && i.colE - i.colS === 1) {
      i.setVal(grid);
    } else {
      const rowM: number = (i.rowE + i.rowS) / 2;
      const colM: number = (i.colE + i.colS) / 2;
      infos.push(new Info(i.rowS, rowM, i.colS, colM));
      infos.push(new Info(i.rowS, rowM, colM, i.colE));
      infos.push(new Info(rowM, i.rowE, i.colS, colM));
      infos.push(new Info(rowM, i.rowE, colM, i.colE));
    }
    index++;
  }
  console.log(infos);

  const nodes: MyNode[] = infos.map((i) => {
    if (i.val === undefined) {
      return new MyNode();
    }
    return new MyNode(i.val, true);
  });
  for (let i = Math.floor(nodes.length / 4) - 1; i >= 0; i--) {
    const curr: MyNode = nodes[i];
    const topLeft: MyNode = nodes[i * 4 + 1];
    const topRight: MyNode = nodes[i * 4 + 2];
    const bottomLeft: MyNode = nodes[i * 4 + 3];
    const bottomRight: MyNode = nodes[i * 4 + 4];
    if (check(topLeft, topRight, bottomLeft, bottomRight)) {
      curr.isLeaf = true;
      curr.val = topLeft.val;
    } else {
      curr.isLeaf = false;
      curr.topLeft = topLeft;
      curr.topRight = topRight;
      curr.bottomLeft = bottomLeft;
      curr.bottomRight = bottomRight;
    }
  }
  return nodes[0];
}

console.log(
  construct([
    [1, 1, 0, 0],
    [0, 0, 1, 1],
    [1, 1, 0, 0],
    [0, 0, 1, 1],
  ])
);
