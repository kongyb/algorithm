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
	let [cnt, maxW] = input[0].split(' ').map(el => Number(el));
	let objArr = [];
	for (let i=1; i<=cnt; i++)
		objArr.push(input[i].split(' ').map(el => Number(el)));
	objArr.sort((a,b)=>{
		if (a[0] > b[0])
			return 1;
		return -1;
	});
	console.log(solution(maxW, objArr));
	process.exit();
});

//물품목록갯수, 배낭 최대 적재량
// 4 7
// 무게와 가치
// 6 13
// 4 8
// 3 6
// 5 12
// 물건의 수량은 하나임... => 물건의 수량이 하나이므로 배열에 대해 연산을 수행할 때 뒤에서 부터 수행한다.

function solution(maxW, objArr){
	let arr = new Array(maxW+1).fill(0);
	for (const [w, v] of objArr){
		for (let i = maxW; i >= w; i--){
			if (arr[i] < arr[i - w] + v)
				arr[i] = arr[i - w] + v;
		}
	}
	return arr[maxW];
}