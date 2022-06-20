function solution(lines){
	let max = 0;
	let queue = [];
	for (const line of lines){
		let [date, time, T] = line.split(' ');
		let endTime = new Date(date + ' ' + time);
		let during = parseFloat(T) * 1000;
		let startTime = new Date(endTime - (during - 1));
		queue.push([startTime, endTime]);
	}
	while (queue.length > 0){
		let [startTime, endTime] = queue.shift();
		let cnt = 1;
		let back1 = new Date(endTime.getTime() + 999);
		let back2 = new Date(endTime.getTime() + 3999);
		for (let i=0; i<queue.length; i++){
			if (queue[i][0] <= back1)
				cnt++;
			if (queue[i][1] > back2)
				break;
		}
		max = max > cnt ? max : cnt;
	}
	return max;
}

// function solution(lines){
// 	let answer = 0;
// 	let queue = [];
// 	for (const line of lines){
// 		let [date, time, T] = line.split(' ');
// 		queue.push(toSecond(time, T));
// 	}
// 	while (queue.length > 0){
// 		let [startTime, endTime] = queue.shift();
// 		let max = 1;
// 		for (let i=0; i<queue.length; i++){
// 			if (endTime + 999 >= queue[i][0])
// 				max++;
// 			if (queue[i][1] - 2999 > endTime + 999)
// 				break;
// 		}
// 		answer = max > answer ? max : answer;
// 	}
// 	return answer;
// }

// function toSecond(timeStr, T){
// 	let [time, ms] = timeStr.split('.');
// 	T = parseFloat(T)*1000;
// 	let [hour, min, sec] = time.split(':').map(el => parseInt(el));
// 	ms = parseInt(ms);
// 	let endTime = 3600000*hour + 60000*min + 1000*sec + ms;
// 	let startTime = endTime - (T - 1);
// 	return [startTime, endTime];
// }

let t1 = ["2016-09-15 00:00:00.000 3s"];
let t2 = ["2016-09-15 23:59:59.999 0.001s"];
let t3 = ["2016-09-15 01:00:04.002 2.0s", "2016-09-15 01:00:07.000 2s"];
let t4 = ["2016-09-15 01:00:04.002 2.0s", "2016-09-15 01:00:07.000 2s"];
let t5 = ["2016-09-15 20:59:57.421 0.351s", 
		"2016-09-15 20:59:58.233 1.181s", 
		"2016-09-15 20:59:58.299 0.8s", 
		"2016-09-15 20:59:58.688 1.041s",
		"2016-09-15 20:59:59.591 1.412s", 
		"2016-09-15 21:00:00.464 1.466s", 
		"2016-09-15 21:00:00.741 1.581s", 
		"2016-09-15 21:00:00.748 2.31s", 
		"2016-09-15 21:00:00.966 0.381s",
		"2016-09-15 21:00:02.066 2.62s"];
let t6 = ["2016-09-15 00:00:00.000 2.3s", "2016-09-15 23:59:59.999 0.1s"];

// console.log(solution(t1));
// console.log(solution(t2));
console.log(solution(t3));
// console.log(solution(t4));
// console.log(solution(t5));
// console.log(solution(t6));