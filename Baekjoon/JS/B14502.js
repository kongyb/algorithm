const { BADFLAGS } = require('dns');
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
	let [height, width] = input[0].split(' ').map(el => Number(el));
	let map = [];
	for (let i=1; i<=height; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(height, width, map));
	process.exit();
});

function solution(height, width, map){
	let virus = [];
	let empty = [];
	let max = 0;
	for (let i=0; i<height; i++){
		for (let j=0; j<width; j++){
			if (map[i][j] === 0)
				empty.push([i,j]);
			if (map[i][j] === 2)
				virus.push([i,j]);
		}
	}
	let combinations = combination(empty, 3);
	for (const arr of combinations){
		for (const [row, col] of arr)
			map[row][col] = 1;
		let cnt = bfs(map, virus);
		max = cnt > max ? cnt : max;
		for (const [row, col] of arr)
			map[row][col] = 0;
	}
	return max;
}

function combination(arr, cnt){
	if (arr.length === cnt)
		return [arr];
	if (cnt === 1)
		return arr.map(el => [el]);
	let element = arr[0];
	return combination(arr.slice(1), cnt-1).map(el => [element, ...el]).concat(combination(arr.slice(1), cnt));
}

function bfs(map, virus){
	let height = map.length;
	let width = map[0].length;
	let queue = [];
	let isChecked = [];
	let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
	for (let i=0; i<height; i++)
		isChecked.push(new Array(width).fill(false));
	for (const [row, col] of virus){
		queue.push([row, col]);
		isChecked[row][col] = true;
	}
	while(queue.length > 0){
		let [y, x] = queue.shift();
		for (const dir of dirs){
			let [nextY, nextX] = [dir[0] + y, dir[1] + x];
			if (nextY < 0 || nextY >= height || nextX < 0 || nextX >= width)
				continue;
			if (map[nextY][nextX] === 0 && !isChecked[nextY][nextX]){
				isChecked[nextY][nextX] = true;
				queue.push([nextY, nextX]);
			}
		}
	}
	let cnt = 0;
	for (let i=0; i<height; i++){
		for (let j=0; j<width; j++){
			if (!isChecked[i][j] && map[i][j] === 0)
				cnt++;
		}
	}
	return cnt;
}