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
	let [V, E] = input.shift().split(' ').map(el => Number(el));
	let start = Number(input.shift())-1;
	let edgeInfo = new Map();
	for (let i=0; i<E; i++){
		let [source, dest, weight] = input.shift().split(' ').map(el => Number(el));
		source--;
		dest--;
		let info = edgeInfo.get(source);
		if (info === undefined){
			let temp = {}
			temp[dest] = weight;
			edgeInfo.set(source, temp);
		}
		else if (info[dest] === undefined || info[dest] > weight)
			info[dest] = weight;
	}
	let lenArr=solution(edgeInfo, start, V);
	for (const len of lenArr){
		if (len === -1)
			console.log("INF");
		else
			console.log(len);
	}
	process.exit();
});

// edgeInfo : 간선의 정보저장 
// edgeInfo.get(source) : source정점에서 갈수있는 dest: weight 꼴로 객체존재 

class Heap{
	constructor(){
		this.arr=[];
		this.len=0;
	}
	swap(index1, index2){
		let temp = this.arr[index1];
		this.arr[index1] = this.arr[index2];
		this.arr[index2] = temp;
		return
	}

	size(){
		return this.len;
	}
	//vertextInfo = [dest, weight];
	add(vertexInfo){
		this.arr.push(vertexInfo);
		this.len++;
		let child = this.len-1;
		let parent = Math.floor((child - 1) / 2);
		while (parent >= 0 && this.arr[child][1] < this.arr[parent][1]){
			this.swap(parent, child);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
	}
	// 가장작은 weight를 갖는 vertexInfo[dest, weight]를 반환
	pop(){
		this.swap(0, this.len-1);
		let value = this.arr.pop();
		this.len--;
		if(this.len !== 0){
			let parent = 0;
			let left = parent*2+1 >= this.len ? parent : parent*2+1;
			let right = parent*2+2 >= this.len ? parent : parent*2+2;
			while (this.arr[parent][1] > Math.min(this.arr[left][1],this.arr[right][1])){
				if (this.arr[left][1] > this.arr[right][1]){
					this.swap(parent, right);
					parent = right;
				}
				else{
					this.swap(parent,left);
					parent = left;
				}
				left = parent*2+1 >= this.len ? parent : parent*2+1;
				right = parent*2+2 >= this.len ? parent : parent*2+2;
			}
		}
		return value;
	}
}

function solution(edgeInfo, start, V){
	let lenArr = new Array(V).fill(-1);
	let heap = new Heap();
	heap.add([start, 0]);
	while (heap.size() > 0){
		let [dest, weight] = heap.pop();
		if (lenArr[dest] === -1){
			lenArr[dest] = weight;
			let info = edgeInfo.get(dest);
			for (let key in info){
				key = Number(key);
				heap.add([key, info[key] + lenArr[dest]]);
			}
		}
	}
	return lenArr;
}


// function solution(edgeInfo, start, V){
// 	let lenArr = new Array(V).fill(null);
// 	lenArr[start] = 0;
// 	let queue = [];
// 	for (const key in edgeInfo.get(start)){
// 		lenArr[Number(key)] = edgeInfo.get(start)[key];
// 		queue.push(key);
// 	}
// 	while (queue.length > 0){
// 		let point = queue.shift();
// 		let info = edgeInfo.get(Number(point));
// 		for (let key in info){
// 			key = Number(key);
// 			if (lenArr[key] === null || lenArr[point] + info[key] < lenArr[key]){
// 				queue.push(key);
// 				lenArr[key] = lenArr[point] + info[key];
// 			}
// 		}
// 	}
// 	return lenArr;
// }





// 첫째 줄에 정점의 개수 V와 간선의 개수 E가 주어진다. (1 ≤ V ≤ 20,000, 1 ≤ E ≤ 300,000) 모든 정점에는 1부터 V까지 번호가 매겨져 있다고 가정한다.
// 둘째 줄에는 시작 정점의 번호 K(1 ≤ K ≤ V)가 주어진다. 셋째 줄부터 E개의 줄에 걸쳐 각 간선을 나타내는 세 개의 정수 (u, v, w)가 순서대로 주어진다.
// 이는 u에서 v로 가는 가중치 w인 간선이 존재한다는 뜻이다. u와 v는 서로 다르며 w는 10 이하의 자연수이다.
// 서로 다른 두 정점 사이에 여러 개의 간선이 존재할 수도 있음에 유의한다.


// 5 6
// 1
// 5 1 1
// 1 2 2
// 1 3 3
// 2 3 4
// 2 4 5
// 3 4 6
// DFS ==> 메모리초과
// BFS