function solution(str1, str2) {
	str1 = str1.toLowerCase();
	str2 = str2.toLowerCase();
	let obj1 = {}
	let obj2 = {};
	for (let i=0; i<str1.length - 1; i++){
		if (isAlpha(str1[i]) && isAlpha(str1[i+1])){
			let temp = str1[i] + str1[i+1];
			if (obj1[temp])
				obj1[temp]++;
			else
				obj1[temp] = 1;
		}
	}
	for (let i=0; i<str2.length - 1; i++){
		if (isAlpha(str2[i]) && isAlpha(str2[i+1])){
			let temp = str2[i] + str2[i+1];
			if (obj2[temp])
				obj2[temp]++;
			else
				obj2[temp] = 1;
		}
	}
	let total = 0;
	let intersection = 0;
	for (const key of Object.keys(obj1)){
		if (obj2[key] === undefined)
			total += obj1[key];
		else
			total += Math.max(obj1[key], obj2[key]);
	}
	for (const key of Object.keys(obj2)){
		if (obj1[key] === undefined)
			total += obj2[key];
		else
			intersection += Math.min(obj1[key], obj2[key]);
	}
	if(total === 0)
		return 65536;
	return Math.floor(intersection / total * 65536)
}

function isAlpha(char){
	if (char.charCodeAt() >= 'a'.charCodeAt() && char.charCodeAt() <= 'z'.charCodeAt())
		return true;
	if (char.charCodeAt() >= 'A'.charCodeAt() && char.charCodeAt() <= 'Z'.charCodeAt())
		return true;
	return false;
}