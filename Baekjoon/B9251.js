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
	let str1 = input[0];
	let str2 = input[1];
	console.log(solution(str1, str2));
	process.exit();
});

function solution(str1, str2){
	let matrix=[];
	for (let i=0; i<str1.length; i++)
		matrix.push(new Array(str2.length).fill(0));
	for (let i=0; i<str2.length; i++){
		if (str2[i] === str1[0])
			matrix[0][i] = 1;
		else if (i >= 1 && matrix[0][i - 1] === 1)
			matrix[0][i] = 1;
		else
			matrix[0][i] = 0;
	}
	for (let i=0; i<str1.length; i++){
		if (str1[i] === str2[0])
			matrix[i][0] = 1;
		else if (i >=1 && matrix[i - 1][0] === 1)
			matrix[i][0] = 1;
		else
			matrix[i][0] = 0;
	}
	for (let i=1; i<str1.length; i++){
		for (let j=1; j<str2.length; j++){
			if (str1[i] === str2[j])
				matrix[i][j] = matrix[i-1][j-1]+1;
			else
				matrix[i][j] = Math.max(matrix[i-1][j], matrix[i][j-1]);
		}
	}
	return matrix[str1.length-1][str2.length-1];
}