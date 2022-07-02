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
	let points = [[]];
	for (let i=1; i<=N; i++){
		let arr = input[i].split(' ').map(el => Number(el));
		let temp = [];
		for (let j=1; j<arr.length - 1; j+=2)
			temp.push([arr[j], arr[j+1]]);
		points.push(temp);
	}
	console.log(solution(N, points));
	process.exit();
});

function solution(N, points){
	let stack = [[1,0]];
	let farPoint1 = 1;
	let farDist1 = 0;
	let isChecked = new Array(N + 1).fill(0);
	isChecked[1] = 1;
	while (stack.length > 0){
		let [curr, dist] = stack.pop();
		if (dist > farDist1){
			farPoint1 = curr;
			farDist1 = dist;
		}
		for (const [next, d] of points[curr]){
			if (isChecked[next] === 0){
				isChecked[next] = 1;
				stack.push([next, dist + d]);
			}
		}
	}
	isChecked = new Array(N + 1).fill(0);
}
