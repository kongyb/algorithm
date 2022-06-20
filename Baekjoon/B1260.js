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
	let [vCnt, eCnt, sPoint] = input.shift().split(' ').map(el => Number(el));
	let matrix = [];
	for (let i=0; i<vCnt; i++)
		matrix.push(new Array(vCnt).fill(0));
	for (let i=0; i<eCnt; i++){
		let [start, dest] = input.shift().split(' ').map(el => Number(el));
		matrix[start-1][dest-1] = 1;
		matrix[dest-1][start-1] = 1;
	}
	console.log(DFS(matrix, sPoint-1, new Array(vCnt).fill(0)));
	console.log(BFS(matrix, sPoint-1, new Array(vCnt).fill(0)));
	process.exit();
});

function DFS(matrix, sPoint, isChecked){
	let str = `${sPoint+1}`;
	isChecked[sPoint] = 1;
	for (let i=0; i<matrix.length; i++){
		if (matrix[sPoint][i] === 1 && isChecked[i] === 0)
			str += ' '+DFS(matrix, i, isChecked);
	}
	return str;
}

function BFS(matrix, sPoint, isChecked){
	let queue=[sPoint];
	let str = `${sPoint+1}`
	isChecked[sPoint]=1;
	while (queue.length > 0){
		let next = queue.shift();
		for (let i=0; i<matrix[next].length; i++){
			if (matrix[next][i] === 1 && isChecked[i] === 0){
				isChecked[i]=1;
				str+= ' '+(i+1);
				queue.push(i);
			}
		}
	}
	return str;
}