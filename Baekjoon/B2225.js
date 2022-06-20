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
	let [N, K] = input[0].split(' ').map(el => Number(el));
	console.log(solution(N, K));
	process.exit();
});

function solution(N, K){
	let pascal = [];
	for (let i=0; i<=N+K-1; i++){
		let temp = new Array(i+1).fill(1);
		for (let j = 1; j<i; j++){
			temp[j] = (pascal[i-1][j-1] + pascal[i-1][j]) % 1000000000;
			if (i === N+K-1 && j === N)
				return temp[j];
		}
			pascal.push(temp);
	}
	return pascal[N+K-1][N];
}