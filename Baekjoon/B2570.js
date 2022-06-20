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
	let len = Number(input.shift());
	let arr = input.map(el => Number(el));
	solution(arr);
	process.exit();
});

function solution(arr){
	arr.sort((a,b) => a - b);
	console.log(arr.join('\n'));
	return;
}

// class Heap{
// 	constructor(){
// 		this.arr = [];
// 		this.len = 0;
// 		this.cmp = function(a, b){
// 			if (a > b)
// 				return 1;
// 			return 0;
// 		}
// 	}

// 	swap(index1, index2){
// 		let temp = this.arr[index1];
// 		this.arr[index1] = this.arr[index2];
// 		this.arr[index2] = temp;
// 	}

// 	add(num){
// 		this.arr.push(num);
// 		let child = this.len;
// 		this.len++;
// 		let parent = Math.floor((child - 1) / 2);
// 		while (parent >= 0 && this.cmp(this.arr[parent], this.arr[child]) === 1){
// 			this.swap(child, parent);
// 			child = parent;
// 			parent = Math.floor((child - 1) / 2);
// 		}
// 		return;
// 	}

// 	poll(){
// 		this.swap(0, this.len - 1);
// 		let value = this.arr.pop();
// 		this.len--;
// 		let parent = 0;
// 		let left = parent * 2 + 1 > this.len - 1 ? parent : parent * 2 +1;
// 		let right = parent * 2 + 2 > this.len - 1 ? parent : parent * 2 + 2;
// 		while (this.cmp(this.arr[parent], this.arr[left]) === 1 || this.cmp(this.arr[parent], this.arr[right]) === 1){
// 			if (this.cmp(this.arr[left], this.arr[right]) === 1){
// 				this.swap(parent, right);
// 				parent = right;
// 			}
// 			else {
// 				this.swap(parent, left);
// 				parent = left;
// 			}
// 			left = parent * 2 + 1 > this.len - 1 ? parent : parent * 2 +1;
// 			right = parent * 2 + 2 > this.len - 1 ? parent : parent * 2 + 2;	
// 		}
// 		return value;
// 	}
// }

// function solution(arr){
// 	let heap = new Heap();
// 	while (arr.length > 0)
// 		heap.add(arr.pop());
// 	while (heap.len > 0)
// 		arr.push(heap.poll());
// 	for (const num of arr)
// 		console.log(num);
// 	return;
// }