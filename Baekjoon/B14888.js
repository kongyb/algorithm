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
	let numCnt = Number(input[0]);
	let nums = input[1].split(' ').map(el => Number(el));
	// 0+ 1- 2* 3//
	let operators = input[2].split(' ').map(el => Number(el));
	console.log(solution(nums, operators));
	process.exit();
});

function solution(nums, operators){
	// min, max
	let arr = [];
	fillOperator(nums, operators, 1, nums[0], arr);
	return arr.join('\n');
}

function fillOperator(nums, operators, index, val, arr){
	if (index === nums.length){
		if (arr.length === 0){
			arr.push(val);
			arr.push(val)
			return;
		}
		if (val < arr[1])
			arr[1] = val;
		if (val > arr[0])
			arr[0] = val
		return;
	}
	for (let i=0; i<4; i++){
		if (operators[i] !== 0){
			operators[i]--;
			fillOperator(nums, operators, index+1, operate(val, i, nums[index]), arr);
			operators[i]++;
		}
	}
	return;
}

function operate(val, operator, num){
	if (operator === 0)
		return num + val;
	if (operator === 1)
		return val - num;
	if (operator === 2)
		return val * num;
	if (operator === 3){
		if (val < 0)
			return -1 * Math.floor(-1 * val / num);
		return Math.floor(val / num);
	}
}
