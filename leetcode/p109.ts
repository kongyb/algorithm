/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function sortedListToBST(head: ListNode | null): TreeNode | null {
  const root: TreeNode | null = createTreeNode(getLen(head));
  if (root === null || head === null) {
    return null;
  }
  const getVal: () => number = listIterator(head);
  fillTree(root, getVal);
  return root;
}

function fillTree(root: TreeNode, getVal: () => number): void {
  if (root.left !== null) {
    fillTree(root.left, getVal);
  }
  root.val = getVal();
  if (root.right !== null) {
    fillTree(root.right, getVal);
  }
  return;
}

function listIterator(head: ListNode): () => number {
  let listPtr: ListNode | null = head;
  return () => {
    if (listPtr === null) {
      return 0;
    }
    const val: number = listPtr.val;
    listPtr = listPtr.next;
    return val;
  };
}

function getLen(head: ListNode | null): number {
  let result: number = 0;
  let ptr: ListNode | null = head;
  while (ptr !== null) {
    result++;
    ptr = ptr.next;
  }
  return result;
}

function createTreeNode(len: number): TreeNode | null {
  if (len === 0) {
    return null;
  }
  const node: TreeNode = new TreeNode();
  node.left = createTreeNode(Math.ceil((len - 1) / 2));
  node.right = createTreeNode(Math.floor((len - 1) / 2));
  return node;
}
