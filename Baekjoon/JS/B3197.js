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
	for (let i=0; i<=height; i++)
		matrix.push(input[i].split(''));
	console.log(solution(matrix, height, width));
	process.exit();
});

// function solution(matrix, height, width){
// 	let isChecked = [];
// 	let day = 0;
// 	for (let i=0; i<height; i++)
// 		isChecked.push(new Array(width).fill(0));
// 	let swans = [];
// 	for (let i=0; i<height; i++){
// 		for (let j=0; j<width; j++){
// 			if (matrix[i][j] === 'L')
// 				swans.push([i, j]);
// 		}
// 	}
// 	isChecked[swans[0][0]][swans[0][1]] = 1;
// 	isChecked[swans[1][0]][swans[1][1]] = 2;

// }