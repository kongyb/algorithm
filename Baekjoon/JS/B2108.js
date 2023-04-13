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
	let len = Number(input.shift());
	let arr = input.map(el => Number(el));
	solution(arr, len);
	process.exit();
});

function solution(arr, len){
	arr.sort((a,b) => a - b);
	let sum=0;
	let avg;
	let max=0;
	let most;
	let range = arr[len - 1] - arr[0];
	let mid = arr[(len - 1)/2];
	let cntObj = {};
	for (let i=0; i<len; i++){
		sum += arr[i];
		if (cntObj[arr[i]])
			cntObj[arr[i]]++;
		else
			cntObj[arr[i]] = 1;
		max = cntObj[arr[i]] > max ? cntObj[arr[i]] : max;
	}
	avg = Math.round(sum / len);
	let temp=[];
	for (const key in cntObj){
		if (cntObj[key] === max)
			temp.push(key);
	}
	if (temp.length === 1)
		most = temp[0];
	else{
		temp.sort((a,b) => a - b);
		most = temp[1];
	}
	console.log(`${avg}\n${mid}\n${most}\n${range}`);
}