// https://programmers.co.kr/learn/courses/30/lessons/92342?language=javascript

// function solution(n, info) {
// 	let scoreArr = scoreGen(n, 11);
// 	let max = 0;
// 	let avail = [];
// 	console.log(scoreArr);
// 	for (const score of scoreArr){
// 		let gap = scoreCalc(score, info);
// 		if (gap > max){
// 			max = gap;
// 			avail = [score];
// 		}
// 		else if (gap === max)
// 			avail.push(score);
// 	}
// 	if (max ===0 && avail.length === 0)
// 		return [-1];
// 	avail.sort((a,b) => {
// 		for (let i=10; i>=0; i--){
// 			if (a[i] === b[i])
// 				continue;
// 			return b[i] - a[i];
// 		}
// 	})
// 	return avail[0];
// }

// //중복조합 계산
// // 점수 계산
// function scoreGen(n, slots){
// 	if (n === 0)
// 		return [new Array(slots).fill(0)];
// 	if (slots === 1)
// 		return [[n]];
// 	let temp = [];
// 	for (let i=0; i<=n; i++)
// 		temp = temp.concat(scoreGen(n-i, slots - 1).map(el => [i,...el]));
// 	return temp;
// }

// function scoreCalc(score, info){
// 	let sum = 0;
// 	for (let i=0; i<11; i++){
// 		if (score[i] === 0 && info[i] === 0)
// 			continue;
// 		else if (score[i] <= info[i])
// 			sum -= (10 - i);
// 		else
// 			sum += (10 - i);
// 	}
// 	return sum;
// }

// console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));


// 먹는 점수를 1개 ~ n개 까지 뽑는다
function solution(n, info) {
	let max = 1;
	let result = [];
	for (let i=1; i<=n; i++){
		let combArr = combGen(10, i);
		for (const score of combArr){
			let gap = scoreCalc(score, info);
			if (gap >= max){
				let scoreArr = generateArr(score, n, info);
				if (scoreArr.length > 0){
					if (gap === max)
						result.push(scoreArr);
					else{
						max = gap;
						result = [scoreArr];
					}
				}
			}
		}
	}
	if (result.length === 0)
		return [-1];
	result.sort((a,b)=>{
		for (let i=10; i>=0; i--){
			if (a[i] === b[i])
				continue;
			return b[i] - a[i];
		}
	})
	return result[0];
}

function combGen(max, cnt){
	if (cnt === 1){
		let result = [];
		for (let i=max; i>=1; i--)
			result.push([i]);
		return result;
	}
	if (max === cnt){
		let value = [];
		for (let i=max; i>=1; i--)
			value.push(i);
		return [value];
	}
	let temp = combGen(max - 1, cnt - 1).map(el => [max, ...el]);
	temp = temp.concat(combGen(max - 1, cnt));
	return temp;
}

function scoreCalc(score, info){
	let sum1 = info.reduce((acc, curr, index) => {
		return curr !== 0 ? acc + (10 - index) : acc
	}, 0);
	let sum2 = 0;
	for (const num of score){
		sum2 += num;
		if (info[10 - num] !== 0)
			sum1 -= num;
	}
	return sum2 - sum1;
}

function generateArr(score, n, info){
	let temp = new Array(11).fill(0);
	for (const num of score){
		temp[10 - num] = info[10 - num] + 1;
		n -= info[10 - num] + 1;
		if (n < 0)
			break;
	}
	if (n < 0)
		return [];
	else
		temp[10] = n;
	return temp;
}

console.log(solution(5, [2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0]));
console.log(solution(1, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
console.log(solution(9, [0, 0, 1, 2, 0, 1, 1, 1, 1, 1, 1]));
console.log(solution(2, [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]));
