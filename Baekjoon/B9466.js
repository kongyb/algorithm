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
	let testCnt = Number(input[0]);
	for (let i=0; i<testCnt; i++){
		let len = Number(input[i*2 + 1]);
		let arr = input[i*2 + 2].split(' ').map(el => Number(el) - 1);
		console.log(solution(len, arr));
	}
	process.exit();
});

function solution(len, arr){
	let isChecked = new Array(len).fill(false);
	let cnt = len;
	for (let i=0; i<len; i++){
		if (!isChecked[i])
			cnt -= findCycle(arr, isChecked, i);
	}
	return cnt;
}

function findCycle(arr, isChecked, start){
	let next = arr[start];
	isChecked[start] = true;
	let temp = [start];
	while (!isChecked[next]){
		temp.push(next);
		isChecked[next] = true;
		next = arr[next];
	}
	for (let i=0; i<temp.length; i++){
		if (temp[i] === next)
			return temp.length - i;
	}
	return 0;
}