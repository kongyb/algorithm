function solution(grid) {
    let height = grid.length;
	let width = grid[0].length;

	let map = [];
	for (let i=0; i<height; i++){
		let temp = [];
		for (let j=0; j<width; j++){
			temp.push(new Array(4).fill(false));
		}
		map.push(temp);
	}
	let lens = [];
	for (let i=0; i<height; i++){
		for (let j=0; j<width; j++){
			for (let k=0; k<4; k++){
				if (!map[i][j][k]){
					lens.push(findCycle(i, j, k, map, grid));
				}
			}
		}
	}
	return lens;
}

function findCycle(row, col, dir, map, grid){
	let currR = row;
	let currC = col;
	let currD = dir;
	let dirs = [[-1,0],[0,1],[1,0],[0,-1]];
	let len = 0;
	do{
		map[currR][currC][currD] = true;
		let [nextY, nextX] = [currR + dirs[currD][0], currC + dirs[currD][1]];
		if (nextY === -1)
			nextY += map.length;
		if (nextY === map.length)
			nextY = 0;
		if (nextX === map[0].length)
			nextX = 0;
		if (nextX === -1)
			nextX += map[0].length;
		currR = nextY;
		currC = nextX;
		if (grid[currR][currC] === 'R')
			currD = (currD === 3) ? currD - 3 : currD + 1;
		if (grid[currR][currC] === 'L')
			currD = (currD === 0) ? currD + 3 : currD - 1;
		len++;
		console.log('len: '+len);
		console.log([currR, currC, currD]);
		console.log([row, col, dir]);
	}while (currR !== row || currC !== col || currD !== dir);
	return len;
}
