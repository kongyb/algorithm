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
	let cnt = 0;
	let n = 666;
	while (true){
		let temp = n + '';
		if (temp.indexOf('666') !== -1)
			cnt++;
		if (cnt === num)
			return n;
		n++;
	}
}