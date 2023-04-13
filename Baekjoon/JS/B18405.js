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
	let [len, vCnt] = input[0].split(' ').map(el => Number(el));
	let map = [];
	for (let i=1; i<=len; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	let [sec, y, x] = input[len+1].split(' ').map(el => Number(el));
	solution(vCnt, map, len, sec);
	console.log(map[y-1][x-1]);
	process.exit();
});

function solution(vCnt, map, len, sec){
	let virusMap = new Map();
	for (let i=0; i<len; i++){
		for (let j=0; j<len; j++){
			if (map[i][j] !== 0){
				if (!virusMap.get(map[i][j]))
					virusMap.set(map[i][j], [[i,j]]);
				else
					virusMap.get(map[i][j]).push([i,j]);
			}
		}
	}
	let time=0;
	while (time < sec){
		for (let i=1; i<=vCnt; i++){
			if (!virusMap.has(i))
				continue;
			let next = infestStep(map, virusMap.get(i), i);
			if (next.length === 0)
				virusMap.delete(i);
			else
				virusMap.set(i, next);
		}
		time++;
	}
	return;
}

function infestStep(map, start, virusNum){
	let next = [];
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	for (const [y,x] of start){
		for (const dir of dirs){
			let [nextY, nextX] = [y+dir[0], x+dir[1]];
			if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >=map.length)
				continue;
			if (map[nextY][nextX] !== 0)
				continue;
			map[nextY][nextX] = virusNum;
			next.push([nextY, nextX]);
		}
	}
	return next;
}