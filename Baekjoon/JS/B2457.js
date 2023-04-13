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
	let flowers = [];
	for (let i=1; i<=N; i++){
		let [bloomM, bloomD, fallM, fallD] = input[i].split(' ').map(el => Number(el));
		flowers.push([[bloomM, bloomD], [fallM, fallD]]);
	}
	console.log(solution(flowers));
	process.exit();
});

function solution(flowers){
	flowers.sort((a,b) => {
		if (a[0][0] < b[0][0])
			return -1;
		else if (a[0][0] > b[0][0])
			return 1;
		else {
			if (a[0][1] < b[0][1])
				return -1;
			return 1;
		}
	});
	let cnt = 0;
	let index = 0;
	let next = [3,1];
	while (index < flowers.length){
		let temp = next;
		while (index < flowers.length && compare(flowers[index][0], next) === 1){
			if (compare(temp, flowers[index][1]) === 1)
				temp = flowers[index][1];
			index++;
		}
		if (temp === next)
			return 0;
		next = temp;
		cnt++;
		if (next[0] > 11)
			break;
	}
	if (next[0] <= 11 && next[1] <= 30)
		return 0;
	return cnt;
}

function compare(day1, day2){
	let [m1, d1] = day1;
	let [m2, d2] = day2;
	if (m1 < m2)
		return 1;
	else if (m1 > m2)
		return -1;
	else {
		if (d1 <= d2)
			return 1;
		return -1;
	}
}