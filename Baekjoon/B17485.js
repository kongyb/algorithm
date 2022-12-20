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
	let [h, w] = input[0].split(' ').map(el => Number(el));
	let map = [];
	for (let i=1; i<=h; i++)
		map.push(input[i].split(' ').map(el => Number(el)));
	console.log(solution(h, w, map));
	process.exit();
});

function solution(h, w, map){
	// 첫째줄
	let dp = [map[0].map(el => new Array(3).fill(el))];
	for (let i=1; i<h; i++){
		let temp = [];
		for (let j=0; j<w; j++){
			let slot = [];
			if (j === 0)
				slot.push(0);
			else
				slot.push(Math.min(dp[i-1][j-1][1], dp[i-1][j-1][2]) + map[i][j]);
			slot.push(getMin(dp[i-1][j],0,2) + map[i][j]);
			if (j === w-1)
				slot.push(0);
			else
				slot.push(Math.min(dp[i-1][j+1][0], dp[i-1][j+1][1]) + map[i][j]);
			temp.push(slot);
		}
		dp.push(temp);
	}
	return dp[h-1].reduce((acc, curr) => {
		curr.forEach(el => {
			if (el !== 0 && el < acc)
				acc = el;
		})
		return acc;
	}, Number.MAX_SAFE_INTEGER)
}

function getMin(arr, i1, i2){
	if (arr[i1] === 0)
		return arr[i2];
	if (arr[i2] === 0)
		return arr[i1];
	return Math.min(arr[i1], arr[i2]);
}
