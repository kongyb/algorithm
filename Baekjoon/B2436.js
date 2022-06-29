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
	let [num1, num2] = input[0].split(' ').map(el => Number(el));
	console.log(solution(num1, num2));
	process.exit();
});

function solution(gcd, lcm){
	let mul = gcd * lcm;
	let answer = [gcd, lcm];
	for (let i=1; i<=Math.sqrt(lcm / gcd); i++){
		let num1 = gcd * i;
		if (mul % num1 !== 0)
			continue;
		let num2 = mul / num1;
		let temp = findGcd(num1, num2);
		if (temp === gcd)
			answer = [num1, num2];
	}
	return answer.join(' ');
}

function findGcd(num1, num2){
	let temp = num2 % num1;
	while (temp !== 0){
		num2 = num1;
		num1 = temp;
		temp = num2 % num1;
	}
	return num1;
}