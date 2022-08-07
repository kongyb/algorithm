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
	let [height, width, y, x, cnt] = input[0].split(' ').map(el => Number(el));
	let map = [];
	for (let i=1; i<=height; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	let cmd = input[height + 1].split(' ').map(el => Number(el));
	console.log(solution(map, y, x, cmd));
	process.exit();
});

function solution(map, y, x, cmd){
	let dice = new Dice(y,x,map);
	let result = [];
	for (const dir of cmd){
		if (dice.inBoard(dir))
			result.push(dice.move(dir));
	}
	return result.join('\n');
}

class Dice{
	constructor(y,x,map){
		this.y = y;
		this.x = x;
		this.maxY = map.length;
		this.maxX = map[0].length;
		this.map = map;
		this.top = 0;
		this.bottom = 0;
		this.north = 0;
		this.south = 0;
		this.east = 0;
		this.west = 0;
	}
	
	inBoard(dir){
		let dirs = [[0,1],[0,-1],[-1,0],[1,0]];
		let [nextY, nextX] = [this.y+dirs[dir-1][0], this.x+dirs[dir-1][1]];
		return (nextY >= 0 && nextY < this.maxY) && (nextX >= 0 && nextX < this.maxX);
	}

	move(dir){
		let dirs = [[0,1],[0,-1],[-1,0],[1,0]];
		[this.y, this.x] = [this.y+dirs[dir-1][0], this.x+dirs[dir-1][1]];
		if (dir === 1)
			[this.top, this.east, this.bottom, this.west] = [this.west, this.top, this.east, this.bottom];
		if (dir === 2)
			[this.top, this.east, this.bottom, this.west] = [this.east, this.bottom, this.west, this.top];
		if (dir === 3)
			[this.top, this.south, this.bottom, this.north] = [this.south, this.bottom, this.north, this.top];
		if (dir === 4)
			[this.top, this.south, this.bottom, this.north] = [this.north, this.top, this.south, this.bottom,];
		// 이동한 칸에 쓰여 있는 수가 0이면, 주사위의 바닥면에 쓰여 있는 수가 칸에 복사된다. 
		// 0이 아닌 경우에는 칸에 쓰여 있는 수가 주사위의 바닥면으로 복사되며, 칸에 쓰여 있는 수는 0이 된다.
		if (this.map[this.y][this.x] === 0){
			this.map[this.y][this.x] = this.bottom;
			// this.bottom = 0;
		}
		else{
			this.bottom = this.map[this.y][this.x];
			this.map[this.y][this.x] = 0;
		}
		return this.top;
	}
}