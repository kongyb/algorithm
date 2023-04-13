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
	let cnt = Number(input.shift());
	console.log(solution(cnt, input));
	process.exit();
});

function solution(cnt, nums){
	let numObj = {};
	for (const num of nums){
		for (let i=1; i<=num.length; i++){
			let char = num[num.length - i];
			if (numObj[char])
				numObj[char] += Math.pow(10, i-1);
			else
				numObj[char] = Math.pow(10, i-1);
		}
	}
	let values = Object.values(numObj);
	values.sort((a,b) => b-a);
	return values.reduce((acc, curr, index) => {
		acc += curr * (9 - index);
		return acc;
	},0);
}