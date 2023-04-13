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
	if (N < 2 || M < 2)
		return 0;
	let isChecked = [];
	for (let i=0; i<N; i++)
		isChecked.push(new Array(M).fill(0));
	return makeWeapon(board, N, M, isChecked, 0, 0);
}

function makeWeapon(board, N, M, isChecked, y, x){
	if (x === M)
		return makeWeapon(board, N, M, isChecked, y+1, 0);
	if (y === N)
		return 0;
	let dirs = [[1,0], [0,1], [-1,0], [0,-1]];
	if (isChecked[y][x] === 1)
		return makeWeapon(board, N, M, isChecked, y, x+1);
	let max = 0;
	isChecked[y][x] = 1;
	for (let i=0; i<4; i++){
		let [nextY1, nextX1] = [y+dirs[i][0], x+dirs[i][1]];
		let [nextY2, nextX2] = [y+dirs[(i+1)%4][0], x+dirs[(i+1)%4][1]];
		if (nextY1 < 0 || nextY1 >= N || nextX1 < 0 || nextX1 >= M || isChecked[nextY1][nextX1] === 1)
			continue;
		if (nextY2 < 0 || nextY2 >= N || nextX2 < 0 || nextX2 >= M || isChecked[nextY2][nextX2] === 1)
			continue;
		let sum = board[nextY1][nextX1] + board[nextY2][nextX2] + board[y][x] * 2;
		isChecked[nextY1][nextX1] = 1;
		isChecked[nextY2][nextX2] = 1;
		sum += makeWeapon(board, N, M, isChecked, y, x+1);
		max = Math.max(max, sum);
		isChecked[nextY1][nextX1] = 0;
		isChecked[nextY2][nextX2] = 0;
	}
	isChecked[y][x] = 0;
	max = Math.max(makeWeapon(board, N, M, isChecked, y, x+1), max);
	return max;
}