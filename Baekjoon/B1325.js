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
	let [N, M] = input[0].split(' ').map(el => Number(el));
	let edgeInfo = new Map();
	for (let i=1; i<=M; i++){
		let [child, parent] = input[i].split(' ').map(el => Number(el));
		if (edgeInfo.has(parent))
			edgeInfo.get(parent).push(child);
		else
			edgeInfo.set(parent, [child]);
	}
	console.log(solution(edgeInfo, N));
	process.exit();
});

function solution(edgeInfo, N){
	let max = 0;
	let result = [];
	let isChecked = new Array(N + 1).fill(0);
	for (let i=1; i<=N; i++){
		let cnt = bfs(edgeInfo, isChecked, i);
		if (cnt > max){
			max = cnt;
			result = [i];
		}
		else if (cnt === max)
			result.push(i);
	}
	result.sort((a,b) => a - b);
	return result.join(' ');
}

function bfs(edgeInfo, isChecked, start){
	let queue = [start];
	isChecked[start] = 1;
	let index = 0;
	while (index < queue.length){
		let curr = queue[index];
		if (edgeInfo.has(curr)){
			for (const next of edgeInfo.get(curr)){
				isChecked[next] = 1;
				queue.push(next);
			}
		}
		index++;
	}
	while (queue.length > 0)
		isChecked[queue.pop()] = 0;
	return index;
}