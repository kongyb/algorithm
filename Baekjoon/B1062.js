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
	let [wordCnt, letterCnt] = input.shift().split(' ').map(el => Number(el));
	if (letterCnt < 5)
		console.log(0);
	else
		console.log(solution(wordCnt, letterCnt - 5, input));
	process.exit();
});

function solution(wordCnt, letterCnt, words){
	let base = 'acnit';
	let unknownSet = new Set();
	for (const word of words){
		for (let i=0; i<word.length; i++){
			if (!base.includes(word[i]))
				unknownSet.add(word[i]);
		}
	}
	let unknowns = Array.from(unknownSet);
	if (unknowns.length <= letterCnt)
		return wordCnt;
	// let comb = combination(unknowns, letterCnt, 0);
	let max = 0;
	let combGen = new CombGen(unknowns, letterCnt);
	while (combGen.status){
		let letters = combGen.get();
		let cnt = 0;
		for (const word of words){
			let bool = true;
			for (let i=4; i<word.length-4; i++){
				if (!letters.includes(word[i]) && !base.includes(word[i])){
					bool = false;
					break;
				}
			}
			if (bool)
				cnt++;
		}
		max = cnt > max ? cnt : max;
	}
	return max;
}

class CombGen{
	constructor(arr, len){
		this.len = len;
		this.indexes = [];
		this.arr = arr;
		for (let i=0; i<this.len; i++)
			this.indexes.push(i);
		this.data = this.indexes.map(el => arr[el]);
		this.max = arr.length;
		this.status = true;
	}

	get(){
		let result = [...this.data];
		this.next(this.len - 1);
		return result;
	}

	next(index){
		if (index === 0 && this.indexes[0] === this.max - this.len){
			this.status = false;
			return;
		}
		this.indexes[index]++;
		if(this.indexes[index] > this.max - (this.len - index)){
			this.next(index - 1);
			this.indexes[index] = this.indexes[index - 1] + 1;
		}
		this.data[index] = this.arr[this.indexes[index]];
	}
}