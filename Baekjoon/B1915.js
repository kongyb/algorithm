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
		map.push(input[i].split('').map(el => Number(el)));
	console.log(solution(height, width, map));
	process.exit();
});

function solution(height, width, map){
	let max = 0;
	for (let i = 0; i<height; i++){
		for (let j=0; j<width; j++){
			if (map[i][j] === 0)
				continue;
			let left = j !== 0 ? map[i][j-1] : 0;
			let up = i !== 0 ? map[i-1][j] : 0;
			let diagonal = i !== 0 && j !== 0 ? map[i-1][j-1] : 0;
			map[i][j] += Math.min(left, up, diagonal);
			max = max < map[i][j] ? map[i][j] : max;
		}
	}
	return max * max;
}