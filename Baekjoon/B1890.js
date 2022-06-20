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
	let len = Number(input[0]);
	let map = [];
	for (let i=1; i<=len; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(len, map));
	process.exit();
});

function solution(len, map){
	let cntMap = [];
	for (let i=0; i<len; i++)
		cntMap.push(new Array(len).fill(BigInt(0)));
	cntMap[0][0] = BigInt(1);
	for (let i=0; i<len; i++){
		for (let j=0; j<len; j++){
			if (map[i][j] === 0 || cntMap[i][j] === 0)
				continue;
			let dist = map[i][j];
			if (i+dist < len)
				cntMap[i+dist][j] += cntMap[i][j];
			if (j+dist < len)
				cntMap[i][j+dist] += cntMap[i][j];
		}
	}
	return cntMap[len-1][len-1].toString();
}