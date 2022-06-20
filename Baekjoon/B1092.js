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
	let cranes = input[1].split(' ').map(el => Number(el));
	let boxes = input[3].split(' ').map(el => Number(el));
	console.log(solution(cranes, boxes));
	process.exit();
});

function solution(cranes, boxes){
	let isChecked = new Array(boxes.length).fill(false);
	let cnt = 0;
	cranes.sort((a,b) => b - a);
	boxes.sort((a,b) => b - a);
	let time = 0;
	if(cranes[0] < boxes[0])
		return -1;
	while (cnt < boxes.length){
		let index = 0;
		for (const crane of cranes){
			while (isChecked[index] || boxes[index] > crane)
				index++;
			if (index === boxes.length)
				break;
			cnt++;
			isChecked[index] = true;
		}
		time++;
	}
	return time;
}