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
	let weight = input[1].split(' ').map(el => Number(el));
	let target = input[3].split(' ').map(el => Number(el));
	console.log(solution(weight, target));
	process.exit();
});

function solution(weight, target){
	let map = {}
	map[weight[0]] = true;
	for (let i=1; i<weight.length; i++){
		let w1 = weight[i];
		let keys = Object.keys(map);
		for (const key of keys){
			let w2 = Number(key);
			let minus = Math.abs(w1 - w2);
			if (!map[minus])
				map[minus] = true;
			let plus = w1 + w2;
			if (!map[plus])
				map[plus] = true;
		}
		if (!map[w1])
			map[w1] = true;
	}
	return target.map(el => map[el] ? 'Y' : 'N').join(' ');
}