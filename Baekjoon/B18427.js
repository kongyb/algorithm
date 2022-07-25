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
	let [N, M, H] = input[0].split(' ').map(el => Number(el));
	let blocks = [];
	for (let i=1; i<=N; i++)
		blocks.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(N, M, H, blocks));
	process.exit();
});

function solution(N, M, H, blocks){
	let dp = new Array(H + 1).fill(0);
	let s1 = blocks[0];
	dp[0] = 1;
	for (const w of s1)
		dp[w] = 1;
	for (let i=1; i<N; i++){
		let student = blocks[i];
		for (let j=H; j>=0; j--){
			for (const w of student){
				if (j - w >= 0 && dp[j - w] > 0){
					dp[j] = (dp[j] + dp[j - w])%10007;
				}
			}
		}
	}
	return dp[H];
}