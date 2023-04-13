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
	let rowNum = 0;
	for (let i=0; i<testCnt; i++){
		rowNum++;
		let [N, K] = input[rowNum].split(' ').map(el => Number(el));
		rowNum++;
		let buildTime = input[rowNum].split(' ').map(el => Number(el));
		rowNum++;
		let order = [];
		for (let i=0; i<K; i++)
			order.push(input[rowNum + i].split(' ').map(el => Number(el - 1)));
		rowNum += K;
		let dest = Number(input[rowNum])-1;
		console.log(solution(N, buildTime, order, dest));
	}
	process.exit();
});

function solution(N, buildTime, order, dest){
	let buildMap = [];
	for (let i=0; i<N; i++)
		buildMap.push(new Array(N).fill(0));
	let timeArr = new Array(N).fill(-1);
	let sumArr = new Array(N).fill(0);
	for (let [req, next] of order){
		buildMap[next][req] = 1;
		sumArr[next]++;
	}
	let complete = [];
	for (let i=0; i<N; i++){
		if (sumArr[i] === 0){
			timeArr[i] = buildTime[i];
			complete.push(i);
		}
	}
	for (let i=0; i<N; i++){
		for (const num of complete){
			if (buildMap[i][num] === 1)
				sumArr[i]--;
		}
	}
	while (timeArr[dest] === -1){
		complete = [];
		for (let i=0; i<N; i++){
			if (sumArr[i] === 0 && timeArr[i] === -1){
				let max = 0;
				for (let j=0; j<N; j++){
					if (buildMap[i][j] === 1 && max < timeArr[j])
						max = timeArr[j];
				}
				timeArr[i] = max + buildTime[i];
				complete.push(i);
			}
		}
		for (let i=0; i<N; i++){
			for (const num of complete){
				if (buildMap[i][num] === 1)
					sumArr[i]--;
			}
		}
	}
	return timeArr[dest];
}