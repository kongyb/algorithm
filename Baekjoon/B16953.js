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
	if (num1 === num2)
		return 1;
	let queue = [[num1,0]];
	while(queue.length > 0){
		let [num,cnt] = queue.shift();
		let next1 = num * 2;
		if (next1 === num2)
			return cnt + 2;
		else if (next1 < num2)
			queue.push([next1, cnt+1]);
		let next2 = num * 10 + 1;
		if (next2 === num2)
			return cnt + 2;
		else if (next2 < num2)
			queue.push([next2, cnt + 1]);
	}
	return -1;
}