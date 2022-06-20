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
	let days = Number(input[0]);
	let schedule = [];
	for (let i=1; i<=days; i++)
		schedule.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(days, schedule));
	process.exit();
});

function solution(days, schedule){
	let sumArr = new Array(days).fill(0);
	let max = 0;
	for (let i=days-1; i>=0; i--){
		let [during, pay] = schedule[i];
		if (during + i > days)
			continue;
		else
			sumArr[i] = pay + maxVal(sumArr, during + i);
		max = sumArr[i] > max ? sumArr[i] : max;
	}
	return max;
}

function maxVal(arr, index){
	let max = 0;
	for (let i=index; i<arr.length; i++)
		max = arr[i] > max ? arr[i] : max;
	return max;
}