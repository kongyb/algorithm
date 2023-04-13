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
	let gateCnt = Number(input[0]);
	let planeCnt = Number(input[1]);
	let planes = [];
	for (let i=2; i<2 + planeCnt; i++)
		planes.push(Number(input[i]));
	console.log(solution(planes, gateCnt));
	process.exit();
});

function solution(planes, gateCnt){
	let gateArr = [];
	for (let i=0; i<=gateCnt; i++)
		gateArr.push(i);
	let cnt = 0;
	for (let i=0; i<planes.length; i++){
		let num = planes[i];
		let value = getNum(gateArr, num);
		if (value === 0)
			break;
		cnt++;
	}
	return cnt;
}

function getNum(arr, index){
	if (arr[index] === index){
		arr[index]--;
		return index;
	}
	let value = getNum(arr, arr[index]);
	arr[index] = value - 1;
	return value;
}
