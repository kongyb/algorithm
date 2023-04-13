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
	solution(input, cnt);
	process.exit();
});

function solution(arr, len){
	let sortedArr = [];
	let sortedLen = 0;
	let result='';
	for (let i=0; i<len; i++){
		let num = Number(arr[i]);
		if (sortedLen === 0)
			sortedArr.push(num);
		else{
			if (sortedArr[0] >= num)
				sortedArr.unshift(num);
			else if (sortedArr[sortedLen - 1] <= num)
				sortedArr.push(num);
			else {
				let start = 0;
				let end = sortedLen;
				while (start < end){
					let mid = Math.floor((start + end) / 2);
					if (num < sortedArr[mid])
						end = mid;
					else if (num > sortedArr[mid])
						start = mid + 1;
					else {
						start = mid;
						break;
					}
				}
				sortedArr.splice(start, 0, num);
			}
		}
		sortedLen++;
		result += sortedArr[Math.floor((sortedLen - 1) / 2)] + '\n';
	}
	console.log(result);
}