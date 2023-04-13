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
	let cnt = Number(input[0]);
	let heap = new Heap();
	let result = [];
	for (let i=1; i<=cnt; i++){
		let num = Number(input[i]);
		if (num === 0)
			result.push(heap.pop());
		else
			heap.push(num);
	}
	console.log(result.join('\n'));
	process.exit();
});

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

	push(num){
		this.arr.push(num);
		this.len++;
		let child = this.len - 1;
		let parent = Math.floor((child - 1) / 2);
		while (parent >= 0 && this.arr[child] < this.arr[parent]){
			this.swap(child, parent);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
		return;
	}

	pop(){
		if (this.len === 0)
			return 0;
		this.swap(0, this.len - 1);
		let value = this.arr.pop();
		this.len--;
		let parent = 0;
		let left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
		let right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
		while (this.arr[parent] > this.arr[left] || this.arr[parent] > this.arr[right]){
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
		return value;
	}
}