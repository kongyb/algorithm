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
	let time = [];
	for (let i=1; i<=N; i++)
		time.push(input[i].split(' ').map(el => Number(el)));
	time.sort((a,b) => a[0] - b[0]);
	console.log(solution(time));
	process.exit();
});

function solution(time){
	let heap = new Heap();
	for (let i=0; i<time.length; i++){
		let [start, end] = time[i];
		let min = heap.getTop();
		if (min !== null && min <= start)
			heap.pop();
		heap.push(end);
	}
	return heap.len;
}

class Heap{
	constructor(){
		this.arr = [];
		this.len = 0;
	}

	getTop(){
		return this.len > 0 ? this.arr[0] : null;
	}
	
	swap(index1, index2){
		let temp = this.arr[index1];
		this.arr[index1] = this.arr[index2];
		this.arr[index2] = temp;
		return;
	}

	push(value){
		this.arr.push(value);
		this.len++;
		let child = this.len - 1;
		let parent = Math.floor((child - 1) / 2);
		while (parent >=0 && this.arr[parent] > this.arr[child]){
			this.swap(parent, child);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
		return;
	}

	pop(){
		if(this.len === 0)
			return null;
		this.swap(0, this.len - 1);
		let result = this.arr.pop();
		this.len--;
		let parent = 0;
		let left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
		let right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
		while (this.arr[parent] > Math.min(this.arr[left], this.arr[right])){
			if (this.arr[left] < this.arr[right]){
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