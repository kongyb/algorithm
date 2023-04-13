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
	let arr = input[1].split(' ').map(el => Number(el));
	console.log(solution(N, arr));
	process.exit();
});

function solution(N, arr){
	let incArr = [arr[0]];
	let indexArr = [0];
	for (let i=1; i<N; i++){
		if (arr[i] > incArr[incArr.length - 1]){
			incArr.push(arr[i]);
			indexArr.push(incArr.length - 1);
			continue;
		}
		let index = findIndex(incArr, arr[i]);
		incArr[index] = arr[i];
		indexArr.push(index);
	}
	let target = incArr.length - 1
	for (let i=N-1; i>=0; i--){
		if (indexArr[i] === target){
			incArr[target] = arr[i];
			target--;
		}
	}
	console.log(incArr.length);
	return incArr.join(' ');
}

function findIndex(arr, num){
	let left = 0;
	let right = arr.length;
	while (left < right){
		let mid = Math.floor((left + right) / 2);
		if (arr[mid] < num)
			left = mid + 1;
		else if (arr[mid] > num)
			right = mid;
		else
			return mid;
	}
	return left;
}