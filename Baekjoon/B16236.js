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
	let len = Number(input[0]);
	let map = [];
	for (let i=1; i<=len; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(map));
	process.exit();
});

function solution(map){
	let pos;
	for (let i=0; i<map.length; i++){
		for (let j=0; j<map.length; j++){
			if (map[i][j] === 9){
				pos = [i, j];
				break;
			}
		}
	}
	let size = 2;
	let exp = 0;
	let time = 0;
	let next = bfs(pos, size, map);
	while (next !== null){
		let [nextY, nextX, during] = next;
		exp++;
		if (size === exp){
			exp = 0;
			size++;
		}
		time += during;
		map[pos[0]][pos[1]] = 0;
		map[nextY][nextX] = 9;
		pos = [nextY, nextX];
		next = bfs(pos, size, map);
	}
	return time;
}

function bfs(pos, size, map){
	let moveCnt = 0;
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	let queue = [[...pos,0]];
	let isChecked = [];
	for (let i=0; i<map.length; i++)
		isChecked.push(new Array(map.length).fill(0));
	isChecked[pos[0]][pos[1]] = 1;
	while (queue.length > 0){
		let avail = [];
		while (queue.length > 0 && queue[0][2] === moveCnt){
			let [i, j, cnt] = queue.shift();
			for (const dir of dirs){
				let [nextY, nextX] = [i + dir[0], j + dir[1]];
				if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map.length)
					continue;
				if (map[nextY][nextX] > size || isChecked[nextY][nextX] === 1)
					continue;
				isChecked[nextY][nextX] = 1;
				queue.push([nextY, nextX, cnt + 1]);
				if (map[nextY][nextX] !== 0 && map[nextY][nextX] < size)
					avail.push([nextY,nextX]);
			}
		}
		moveCnt++;
		if (avail.length > 0){
			let index = 0;
			for (let i=1; i<avail.length; i++){
				if (avail[i][0] > avail[index][0])
					continue;
				else if (avail[i][0] < avail[index][0])
					index = i;
				else {
					if (avail[i][1] > avail[index][1])
						continue;
					else
						index = i;
				}
			}
			return [...avail[index], moveCnt];
		}
	}
	return null;
}