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
	let arr = [1, 3];
	while (arr.length < N)
		arr.push((arr[arr.length - 2] * 2 + arr[arr.length - 1]) % 10007);
	return arr[N - 1];
}