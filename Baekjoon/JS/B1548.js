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
	let cnt = Number(input[0]);
	let nums = input[1].split(' ').map(el => Number(el));
	console.log(solution(cnt, nums));
	process.exit();
});

function solution(cnt, nums){
	if (cnt < 3)
		return cnt;
	nums.sort((a,b) => a - b);
	let head = 0;
	let tail = nums.length - 1;
	let result = cnt;
	if (head <= tail - 2 && nums[head] + nums[head+1] <= nums[tail]){
		let temp1 = checkHead(nums, head, tail);
		result = cnt - temp1;
		for (let i=0; i<=temp1; i++){
			result = Math.max(cnt - (i+checkTail(nums,head+i,tail)), result);
		}
		// let temp2 = checkTail(nums, head, tail);
	}
	return result;
}

function checkHead(nums, head, tail){
	let cnt = 0;
	while (head <= tail - 2 && nums[head] + nums[head+1] <= nums[tail]){
		head++;
		cnt++;
	}
	return cnt;
}

function checkTail(nums, head, tail){
	let cnt = 0;
	while (head <= tail - 2 && nums[head] + nums[head+1] <= nums[tail]){
		tail--;
		cnt++;
	}
	return cnt;
}