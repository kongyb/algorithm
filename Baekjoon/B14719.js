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
	let [H, W] = input[0].split(' ').map(el => Number(el));
	let arr = input[1].split(' ').map(el => Number(el));
	console.log(solution(H, W, arr));
	process.exit();
});

function solution(H, W, arr){
	let [left, right] = [0, W-1];
	let [maxL, maxR] = [arr[left], arr[right]];
	let sum = 0;
	while (left < right){
		maxL = Math.max(maxL, arr[left]);
		maxR = Math.max(maxR, arr[right]);
		if (maxL <= maxR){
			sum += maxL - arr[left];
			left++;
		}
		else{
			sum += maxR - arr[right];
			right--;
		}
	}
	return sum;
}