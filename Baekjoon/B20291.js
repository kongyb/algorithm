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
	let obj = {};
	for (let i=1; i<=N; i++){
		let name = input[i].split('.')[1];
		if (!obj[name])
			obj[name] = 0;
		obj[name]++;
	}
	let result = Object.entries(obj);
	result.sort((a,b) => a[0] < b[0] ? -1 : 1);
	console.log(result.map(el => el.join(' ')).join('\n'));
	process.exit();
});