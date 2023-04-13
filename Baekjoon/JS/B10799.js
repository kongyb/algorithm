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
	let str = input[0];
	console.log(solution(str));
	process.exit();
});

function solution(str){
	let cnt = 0;
	let stack = [];
	for (let i=0; i<str.length; i++){
		if (str[i] === '('){
			if (str[i + 1] === ')'){
				i++;
				for (let j=0; j<stack.length; j++)
					stack[j]++;
			}
			else 
				stack.push(1);
		}
		else {
			cnt += stack.pop();
		}
	}
	while (stack.length > 0){
		cnt += stack.pop();
	}
	return cnt;
}