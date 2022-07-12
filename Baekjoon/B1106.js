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
	let [C, N] = input[0].split(' ').map(el => Number(el));
	let costs = [];
	for (let i=1; i<=N; i++)
		costs.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(C, N, costs));
	process.exit();
});

function solution(C, N, costs){
	let arr = new Array(C).fill(0);
	for (let i=1; i<C; i++){
		for (const [cost, custom] of costs){
			let prev = Math.max(0,i-custom);
			let newCost = cost + arr[prev];
			if (arr[i] === 0 || arr[i] > newCost)
				arr[i] = newCost;
		}
	}
	let min = Number.MAX_SAFE_INTEGER;
	for (const [cost, custom] of costs){
		let start = Math.max(C-custom, 0);
		let temp = arr[start];
		for (let i=start; i<C; i++)
			temp = temp < arr[i] ? temp : arr[i];
		min = Math.min(temp + cost, min);
	}
	return min;
}