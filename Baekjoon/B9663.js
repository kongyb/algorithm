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
	let queens = new Array(num+1).fill(0);
	dfs(queens, 0, num);
	return queens[num];
}

function dfs(queens, index, num){
	if (index === num){
		queens[num]++;
		return;
	}
	let possibleCol = new Array(num).fill(1);
	for (let i=0; i<index; i++){
		possibleCol[queens[i]] = 0;
		if (queens[i] - (index - i) >= 0)
			possibleCol[queens[i] - (index - i)] = 0;
		if (queens[i] + (index - i) < num)
			possibleCol[queens[i] + (index - i)] = 0;
	}
	for (let i=0; i<num; i++){
		if (possibleCol[i] === 1){
			queens[index] = i;
			dfs(queens, index+1, num);
		}
	}
	return;
}