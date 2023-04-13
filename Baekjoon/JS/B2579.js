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
	let dest = Number(input.shift());
	let arr = [];
	for (let i=0; i<dest; i++)
		arr.push(Number(input.shift()));
	console.log(solution(arr,dest));
	process.exit();
});

function solution(arr, dest){
	if (dest === 1)
		return arr[0];
	if (dest === 2)
		return arr[0]+arr[1];
	let prevone=[arr[0], arr[0]+arr[1]];
	let prevtwo=[arr[0], arr[1]];
	let len=2;
	while (len < dest){
		prevone.push(prevtwo[len-1] + arr[len]);
		prevtwo.push(Math.max(prevone[len-2],prevtwo[len-2]) + arr[len]);
		len++;
	}
	return Math.max(prevone[dest-1],prevtwo[dest-1]);
}