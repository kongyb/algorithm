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
	console.log(solution(input[0]));
	process.exit();
});

function solution(str){
	let nums = str.split('-').map(el => el.split('+').reduce((acc, curr)=>{
		return acc + Number(curr);
	}, 0));
	let res = nums[0];
	for(let i=1; i<nums.length; i++)
		res -= nums[i];
	return res;
}