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
	let N = Number(input[0]);
	let planes = input[1].split(' ').map(el => Number(el));
	console.log(solution(N, planes));
	process.exit();
});

function solution(N, planes){
	if (N === 1){
		let max = Math.max(...planes);
		return planes.reduce((acc, curr) => acc + curr) - max;
	}
	let min1Plane = Math.min(...planes);
	let min2Plane = minSumTwoPlanes(planes);
	let min3Plane = minSumThreePlanes(planes);
	let sum = ((N - 2) * (N - 2) + 4 * (N - 2) * (N - 1)) * min1Plane;
	sum += ((N - 2) * 4 + (N - 1) * 4) * min2Plane;
	sum += 4 * min3Plane;
	return sum;
}

function minSumTwoPlanes(planes){
	let arr = [[0,1],[0,2],[0,3],[0,4],[1,5],[2,5],[3,5],[4,5],[1,2],[1,3],[2,4],[3,4]];
	let min = Number.MAX_SAFE_INTEGER;
	for (const [i, j] of arr)
		min = min < planes[i] + planes[j] ? min : planes[i] + planes[j]
	return min;
}

function minSumThreePlanes(planes){
	let arr = [[0,1,2], [0,1,3], [0,2,4], [0,3,4], [1,2,5], [1,3,5], [2,4,5], [3,4,5]];
	let min = Number.MAX_SAFE_INTEGER;
	for (const [i, j, k] of arr)
		min = min < planes[i] + planes[j] + planes[k] ? min : planes[i] + planes[j] + planes[k];
	return min;
}