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
	let [num, cnt] = input[0].split(' ').map(el => Number(el));
	let calc = [];
	for (let i=1; i<=cnt; i++)
		calc.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(num, calc));
	process.exit();
});

function getRoot(arr, index){
	if (arr[index] === index)
		return index;
	return getRoot(arr, arr[index]);
}

function solution(num, calc){
	let arr = [];
	let result = [];
	for (let i=0; i<= num; i++)
		arr.push(i);
	for (const [operator, n1, n2] of calc){
		if (operator === 0){
			let root1 = getRoot(arr, n1);
			let root2 = getRoot(arr, n2);
			if (root1 > root2)
				arr[root2] = root1;
			else
				arr[root1] = root2;
		}
		if (operator === 1){
			if (getRoot(arr, n1) === getRoot(arr, n2))
				result.push('YES');
			else
				result.push('NO');
		}
	}
	return result.join('\n');
}