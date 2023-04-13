const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let input = [];

rl.on('line', function (line){
	input.push(line)
})
.on('close',function(){
	//input에 입력값 한줄씩있음
	input.shift();
	let amount = input.map(el => Number(el));
	console.log(solution(amount));
	process.exit()
})

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

	push(val){
		this.arr.push(val);
		this.len++;
		let child = this.len - 1;
		let parent = Math.floor((child - 1) / 2);
		while (parent >= 0 && this.arr[child] < this.arr[parent]){
			this.swap(child, parent);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
	}

	pop(){
		if (this.len === 0){
			return null;
		}
		this.swap(0,this.len - 1);
		let val = this.arr.pop();
		this.len--;
		let parent = 0;
		let [left, right] = [parent * 2 + 1 < this.len ? parent * 2 + 1 : parent,
							 parent * 2 + 2 < this.len ? parent * 2 + 2 : parent];
		while (this.arr[parent] > Math.min(this.arr[left], this.arr[right])){
			if (this.arr[right] < this.arr[left]){
				this.swap(parent,right);
				parent = right;
			}
			else{
				this.swap(parent,left)
				parent = left;
			}
			[left, right] = [parent * 2 + 1 < this.len ? parent * 2 + 1 : parent,
							parent * 2 + 2 < this.len ? parent * 2 + 2 : parent];
		}
		return val;
	}
}

function solution(amount){
	let cnt = 0;
	let heap = new Heap();
	for (const num of amount)
		heap.push(num);
	let num1 = heap.pop();
	let num2 = heap.pop();
	while (num2 !== null){
		let sum = num1 + num2;
		cnt += sum;
		heap.push(sum);
		num1 = heap.pop();
		num2 = heap.pop();
	}
	return cnt;
}