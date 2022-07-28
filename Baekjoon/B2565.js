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
	let lines = [];
	for (let i=1; i<=N; i++)
		lines.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, lines));
	process.exit();
});

function solution(N, lines){
	lines.sort((a,b) => a[0] - b[0]);
	let temp = [];
	for (let i=0; i<N; i++){
		if (temp.length === 0)
			temp.push(lines[i][1]);
		if (temp[temp.length - 1] < lines[i][1])
			temp.push(lines[i][1]);
		else
			temp[search(temp, lines[i][1])] = lines[i][1];
	}
	return N - temp.length;
}

function search(arr, value){
	let left = 0;
	let right = arr.length;
	while (left < right){
		let mid = Math.floor((left + right) / 2);
		if (arr[mid] < value)
			left = mid + 1;
		else
			right = mid;
	}
	return left;
}