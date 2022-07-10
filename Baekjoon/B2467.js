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
	let left = 0;
	let right = N-1;
	let sum = Math.abs(arr[right] + arr[left]);
	let result = [arr[left], arr[right]];
	while (left < right){
		let temp = arr[left] + arr[right];
		if (Math.abs(temp) < sum){
			sum = Math.abs(temp);
			result[0] = arr[left];
			result[1] = arr[right];
		}
		if (sum === 0)
			break;
		if (temp < 0)
			left++;
		else
			right--;
	}
	return result.join(' ');
}