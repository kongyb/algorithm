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
	let rope = input.slice(1).map(el => Number(el));
	console.log(solution(rope));
	process.exit();
});

function solution(rope){
	rope.sort((a,b) => b - a);
	let max = rope[0]
	for (let i=1; i<rope.length; i++)
		max = Math.max(rope[i] * (i+1), max);
	return max;
}