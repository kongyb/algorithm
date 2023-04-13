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
	let board = new Array(num).fill(0);
	return fillBoard(board, 0);
}

function fillBoard(board, index){
	if (index === board.length)
		return 1;
	let cnt = 0;
	let avail = new Array(board.length).fill(1);
	for (let i=0; i<index; i++){
		avail[board[i]] = 0;
		if (board[i] - (index - i) >= 0)
			avail[board[i] - (index - i)] = 0;
		if (board[i] + (index - i) < board.length)
			avail[board[i] + (index - i)] = 0;
	}
	for (let i=0; i<avail.length; i++){
		if (avail[i] === 1){
			board[index] = i;
			cnt += fillBoard(board, index + 1);
		}
	}
	return cnt;
}