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
	let testCnt = Number(input[0]);
	let rowNum = 1;
	for (let i=0; i<testCnt; i++){
		let [width, height, cnt] = input[rowNum].split(' ').map(el => Number(el));
		rowNum++;
		let map = [];
		for (let i=0; i<height; i++)
			map.push(new Array(width).fill(0));
		for (let j=0; j<cnt; j++){
			let [col, row] = input[rowNum + j].split(' ').map(el => Number(el));
			map[row][col] = 1;
		}
		console.log(solution(height, width, map));
		rowNum += cnt;
	}
	process.exit();
});

function solution(height, width, map){
	let isChecked = [];
	for (let i=0; i<height; i++)
		isChecked.push(new Array(width).fill(false));
	let cnt = 0;
	for (let i=0; i<height; i++){
		for (let j=0; j<width; j++){
			if (map[i][j] === 1 && !isChecked[i][j]){
				cnt++;
				bfs(i, j, isChecked, map);
			}
		}
	}
	return cnt;
}

function bfs(row, col, isChecked, map){
	let queue = [[row, col]];
	isChecked[row][col] = true;
	let dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];
	while (queue.length > 0){
		let [y,x] = queue.shift();
		for (const dir of dirs){
			let [nextY, nextX] = [y + dir[0], x + dir[1]];
			if (nextY < 0 || nextX < 0 || nextY >= map.length || nextX >= map[0].length)
				continue;
			if (map[nextY][nextX] === 1 && !isChecked[nextY][nextX]){
				isChecked[nextY][nextX] = true;
				queue.push([nextY, nextX]);
			}
		}
	}
	return;
}