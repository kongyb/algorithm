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
	let len = Number(input[0]);
	let str = input[1];
	console.log(solution(str));
	process.exit();
});

function solution(str){
	let stack = [str[0]];
	for (let i=1; i<str.length; i++){
		if (str[i] !== stack[stack.length-1])
			stack.push(str[i]);
	}
	return Math.floor(stack.length/2) + 1;
}