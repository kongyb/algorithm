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
	for(let i=0; i<cnt; i++){
		let num = Number(input.shift());
		console.log(solution(num));
	}
	process.exit();
});

function solution(num){
	let arr = [1,1,1,2,2];
	let len = 5;
	while (num > len){
		arr.push(arr[len-1] + arr[len-5]);
		len++
	}
	return arr[num-1];
}