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
	arr.sort((a,b) => a - b);
	console.log(solution(arr, N));
	process.exit();
});

function solution(arr, N){
	let answer = [arr[0], arr[N - 1]];
	for (let i=0; i<N; i++){
		let num = arr[i];
		let left = i + 1;
		let right = N;
		while (left < right){
			let mid = Math.floor((right + left) / 2);
			if (arr[mid] < -num)
				left = mid + 1;
			else
				right = mid;
		}
		if (left < N)
			check(answer, num, arr[left]);
		if (left > i + 1)
			check(answer, num, arr[left - 1]);
		if (answer[0] + answer[1] === 0)
			return answer.join(' ');
	}
	return answer.join(' ');
}

function check(answer, num1, num2){
	if (Math.abs(num1 + num2) < Math.abs(answer[0] + answer[1])){
		answer[0] = num1;
		answer[1] = num2;
	}
}