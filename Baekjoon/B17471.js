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
	let population = input[1].split(' ').map(el => Number(el));
	let pathObj = {}
	for (let i=0; i<N; i++){
		let paths = input[2 + i].split(' ').map(el => Number(el) - 1);
		pathObj[i] = paths.slice(1);
	}
	console.log(solution(N, population, pathObj));
	process.exit();
});

function solution(N, population, pathObj){
	let checkArr = new Array(N).fill(0);
	let result = [];
	dfs(checkArr, 0, population, pathObj, result);
	if (result.length === 0)
		return -1;
	return Math.min(...result);
}

function dfs(checkArr, index, population, pathObj, result){
	if (index === population.length){
		if (checkValid(checkArr, pathObj))
			result.push(calcPopulation(population, checkArr));
		return;
	}
	checkArr[index] = 1;
	dfs(checkArr, index + 1, population, pathObj, result);
	checkArr[index] = 0;
	dfs(checkArr, index + 1, population, pathObj, result);
	return;
}

function checkValid(checkArr, pathObj){
	let zeros = [];
	let ones = [];
	for (let i=0; i<checkArr.length; i++){
		if (checkArr[i] === 0)
		zeros.push(i);
		if (checkArr[i] === 1)
		ones.push(i);
	}
	if (zeros.length === 0 || ones.length === 0)
		return false;
	if (bfs(zeros, pathObj) && bfs(ones, pathObj))
		return true;
	return false;
}

function bfs(arr, pathObj){
	let isChecked = new Array(arr.length).fill(false);
	let queue = [arr[0]];
	isChecked[0] = true;
	while (queue.length > 0){
		let num = queue.shift();
		for (const next of pathObj[num]){
			let i = arr.indexOf(next);
			if (i !== -1 && !isChecked[i]){
				isChecked[i] = true;
				queue.push(next);
			}
		}
	}
	for (const bool of isChecked){
		if (!bool)
			return false;
	}
	return true;
}

function calcPopulation(population, checkArr){
	let sum0 = 0;
	let sum1 = 0;
	for (let i=0; i<checkArr.length; i++){
		if (checkArr[i] === 0)
			sum0 += population[i];
		if (checkArr[i] === 1)
			sum1 += population[i];
	}
	// console.log(checkArr, Math.abs(sum0 - sum1));
	return Math.abs(sum0 - sum1);
}

