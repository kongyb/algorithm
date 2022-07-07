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
	console.log(solution(input[0]));
	process.exit();
});

function solution(str){
	let cnt = 0;
	for (let i=0; i<str.length; i++){
		cnt++;
		if (i>0 &&str[i] === 'j' && (str[i-1] === 'l' || str[i-1] === 'n'))
			cnt--;
		if (str[i] === '-' || str[i] === '='){
			cnt--;
			if (i>1 && str[i-1] === 'z' && str[i-2] === 'd')
				cnt--;
		}
	}
	return cnt;
}