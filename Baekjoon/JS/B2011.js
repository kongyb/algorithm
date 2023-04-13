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
	let arr = input[0].split('').map(el => Number(el));
	console.log(solution(arr));
	process.exit();
});

function solution(arr){
	let newArr = [];
	if (arr[0] === 0)
		return 0;
	for (let i=0; i<arr.length; i++){
		if (arr[i] === 0){
			if (newArr[newArr.length - 1] > 2)
				return 0;
			newArr[newArr.length - 1] *= 10;
		}
		else
			newArr.push(arr[i]);
	}
	if (newArr.length === 1)
		return 1;
	let cntArr = [];
	cntArr.push(1);
	if (newArr[1] >= 10 || newArr[0] >= 10 || newArr[0]*10 + newArr[1] > 26)
		cntArr.push(1);
	else
		cntArr.push(2);
	for (let i=2; i<newArr.length; i++){
		if (newArr[i-1] >= 10 || newArr[i] >= 10 || newArr[i-1]*10 + newArr[i] > 26)
			cntArr.push(cntArr[i-1]);
		else
			cntArr.push((cntArr[i-1] + cntArr[i-2]) % 1000000);
	}
	return cntArr[cntArr.length - 1];
}