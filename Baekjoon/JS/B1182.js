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
	let [len, target] = input[0].split(' ').map(el => Number(el));
	let arr = input[1].split(' ').map(el => Number(el));
	console.log(solution(arr, target, len));
	process.exit();
});

function solution(arr, target, len){
	let presentArr = new Array(len+1).fill(0);
	recur(presentArr, arr, target, 0);
	return presentArr[len];
}

function recur(presentArr, arr, target, index){
	if (index === arr.length){
		let sum = 0;
		let cnt = 0;
		for (let i=0; i<arr.length; i++){
			cnt = presentArr[i] === 0 ? cnt : cnt+1;
			sum += presentArr[i] * arr[i];
		}
		if (sum === target && cnt !== 0)
			presentArr[index]++;
		return;
	}
	presentArr[index] = 0;
	recur(presentArr, arr, target, index+1);
	presentArr[index] = 1;
	recur(presentArr, arr, target, index+1);
	return;
}
