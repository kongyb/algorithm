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
	let arr = input.shift().split(' ').map(el => Number(el));
	console.log(solution(len, arr));
	process.exit();
});

function solution(len, arr){
	let max = 0;
	for (let i=0; i<len; i++){
		let lenSum = LISlen(arr, i) + LDSlen(arr,i) - 1;
		max = max > lenSum ? max : lenSum;
	}
	return max;
}

function LISlen(arr, index){
	if (index === 0)
		return 1;
	let incArr = [];
	let len = 0;
	for (let i=0; i<index; i++){
		if (arr[i] >= arr[index])
			continue;
		if (len === 0){
			incArr.push(arr[i]);
			len++;
			continue;
		}
		if (arr[i] > incArr[len - 1]){
			incArr.push(arr[i]);
			len++;
		}
		else {
			incArr[findIndex(incArr, arr[i])] = arr[i];
		}
	}
	return len + 1;
}

function findIndex(arr, num){
	let start = 0;
	let end = arr.length;
	while (start < end){
		let mid = Math.floor((start + end) / 2);
		if (arr[mid] > num)
			end = mid;
		else if (arr[mid] < num)
			start = mid + 1;
		else 
			return mid;
	}
	return start;
}

function LDSlen(arr, index){
	if (index === arr.length - 1)
		return 1;
	let incArr = [];
	let len = 0;
	for (let i = arr.length - 1; i>index; i--){
		if (arr[i] >= arr[index])
			continue;
		if (len === 0){
			incArr.push(arr[i]);
			len++;
			continue;
		}
		if (arr[i] > incArr[len - 1]){
			incArr.push(arr[i]);
			len++;
		}
		else
			incArr[findIndex(incArr, arr[i])] = arr[i];
	}
	return len + 1;
}