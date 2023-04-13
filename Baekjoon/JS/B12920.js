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
	let [N, M] = input[0].split(' ').map(el => Number(el));
	let items = [];
	for (let i=1; i<=N; i++){
		let [weight, score, cnt] = input[i].split(' ').map(el => Number(el));
		while (cnt > 1){
			let temp = Math.floor(cnt / 2);
			items.push([weight * temp, score * temp]);
			cnt -= temp;
		}
		items.push([weight, score]);
	}
	console.log(solution(items, M));
	process.exit();
});

function solution(items, M){
	let arr = new Array(M+1).fill(0);
	let max = 0;
	for (const item of items){
		let [weight, score] = item;
		for (let i=M; i>=weight; i--){
			arr[i] = Math.max(arr[i - weight] + score, arr[i])
			max = Math.max(arr[i], max);
		}
	}
	return max;
}