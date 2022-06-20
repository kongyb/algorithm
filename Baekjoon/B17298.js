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
	let nums = input[1].split(' ').map(el => Number(el));
	console.log(solution(nums));
	process.exit();
});

function solution(nums){
	let stack = [];
	let result = [];
	for (let i=nums.length - 1; i>=0; i--){
		let num = nums[i];
		if (stack.length === 0)
			result.push(-1);
		else {
			while (stack.length > 0 && stack[stack.length - 1] <= num)
				stack.pop();
			result.push(stack.length === 0 ? -1 : stack[stack.length - 1]);
		}
		stack.push(num);
	}
	let left = 0;
	let right = result.length - 1;
	while (left < right){
		let temp = result[left];
		result[left] = result[right];
		result[right] = temp;
		left++;
		right--;
	}
	return result.join(' ');
}