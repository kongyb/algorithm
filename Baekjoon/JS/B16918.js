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
	let [height, width, time] = input.shift().split(' ').map(el => Number(el));
	let matrix = [];
	for(let i=0; i<height; i++){
		let line=[];
		for (const char of input[i])
			line.push(char === '.' ? -1 : 0);
		matrix.push(line);
	}
	let answer = solution(matrix, height, width, time);
	for (const line of answer)
		console.log(line.map(el => el === -1 ? '.' : 'O').join(''));
	process.exit();
});
// 가장 처음에 봄버맨은 일부 칸에 폭탄을 설치해 놓는다. 모든 폭탄이 설치된 시간은 같다.
// 다음 1초 동안 봄버맨은 아무것도 하지 않는다.
// 다음 1초 동안 폭탄이 설치되어 있지 않은 모든 칸에 폭탄을 설치한다. 즉, 모든 칸은 폭탄을 가지고 있게 된다. 폭탄은 모두 동시에 설치했다고 가정한다.
// 1초가 지난 후에 3초 전에 설치된 폭탄이 모두 폭발한다.
// 3과 4를 반복한다.

function solution(matrix, height, width, time){
	let mytime=1;
	let dirs = [[1,0],[-1,0],[0,1],[0,-1]];
	while (mytime < time){
		mytime++;
		for (let i=0; i<height; i++){
			for (let j=0; j<width; j++){
				if (matrix[i][j] === mytime % 3){
					matrix[i][j] = -1;
					for (const dir of dirs){
						let [nextI, nextJ] = [i+dir[0], j+dir[1]];
						if (nextI < 0 || nextI >= height || nextJ < 0 || nextJ >= width)
							continue;
						if (matrix[nextI][nextJ] !== mytime % 3)
							matrix[nextI][nextJ] = -1;
					}
				}
			}
		}
		if (mytime % 2 === 0){
			for (let i=0; i<height; i++){
				for (let j=0; j<width; j++){
					if (matrix[i][j] === -1)
						matrix[i][j] = mytime % 3;
				}
			}
		}
	}
	return matrix;
}