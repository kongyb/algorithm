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
	let [num1, num2] = input.shift().split(' ');
	console.log(solution(num1, num2));
	process.exit();
});

function solution(num1, num2){
	let res = [];
	let len = Math.max(num1.length, num2.length);
	num1 = num1.split('');
	num2 = num2.split('');
	while (num1.length < len)
		num1.unshift('0');
	while (num2.length < len)
		num2.unshift('0');
	let prev = 0;
	for (let i=len-1; i>=0; i--){
		let n1 = Number(num1[i]);
		let n2 = Number(num2[i]);
		let sum = n1 + n2 + prev;
		res.unshift(sum % 10);
		prev = Math.floor(sum / 10);
	}
	if (prev != 0)
		res.unshift(prev);
	return res.join('');
}