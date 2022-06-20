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
	// console.log(solution(str.split('')));
	process.exit();
});

function solution(str){
	let stack = [];
	let arr = [];
	for (let i=0; i<str.length; i++){
		if (str[i] === '(' || str[i] === '['){
			stack.push([i,str[i]]);
		}
		else {
			let info = stack.pop();
			if (str[i] === ')'){
				if (!info || info[1] !== '(')
					return 0;
				else if (str[i - 1] === '('){
					arr.push([2, i-1]);
				}
				else {
					arr.forEach(el => {
						if (el[1] > info[0])
							el[0] *= 2;
					})
				}
			}
			if (str[i] === ']'){
				if (!info || info[1] !== '[')
					return 0;
				else if (str[i - 1] === '['){
					arr.push([3, i-1])
				}
				else {
					arr.forEach(el => {
						if (el[1] > info[0])
							el[0] *= 3;
					})
				}
			}
		}
	}
	if (stack.length > 0)
		return 0;
	return arr.reduce((acc, curr)=>{
		return acc + curr[0];
	},0);
}