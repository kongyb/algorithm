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
	let N = Number(input[0]);
	let stops = [];
	for (let i=1; i<=N; i++)
		stops.push(input[i].split(' ').map(el => Number(el)));
	let [dest, remain] = input[N + 1].split(' ').map(el => Number(el));
	console.log(solution(stops, dest, remain));
	process.exit();
});

function solution(stops, dest, remain){
	stops.sort((a,b) => a[0] - b[0]);
	let cnt = 0;
	let dist = remain;
	let index = 0;
	let heap = new Heap();
	while (dist < dest){
		while (index < stops.length && stops[index][0] <= dist){
			heap.push(stops[index][1]);
			index++;
		}
		if (heap.getLen() === 0)
			break;
		dist += heap.pop();
		cnt++;
	}
	if (dist < dest)
		return -1;
	return cnt;
}

class Heap{
	constructor(){
		this.arr = [];
		this.len = 0;
	}

	swap(index1, index2){
		let temp = this.arr[index1];
		this.arr[index1] = this.arr[index2];
		this.arr[index2] = temp;
		return;
	}

	getLen(){
		return this.len;
	}

	push(value){
		this.arr.push(value);
		this.len++;
		let child = this.len - 1;
		let parent = Math.floor((child - 1) / 2);
		while (parent >= 0 && this.arr[parent] < this.arr[child]){
			this.swap(parent, child);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
		return;
	}

	pop(){
		if (this.len === 0)
			return null;
		this.swap(0, this.len - 1);
		let result = this.arr.pop();
		this.len--;
		let parent = 0;
		let left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
		let right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
		while (this.arr[parent] < Math.max(this.arr[right], this.arr[left])){
			if (this.arr[right] < this.arr[left]){
				this.swap(parent, left);
				parent = left;
			}
			else {
				this.swap(parent, right);
				parent = right;
			}
			left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
			right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
		}
		return result;
	}
}