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
	let result = [];
	for (let i=1; i<=cnt; i++)
		result.push(solution(input[i], 0));
	console.log(result.join('\n'));
	process.exit();
});

// function solution(str, base){
// 	let left = 0;
// 	let right = str.length - 1;
// 	while (left < right){
// 		if (str[left] === str[right]){
// 			left++;
// 			right--;
// 		}
// 		else{
// 			if (base === 0)
// 				break;
// 			if (base === 1)
// 				return 2;
// 		}
// 	}
// 	if (left >= right)
// 		return base;
// 	if (solution(str.slice(left + 1, right + 1), 1) === 1 || solution(str.slice(left, right), 1) === 1)
// 		return 1;
// 	return 2;
// }

function solution(str){
	let [left, right] = check(str, 0, str.length - 1);
	if (str[left] === str[right])
		return 0;
	let removeL = check(str, left+1, right);
	if (str[removeL[0]] === str[removeL[1]])
		return 1;
	let removeR = check(str, left, right - 1);
	if (str[removeR[0]] === str[removeR[1]])
		return 1;
	return 2;
}

function check(str, left, right){
	while (left < right){
		if (str[left] === str[right]){
			left++;
			right--;
		}
		else
			break;
	}
	return [left, right];
}