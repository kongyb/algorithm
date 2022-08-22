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
	let cnt = Number(input[0]);
	let wines = input.slice(1).map(el => Number(el));
	console.log(solution(cnt, wines));
	process.exit();
});

function solution(cnt, wines){
	if (cnt === 1)
		return wines[0];
	if (cnt === 2)
		return wines[0] + wines[1];
	let dp = [wines[0], wines[0] + wines[1], Math.max(wines[0] + wines[1], wines[1] + wines[2], wines[0] + wines[2])];
	for (let i=3; i<cnt; i++)
		dp.push(Math.max(wines[i] + dp[i-2], dp[i-3] + wines[i-1] + wines[i], dp[i-1]));
	return Math.max(...dp);
}