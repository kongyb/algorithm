const { setUncaughtExceptionCaptureCallback } = require('process');
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
	let cnt = Number(input[0]);
	let arr = [];
	for (let i=1; i<=cnt; i++)
		arr.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(arr))
	process.exit();
});

function solution(arr){
	arr.sort((a,b) => {
		if (a[1] < b[1])
			return -1;
		else if (a[1] > b[1])
			return 1;
		else {
			if (a[0] < b[0])
				return -1;
			else 
				return 1;
		}
	});
	let time = 0;
	let cnt = 0;
	for (let i=0; i<arr.length; i++){
		if (arr[i][0] >= time){
			time = arr[i][1];
			cnt++;
		}
	}
	return cnt;
}

