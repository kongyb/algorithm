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
	let [N, M] = input[0].split(' ').map(el => Number(el));
	let prices = [];
	for (let i=1; i<=M; i++)
		prices.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, prices));
	process.exit();
});

function solution(N, prices){
	let lowerP = [1000, 1000];
	for (const [six, one] of prices){
		if (six < lowerP[0])
			lowerP[0] = six;
		if (one < lowerP[1])
			lowerP[1] = one;
	}
	let sum = 0;
	let q = Math.floor(N / 6);
	sum += q * Math.min(lowerP[0], lowerP[1] * 6);
	let mod = N % 6;
	sum += Math.min(lowerP[0], mod * lowerP[1]);
	return sum;
}