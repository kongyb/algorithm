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
	let favorite = [];
	for (let i=1; i<=N*N; i++)
		favorite.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, favorite));
	process.exit();
});

function solution(N, favorite){
	let room = [];
	for (let i=0; i<N; i++)
		room.push(new Array(N).fill(0));
	for (let [num, ...arr] of favorite){
		let pos = findPos(N, room, arr);
		room[pos[0]][pos[1]] = num;
	}
	let sum = 0;
	favorite.sort((a,b) => a[0] - b[0]);
	score = [0,1,10,100,1000]
	for (let i=0; i<N; i++){
		for (let j=0; j<N; j++)
			sum += score[satisfaction(room, i, j, favorite)];
	}
	return sum;
}

function findPos(N, room, like){
	let max = 0;
	let candidate = [];
	let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
	for (let i=0; i<N; i++){
		for (let j=0; j<N; j++){
			if (room[i][j] !== 0)
				continue;
			let info = [0,0];
			for (const dir of dirs){
				let [nextY, nextX] = [i+dir[0], j+dir[1]];
				if (nextY < 0 || nextY >= N || nextX < 0 || nextX >=N)
					continue;
				if (room[nextY][nextX] === 0)
					info[1]++;
				if (like.includes(room[nextY][nextX]))
					info[0]++;
			}
			if (info[0] > max){
				candidate = [];
				max = info[0];
			}
			if (info[0] === max)
				candidate.push([i,j,info[1]]);
		}
	}
	candidate.sort((a,b) => {
		if (a[2] < b[2])
			return 1;
		else if (a[2] > b[2])
			return -1;
		else {
			if (a[0] < b[0])
				return -1;
			else if (a[0] > b[0])
				return 1;
			else {
				if (a[1] < b[1])
					return -1;
				else
					return 1;
			}
		}
	})
	return candidate[0];
}

function satisfaction(room, i, j, favorite){
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	let like = favorite[room[i][j] - 1];
	let cnt = 0;
	for (const dir of dirs){
		let [nextY, nextX] = [i+dir[0], j+dir[1]];
		if (nextY < 0 || nextY >= room.length || nextX < 0 || nextX >= room.length)
			continue;
		if (like.includes(room[nextY][nextX]))
			cnt++;
	}
	return cnt;
}