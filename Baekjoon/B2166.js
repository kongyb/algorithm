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
	for (let i=1; i<=cnt; i++)
		points.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(points).toFixed(1));
	process.exit();
});

function solution(points){
	points.push(points[0]);
	let sum1 = 0;
	let sum2 = 0;
	for (let i=0; i<points.length; i++){
		if (i > 0)
			sum2 += points[i][0] * points[i-1][1];
		if (i < points.length - 1)
			sum1 += points[i][0] * points[i+1][1];
	}
	let [max, min] = [Math.max(sum1, sum2), Math.min(sum1, sum2)];
	return (max-min)/2;
}