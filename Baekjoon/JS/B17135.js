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
	let [N, M, range] = input[0].split(' ').map(el => Number(el));
	let board = [];
	for (let i=1; i<=N; i++)
		board.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(board, N, M, range));
	process.exit();
});

function solution(board, N, M, range){
	let arr = [];
	for (let i=0; i<M; i++)
		arr.push(i);
	let combArr = combination(arr, 3);
	let max = 0;
	for (const pos of combArr)
		max = Math.max(archorGame(board.map(el => [...el]), pos, N, M, range), max);
	return max;
}

function combination(arr, cnt){
	if (cnt === 1)
		return arr.map(el => [el]);
	if (arr.length === cnt)
		return [arr];
	let temp1 = combination(arr.slice(1), cnt - 1);
	let temp2 = combination(arr.slice(1), cnt);
	return temp1.map(el => [arr[0],...el]).concat(temp2);
}

function archorGame(board, pos, N, M, range){
	let result = 0;
	let archorRow = N - 1;
	while (archorRow >= 0){
		let remove = [];
		for (const col of pos){
			let enemy = searchRange(board, archorRow, col, range);
			if (enemy[0] === -1)
				continue;
			remove.push(enemy);
		}
		for (const [enemyRow, enemyCol] of remove){
			if (board[enemyRow][enemyCol] === 1){
				result++;
				board[enemyRow][enemyCol] = 0;
			}
		}
		archorRow--;
	}
	return result;
}

function searchRange(board, y, x, range){
	if (board[y][x] === 1)
		return [y,x];
	for (let i=1; i<range; i++){
		let cursor = [y+1, x-i-1];
		while (cursor[1] < x + i){
			cursor[0] += cursor[1] < x ? -1 : 1
			cursor[1]++;
			if (cursor[0] < 0 || cursor[1] < 0 || cursor[1] >= board[0].length)
				continue;
			if (board[cursor[0]][cursor[1]] === 1)
				return cursor;
		}
	}
	return [-1,-1];
}