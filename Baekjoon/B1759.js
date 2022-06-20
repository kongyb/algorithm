const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
  input.push(line)
})
  .on('close', function () {
  //input에 입력값 한줄씩있음
  let [len, cnt] = input[0].split(' ').map(el => Number(el));
  let alphas = input[1].split(' ');
  solution(len, cnt, alphas);
  process.exit();
});

function solution(len, cnt, alphas){
	alphas.sort();
	str_dfs(len, alphas, "", -1);
}

function str_dfs(len, alpha, prev, last){
	if (prev.length === len && check_valid(prev, len) == 1){
		console.log(prev);
		return;
	}
	for(let i=last+1;i<alpha.length;i++)
		str_dfs(len, alpha, prev+alpha[i], i);
}
//최소 한 개의 모음(a, e, i, o, u)과 최소 두 개의 자음으로 구성
function check_valid(str, len){
	let cnt = 0;
	for(const char of str){
		if ("aeiou".includes(char))
			cnt++;
	}
	if (cnt >= 1 && len - cnt >= 2)
		return 1;
	return 0;
}