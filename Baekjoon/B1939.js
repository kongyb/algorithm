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
		let [p1, p2, max] = input[i].split(' ').map(el => Number(el));
		setMap(edgeInfo, p1, p2, max);
		setMap(edgeInfo, p2, p1, max);
	}
	let [src, dest] = input[M + 1].split(' ').map(el => Number(el));
	console.log(solution(edgeInfo, N, src, dest));
	process.exit();
});

function setMap(map, src, dest, max){
	if (map.get(src) === undefined){
		let temp = {};
		temp[dest] = max;
		map.set(src, temp);
	}
	else {
		let temp = map.get(src);
		if (temp[dest] === undefined || temp[dest] < max)
			temp[dest] = max;
	}
	return;
}

function solution(edgeInfo, N, src, dest){
	let queue = [];
	let weightArr = [];
	for (let i=1; i<=N; i++){
		if (edgeInfo.get(src)[i]===undefined)
			weightArr.push(-1);
		else {
			weightArr.push(edgeInfo.get(src)[i]);
			queue.push([i, edgeInfo.get(src)[i]]);
		}
	}
	while (queue.length > 0){
		let [point, max] = queue.shift();
		if (weightArr[point - 1] > max)
			continue;
		let edgeArr = Object.entries(edgeInfo.get(point));
		for (let [next, nextMax] of edgeArr){
			next = Number(next);
			if (next === src)
				continue;
			let temp = Math.min(max, nextMax);
			if (temp > weightArr[next - 1]){
				weightArr[next - 1] = temp;
				queue.push([next, temp]);
			}
		}
	}
	return weightArr[dest - 1];
}