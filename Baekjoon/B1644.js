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
	let num = Number(input[0]);
	console.log(solution(num));
	process.exit();
});

function solution(num){
	let primes = [2];
	for (let i=3; i<=num; i++){
		let bool = true;
		for (const prime of primes){
			if (prime > Math.sqrt(i))
				break;
			if (i % prime === 0){
				bool = false;
				break;
			}
		}
		if (bool)
			primes.push(i);
	}
	let left = 0;
	let right = 0;
	let cnt = 0;
	let sum = primes[left];
	while (right < primes.length){
		while (sum > num && left < right){
			sum -= primes[left];
			left++;
		}
		if (sum === num)
			cnt++;
		right++;
		sum += primes[right];
	}
	return cnt;
}