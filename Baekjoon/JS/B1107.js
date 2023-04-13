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
	let target = Number(input[0]);
	let cnt = Number(input[1]);
	let nums = [];
	if (cnt > 0)
		nums = input[2].split(' ').map(el => Number(el));
	console.log(solution(target, cnt, nums));
	process.exit();
});

function solution(target, cnt, nums){
	let result = Math.abs(100 - target);
	if (result === 0)
		return result;
	let ableNums = new Array(10).fill(1);
	for (const num of nums)
		ableNums[num] = 0;
	let len = (''+target).length;
	let numArr = new Array(len + 1).fill(0);
	for (let i=Math.max(len - 1, 1); i<=len + 1; i++){
		let temp = recur(numArr, target, ableNums, len + 1 - i);
		result = temp < result ? temp : result;
	}
	return result;
}

function recur(numArr, target, ableNums, index){
	if (index === numArr.length)
		return Math.abs(target - toNumber(numArr)) + (toNumber(numArr) + '').length;
	let result = Number.MAX_SAFE_INTEGER;
	for (let i=0; i<10; i++){
		if (ableNums[i] === 0)
			continue;
		numArr[index] = i;
		let temp = recur(numArr, target, ableNums, index + 1);
		result = temp < result ? temp : result;
	}
	return result;
}

function toNumber(arr){
	let num = 0;
	for (let i=0; i<arr.length; i++){
		num *= 10;
		num += arr[i];
	}
	return num;
}