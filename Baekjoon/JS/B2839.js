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
	console.log(solution(N));
	process.exit();
});

function solution(N){
	let max = Math.floor(N / 5);
	for (let i=max; i>=0; i--){
		if ((N - i * 5) % 3 === 0)
			return i + (N - i * 5) / 3;
	}
	return -1;
}