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
	let [str1, str2] = input;
	let [max, str] = solution(str1, str2);
	console.log(max);
	if (str)
		console.log(str);
	process.exit();
});

function solution(str1, str2){
	let matrix = [];
	for (let i=0; i<str1.length; i++)
		matrix.push(new Array(str2.length).fill(0));
	let temp=0;
	for (let i=0; i<str1.length; i++){
		if (str1[i]===str2[0])
			temp=1;
		matrix[i][0] = temp;
	}
	temp=0;
	for (let i=0; i<str2.length; i++){
		if(str1[0]===str2[i])
			temp=1;
		matrix[0][i] = temp;
	}
	for (let i=1; i<str1.length; i++){
		for(let j=1; j<str2.length; j++){
			if (str1[i] === str2[j])
				matrix[i][j] = matrix[i-1][j-1]+1;
			else
				matrix[i][j] = Math.max(matrix[i-1][j], matrix[i][j-1]);
		}
	}
	let max = matrix[str1.length-1][str2.length-1];
	if (max === 0)
		return [max];
	let answer=search(str1, str2, max, matrix);
	return [max,answer.join('')];
}

function search(str1, str2, max, matrix){
	let answer=[];
	let i,j;
	outer:for (i=0; i<str1.length; i++){
		for (j=0; j<str2.length; j++){
			if (matrix[i][j] === max)
				break outer;
		}
	}
	while (answer.length < max){
		//i가 0일때, j가 0일때
		if (i ===0 && j===0)
			answer.unshift(str1[0]);
		else if (i === 0){
			if(matrix[i][j]-1 === matrix[i][j-1])
				answer.unshift(str1[0]);
			j--;
		}
		else if (j === 0){
			if (matrix[i][j]-1 === matrix[i-1][j])
				answer.unshift(str1[i]);
			i--;
		}
		else if (matrix[i-1][j] === matrix[i][j])
			i--;
		else if (matrix[i][j-1] === matrix[i][j])
			j--;
		else if (matrix[i-1][j-1] === matrix[i][j] - 1){
			answer.unshift(str1[i]);
			i--;
			j--;
		}
	}
	return answer;
}
// 탐색
// up, left -> Math.max로 내려온 값인가?
// up-left -> 