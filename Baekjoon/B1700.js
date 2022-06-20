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
	let arr = input[1].split(' ').map(el => Number(el));
	console.log(solution(arr, N, K));
	process.exit();
});

function solution(arr, N, K){
	let multitab = [];
	let cnt = 0;
	let indexObj = {};
	for (let i=0; i<K; i++){
		if (!indexObj[arr[i]])
			indexObj[arr[i]] = [i];
		else
			indexObj[arr[i]].push(i);
	}
	for (const el of arr){
		if (multitab.length < N && !multitab.includes(el)){
			// console.log(el + ' push')
			indexObj[el].shift();
			multitab.push(el);
			continue;
		}
		if (multitab.includes(el)){
			// console.log(el + ' includes');
			indexObj[el].shift();
			continue;
		}
		let index = 0;
		let max = 0;
		for (let i=0; i<N; i++){
			if (indexObj[multitab[i]].length === 0){
				index = i;
				break;
			}
			if (max < indexObj[multitab[i]][0]){
				index = i;
				max = indexObj[multitab[i]][0]
			}
		}
		// console.log('delete ' + multitab[index] + ' append ' + el)
		multitab[index] = el;
		indexObj[el].shift();
		cnt++;
	}
	return cnt;
}