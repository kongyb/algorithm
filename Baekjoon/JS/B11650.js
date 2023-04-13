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
	let cnt = Number(input[0]);
	let points = [];
	for(let i=1; i<=cnt; i++){
		let point = input[i].split(' ').map(el => Number(el));
		points.push(point);
	}
	process.exit();
});