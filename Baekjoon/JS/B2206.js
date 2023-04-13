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
	let [h, w] = input[0].split(' ').map(el => Number(el));
	let map = [];
	for (let i=1; i<=h; i++)
		map.push(input[i].split('').map(el => Number(el)));
	console.log(solution(h, w, map));
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

	compare(arr1, arr2){
		if (arr1[3] < arr2[3])
			return true;
		else if (arr2[3] < arr1[3])
			return false;
		else{
			if (arr1[2] < arr2[2])
				return true;
			return false;
		}
	}

	push(obj){
		this.arr.push(obj);
		this.len++;
		let child = this.len - 1;
		let parent = Math.floor((child - 1) / 2);
		while (parent >= 0 && this.compare(this.arr[child], this.arr[parent])){
			this.swap(child, parent);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
		return;
	}

	pop(){
		if (this.len === 0)
			return null;
		this.swap(0, this.len - 1);
		let value = this.arr.pop();
		this.len--;
		if (this.len > 0){
			let parent = 0;
			let left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
			let right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
			let cmpIndex = this.compare(this.arr[left], this.arr[right]) ? left : right;
			while (this.compare(this.arr[cmpIndex], this.arr[parent])){
				this.swap(cmpIndex, parent);
				parent = cmpIndex;
				left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
				right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
				cmpIndex = this.compare(this.arr[left], this.arr[right]) ? left : right;
			}
		}
		return value;
	}
}

function solution(h, w, map){
	let lenMap = [];
	for (let i=0; i<h; i++){
		lenMap.push([]);
		for (let j=0; j<w; j++)
			lenMap[i].push([-1,-1]);
	}
	lenMap[0][0] = [1,-1];
	return bfs(h, w, map, lenMap);
}

function bfs(h, w, map, lenMap){
	// [startY, startX, broken, len]
	let queue = new Heap();
	queue.push([0, 0, 0, 1]);
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	while (queue.len > 0){
		let [y, x, broken, len] = queue.pop();
		for (const dir of dirs){
			let [nextY, nextX] = [y + dir[0], x + dir[1]];
			if (nextY < 0 || nextX < 0 || nextY >= h || nextX >= w)
				continue;
			if (broken === 1 && map[nextY][nextX] === 1)
				continue;
			if (nextY === h - 1 && nextX === w - 1)
				return len + 1;
			if (map[nextY][nextX] === 0 && lenMap[nextY][nextX][broken] === -1){
				lenMap[nextY][nextX][broken] = len + 1;
				queue.push([nextY, nextX, broken, len + 1]);
			}
			if (map[nextY][nextX] === 1 && lenMap[nextY][nextX][1] === -1){
				lenMap[nextY][nextX][1] = len + 1;
				queue.push([nextY, nextX, 1, len + 1])
			}
		}
	}
	let ans = lenMap[h-1][w-1].filter(el => el !== -1);
	if (ans.length === 0)
		return -1;
	return Math.min(...ans);
}
// 8 8
// 01000100
// 01010100
// 01010100
// 01010100
// 01010100
// 01010100
// 01010100
// 00010100