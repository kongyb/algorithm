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
	let edgeInfo = {};
	for (let i=1; i<=N; i++){
		let arr = input[i].split(' ').map(el => Number(el));
		edgeInfo[arr[0]] = [];
		for (let j=1; j<arr.length-2; j+=2)
			edgeInfo[arr[0]].push([arr[j], arr[j+1]]);
	}
	console.log(solution(N, edgeInfo));
	process.exit();
});

function solution(N, edgeInfo){
	let isChecked = new Array(N+1).fill(0);
	let [point1, long1] = dfs(edgeInfo, 1, isChecked);
	isChecked = isChecked.map(el => 0);
	let [point2, long2] = dfs(edgeInfo, point1, isChecked);
	return Math.max(long1, long2);
}

function dfs(edgeInfo, curr, isChecked){
	let result = [curr, 0];
	isChecked[curr] = 1;
	for (const [next, dist] of edgeInfo[curr]){
		if (isChecked[next] === 0){
			let temp = dfs(edgeInfo, next, isChecked);
			if (result[1] < temp[1] + dist){
				result[0] = temp[0];
				result[1] = temp[1] + dist;
			}
		}
	}
	return result;
}