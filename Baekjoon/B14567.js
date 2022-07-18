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
	let table = [];
	for (let i=1; i<=M; i++)
		table.push(input[i].split(' ').map(el => Number(el) - 1));
	console.log(solution(N, table));
	process.exit();
});

function solution(N, table){
	let result = new Array(N).fill(0);
	result[0] = 1;
	table.sort((a,b) => score(a,N) - score(b,N));
	let index = 0;
	let num = 1;
	while (num < N){
		let max = 0;
		while(index < table.length && table[index][1] === num){
			max = Math.max(max, result[table[index][0]]);
			index++;
		}
		result[num] = max + 1;
		num++;
	}
	return result.join(' ');
}

function score(arr, N){
	return arr[1] * N + arr[0];
}