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
	let [M, N, H] = input[0].split(' ').map(el => Number(el));
	let box = [];
	let layer = [];
	for (let i = 1; i<= N*H; i++){
		layer.push(input[i].split(' ').map(el => Number(el)));
		if (i % N === 0){
			box.push(layer);
			layer = [];
		}
	}
	console.log(solution(box, M, N, H));
	process.exit();
});

function solution(box, M, N, H){
	let cnt = 0;
	let queue = [];
	let day = 0;
	for (let i=0; i<H; i++){
		for (let j=0; j<N; j++){
			for (let k=0; k<M; k++){
				if (box[i][j][k] === 0)
					cnt++;
				if (box[i][j][k] === 1)
					queue.push([k, j, i, 0]);
			}
		}
	}
	if (cnt === 0)
		return 0;
	let dirs = [[1,0,0], [-1,0,0], [0,1,0], [0,-1,0], [0,0,1], [0,0,-1]];
	let index = 0;
	while (index < queue.length){
		let [col, row, height, during] = queue[index];
		index++;
		day = Math.max(day, during);
		for (const dir of dirs){
			let [nextX, nextY, nextZ] = [col + dir[0], row + dir[1], height + dir[2]];
			if (nextX < 0 || nextX >= M || nextY < 0 || nextY >= N || nextZ < 0 || nextZ >= H)
				continue;
			if (box[nextZ][nextY][nextX] === 0){
				box[nextZ][nextY][nextX] = 1;
				cnt--;
				queue.push([nextX, nextY, nextZ, during + 1]);
			}
		}
	}
	return cnt === 0 ? day : -1;
}