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
	let [len, treeCnt, year] = input[0].split(' ').map(el => Number(el));
	let map = [];
	for (let i=1; i<=len; i++)
		map.push(input[i].split(' ').map(el => [5,Number(el)]));
	let trees = [];
	for (let i=len+1; i<=len+treeCnt; i++)
		trees.push(input[i].split(' ').map(el => Number(el)));
	trees.sort((a,b) => a[2] - b[2]);
	console.log(solution(map, trees, year));
	process.exit();
});

function solution(map, trees, year){
	for (let i=0; i<year; i++){
		SS(map, trees);
		trees = trees.filter(el => el[2] !== 0);
		trees = fall(map, trees).concat(trees);
		winter(map);
	}
	return trees.length;
}

function SS(map, trees){
	let plus = []
	for (let i=0; i<trees.length; i++){
		if (map[trees[i][0]-1][trees[i][1]-1][0] < trees[i][2]){
			plus.push([trees[i][0]-1, trees[i][1]-1, Math.floor(trees[i][2]/2)])
			trees[i][2] = 0;
		}
		else{
			map[trees[i][0]-1][trees[i][1]-1][0] -= trees[i][2];
			trees[i][2]++;
		}
	}
	if (plus.length > 0)
	for (let [row, col, amount] of plus)
		map[row][col][0] += amount;
	return;
}

function fall(map, trees){
	let newTrees = [];
	let len = map.length;
	let dirs = [[1,0],[1,1],[0,1],[-1,1],[-1,0],[-1,-1],[0,-1],[1,-1]];
	for (const [row, col, age] of trees){
		if (age % 5 === 0){
			for (const dir of dirs){
				let [newY, newX] = [dir[0] + row-1, dir[1] + col - 1];
				if (newY >= len || newX >= len || newY < 0 || newX < 0)
					continue;
				newTrees.push([newY+1, newX+1, 1]);
			}
		}
	}
	return newTrees;
}

function winter(map){
	let len = map.length;
	for (let i=0; i<len; i++){
		for (let j=0; j<len; j++)
			map[i][j][0] += map[i][j][1];
	}
	return;
}