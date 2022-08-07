function solution(n, s, a, b, fares) {
	let fareObj = {};
	for (const fare of fares){
		let [p1, p2, money] = fare;
		if (!fareObj[p1])
			fareObj[p1] = [];
		if (!fareObj[p2])
			fareObj[p2] = [];
		fareObj[p1].push([p2, money]);
		fareObj[p2].push([p1, money]);
	}
	let distMap = new Array(3).fill(0).map(el => new Array(n).fill(-1));
	bfs(s, fareObj, distMap[0]);
	bfs(a, fareObj, distMap[1]);
	bfs(b, fareObj, distMap[2]);
	let answer = Number.MAX_SAFE_INTEGER;
	for (let i=0; i<n; i++){
		if (distMap[0][i] === -1 || distMap[1][i] === -1 || distMap[2][i] === -1)
			continue;
		answer = Math.min(answer, distMap.reduce((acc, curr) => acc + curr[i],0))
	}
    return answer;
}

function bfs(start, fareObj, arr){
	let heap = new Heap();
	arr[start - 1] = 0;
	heap.push([start, 0]);
	while (heap.len > 0){
		let [curr, sum] = heap.pop();
		if (!fareObj[curr])
			continue;
		for (const el of fareObj[curr]){
			let [next, money] = el;
			if (arr[next - 1] !== -1 && arr[next - 1] < money + sum)
				continue;
			arr[next - 1] = sum + money;
			heap.push([next, sum + money]);
		}
	}
	return;
}

class Heap{
	constructor(){
		this.data = [];
		this.len = 0;
	}

	push(arr){
		this.data.push(arr);
		this.len++;
		let child = this.len - 1;
		let parent = Math.floor((this.child - 1) / 2);
		while (parent >= 0 && this.arr[child][1] < this.arr[parent][1]){
			this.swap(child, parent);
			this.child = this.parent;
			this.parent = Math.floor((this.child - 1) / 2);
		}
		return;
	}

	pop(){
		this.swap(0, this.len - 1);
		let result = this.data.pop();
		this.len--;
		if (this.len > 0){
			let parent = 0;
			let left = parent * 2 + 1 < this.len ? parent * 2 + 1 : parent;
			let right = parent * 2 + 2 < this.len ? parent * 2 + 2 : parent;
			while (this.data[parent][1] > Math.min(this.data[left][1], this.data[right][1])){
				if (this.data[left][1] < this.data[right][1]){
					this.swap(parent, left);
					parent = left;
				}
				else{
					this.swap(parent, right);
					parent = right;
				}
				left = parent * 2 + 1 < this.len ? parent * 2 + 1 : parent;
				right = parent * 2 + 2 < this.len ? parent * 2 + 2 : parent;
			}
		}
		return result;
	}

	swap(i1, i2){
		let temp = this.data[i1];
		this.data[i1] = this.data[i2];
		this.data[i2] = temp;
	}
}

// 6	4	6	2	[[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]	82
// 7	3	4	1	[[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]	14
// 6	4	5	6	[[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]	18

// let n = 6
// let s = 4
// let a = 6
// let b = 2
// let fares = [[4, 1, 10], [3, 5, 24], [5, 6, 2], [3, 1, 41], [5, 1, 24], [4, 6, 50], [2, 4, 66], [2, 3, 22], [1, 6, 25]]

// let n = 7
// let s = 3
// let a = 4
// let b = 1
// let fares = [[5, 7, 9], [4, 6, 4], [3, 6, 1], [3, 2, 3], [2, 1, 6]]

let n = 6
let s = 4
let a = 5
let b = 6
let fares = [[2,6,6], [6,3,7], [4,6,7], [6,5,11], [2,5,12], [5,3,20], [2,4,8], [4,3,9]]

console.log(solution(n,s,a,b,fares));