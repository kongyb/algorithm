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
	let [N, M] = input[0].split(' ').map(el => Number(el));
	let edgeInfo = new Map();
	for (let i=1; i<=M; i++){
		let [p1, p2, max] = input[i].split(' ').map(el => Number(el));
		setMap(map, p1, p2, max);
		setMap(map, p2, p1, max);
	}
	let [src, dest] = input(M + 1).split(' ').map(el => Number(el));
	console.log(solution(edgeInfo, N, src, dest));
	process.exit();
});

function setMap(map, src, dest, max){
	if (map.get(src) === undefined){
		let temp = {};
		temp[dest] = max;
		map.set(src, temp);
	}
	else {
		let temp = map.get(src);
		if (temp[dest] === undefined || temp[dest] < max)
			temp[dest] = max;
	}
	return;
}

function solution(edgeInfo, N, src, dest){
	
}