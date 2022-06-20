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
	let weight = input[1].split(' ').map(el => Number(el));
	console.log(solution(weight));
	process.exit();
});

function solution(weight){
	weight.sort((a,b) => a - b);
	let sum = 0;
	for (const num of weight){
		if (num > sum + 1)
			break;
		sum += num;
	}
	return sum + 1;
}