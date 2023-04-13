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
	let distMap = [];
	for (let i=1; i<=N; i++)
		distMap.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, distMap));
	process.exit();
});

function solution(N, distMap){
	let queue = [];
	for (let i=0; i<N; i++){
		let isChecked = new Array(N).fill(0);
		isChecked[i] = 1;
		queue.push([[i], isChecked, 0]);
	}
	let min = Number.MAX_SAFE_INTEGER;
	let index = 0;
	while (index < queue.length){
		let [path, isChecked, sum] = queue[index];
		if (path.length === N && distMap[path[path.length - 1]][path[0]] !== 0){
			sum += distMap[path[path.length - 1]][path[0]];
			min = min > sum ? sum : min;
		}
		else {
			let prev = path[path.length - 1];
			for (let i=0; i<N; i++){
				if (isChecked[i] === 0 && distMap[prev][i] !== 0){
					let isChecked2 = [...isChecked];
					isChecked2[i] = 1;
					queue.push([[...path, i], isChecked2, sum + distMap[prev][i]]);
				}
			}
		}
		index++;
	}
	return min;
}

// function solution(N, distMap){
// 	let path = new Array(N).fill(0);
// 	let isChecked = new Array(N).fill(0);
// 	let min = Number.MAX_SAFE_INTEGER;
// 	for (let i=0; i<N; i++){
// 		isChecked[i] = 1;
// 		path[0] = i;
// 		let temp = findPath(path, isChecked, 1, distMap);
// 		min = temp < min ? temp : min;
// 		isChecked[i] = 0;
// 	}
// 	return min;
// }

// function findPath(path, isChecked, index, distMap){
// 	if (index === path.length)
// 		return calcSum(path, distMap);
// 	let prev = path[index - 1];
// 	let min = Number.MAX_SAFE_INTEGER;
// 	for (let i=0; i<path.length; i++){
// 		if (isChecked[i] === 0 && distMap[prev][i] !== 0){
// 			isChecked[i] = 1;
// 			path[index] = i;
// 			let temp = findPath(path, isChecked, index + 1, distMap);
// 			isChecked[i] = 0;
// 			min = temp < min ? temp : min;
// 		}
// 	}
// 	return min;
// }

// function calcSum(path, distMap){
// 	if (distMap[path[path.length - 1]][path[0]] === 0)
// 		return Number.MAX_SAFE_INTEGER;
// 	let sum = distMap[path[path.length - 1]][path[0]];
// 	for (let i=1; i<path.length; i++)
// 		sum += distMap[path[i - 1]][path[i]];
// 	return sum;
// }