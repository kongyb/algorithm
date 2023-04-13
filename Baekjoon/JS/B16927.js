const { access } = require('fs');
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
	let [height, width, cnt] = input[0].split(' ').map(el => Number(el));
	let matrix = [];
	for (let i=1; i<=height; i++)
		matrix.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(height, width, cnt, matrix));
	process.exit();
});

function solution(height, width, cnt, matrix){
	let i=0, j=0;
	while (2*(i+1)<=height && 2*(j+1)<=width){
		rotate(i, j, matrix, cnt);
		i++;
		j++;
	}
	return matrix.map(row => row.join(' ')).join('\n');
}

function rotate(i, j, matrix, cnt){
	let edge = getEdge(i,j,matrix);
	cnt = cnt % edge.length;
	fillEdge(i,j,matrix,edge,cnt);
	return;
}

function getEdge(i,j,matrix){
	let hMin = i;
	let wMin = j;
	let hMax = matrix.length - 1 - i;
	let wMax = matrix[0].length - 1 - j;
	let up = matrix[hMin].slice(wMin, wMax+1);
	let left = [], right = [];
	for (let index = hMin+1; index<hMax; index++){
		left.push(matrix[index][wMin]);
		right.push(matrix[index][wMax]);
	}
	let down = matrix[hMax].slice(wMin, wMax + 1);
	return [...up, ...right, ...reverse(down), ...reverse(left)];
}

function fillEdge(i, j, matrix, edge, cnt){
	let hMin = i;
	let wMin = j;
	let hMax = matrix.length - 1 - i;
	let wMax = matrix[0].length - 1 - j;
	let dir = [0,1];
	for (let index=0; index<edge.length; index++){
		matrix[i][j] = edge[(index+cnt)%edge.length];
		if (i===hMin && j===wMax)
			dir = [1,0];
		if (i===hMax && j===wMax)
			dir = [0,-1];
		if (i===hMax && j===wMin)
			dir = [-1,0];
		i += dir[0];
		j += dir[1];
	}
	return;
}

function reverse(arr){
	let left = 0;
	let right = arr.length - 1;
	while (left < right){
		let temp = arr[left];
		arr[left] = arr[right];
		arr[right] = temp;
		left++;
		right--;
	}
	return arr;
}