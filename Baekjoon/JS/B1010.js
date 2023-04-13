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
	let pascal = [];
	for (let i = 0; i<30; i++){
		let temp = new Array(i+1).fill(1);
		for (let j=1; j<i; j++)
			temp[j] = pascal[i-1][j-1] + pascal[i-1][j];
		pascal.push(temp);
	}
	let cnt = Number(input[0]);
	for (let i=1; i<=cnt; i++){
		let [col, row] = input[i].split(' ').map(el => Number(el));
		console.log(pascal[row][col]);
	}
	process.exit();
});