const readline = require('readline');
const { threadId } = require('worker_threads');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let input = [];

rl.on('line', function (line){
	input.push(line);
})
.on('close',function(){
	//input에 입력값 한줄씩있음
	let cnt = Number(input[0]);
	let treeNodes = {};
	treeNodes[1] = new TreeNode(1);
	for (let i=1; i<cnt; i++){
		let [parent, child, dist] = input[i].split(' ').map(el => Number(el));
		treeNodes[parent].addChild(child, dist, treeNodes);
	}
	let max = 0;
	for (const key in treeNodes){
		let len = treeNodes[key].center();
		max = max < len ? len : max;
	}
	console.log(max);
	process.exit();
});

class TreeNode{
	constructor(num){
		this.num = num;
		this.child = [];
		this.dists=[]
		this.centerMax = 0;
		this.throughMax = 0;
	}

	addChild(childNum, dist, treeNodes){
		if (!treeNodes[childNum])
			treeNodes[childNum] = new TreeNode(childNum);
		this.child.push(treeNodes[childNum]);
		this.dists.push(dist);
	}

	center(){
		if (this.centerMax > 0)
			return this.centerMax;
		if (this.child.length === 0)
			this.centerMax=0;
		else if (this.child.length === 1)
			this.centerMax = this.through();
		else{
			let index1 = 0;
			let max = 0;
			for (let i=0; i<this.child.length; i++){
				if ((this.dists[i] + this.child[i].through()) > max){
					index1 = i;
					max = this.dists[index1] + this.child[index1].through();
				}
			}
			max = 0;
			for (let i=0; i<this.child.length; i++){
				if (i === index1)
					continue;
				max = max < (this.dists[i] + this.child[i].through()) ? (this.dists[i] + this.child[i].through()) : max;
			}
			this.centerMax = max + this.dists[index1] + this.child[index1].through();
		}
		return this.centerMax;
	}

	through(){
		if (this.throughMax > 0)
			return this.throughMax;
		if (this.child.length === 0)
			this.throughMax=0;
		else{
			let max = 0;
			for (let i=0; i<this.child.length; i++)
				max = max < (this.dists[i] + this.child[i].through()) ? (this.dists[i] + this.child[i].through()) : max;
			this.throughMax = max;
		}
		return this.throughMax;
	}
}
