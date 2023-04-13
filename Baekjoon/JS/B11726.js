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
	let num = Number(input[0]);
	console.log(solution(num));
	process.exit();
});

function solution(num){
	let arr = [0,1,2];
	while (arr.length-1 < num)
		arr.push((arr[arr.length - 1] + arr[arr.length - 2]) % 10007);
	return arr[num];
}