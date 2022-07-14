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
	let [N, M, L] = input[0].split(' ').map(el => Number(el));
	let pos = input[1].split(' ').map(el => Number(el));
	console.log(solution(N, M, L, pos));
	process.exit();
});

function solution(N, M, L, pos){
	if (N === 0)
		return Math.ceil(L / (M + 1));
	pos.sort((a,b) => a - b);
	let dist = [pos[0]];
	for (let i=1; i<N; i++)
		dist.push(pos[i] - pos[i-1]);
	dist.push(L - pos[N-1]);
	let left = 1;
	let right = L;
	while (left < right){
		let mid = Math.floor((left + right) / 2);
		let cnt = check(dist, mid);
		if (cnt > M)
			left = mid + 1;
		else
			right = mid;
	}
	return left;
}

function check(dist, value){
	let cnt = 0;
	for (const el of dist)
		cnt += Math.ceil(el / value) - 1;
	return cnt;
}