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
	let [N, price] = input[0].split(' ').map(el => Number(el));
	let coins = [];
	for (let i=1; i<=N; i++)
		coins.push(Number(input[i]));
	console.log(solution(coins, price));
	process.exit();
});

function solution(coins, price){
	let sum = 0;
	for (let i=coins.length - 1; i>=0; i--){
		let cnt = Math.floor(price / coins[i]);
		price -= cnt * coins[i];
		sum += cnt;
	}
	return sum;
}