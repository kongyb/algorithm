const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let input = [];

rl.on('line', function (line){
	input.push(line)
})
.on('close',function(){
	//input에 입력값 한줄씩있음
	let N = Number(input.shift());
	let line = input[0].split(' ').map(el => Number(el));
	console.log(solution(N,line));
	process.exit()
})

function solution(N, line){
	let numObj={};
	for(let i=0; i < line.length; i++)
		numObj[line[i]] = i;
	let max = 0;
	let cnt = 1;
	let num = 1;
	while(num <= N){
		// console.log("before while: " + num);
		while (numObj[num + 1] > numObj[num] && num + 1 <= N){
			num++;
			cnt++;
		}
		// console.log("after while: " + num);
		// console.log("cnt is " + cnt);
		if (cnt > max)
			max = cnt;
		cnt = 1;
		num++;
	}
	return N-max;
}