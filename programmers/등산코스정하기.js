function solution(n, paths, gates, summits){
	// 간선정보저장
	let edges = {};
	for (const p of paths){
		let [p1, p2, dist] = p;
		if (!edges[p1])
			edges[p1] = {};
		if (!edges[p2])
			edges[p2] = {};
		edges[p1][p2] = dist;
		edges[p2][p1] = dist;
	}
	// 입출구정보 
	let summitSet = new Set(summits);
	let gateSet = new Set(gates);
	return bfs(n, edges, summitSet, gateSet);
}

function bfs(n, edges, summitSet, gateSet){
	let distArr = new Array(n+1).fill(10000001);
	let heap = new Heap();
	for (const num of gateSet) {
		for (let key in edges[num]){
			key = Number(key);
			let cost = edges[num][key];
			if (!gateSet.has(key) && distArr[key] > cost){
				distArr[key] = cost;
				if (!summitSet.has(key))
					heap.add([key, distArr[key]])
			}
		}
	}
	while (heap.len > 0){
		let [num, intensity] = heap.peek();
		for (let key in edges[num]){
			key = Number(key);
			let cost = Math.max(intensity, edges[num][key])
			if (!gateSet.has(key) && distArr[key] > cost){
				distArr[key] = cost;
				if (!summitSet.has(key))
					heap.add([key, distArr[key]])
			}
		}
	}
	let result = [0,10000001];
	for (let num of summitSet){
		if (distArr[num] < result[1]) result = [num, distArr[num]];
		else if (distArr[num] === result[1]) result[0] = Math.min(result[0], num);
	}
	return result;
}

class Heap{
	constructor(){
		this.data=[];
		this.len=0;
	}

	add(arr){
		this.data.push(arr);
		let child = this.len++;
		let parent = Math.floor((child - 1) / 2);
		while (parent >= 0 && child[1] < parent[1]){
			this.swap(i1, i2);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
		return;
	}

	peek(){
		if (this.len === 1){
			this.len = 0;
			return this.data.pop();
		}
		this.swap(0,this.len - 1);
		let result = this.data.pop();
		this.len--;
		let parent = 0;
		let left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
		let right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 1;
		while (this.data[parent][1] > Math.min(this.data[left][1], this.data[right][1])){
			if (this.data[left][1] < this.data[right][1]){
				this.swap(left, parent);
				parent = left;
			}
			else{
				this.swap(right, parent);
				parent = right;
			}
			left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
			right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 1;
		}
		return result;
	}

	swap(i1, i2){
		let temp = this.data[i1];
		this.data[i1] = this.data[i2];
		this.data[i2] = temp;
	}
}