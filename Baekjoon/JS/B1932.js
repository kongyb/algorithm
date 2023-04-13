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
	let size = Number(input.shift());
	let triangle=[];
	for (let i=0; i<size; i++){
		let addArr=input.shift().split(' ').map(el => Number(el));
		triangle.push(addArr);
	}
	console.log(solution(triangle, size));
	process.exit();
});

function solution(triangle, size){
	for (let i=1; i<size; i++){
		for (let j=0; j<=i; j++){
			if (j === 0)
				triangle[i][j] += triangle[i-1][j];
			else if (j === i)
				triangle[i][j] += triangle[i-1][j-1];
			else
				triangle[i][j] += Math.max(triangle[i-1][j-1], triangle[i-1][j]);
		}
	}
	return Math.max(...triangle[size-1]);
}