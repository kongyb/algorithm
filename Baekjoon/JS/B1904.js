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
	let num = Number(input.shift());
	console.log(solution(num));
	process.exit();
});

function solution(num){
	let arr = [0,1,2];
	let len= 3;
	while (num > len-1){
		arr.push((arr[len-1] + arr[len-2])%15746);
		len++;
	}
	return arr[num];
}