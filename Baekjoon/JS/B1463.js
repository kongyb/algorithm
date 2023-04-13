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
	let arr = new Array(num + 1).fill(0);
	for (let i=2; i<= num; i++){
		let prev=[arr[i-1]];
		if (i%2 === 0)
			prev.push(arr[i/2]);
		if (i%3 === 0)
			prev.push(arr[i/3]);
		arr[i] = Math.min(...prev)+1;
	}
	return arr[num];
}