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
	let [N, C] = input[0].split(' ').map(el => Number(el));
	let coord = [];
	for (let i=1; i<=N; i++)
		coord.push(Number(input[i]));
	console.log(solution(N, C, coord));
	process.exit();
});

function solution(N, C, coord){
	coord.sort((a,b) => a - b);
	let left = 0;
	let right = Math.ceil(1000000000 / C);
	while (left < right){
		let mid = Math.floor((left + right) / 2);
		if (check(N, C, coord, mid))
			right = mid;
		else
			left = mid + 1;
	}
	return left - 1;
}

function check(N, C, coord, min){
	let cnt = 1;
	let start = 0, end = 0;
	while (end < N){
		while (end + 1 < N && coord[end + 1] - coord[start] < min)
			end++;
		if (coord[end + 1] - coord[start] >= min)
			cnt++;
		start = end + 1;
		end = start;
	}
	return cnt < C;
}