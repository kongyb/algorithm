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
	let [num1, num2] = input[0].split(' ').map(el => Number(el));
	console.log(solution(num1, num2));
	process.exit();
});

function solution(num1, num2){
	let queue = [[num1,1]];
	while (queue.length > 0){
		let [num,cnt] = queue.shift();
		if (num * 2 === num2 || num * 10 + 1 === num2)
			return cnt + 1;
		if (num * 2  < num2)
			queue.push([num * 2, cnt + 1]);
		if (num * 10 + 2 < num2)
			queue.push([num * 10 + 1, cnt + 1]);
	}
	return -1;
}