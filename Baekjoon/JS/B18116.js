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
	console.log(solution(input));
	process.exit();
});

function solution(input){
	let cnt = Number(input[0]);
	let ans = [];
	let cntObj = {};
	let arr = [];
	for (let i=0; i<=1000000; i++)
		arr.push(i);
	for (let i=1; i<=cnt; i++){
		let cmd = input[i];
		if (cmd.startsWith('I')){
			let [char, num1, num2] = cmd.split(' ');
			[num1, num2] = [Number(num1), Number(num2)];
			let [root1, root2] = [getRoot(arr,num1), getRoot(arr,num2)];
			if (root1 === root2)
				continue;
			let [max, min] = [Math.max(root1, root2), Math.min(root1, root2)];
			arr[max] = min;
			cntObj[min] = (cntObj[min] ? cntObj[min] : 1) + (cntObj[max] ? cntObj[max] : 1);
			delete cntObj[max];
		}
		else {
			let num = Number(cmd.split(' ')[1]);
			let root = getRoot(arr,num);
			ans.push(cntObj[root] ? cntObj[root] : 1);
		}
	}
	return ans.join('\n');
}

function getRoot(arr, i){
	while (arr[i] !== i)
		i = arr[i];
	return i;
}