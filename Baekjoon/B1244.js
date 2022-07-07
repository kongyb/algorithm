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
	let lamps = [0, ...input[1].split(' ').map(el => Number(el))];
	let studentCnt = Number(input[2]);
	let students = [];
	for (let i=3; i<3+studentCnt; i++)
		students.push(input[i].split(' ').map(el => Number(el)));
	solution(cnt, lamps, students);
	process.exit();
});

function solution(max, lamps, students){
	for (const student of students){
		if (student[0] === 1)
			male(lamps, student[1], max);
		else
			female(lamps, student[1], max);
	}
	let result = [];
	for (let i=1; i<=max; i++){
		result.push(lamps[i]);
		if (i % 10 === 0 || i === max){
			console.log(result.join(' '));
			result = [];
		}
	}
}

function female(lamp, num, max){
	let left = num;
	let right = num;
	while (left >=2 && right <=max-1 && lamp[left-1] === lamp[right+1]){
		left--;
		right++;
	}
	for (let i=left; i<=right; i++)
		lamp[i] = lamp[i] === 1 ? 0 : 1;
}

function male(lamp, num, max){
	for (let i=num; i<=max; i+=num)
		lamp[i] = lamp[i] === 1 ? 0 : 1;
}