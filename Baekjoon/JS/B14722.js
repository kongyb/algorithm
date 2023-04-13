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
	let cntMap = [];
	for (let i=1; i<=N; i++){
		map.push(input[i].split(' ').map(el => Number(el)));
		cntMap.push(new Array(N).fill(0));
	}
	console.log(solution(N, map, cntMap));
	process.exit();
});

function solution(N, map, cntMap){
	for (let i=0; i<N; i++){
		let top = i > 0 ? cntMap[i-1][0] : 0;
		let next = top % 3;
		if (map[i][0] === next)
			top++;
		cntMap[i][0] = top;
	}
	for (let j=0; j<N; j++){
		let left = j > 0 ? cntMap[0][j-1] : 0;
		let next = left % 3;
		if (map[0][j] === next)
			left++;
		cntMap[0][j] = left;
	}
	for (let i=1; i<N; i++){
		for (let j=1; j<N; j++){
			let [left, leftNext] = [cntMap[i][j-1], cntMap[i][j-1] % 3];
			let [top, topNext] = [cntMap[i-1][j], cntMap[i-1][j] % 3];
			if (map[i][j] === leftNext)
				left++;
			if (map[i][j] === topNext)
				top++;
			cntMap[i][j] = Math.max(left, top);
		}
	}
	return cntMap[N-1][N-1];
}