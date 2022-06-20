// https://programmers.co.kr/learn/courses/30/lessons/67257

function solution(expression) {
    let nums = [];
	let syms = [];
	let num = 0;
	for (let i=0; i<expression.length; i++){
		if (!isNaN(Number(expression[i])))
			num = num * 10 + Number(expression[i]);
		else {
			nums.push(num);
			num = 0;
			syms.push(expression[i]);
		}
	}
	nums.push(num);

	let permArr = permutation([false, false, false], 3);
	let max = Number.MIN_SAFE_INTEGER;
	for (const arr of permArr){
		let value = calcNum([...nums], [...syms], arr);
		max = max > Math.abs(value) ? max : Math.abs(value);
	}
	return max;
}

function calcNum(nums, syms, arr){
	for (const num of arr){
		if (num === 0){
			for (let i=0; i<syms.length; i++){
				if (syms[i] === '*'){
					nums.splice(i, 2, nums[i] * nums[i+1]);
					syms.splice(i, 1);
					i--;
				}
			}
		}
		if (num === 1){
			for (let i=0; i<syms.length; i++){
				if (syms[i] === '+'){
					nums.splice(i, 2, nums[i] + nums[i+1]);
					syms.splice(i, 1);
					i--;
				}
			}
		}
		if (num === 2){
			for (let i=0; i<syms.length; i++){
				if (syms[i] === '-'){
					nums.splice(i, 2, nums[i] - nums[i+1]);
					syms.splice(i, 1);
					i--;
				}
			}
		}
	}
	return nums[0];
}

// 1:+, 2:-, 0:*
function permutation(isChecked, cnt){
	let result = [];
	if (cnt === 1){
		for (let i=0; i<isChecked.length; i++){
			if (!isChecked[i])
				result.push([i]);
		}
		return result;
	}
	for (let i=0; i<isChecked.length; i++){
		if (isChecked[i])
			continue;
		isChecked[i] = true;
		result = result.concat(permutation(isChecked, cnt - 1).map(el => [i, ...el]));
		isChecked[i] = false;
	}
	return result;
}
console.log(solution("100-200*300-500+20"));