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
	let [pCnt, qCnt] = input.shift().split(' ').map(el => Number(el));
	let edges={};
	for (let i=0; i<pCnt-1; i++){
		let [src, dest, dist] = input[i].split(' ').map(el => Number(el));
		if (!edges[src])
			edges[src] = [[dest, dist]];
		else
			edges[src].push([dest, dist]);
		if (!edges[dest])
			edges[dest] = [[src, dist]];
		else
			edges[dest].push([src, dist]);
	}
	let questions=[]
	for (let i=pCnt-1; i<pCnt+qCnt-1; i++)
		questions.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(edges, questions, pCnt));
	process.exit();
});

function solution(edges, questions, pCnt){
	let result=[];
	for (const [K, start] of questions){
		let isChecked = new Array(pCnt).fill(false);
		isChecked[start - 1] = true;
		let queue = [start];
		let cnt = 0;
		while (queue.length > 0){
			let point = queue.shift();
			for (const [next, dist] of edges[point]){
				if (dist < K || isChecked[next-1])
					continue;
				else {
					isChecked[next - 1] = true;
					cnt++;
					queue.push(next);
				}
			}
		}
		result.push(cnt);
	}
	return result.join('\n');
}
