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
	let lineInfo = new Map();
	for (let i=1; i<=N; i++){
		let [key, value] = input[i].split(' ').map(el => Number(el));
		lineInfo.set(key, value);
	}
	console.log(solution(N, lineInfo));
	process.exit();
});

function addNum(arr, num){
	if (arr.length === 0 || num > arr[arr.length-1]){
		arr.push(num);
		return;
	}
	for (let i=0; i<arr.length; i++){
		if (arr[i] > num){
			arr[i] = num;
			return ;
		}
	}
}

function solution(N, lineInfo){
	let arr=[];
	for(let i=1; i<=500; i++){
		if (lineInfo.has(i))
			addNum(arr,lineInfo.get(i));
	}
	return (N - arr.length);
}