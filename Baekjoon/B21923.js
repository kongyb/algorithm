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
	let [N, M] = input[0].split(' ').map(el => Number(el));
	let board = [];
	for (let i=1; i<=N; i++)
		board.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, M, board));
	process.exit();
});

function solution(N, M, board){
	let fromStart = [];
	let fromEnd = [];
	for (let i=0; i<N; i++){
		fromStart.push(new Array(M).fill(0));
		fromEnd.push(new Array(M).fill(0));
	}

	fromStart[N-1][0] = board[N-1][0];
	fromEnd[N-1][M-1] = board[N-1][M-1];
	for (let i=1; i<M; i++){
		fromStart[N-1][i] = fromStart[N-1][i-1] + board[N-1][i];
		fromEnd[N-1][M-1-i] = fromEnd[N-1][M-i] + board[N-1][M-1-i];
	}
	for (let i=N-2; i>=0; i--){
		fromStart[i][0] = fromStart[i+1][0] + board[i][0];
		fromEnd[i][M-1] = fromEnd[i+1][M-1] + board[i][M-1];
	}

	for (let i=N-2; i>=0; i--){
		for (let j=1; j<M; j++)
			fromStart[i][j] = Math.max(fromStart[i+1][j], fromStart[i][j-1]) + board[i][j];
	}
	for(let i=N-2; i>=0; i--){
		for (let j=M-2; j>=0; j--)
			fromEnd[i][j] = Math.max(fromEnd[i+1][j], fromEnd[i][j+1]) + board[i][j];
	}

	let max = Number.MIN_SAFE_INTEGER;
	for (let i=0; i<N; i++){
		for (let j=0; j<M; j++){
			max = Math.max(fromStart[i][j] + fromEnd[i][j], max);
		}
	}
	return max;
}