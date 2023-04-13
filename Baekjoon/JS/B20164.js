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
	let nums = input[0].split('').map(el => Number(el));
	console.log(solution(nums).join(' '));
	process.exit();
});

function solution(nums){
	let cnt = nums.reduce((acc, curr)=>{
		if (curr % 2 === 1)
			acc++;
		return acc;
	},0);
	if (nums.length === 1)
		return [cnt, cnt];
	if (nums.length === 2){
		let [min, max] = solution(String(nums[0] + nums[1]).split('').map(el => Number(el)));
		return [min + cnt, max + cnt];
	}
	let result = [Number.MAX_SAFE_INTEGER, 0];
	for (let i=1; i<nums.length; i++){
		for (let j=i+1; j<nums.length; j++){
			let num1 = Number(nums.slice(0,i).join(''));
			let num2 = Number(nums.slice(i,j).join(''));
			let num3 = Number(nums.slice(j).join(''));
			let [min, max] = solution(String(num1 + num2 + num3).split('').map(el => Number(el)));
			result[0] = result[0] > min + cnt ? min + cnt : result[0];
			result[1] = result[1] < max + cnt ? max + cnt : result[1];
		}
	}
	return result;
}