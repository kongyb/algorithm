//8보다 크면 -1
function solution(N, number) {
	let cntArr = [[],[N]];
	let cntObj = {};
	cntObj[N] = 1;
	for (let i=2; i<=8; i++){
		let temp = [];
		temp.push(generateNum(i,N));
		cntObj[temp[0]] = i;
		for (let j=1; j<=Math.floor(i/2); j++)
			temp = temp.concat(generateArr(j, i-j, cntArr, cntObj));
		cntArr.push(temp);
		if (cntObj[number])
			return cntObj[number];
	}
    return -1;
}

function generateNum(len, N){
	let num = 0;
	for (let i=0; i<len; i++)
		num = num * 10 + N;
	return num;
}

function generateArr(num1, num2, cntArr, cntObj){
	let arr1 = cntArr[num1];
	let arr2 = cntArr[num2];
	let temp = [];
	for (const el1 of arr1){
		for (const el2 of arr2){
			if (!cntObj[el1*el2]){
				temp.push(el1*el2);
				cntObj[el1*el2] = num1 + num2;
			}
			if (!cntObj[el1+el2]){
				temp.push(el1+el2);
				cntObj[el1+el2] = num1 + num2;
			}
			let max = Math.max(el1, el2);
			let min = Math.min(el1, el2);
			if (min!==0 && !cntObj[Math.floor(max/min)]){
				temp.push(Math.floor(max/min));
				cntObj[Math.floor(max/min)] = num1 + num2;
			}
			if (!cntObj[max-min]){
				temp.push(max-min);
				cntObj[max-min] = num1 + num2;
			}
		}
	}
	return temp;
}

console.log(solution(5,110));