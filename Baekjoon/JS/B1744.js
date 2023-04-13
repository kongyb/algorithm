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
	let nums = [];
	for (let i=1; i<=N; i++)
		nums.push(Number(input[i]));
	console.log(solution(nums));
	process.exit();
});

function solution(nums){
	let minus = [];
	let plus = [];
	let zeros = 0;
	let sum = 0;
	for (const num of nums){
		if (num < 0)
			minus.push(num);
		if (num === 0)
			zeros++;
		if (num === 1)
			sum++;
		if (num > 1)
			plus.push(num);
	}
	minus.sort((a,b) => b-a);
	while (minus.length >= 2)
		sum += minus.pop() * minus.pop()
	if (minus.length === 1 && zeros === 0)
		sum += minus[0];
	plus.sort((a,b) => a-b);
	while (plus.length >= 2){
		let num1 = plus.pop();
		let num2 = plus.pop();
		sum += Math.max(num1 + num2, num1 * num2);
	}
	if (plus.length === 1)
		sum += plus[0];
	return sum;
}