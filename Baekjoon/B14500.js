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
	let [h, w] = input[0].split(' ').map(el => Number(el));
	let board = [];
	for (let i=1; i<=h; i++)
		board.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(board, h, w));
	process.exit();
});

function solution(board, h, w){
	let result = 0;
	for (let i=0; i<h; i++){
		for (let j=0; j<w; j++){
			let max = 0;
			if (i < h-2)
				max = Math.max(max, verticalThree(board, h, w, i, j));
			if (j < w-2)
				max = Math.max(max, horizontalThree(board, h, w, i, j));
			if (i < h-1 )
				max = Math.max(max, verticalTwo(board, h, w, i, j));
			if (j < w-1)
				max = Math.max(max, horizontalTwo(board, h, w, i, j));
			result = Math.max(max, result);
		}
	}
	return result;
}

function verticalThree(board, h, w, i, j){
	let base = board[i][j] + board[i+1][j] + board[i+2][j];
	let dir = [[-1,0], [3,0], [0,-1], [0,1], [1,-1], [1,1], [2,-1], [2,1]];
	let max = 0;
	for (const [moveY, moveX] of dir){
		let [lastY, lastX] = [moveY + i, moveX + j];
		if (lastY < 0 || lastY >= h || lastX < 0 || lastX >= w)
			continue;
		max = board[lastY][lastX] > max ? board[lastY][lastX] : max;
	}
	return base + max;
}

function horizontalThree(board, h, w, i, j){
	let base = board[i][j] + board[i][j+1] + board[i][j+2];
	let dir = [[0,-1], [0,3], [-1,0], [1,0], [-1,1], [1,1], [-1,2], [1,2]];
	let max = 0
	for (const [moveY, moveX] of dir){
		let [lastY, lastX] = [moveY + i, moveX + j];
		if (lastY < 0 || lastY >= h || lastX < 0 || lastX >= w)
			continue;
		max = board[lastY][lastX] > max ? board[lastY][lastX] : max;
	}
	return base + max;
}

function verticalTwo(board, h, w, i, j){
	let base = board[i][j] + board[i+1][j];
	let dir = [[-1,-1], [-1,1], [1,-1], [1,1]];
	let max = 0;
	for (const [topMove, botMove] of dir){
		let [topX, botX] = [topMove + j, botMove + j];
		if (topX < 0 || topX >= w || botX < 0 || botX >= w)
			continue;
		max = Math.max(max, board[i][topX] + board[i+1][botX]);
	}
	return base + max;
}

function horizontalTwo(board, h, w, i, j){
	let base = board[i][j] + board[i][j+1];
	let dir = [[-1,-1], [-1,1], [1,-1], [1,1]];
	let max = 0;
	for (const [leftMove, rightMove] of dir){
		let [leftY, rightY] = [leftMove + i, rightMove + i];
		if (leftY < 0 || leftY >= h || rightY < 0 || rightY >= h)
			continue;
		max = Math.max(max, board[leftY][j] + board[rightY][j+1]);
	}
	return base + max;
}