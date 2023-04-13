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
	let len = Number(input[0]);
	let map = [];
	for (let i=1; i<=len; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(map, len));
	process.exit();
});

function solution(map, len){
	return moveDfs(map, 0, len);
}

// dir 0:up 1:down 2:left 3:right
function move(dir, map, len){
	let next = [];
	for (let i=0; i<len; i++)
		next.push(new Array(len).fill(0));
	if (dir === 0){
		for (let i=0; i<len; i++){
			let temp = [];
			for (let j=0; j<len; j++){
				if (map[j][i] !== 0)
					temp.push(map[j][i]);
			}
			let index = 0;
			while (temp.length > 0){
				let num = temp.shift();
				if (temp.length > 0 && temp[0] === num)
					num += temp.shift();
				next[index][i] = num;
				index++;
			}
		}
	}

	if (dir === 1){
		for (let i=0; i<len; i++){
			let temp = [];
			for (let j=len-1; j>=0; j--){
				if (map[j][i] !== 0)
					temp.push(map[j][i]);
			}
			let index = len - 1;
			while (temp.length > 0){
				let num = temp.shift();
				if (temp.length > 0 && temp[0] === num)
					num += temp.shift();
				next[index][i] = num;
				index--;
			}
		}
	}

	if (dir === 2){
		for (let i=0; i<len; i++){
			let temp = [];
			for (let j=0; j<len; j++){
				if (map[i][j] !== 0)
					temp.push(map[i][j]);
			}
			let index = 0;
			while (temp.length > 0){
				let num = temp.shift();
				if (temp.length > 0 && temp[0] === num)
					num += temp.shift();
				next[i][index] = num;
				index++;
			}
		}
	}

	if (dir === 3){
		for (let i=0; i<len; i++){
			let temp = [];
			for (let j=len-1; j>=0; j--){
				if (map[i][j] !== 0)
					temp.push(map[i][j]);
			}
			let index = len - 1;
			while (temp.length > 0){
				let num = temp.shift();
				if (temp.length > 0 && temp[0] === num)
					num += temp.shift();
				next[i][index] = num;
				index--;
			}
		}
	}
	return next;
}
// prev는 cnt번 변형된 배열, 
function moveDfs(prev, cnt, len){
	let max = findMax(prev, len);
	if (cnt === 5)
		return max;
	for (let i = 0; i<4; i++){
		let newMax = moveDfs(move(i, prev, len), cnt+1, len);
		max = newMax > max ? newMax : max;
	}
	return max;
}

function findMax(map, len){
	let max = 0;
	for (let i=0; i<len; i++){
		for (let j=0; j<len; j++){
			max = map[i][j] > max ? map[i][j] : max;
		}
	}
	return max;
}