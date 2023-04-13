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
		map.push(input[i].split('').map(el => Number(el)));
	console.log(solution(map, len));
	process.exit();
});

function solution(map, len){
	let isChecked = [];
	let cnt = 0;
	let nums = [];
	for (let i=0; i<len; i++)
		isChecked.push(new Array(len).fill(0));
	for (let i=0; i<len; i++){
		for (let j=0; j<len; j++){
			if (map[i][j] === 1 && isChecked[i][j] === 0){
				nums.push(bfs(i, j, map, isChecked));
				cnt++;
			}
		}
	}
	nums.sort((a,b) => a - b);
	nums.unshift(cnt);
	return nums.join('\n');
}

function bfs(y, x, map, isChecked){
	let queue=[[y,x]];
	isChecked[y][x] = 1;
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	let cnt = 0;
	while (queue.length > 0){
		let point = queue.shift();
		cnt++;
		for (const dir of dirs){
			let [nextY, nextX] = [point[0] + dir[0], point[1] + dir[1]];
			if (nextY < 0 || nextY >= map.length || nextX < 0 || nextX >= map.length)
				continue;
			if (map[nextY][nextX] === 1 && isChecked[nextY][nextX] === 0){
				isChecked[nextY][nextX] = 1;
				queue.push([nextY, nextX]);
			}
		}
	}
	return cnt;
}