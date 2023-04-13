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
	let num = Number(input.shift());
	console.log(solution(num)%1000000000);
	process.exit();
});

function solution(num){
	let myNum=1;
	let numArr=new Array(10).fill(1);
	numArr[0]=0;
	while (myNum < num){
		let newArr=new Array(10).fill(0);
		for (let i=0; i<10; i++){
			if (i === 0)
				newArr[1] = (newArr[1]+numArr[i])%1000000000;
			else if (i === 9)
				newArr[8] = (newArr[8]+numArr[i])%1000000000;
			else{
				newArr[i-1] = (newArr[i-1]+numArr[i])%1000000000;
				newArr[i+1] = (newArr[i+1]+numArr[i])%1000000000;
			}
		}
		myNum++;
		numArr = newArr;
	}
	return numArr.reduce((acc,curr)=>acc+curr);
}
//1000000000