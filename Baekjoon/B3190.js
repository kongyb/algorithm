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
	let N = Number(input[0]);
	let appleCnt = Number(input[1]);
	let map = [];
	for (let i=0; i<N; i++)
		map.push(new Array(N).fill(0));
	for (let i=0; i<appleCnt; i++){
		let [row, col] = input[2 + i].split(' ').map(el => Number(el));
		map[row - 1][col - 1] = 1;
	}
	let turnCnt = Number(input[2 + appleCnt]);
	let turnTime = [];
	for (let i=0; i<turnCnt; i++){
		let [time, dir] = input[3 + appleCnt + i].split(' ');
		turnTime.push([Number(time), dir]);
	}
	console.log(solution(map, turnTime));
	process.exit();
});

function solution(map, turnTime){
	let isChecked = [];
	for (let i=0; i<map.length; i++)
		isChecked.push(new Array(map.length).fill(0));
	isChecked[0][0] = 1;
	let snake = [[0,0]];
	let dirs = [[0,1],[1,0],[0,-1],[-1,0]]
	let dirPointer = 0;
	let time = 0;
	let turnIndex = 0;
	while (true){
		time++;
		let dir = dirs[dirPointer];
		let [curY, curX] = snake[snake.length - 1];
		let [nextY, nextX] = [curY + dir[0], curX + dir[1]];
		if (isOut(nextY, nextX, map.length) || isChecked[nextY][nextX] === 1)
			break;
		isChecked[nextY][nextX] = 1;
		snake.push([nextY, nextX]);
		if (map[nextY][nextX] !== 1){
			let tail = snake.shift();
			isChecked[tail[0]][tail[1]] = 0;
		}
		else 
			map[nextY][nextX] = 0;
		if (turnIndex < turnTime.length && time === turnTime[turnIndex][0]){
			if (turnTime[turnIndex][1] === 'L')
				dirPointer = (dirPointer + 3) % 4
			else
				dirPointer = (dirPointer + 1) % 4;
			turnIndex++;
		}
	}
	return time;
}

function isOut(row, col, len){
	return (row < 0 || row >= len || col < 0 || col >= len)
}