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
	let num = Number(input.shift());
	solution(num);
	process.exit();
});

function solution(num){
	if (isPrime(num)){
		console.log(num);
		return;
	}
	for (let i=2; i<=num; i++){
		if (isPrime(i)){
			while (num % i === 0){
				console.log(i);
				num /= i;
			}
		}
	}
}

function isPrime(n){
	if (n === 1)
		return false;
	if (n === 2)
		return true;
	for (let i=2; i<=Math.sqrt(n); i++){
		if (n % i === 0)
			return false;
	}
	return true;
}