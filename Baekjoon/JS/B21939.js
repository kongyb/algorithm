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
	let result = [];
	let questionArr = new Array(101).fill(0).map(el => []);
	let questionObj = {};
	let qCnt = Number(input[0]);
	for (let i=1; i<=qCnt; i++){
		let [num, rank] = input[i].split(' ').map(el => Number(el));
		questionObj[num] = rank;
		questionArr[rank].push(num);
	}
	questionArr.forEach(arr => arr.sort((a,b) => a-b))
	let cmdCnt = Number(input[qCnt+1]);
	for (let i=1; i<=cmdCnt; i++){
		let [cmd, num1, num2] = input[qCnt+1+i].split(' ');
		if (cmd === 'recommend')
			result.push(find(questionArr, num1));
		if (cmd === 'solved'){
			let num = Number(num1);
			let rank = questionObj[num];
			questionArr[rank].splice(questionArr[rank].indexOf(num),1);
			delete questionObj[num];
		}
		if (cmd === 'add'){
			let [num, rank] = [Number(num1), Number(num2)];
			questionObj[num] = rank;
			add(questionArr, num, rank);
		}
	}
	console.log(result.join('\n'));
	process.exit();
});

function find(questionArr, type){
	if (type === '1'){
		for (let j=100; j>0; j--){
			if (questionArr[j].length !== 0)
				return questionArr[j][questionArr[j].length - 1];
		}
	}
	for(let j=1; j<=100; j++){
		if (questionArr[j].length !== 0)
			return questionArr[j][0];
	}
}

function add(questionArr, num, rank){
	let arr = questionArr[rank];
	for (let i=0; i<arr.length; i++){
		if (num < arr[i]){
			arr.splice(i,0,num);
			return;
		}
	}
	arr.push(num);
	return;
}