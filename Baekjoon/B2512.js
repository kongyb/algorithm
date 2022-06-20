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
	let N = Number(input[0]);
	let amount = input[1].split(' ').map(el => Number(el));
	let M = Number(input[2]);
	console.log(solution(amount, M, N));
	process.exit();
});

function solution(amount, M, N){
	amount.sort((a,b) => a - b);
	let sumArr = [amount[0]];
	for (let i=1; i<N; i++)
		sumArr.push(sumArr[i-1] + amount[i]);
	if (sumArr[N - 1] <= M)
		return amount[N - 1];
	// 예산이 부족할 경우
	let bottom = Math.floor(M / N);
	let top = amount[amount.length - 1];
	// console.log(amount);
	while (bottom < top){
		let mid = Math.floor((bottom + top) / 2);
		if (mid === bottom)
			break;
		let index = findIndex(amount, mid);
		// console.log(mid, index);
		if (calcAmount(sumArr, index, mid, M))
			bottom = mid;
		else
			top = mid;
	}
	return bottom;
}

function findIndex(amount, price){
	let left = 0;
	let right = amount.length;
	while (left < right){
		let mid = Math.floor((left + right) / 2);
		if (amount[mid] < price)
			left = mid + 1;
		else 
			right = mid;
	}
	return left;
}

function calcAmount(sumArr, index, upper, M){
	let sum = sumArr[index - 1];
	sum += upper * (sumArr.length - index);
	return M >= sum;
}