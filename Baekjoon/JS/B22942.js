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
	let cnt = Number(input[0]);
	let coords = [];
	for (let i=1; i<=cnt; i++){
		let [c, r] = input[i].split(' ').map(el => Number(el));
		coords.push([-1*i, c-r]);
		coords.push([i, c+r]);
	}
	console.log(solution(coords));
	process.exit();
});

function solution(coords){
	coords.sort((a,b) => a[1] - b[1]);
	let stack = [];
	for (let i=0; i<coords.length; i++){
		if (!check(coords, i))
			return 'NO';
		let coord = coords[i];
		if (coord[0] > 0){
			let tail = stack[stack.length - 1];
			if (tail[0]*-1 === coord[0])
				stack.pop();
			else
				return 'NO';
		}
		else
			stack.push(coord);
	}
	return 'YES';
}

function check(coords, index){
	if (index === coords.length - 1)
		return true;
	return coords[index][1] !== coords[index+1][1];
}