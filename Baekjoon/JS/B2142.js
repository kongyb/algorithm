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
	let towns = [];
	for (let i=1; i<=N; i++)
		towns.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, towns));
	process.exit();
});

function solution(N, towns){
	towns.sort((a,b) => a[0] - b[0]);
	let distSum = 0;
	let right = 0;
	let result = 0;
	for (let i=1; i<N; i++){
		distSum += (towns[i][0] - towns[0][0]) * towns[i][1];
		right += towns[i][1];
	}
	// curr: 현재 우체국 위치 left: curr기준으로 왼쪽에 위치한 사람수 right: curr기준으로 오른쪽에 위치한 사람수
	let left = towns[0][1];
	for (let curr=1; curr<N; curr++){
		let dist = towns[curr][0] - towns[curr - 1][0];
		let temp = distSum + dist * (left - right);
		if (temp < distSum){
			result = curr;
			distSum = temp;
		}
		left += towns[curr][1];
		right -= towns[curr][1];
	}
	return towns[result][0];
}