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
	let towers = input[1].split(' ').map(el => Number(el));
	console.log(solution(towers));
	process.exit();
});

function solution(towers){
	let result = [];
	let stack = [];
	for (let i=0; i<towers.length; i++){
		if (stack.length === 0)
			result.push(0);
		else {
			while (stack.length > 0 && towers[i] > stack[stack.length - 1][0])
				stack.pop();
			result.push(stack.length === 0 ? 0 : stack[stack.length - 1][1]);
		}
		stack.push([towers[i], i + 1]);
	}
	return result.join(' ');
}