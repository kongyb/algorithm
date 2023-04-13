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
	let N = Number(input[0]);
	let map = [];
	for (let i=1; i<=N; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, map));
	process.exit();
});

function solution(N, map){
	let max = 1;
	let cntMap = [];
	for (let i=0; i<N; i++)
		cntMap.push(new Array(N).fill(-1));
	for (let i=0; i<N; i++){
		for (let j=0; j<N; j++){
			if (cntMap[i][j] === -1){
				let temp = recur(map, cntMap, [i,j], 1);
				max = temp > max ? temp : max;
			}
		}
	}
	return max;
}

function recur(map, cntMap, curr, cnt){
	let [row, col] = curr;
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	let amount = map[row][col];
	let max = 0;
	map[row][col] = 0;
	for (const dir of dirs){
		let [nextY, nextX] = [row + dir[0], col + dir[1]];
		if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map.length)
			continue;
		if (map[nextY][nextX] > amount){
			if (cntMap[nextY][nextX] !== -1)
				max = Math.max(cntMap[nextY][nextX] + cnt, max);
			else {
				let temp = recur(map, cntMap, [nextY, nextX], cnt + 1);
				max = temp > max ? temp : max;
			}
		}
	}
	map[row][col] = amount;
	cntMap[row][col] = Math.max(max, cnt) + 1 - cnt;
	return Math.max(max, cnt);
}