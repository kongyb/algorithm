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
	let [h, w, shiftH, shiftW] = input.shift().split(' ').map(el => Number(el));
	let matrix=[];
	for (let i=0; i<h+shiftH; i++)
		matrix.push(input[i].split(' ').map(el => Number(el)));
	solution(matrix, h, w, shiftH, shiftW);
	process.exit();
});

function solution(matrix, h, w, shiftH, shiftW){
	for (let i=0; i<h; i++){
		let temp=[];
		for (let j=0; j<w; j++){
			if (i < shiftH || j < shiftW)
				temp.push(matrix[i][j]);
			else {
				matrix[i][j] -= matrix[i-shiftH][j-shiftW];
				temp.push(matrix[i][j]);
			}
		}
		console.log(temp.join(' '));
	}
	return;
}

