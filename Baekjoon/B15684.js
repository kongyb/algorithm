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
	let [N, M, H] = input[0].split(' ').map(el => Number(el));
	let map = [];
	let availTemp = [];
	for (let i=0; i<H; i++){
		map.push(new Array(N-1).fill(0));
		let temp = [];
		for (let i=0; i<N-1; i++)
			temp.push(i);
		availTemp.push(temp);
	}
	for (let i=1; i<=M; i++){
		let [row, col] = input[i].split(' ').map(el => Number(el));
		map[row-1][col-1] = 1;
		availTemp[row-1] = availTemp[row - 1].filter(el => Math.abs(col - 1 - el) > 1);
	}
	let available = [];
	for (let i=0; i<H; i++){
		availTemp[i].forEach(el => {
			available.push([i,el]);
		})
	}
	console.log(solution(map, available, N));
	process.exit();
});

function solution(map, available, N){
	// case 0
	if (check(map, N))
		return 0;
	// case 1
	for (const line of available){
		mapUpdate(map, [line], 1);
		if (check(map, N))
			return 1;
		mapUpdate(map, [line], 0);
	}
	// case 2
	let comb2 = new CombGen(2, available.length);
	while (comb2.status){
		let lines = comb2.combArr().map(el => available[el]);
		mapUpdate(map, lines, 1);
		if (check(map, N))
			return 2;
		mapUpdate(map, lines, 0);
	}
	// case 3
	let comb3 = new CombGen(3, available.length);
	while (comb3.status){
		let lines = comb3.combArr().map(el => available[el]);
		mapUpdate(map, lines, 1);
		if (check(map, N))
			return 3;
		mapUpdate(map, lines, 0);
	}
	return -1;
}

function mapUpdate(map, lines, mode){
	for (const [row, col] of lines)
		map[row][col] = mode;
	return;
}

function check(map, N){
	for (let i=0; i<N; i++){
		if (moveDown(map, i) !== i)
			return false;
	}
	return true;
}

function moveDown(map, start){
	let curr = start;
	let width = map[0].length;
	let height = map.length;
	for (let i=0; i<height; i++){
		if (curr < width && map[i][curr] === 1)
			curr++;
		else if (curr > 0 && map[i][curr-1] === 1)
			curr--;
	}
	return curr;
}

class CombGen{
	constructor(len, max){
		this.status = true;
		if (len > max)
			this.status = false;
		this.arr = [];
		for (let i=0; i<len; i++)
			this.arr.push(i);
		this.max = max;
		this.len = len;
	}

	next(index){
		this.arr[index]++;
		if (index === 0 && this.arr[0] === this.max - this.len + 1)
			this.status = false;
		if (this.arr[index] === this.max - (this.len - index - 1)){
			this.next(index - 1)
			this.arr[index] = this.arr[index - 1] + 1;
		}
	}

	combArr(){
		let arr = [...this.arr];
		this.next(this.len - 1);
		return arr;
	}
}

// const readline = require('readline');

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// });

// let input = [];

// rl.on('line', function (line){
// 	input.push(line);
// })
// .on('close',function(){
// 	//input에 입력값 한줄씩있음
// let [N, M, H] = input[0].split(' ').map(el => Number(el));
// let map = [];
// let availTemp = [];
// for (let i=0; i<H; i++){
// 	map.push(new Array(N-1).fill(0));
// 	let temp = [];
// 	for (let i=0; i<N-1; i++)
// 		temp.push(i);
// 	availTemp.push(temp);
// }
// for (let i=1; i<=M; i++){
// 	let [row, col] = input[i].split(' ').map(el => Number(el));
// 	map[row-1, col-1] = 1;
// 	availTemp[row-1] = availTemp[row - 1].filter(el => Math.abs(col - 1 - el) > 1);
// }
// let available = [];
// console.log(availTemp);
// for (let i=0; i<H; i++){
// 	availTemp[i].forEach(el => {
// 		available.push([i,el]);
// 	})
// }
// console.log(available);
// 	process.exit();
// });