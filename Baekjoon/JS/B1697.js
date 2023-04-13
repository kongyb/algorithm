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
	let [start, target] = input[0].split(' ').map(el => Number(el));
	console.log(solution(start, target));
	process.exit();
});

function solution(start, target){
	let lenObj = {};
	lenObj[start] = 0;
	let queue = [];
	queue.push([start, 0]);
	while (queue.length > 0){
		if (lenObj[target] !== undefined)
			break;
		let [curr, cnt] = queue.shift();
		if (curr - 1 >= 0 && !lenObj[curr - 1]){
			lenObj[curr - 1] = cnt + 1;
			queue.push([curr - 1, cnt + 1]);
		}
		if (curr + 1 <= 100000 && !lenObj[curr + 1]){
			lenObj[curr + 1] = cnt + 1;
			queue.push([curr + 1, cnt + 1]);
		}
		if (curr * 2 <= 100000 && !lenObj[2 * curr]){
			lenObj[curr * 2] = cnt + 1;
			queue.push([curr * 2, cnt + 1]);
		}
	}
	return lenObj[target];
}