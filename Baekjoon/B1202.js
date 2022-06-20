const readline = require('readline');

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
	let [N, K] = input.shift().split(' ').map(el => Number(el));
	let jewels = [];
	let bags = [];
	for (let i=0; i<K + N; i++){
		if (i < N)
			jewels.push(input[i].split(' ').map(el => Number(el)));
		else
			bags.push(Number(input[i]));
	}
	console.log(solution(jewels, bags));
	process.exit();
});

// 보석의 가치순으로 뽑는다.
// 가방의 용량을 기준으로 담을수 있는 보석을 담는 가방의 남은 용량이 최소가 되도록 하나씩 넣는다.

class Heap{
	constructor(){
		this.arr = [];
		this.len = 0;
	}

	swap(index1, index2){
		let temp = this.arr[index1];
		this.arr[index1] = this.arr[index2];
		this.arr[index2] = temp;
	}

	push(obj){
		this.arr.push(obj);
		this.len++;
		let child = this.len - 1;
		let parent = Math.floor((child - 1) / 2);
		while (parent >= 0 && this.arr[child][1] > this.arr[parent][1]){
			this.swap(child, parent);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
		return;
	}

	pop(){
		if (this.len === 0)
			return [0,0];
		this.swap(0, this.len-1);
		let value = this.arr.pop();
		this.len--;
		if (this.len === 0)
			return value;
		let parent = 0;
		let left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
		let right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
		while (this.arr[parent][1] < Math.max(this.arr[left][1], this.arr[right][1])){
			if (this.arr[left][1] > this.arr[right][1]){
				this.swap(parent, left);
				parent = left;
			}
			else{
				this.swap(parent, right);
				parent = right;
			}
			left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
			right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
		}
		return value;
	}
}

function solution(jewels, bags){
	jewels.sort((a,b) => a[0] - b[0]);
	bags.sort((a,b) => a - b);
	let sum = 0;
	let index = 0;
	let heap = new Heap();
	for (const weight of bags){
		while (index < jewels.length && jewels[index][0] <= weight){
			heap.push(jewels[index]);
			index++;
			if (index === bags.length)
				break;
		}
		sum += heap.pop()[1];
	}
	return sum;
}