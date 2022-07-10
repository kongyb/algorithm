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
	let [N, L, R] = input[0].split(' ').map(el => Number(el));
	let map = [];
	for (let i=1; i<=N; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(map, N, L, R));
	process.exit();
});

function solution(map, N, L, R){
	let time = 0;
	while (true){
		let groups = makeGroups(map, N, L, R);
		if (groups.length === 0)
			break;
		for (const group of groups)
			move(map, group);
		time++;
	}
	return time;
}

function makeGroups(board, N, L, R){
	let isChecked = [];
	let groups = [];
	for (let i=0; i<N; i++)
		isChecked.push(new Array(N).fill(0));
	for (let i=0; i<N; i++){
		for (let j=0; j<N; j++){
			if (isChecked[i][j] === 0){
				isChecked[i][j] = 1;
				let group = bfs(board, N, L, R, [i, j], isChecked);
				if (group.length > 1)
					groups.push(group);
			}
		}
	}
	return groups;
}

function bfs(board, N, L, R, start, isChecked){
	let queue = [start];
	let head = 0;
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	while (head < queue.length){
		let curr = queue[head];
		for (const dir of dirs){
			let [nextY, nextX] = [curr[0] + dir[0], curr[1] + dir[1]];
			if (nextY < 0 || nextY >= N || nextX < 0 || nextX >= N || isChecked[nextY][nextX] === 1)
				continue;
			let abs = Math.abs(board[nextY][nextX] - board[curr[0]][curr[1]]);
			if (abs >= L && abs <= R){
				isChecked[nextY][nextX] = 1;
				queue.push([nextY, nextX]);
			}
		}
		head++;
	}
	return queue;
}

function move(board, group){
	let sum = group.reduce((acc, curr) => {
		let [y, x] = curr;
		return acc + board[y][x];
	},0);
	let avg = Math.floor(sum / group.length);
	group.forEach(el => {
		board[el[0]][el[1]] = avg;
	});
	return;
}