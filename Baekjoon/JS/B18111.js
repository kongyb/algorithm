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
	let [height, width, inven] = input[0].split(' ').map(el => Number(el));
	let map = [];
	let sum = inven;
	for (let i=1; i<=height; i++){
		map.push(input[i].split(' ').map(el => Number(el)));
		sum += map[i-1].reduce((acc, curr) => acc + curr);
	}
	console.log(solution(height, width, map, sum));
	process.exit();
});

function solution(height, width, map, sum){
	let max = 0;
	let min = 256;
	for (let i=0; i<height; i++){
		for (let j=0; j<width; j++){
			if (map[i][j] < min)
				min = map[i][j];
			if (map[i][j] > max)
				max = map[i][j];
		}
	}
	let time = Number.MAX_SAFE_INTEGER;
	let h = 0;
	for (let i=min; i<=max && sum >= i * height * width; i++){
		let temp = 0;
		for (let j=0; j<height; j++){
			for (let k=0; k<width; k++){
				if (map[j][k] < i)
					temp += (i - map[j][k]);
				if (map[j][k] > i)
					temp += 2 * (map[j][k] - i);
			}
		}
		if (temp <= time){
			time = temp;
			h = i;
		}
	}
	return `${time} ${h}`;
}