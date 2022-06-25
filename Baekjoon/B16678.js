const { setUncaughtExceptionCaptureCallback } = require('process');
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
	let N = Number(input.shift());
	let arr = input.map(el => Number(el));
	console.log(solution(N, arr));
	process.exit();
});

function solution(N, arr){
	arr.sort((a,b) => a - b);
	let sum = 0;
	let target = 1;
	for (let i=0; i<N; i++){
		let height = arr[i];
		if (height === target - 1)
			target--;
		if (height > target)
			sum += (height - target);
		target++;
	}
	return sum;
}

// 작은얘들부터