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
	let cnt = Number(input.shift());
	for (let i=0; i<cnt; i++)
	console.log(solution(Number(input.shift())).join(' '));
	process.exit();
});

function solution(num){
	let zeroArr=[1,0];
	let oneArr=[0,1];
	let len=2;
	while (len-1 < num){
		zeroArr.push(zeroArr[len-1]+zeroArr[len-2]);
		oneArr.push(oneArr[len-1] + oneArr[len-2]);
		len++;		
	}
	return [zeroArr[num], oneArr[num]];
}