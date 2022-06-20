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
	input.shift();
	let arr = input.shift().split(' ').map(el => Number(el));
	console.log(solution(arr));
	process.exit();
});

function solution(arr){
	let incArr = [arr[0]];
	let len = 1;
	for (let i=1; i<arr.length; i++){
		if (arr[i] > incArr[len-1]){
			incArr.push(arr[i]);
			len++;
		}
		else if (arr[i] <= incArr[0])
			incArr[0] = arr[i];
		else
			incArr[findIndex(incArr, arr[i])] = arr[i];
	}
	return len;
}
// num의 upperbound찾아서 교체 제일작은 경우, 제일 큰경우는 제외 
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