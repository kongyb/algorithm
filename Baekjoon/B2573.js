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
	let map = [];
	for (let i=1; i<=N; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, M, map));
	process.exit();
});

function solution(N, M, map){
	let time = 0;
	let minusMap = new Array(N).fill().map(el => new Array(M).fill(0));
	while (true){
		checkNeighbor(map, minusMap);
		let rest = meltIce(map, minusMap);
		if (rest === 0)
			return 0;
		time++;
		if (rest !== checkIce(map))
			break;
	}
	return time;
}

function checkNeighbor(map, minusMap){
	let dirs = [[-1,0], [1,0], [0,-1], [0,1]];
	for (let i=1; i<map.length - 1; i++){
		for (let j=1; j<map[0].length - 1; j++){
			if (map[i][j] === 0)
				continue;
			let cnt = 0;
			for (const dir of dirs){
				let [y, x] = [dir[0] + i, dir[1] + j];
				if (map[y][x] === 0)
					cnt++;
			}
			minusMap[i][j] = cnt;
		}
	}
	return;
}

function meltIce(map, minusMap){
	let rest = 0;
	for (let i=1; i<map.length - 1; i++){
		for (let j=1; j<map[0].length - 1; j++){
			if (map[i][j] === 0)
				continue;
			map[i][j] = Math.max(map[i][j] - minusMap[i][j], 0);
			if (map[i][j] !== 0)
				rest++;
		}
	}
	return rest;
}

function checkIce(map){
	let queue = [];
	let isChecked = new Array(map.length).fill().map(el => new Array(map[0].length).fill(0));
	total:for (let i=1; i<map.length - 1; i++){
		for (let j=1; j<map[0].length - 1; j++){
			if (map[i][j] !== 0){
				queue.push([i,j]);
				isChecked[i][j] = 1;
				break total;
			}
		}
	}
	let index = 0;
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	while (index < queue.length){
		let [currY, currX] = queue[index];
		for (const dir of dirs){
			let [nextY, nextX] = [dir[0] + currY, dir[1] + currX];
			if (isChecked[nextY][nextX] === 1 || map[nextY][nextX] === 0)
				continue;
			isChecked[nextY][nextX] = 1;
			queue.push([nextY, nextX]);
		}
		index++
	}
	return queue.length;
}