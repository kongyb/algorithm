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
	let cnt = Number(input.shift());
	let arr = [];
	for (let i=0; i<cnt; i++)
		arr.push(Number(input.shift()));
	console.log(solution(cnt,arr));
	process.exit();
});

function solution(cnt, arr){
	if (cnt === 1)
		return arr[0];
	if (cnt === 2)
		return arr[0] + arr[1];
	if (cnt === 3)
		return Math.max(arr[0] + arr[1], arr[0] + arr[2], arr[1] + arr[2]);
	let max = 0;
	let dpArr = [arr[0], arr[0] + arr[1], Math.max(arr[0] + arr[1], arr[1] + arr[2], arr[0] + arr[2])];
	for (let i=3; i<cnt; i++){
		dpArr.push(Math.max(dpArr[i-1], dpArr[i-2] + arr[i], dpArr[i-3] + arr[i-1] + arr[i]));
		max = dpArr[i] > max ? dpArr[i] : max;
	}
	return max;
}