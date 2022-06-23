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
	let K = Number(input[1]);
	let sensor = input[2].split(' ').map(el => Number(el));
	console.log(solution(N, K, sensor));
	process.exit();
});

function solution(N, K, sensor){
	if (K >= N)
		return 0;
	sensor.sort((a,b) => a - b);
	let distArr = [];
	for (let i=1; i<N; i++)
		distArr.push(sensor[i] - sensor[i - 1]);
	distArr.sort((a,b) => a - b);
	let cnt = 0;
	while (distArr.length > 0 && cnt < K - 1){
		distArr.pop();
		cnt++;
	}
	return distArr.reduce((acc, curr) => acc + curr, 0);
}