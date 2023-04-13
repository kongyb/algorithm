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
	console.log(solution(input[0], input[1], input[2]));
	process.exit();
});

function solution(str1, str2, str3){
	let cube = [];
	for (let i=0; i<=str1.length; i++){
		let board = [];
		for (let j=0; j<=str2.length; j++)
			board.push(new Array(str3.length+1).fill(0));
		cube.push(board);
	}
	for (let i=1; i<=str1.length; i++){
		for (let j=1; j<=str2.length; j++){
			for (let k=1; k<=str3.length; k++){
				if (str1[i-1] === str2[j-1] && str2[j-1] === str3[k-1])
					cube[i][j][k] = cube[i-1][j-1][k-1] + 1;
				else 
					cube[i][j][k] = Math.max(cube[i-1][j][k], cube[i][j-1][k], cube[i][j][k-1]);
			}
		}
	}
	return cube[str1.length][str2.length][str3.length];
}

//  3 dp