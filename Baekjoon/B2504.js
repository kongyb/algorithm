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
	console.log(solution(input[0]));
	process.exit();
});

function solution(str){
	let result = 0;
	let value = {'(':2, '[':3};
	let pair = {'(':')', '[':']'};
	let stack = [];
	for (let i=0; i<str.length; i++){
		let char = str[i];
		if (pair[char])
			stack.push(char);
		else{
			let last = stack.pop();
			if (pair[last] !== char)
				return 0;
			else if(str[i-1] === last){
				let v = value[last];
				stack.forEach(el => v*=value[el]);
				result += v;
			}
		}
	}
	if (stack.length !== 0)
		return 0;
	return result;
}
