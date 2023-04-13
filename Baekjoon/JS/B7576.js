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
	let [width, height] = input.shift().split(' ').map(el => Number(el));
	let matrix=[];
	for (let i=0; i<height; i++)
		matrix.push(input.shift().split(' ').map(el => Number(el)));
	console.log(solution(matrix,width,height));
	process.exit();
});

function search(matrix, i, j, time, queue, numObj){
	let height = matrix.length;
	let width = matrix[0].length;
	if (i-1 >= 0 && matrix[i-1][j] === 0){
		matrix[i-1][j]=1;
		numObj[0]--;
		queue.push([i-1,j,time+1]);
	}
	if (i+1 < height && matrix[i+1][j] === 0){
		matrix[i+1][j]=1;
		numObj[0]--;
		queue.push([i+1,j,time+1]);
	}
	if (j-1 >=0 && matrix[i][j-1] === 0){
		matrix[i][j-1]=1;
		numObj[0]--;
		queue.push([i,j-1,time+1]);
	}
	if (j+1 < width && matrix[i][j+1] === 0){
		matrix[i][j+1]=1;
		numObj[0]--;
		queue.push([i, j+1,time+1]);
	}
	return;
}

function solution(matrix, width, height){
	let queue=[];
	let time=0;
	let numObj={1:0, 0:0};
	for (let i=0; i<height; i++){
		for (let j=0; j<width; j++){
			if (matrix[i][j]===1){
				numObj[1]++;
				queue.push([i,j,0]);
			}
			if (matrix[i][j]===0)
				numObj[0]++;
		}
	}
	while (queue.length > 0){
		let [i,j,t] = queue.shift();
		time = t > time ? t : time;
		matrix[i][j]=1;
		search(matrix, i, j, t, queue, numObj);
	}
	if (numObj[0] > 0)
		return -1;
	return time;
}


// function solution(matrix, width, height){
// 	let queue=[];
// 	let time=-1;
// 	for(let i=0; i<height; i++){
// 		for(let j=0; j<width; j++){
// 			if (matrix[i][j] === 1)
// 				queue.push([i,j]);
// 		}
// 	}
// 	while(queue.length > 0){
// 		let next=[];
// 		for (const [i,j] of queue){
// 			if (i-1 >= 0 && matrix[i-1][j]===0){
// 				matrix[i-1][j]=1;
// 				next.push([i-1,j]);
// 			}
// 			if (i+1 < height && matrix[i+1][j] === 0){
// 				matrix[i+1][j]=1;
// 				next.push([i+1,j]);
// 			}
// 			if (j-1 >= 0 && matrix[i][j-1] === 0){
// 				matrix[i][j-1]=1;
// 				next.push([i,j-1]);
// 			}
// 			if (j+1 < width && matrix[i][j+1] === 0){
// 				matrix[i][j+1];
// 				next.push([i,j+1]);
// 			}
// 		}
// 		time++;
// 		queue=next;
// 	}
// 	for (let i=0; i<height; i++){
// 		for (let j=0; j<width; j++){
// 			if (matrix[i][j]===0)
// 				return -1;
// 		}
// 	}
// 	return time;
// }