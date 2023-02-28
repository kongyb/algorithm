class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  isVisited: boolean | undefined;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
    this.isVisited = undefined;
  }
}

function findDuplicateSubtrees(root: TreeNode | null): Array<TreeNode | null> {
  if (root === null) {
    return [];
  }
  const stack: TreeNode[] = [root];
  const result: TreeNode[] = [];
  while (stack.length > 0) {
    const curr: TreeNode = stack.pop() as TreeNode;
    if (curr["isVisited"] === undefined) {
      let isDuplicate: boolean = false;
      for (const node of stack) {
        isDuplicate = find(curr, node) ? true : isDuplicate;
      }
      if (isDuplicate) {
        result.push(curr);
      }
    }
    if (curr.right != null) stack.push(curr.right);
    if (curr.left !== null) stack.push(curr.left);
  }
  return result;
}

function find(node1: TreeNode, node2: TreeNode | null): boolean {
  if (node2 === null) {
    return false;
  }
  if (check(node1, node2)) {
    node2["isVisited"] = true;
    return true;
  }
  const leftCheck: boolean = find(node1, node2.left);
  const rightCheck: boolean = find(node1, node2.right);
  return leftCheck || rightCheck;
}

function check(node1: TreeNode | null, node2: TreeNode | null): boolean {
  if (node1 === null && node2 === null) {
    return true;
  }
  if (node1 !== null && node2 !== null) {
    if (node1.val === node2.val) {
      return check(node1.left, node2.left) && check(node1.right, node2.right);
    }
    return false;
  }
  return false;
}

const n1 = new TreeNode(1);
const n2 = new TreeNode(12);
const n3 = new TreeNode(1);
const n4 = new TreeNode(1);
const n5 = new TreeNode(2, n1, n2);
const n6 = new TreeNode(22, n3, n4);
const root = new TreeNode(10, n5, n6);
console.log(findDuplicateSubtrees(root));
