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
	let matrix3D=[];
	for (let i=0; i<=20; i++){
		let matrix=[];
		for (let j=0; j<=20; j++){
			matrix.push(new Array(21).fill(-1));
		}
		matrix3D.push(matrix);
	}
	matrix3D[0][0][0] = 1;
	while (true){
		let [a,b,c] = input.shift().split(' ').map(el => Number(el));
		if (a === -1 && b === -1 && c === -1)
			break;
		console.log(`w(${a}, ${b}, ${c}) = ${solution(matrix3D,a,b,c)}`);
	}
	process.exit();
});

function solution(matrix3D, a, b, c){
	if (a <= 0 || b <= 0 || c <= 0)
		return 1;
	else if (a > 20 || b > 20 || c > 20)
		return solution(matrix3D, 20, 20, 20);
	if (matrix3D[a][b][c] === -1){
		if (a < b && b < c)
			matrix3D[a][b][c] = solution(matrix3D, a, b, c-1) + solution(matrix3D, a, b-1, c-1) - solution(matrix3D, a, b-1, c);
		else
			matrix3D[a][b][c] = solution(matrix3D, a-1, b, c) + solution(matrix3D, a-1, b-1, c) + solution(matrix3D, a-1, b, c-1) - solution(matrix3D, a-1, b-1, c-1)
	}
	return matrix3D[a][b][c];
}

