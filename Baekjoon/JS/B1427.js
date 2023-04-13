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
	let num = Number(input[0]);
	console.log(solution(num));
	process.exit();
});

function addNum(arr, num){
	if(arr.length === 0 || arr[arr.length - 1] >= num){
		arr.push(num);
		return;
	}
	if (num >= arr[0]){
		arr.unshift(num);
		return;
	}
	let left = 0;
	let right = arr.length;
	while (left < right){
		let mid = Math.floor((left + right) / 2);
		if (arr[mid] < num)
			right = mid;
		else if (arr[mid] > num)
			left = mid + 1;
		else{
			left = mid;
			break;
		}
	}
	arr.splice(left, 0, num);
	return;
}

function solution(num){
	let arr = [];
	while (num > 0){
		addNum(arr, num % 10);
		num = parseInt(num / 10);
	}
	return arr.join('');
}