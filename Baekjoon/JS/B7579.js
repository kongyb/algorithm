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
	let memo = input[1].split(' ').map(el => Number(el));
	let costs = input[2].split(' ').map(el => Number(el));
	console.log(solution(N, M, memo, costs));
	process.exit();
});

function solution(N, M, memo, costs){
	let memSum = memo.reduce((acc, curr)=> curr+acc);
	let costSum = costs.reduce((acc,curr)=>acc+curr);
	let arr = new Array(memSum-M+1).fill(0);
	for (let i=0; i<N; i++){
		let mem = memo[i];
		let cost = costs[i];
		for (let j=memSum-M; j>=mem; j--)
			arr[j] = Math.max(arr[j-mem] + cost, arr[j]);
	}

	return costSum-Math.max(...arr);
}
