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
	// process.exit();
	return ;
});

function solution(len, arr){
	let max = arr[0];
	for (let i=1; i<arr.length; i++){
		if (arr[i] < arr[i-1] + arr[i])
			arr[i] = arr[i-1] + arr[i];
		max = Math.max(arr[i], max);
	}
	return max;
}