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
	let [N, H, D] = input[0].split(' ').map(el => Number(el));
	let map = input.slice(1);
	console.log(solution(N, H, D, map));
	process.exit();
});

const start = [0,0];
const end = [0,0];
const umbrellas = [];

function solution(N, H, D, map){
	for (let i=0; i<N; i++){
		for (let j=0; j<N; j++){
			if (map[i][j] === 'S'){
				start[0] = i;
				start[1] = j;
			}
			if (map[i][j] === 'U')
				umbrellas.push([i,j]);
			if (map[i][j] === 'E'){
				end[0] = i;
				end[1] = j;
			}
		}
	}
	let isChecked = new Array(N).fill(0).map(el => new Array(N).fill(false));
	return move(start, H, 0, isChecked, 0, D);
}

function move(curr, hp, uHp, isChecked, prev, D){
	let result = [];
	if (getDist(curr, end) - 1 < hp + uHp)
		return prev + getDist(curr, end);
	for (const u of umbrellas){
		if (getDist(curr, u) - 1 < hp + uHp && !isChecked[u[0]][u[1]]){
			isChecked[u[0]][u[1]] = true;
			let [nextHp, nextUhp] = getNextHp(hp, uHp, getDist(curr, u) - 1);
			let temp = move(u, nextHp, D-1, isChecked, prev + getDist(curr, u), D);
			if (temp !== -1)
				result.push(temp);
			isChecked[u[0]][u[1]] = false;
		}
	}
	if (result.length === 0)
		return -1;
	return Math.min(...result);
}

function getDist(curr, next){
	return Math.abs(curr[0] - next[0]) + Math.abs(curr[1] - next[1]);
}

function getNextHp(hp, uHp, dist){
	uHp -= dist;
	if (uHp < 0)
		return [hp + uHp, uHp];
	return [hp, uHp];
}