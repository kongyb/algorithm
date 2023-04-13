const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
  input.push(line)
})
  .on('close', function () {
  //input에 입력값 한줄씩있음
	let cnt = Number(input.shift());
	let treeInfo = input.map(el => el.split(' '))
	let rootNode = initTree(cnt, treeInfo);
	solution(rootNode);
	process.exit();
});

class Tree{
	constructor(val){
		this.val = val;
		this.right = null;
		this.left = null;
	}
}

function initTree(cnt, treeInfo){
	let treeObj={};
	let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	for(let i=0;i<cnt;i++)
		treeObj[alpha[i]] = new Tree(alpha[i]);
	treeObj['.'] = null;
	for(const line of treeInfo){
		let [parent,left,right] = line;
		treeObj[parent].left = treeObj[left];
		treeObj[parent].right = treeObj[right];
	}
	return treeObj['A'];
}

function solution(rootNode){
	console.log(preorder(rootNode));
	console.log(inorder(rootNode));
	console.log(postorder(rootNode));
}

function preorder(rootNode){
	if (rootNode === null)
		return '';
	return rootNode.val + preorder(rootNode.left) + preorder(rootNode.right);
}

function inorder(rootNode){
	if (rootNode === null)
		return '';
	return inorder(rootNode.left) + rootNode.val + inorder(rootNode.right);
}

function postorder(rootNode){
	if (rootNode === null)
		return '';
	return postorder(rootNode.left) + postorder(rootNode.right) + rootNode.val;
}