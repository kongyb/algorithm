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
	let matrix = [];
	for (let i=1; i<=height; i++){
		let lineA = input[i].split('').map(el => Number(el));
		let lineB = input[i + height].split('').map(el => Number(el));
		let temp = [];
		for (let j=0; j<width; j++)
			temp.push(lineA[j] === lineB[j] ? 0 : 1);
		matrix.push(temp);
	}
	console.log(solution(height, width, matrix));
	process.exit();
});

function solution(height, width, matrix){
	let cnt = 0;
	let i;
	for (i=0; i < height - 2; i++){
		let j;
		for (j=0; j < width - 2; j++){
			if (matrix[i][j] === 1){
				changeMatrix(matrix, i, j);
				cnt++;
			}
		}
		while (j < width){
			if (matrix[i][j] === 1)
				return -1;
			j++;
		}
	}
	while (i < height){
		for (let j=0; j<width; j++){
			if (matrix[i][j] === 1)
				return -1;
		}
		i++;
	}
	return cnt;
}

function changeMatrix(matrix, row, col){
	for (let i=row; i<row + 3; i++){
		for (let j=col; j<col + 3; j++)
			matrix[i][j] = matrix[i][j] === 1 ? 0 : 1;
	}
	return;
}