//https://programmers.co.kr/learn/courses/30/lessons/64065
function solution(s) {
    let obj = {};
    let strs = s.split(',');
    for (const str of strs){
		let num = parseInt(str);
		if (obj[num] === undefined)
			obj[num] = 1;
		else
			obj[num]++
    }
	let entries = Object.entries(obj);
	console.log(entries);
	entries.sort((a,b) => b[1] - a[1]);
	return entries.map(el => Number(el[0]));
}

// "{{2},{2,1},{2,1,3},{2,1,3,4}}"	[2, 1, 3, 4]