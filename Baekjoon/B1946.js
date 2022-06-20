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
	let testCnt = Number(input[0]);
	let testCases = [];
	let rowCnt = 1;
	for (let i=0; i<testCnt; i++){
		let len = Number(input[rowCnt]);
		let testCase = new Array(len).fill(0);
		for (let j=1; j<=len; j++){
			let [paper, interview] = input[j+rowCnt].split(' ').map(el => Number(el));
			testCase[interview-1] = paper;
		}
		testCases.push(testCase);
		rowCnt += (len+1);
	}
	testCases.forEach(el => {console.log(solution(el))});
	process.exit();
});

function solution(arr){
	let cnt = arr.length;
	let min = arr[0];
	for (let i=1; i<arr.length; i++){
		if (min < arr[i])
			cnt--;
		else {
			min = arr[i];
		}
	}
	return cnt;
}