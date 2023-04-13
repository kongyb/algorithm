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
	let board = [];
	let len = Number(input[0]);
	for (let i=0; i<len; i++)
		board.push(new Array(len).fill(0));
	let appleCnt = Number(input[1]);
	for (let i=2; i<2+appleCnt; i++){
		let [row, col] = input[i].split(' ').map(el => Number(el) - 1);
		board[row][col] = 1;
	}
	let dirCnt = Number(input[2+appleCnt]);
	let dirChange = [];
	for (let i=3+appleCnt; i<3+appleCnt+dirCnt; i++){
		let temp = input[i].split(' ');
		temp[0] = Number(temp[0]);
		dirChange.push(temp);
	}
	console.log(solution(len, board, dirChange));
	process.exit();
});

function solution(len, board, dirChange){
	let isChecked = [];
	for (let i=0; i<len; i++)
		isChecked.push(new Array(len).fill(0));
	isChecked[0][0] = 1;
	let dirs = [[0,1], [1,0], [0,-1], [-1,0]];
	let dirIndex = 0;
	let time = 0;
	let queue = [[0,0]];
	let head = 0;
	let tail = 0;
	while (true){
		time++;
		let [nextY, nextX] = [queue[head][0] + dirs[dirIndex][0], queue[head][1] + dirs[dirIndex][1]];
		if (nextY >= len || nextY < 0 || nextX >= len || nextX < 0 || isChecked[nextY][nextX] === 1)
			return time;
		queue.push([nextY, nextX]);
		head++;
		isChecked[nextY][nextX] = 1;
		if (board[nextY][nextX] === 1)
			board[nextY][nextX] = 0;
		else{
			isChecked[queue[tail][0]][queue[tail][1]] = 0;
			tail++;
		}
		if (dirChange.length > 0 && time === dirChange[0][0]){
			let change = dirChange.shift();
			if (change[1] === 'L')
				dirIndex--;
			else
				dirIndex++;
			dirIndex = (dirIndex + 4) % 4;
		}
	}
}