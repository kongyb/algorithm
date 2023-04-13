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
	let len = Number(input.shift());
	let arr= input.shift().split(' ').map(el => Number(el));
	for (let i=1; i<len; i++){
		let addArr = input.shift().split(' ').map(el => Number(el));
		let temp = [...arr];
		arr[0] = addArr[0] + Math.min(temp[1], temp[2]);
		arr[1] = addArr[1] + Math.min(temp[0], temp[2]);
		arr[2] = addArr[2] + Math.min(temp[0], temp[1]);
	}
	console.log(Math.min(...arr));
	process.exit();
});