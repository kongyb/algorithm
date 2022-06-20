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
	let albumCnt = Number(input[0]);
	let suggestionCnt = Number(input[1]);
	let suggestions = input[2].split(' ').map(el => Number(el));
	console.log(solution(albumCnt, suggestions, suggestionCnt));
	process.exit();
});

function solution(albumCnt, suggestions, suggestionCnt){
	let students = new Array(101).fill(0);
	let album = [];
	for (let i=0; i<suggestionCnt; i++){
		let suggest = suggestions[i];
		if (students[suggest] !== 0){
			students[suggest]++;
			continue;
		}

		if (album.length < albumCnt){
			students[suggest]++;
			album.push([suggest, i]);
		}
		else{
			album.sort((a,b) => {
				if (students[a[0]] > students[b[0]])
					return 1
				else if (students[a[0]] < students[b[0]])
					return -1
				else
					return a[1] - b[1];
			});
			let deleteNum = album.shift()[0];
			students[deleteNum] = 0;
			students[suggest]++;
			album.push([suggest, i]);
		}
	}
	album.sort((a,b) => a[0] - b[0]);
	return album.map(el => el[0]).join(' ');
}