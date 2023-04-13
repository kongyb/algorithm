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
	let homes = [];
	let chickens = [];
	for (let i=0; i<N; i++){
		for (let j=0; j<N; j++){
			if (map[i][j] === 1)
				homes.push([i,j]);
			if (map[i][j] === 2)
				chickens.push([i,j]);
		}
	}
	let comb = combination(chickens, M);
	let min = Number.MAX_SAFE_INTEGER;
	for (const pair of comb){
		let sum = 0;
		for (const home of homes){
			sum += getDist(home, pair);
		}
		min = Math.min(sum, min);
	}
	return min;
}

function combination(arr, cnt){
	if (cnt === 1)
		return arr.map(el => [el]);
	if (arr.length === cnt)
		return [[...arr]];
	let result = combination(arr.slice(1), cnt);
	let temp = combination(arr.slice(1), cnt - 1);
	return [...result, ...temp.map(el => [arr[0], ... el])];
}

function getDist(home, pair){
	return pair.reduce((acc, curr) => {
		return Math.min(acc, Math.abs(home[0] - curr[0]) + Math.abs(home[1] - curr[1]));
	}, 101);
}