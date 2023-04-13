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
	let arr = input[1].split(' ').map(el => Number(el));
	console.log(solution(N, arr));
	process.exit();
});

function solution(N, arr){
	arr.sort((a,b) => a - b);
	let sum = 0;
	let prev = 0;
	for (let i=0; i<N; i++){
		prev += arr[i];
		sum += prev;
	}
	return sum;
}