const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let input = [];

rl.on('line', function (line) {
	input.push(line)
})
  .on('close', function () {
	let [width, cnt] = input[0].split(' ').map(el => Number(el));
	let ground = input[1].split(' ').map(el => Number(el));
	let commands = [];
	for(let i = 2; i < 2+cnt;i++)
		commands.push(input[i].split(' ').map(el => Number(el)));
	solution(ground,width,commands,cnt);
	process.exit();
});

function solution(ground, width, commands, cnt){
	let sumArr = new Array(width).fill(0);
	let sum = 0
	for(let i=0;i<cnt;i++){
		let [start,end,amount] = commands[i];
		if (start >= 2){
			sumArr[start - 2] -= amount;
			sum -= amount;
		}
		sumArr[end - 1] += amount;
		sum += amount;
	}
	for(let i=0;i<width;i++){
		ground[i]+=sum;
		sum -= sumArr[i];
	}
	console.log(ground.join(' '));
}

// function solution(ground, commands, cnt){
// 	for(let i=0;i<cnt;i++){
// 		let [start, end, amount] = commands[i];
// 		for(let j = start-1; j<=end-1; j++)
// 			ground[j]+=amount;
// 	}
// 	console.log(ground.join(' '));
// }
