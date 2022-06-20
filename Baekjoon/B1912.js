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
	let len = Number(input.shift());
	let arr = input.shift().split(' ').map(el => Number(el));
	console.log(solution(len, arr));
	process.exit();
});

function solution(len, arr){
	let dp = [arr[0]];
	let max = arr[0];
	for (let i=1; i<len; i++){
		dp.push(Math.max(dp[i-1] + arr[i], arr[i]));
		max = dp[i] > max ? dp[i] : max;
	}
	return max;
}