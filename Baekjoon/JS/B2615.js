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
	let map = input.map(el => el.split(' ').map(num => Number(num)));
	console.log(solution(map));
	process.exit();
});

function solution(map){
	let result = [];
	for (let i=0; i<19; i++){
		for (let j=0; j<19; j++){
			if(map[i][j] !== 0 && check(i,j,map,map[i][j]))
				result.push([i,j]);
		}
	}
	if (result.length === 0)
		return 0;
	result.sort((a,b) => {
		if (a[1] !== b[1])
			return a[1] - b[1];
		return a[0] - b[0];
	})
	let [i,j] = result[0];
	return `${map[i][j]}\n${i+1} ${j+1}`;
}

function check(i, j, map, color){
	let dirs = [[1,0],[0,1],[1,1],[-1,1]];
	for (const dir of dirs){
		let cnt = 1;
		let [nextY, nextX] = [i+dir[0],j+dir[1]];
		while(inBoard(nextY, nextX) && map[nextY][nextX] === color){
			cnt++;
			nextY+=dir[0];
			nextX+=dir[1];
		}
		if (cnt === 5){
			let [checkI, checkJ] = [i-dir[0], j-dir[1]];
			if((inBoard(checkI, checkJ) && map[checkI][checkJ] !== color) || !inBoard(checkI, checkJ))
				return true;
		}
	}
	return false;
}

function inBoard(row, col){
	return row >= 0 && row < 19 && col >= 0 && col < 19;
}