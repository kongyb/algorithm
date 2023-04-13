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
	let [N, K] = input[0].split(' ').map(el => Number(el));
	console.log(solution(input[1], K));
	process.exit();
});

function solution(str, K){
	let arr = [Number(str[0])];
	for (let i=1; i<str.length; i++){
		let last = arr[arr.length - 1];
		let next = Number(str[i]);
		while (arr.length > 0 && last < next){
			if (K === 0)
				break;
			arr.pop();
			K--;
			last = arr[arr.length - 1];
		}
		arr.push(next);
		if (K === 0){
			arr.push(str.slice(i+1));
			break;
		}
	}
	while (K > 0){
		arr.pop();
		K--;
	}
	return arr.join('');
}

// 83982189081241941284818948189498149184164271641274261231231235325345778658569776756577456452412414242343892482398389
// 83982189081241941284818948189498149184164271641274261231231235325345778658569776756577456452412414242343892482398389

