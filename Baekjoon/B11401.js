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

function solution(num1, num2){
	if (num1 === num2 || num2 === 0)
		return 1;
	let nums1 = [1];
	let nums2 = [];
	let depth = 0;
	let long, short;
	while (depth < num1){
		if (depth % 2 === 0){
			long = nums2;
			short = nums1;
		}
		else {
			long = nums1;
			short = nums2;
		}
		depth++;
		long.unshift(1);
		long.push(1);
		for (let i=1; i<depth; i++)
			long[i] = (short[i] + short[i-1]) % 1000000007;
	}
	return long[num2];
}