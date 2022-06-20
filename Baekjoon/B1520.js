const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let input = [];

rl.on('line', function (line) {
  input.push(line)
})
  .on('close', function () {
  let [h,w] = input[0].split(' ').map(el => Number(el));
  let map = [];
  for (let i=1; i<=h; i++){
	  map.push(input[i].split(' ').map(el => Number(el)));
  }
  console.log(`${solution(h,w,map)}`)
  process.exit();
});

function solution(h,w,map){
	let dp=[];
	for(let i=0; i<h; i++)
		dp.push(new Array(w).fill(-1));
	return (boardDfs(map,dp,h-1,w-1,w,h));
}

function inBoard(row,col,w,h){
	if (row < 0 || row >= h || col < 0 || col >= w)
		return 0;
	return 1;
}

function boardDfs(map, dp, row, col, w, h){
	if (row === 0 && col === 0){
		return 1;
	}
	let result = 0;
	if(inBoard(row-1,col,w,h) == 1 && map[row-1][col] > map[row][col]){
		result += dp[row-1][col] == -1 ? boardDfs(map,dp,row-1,col,w,h):dp[row-1][col];
	}
	if(inBoard(row+1,col,w,h) == 1 && map[row+1][col] > map[row][col]){
		result += dp[row+1][col] == -1 ? boardDfs(map,dp,row+1,col,w,h):dp[row+1][col];
	}
	if(inBoard(row,col-1,w,h) == 1 && map[row][col-1] > map[row][col]){
		result += dp[row][col-1] == -1 ? boardDfs(map,dp,row,col-1,w,h):dp[row][col-1];
	}
	if(inBoard(row,col+1,w,h) == 1 && map[row][col+1] > map[row][col]){
		result += dp[row][col+1] == -1 ? boardDfs(map,dp,row,col+1,w,h):dp[row][col+1];
	}
	dp[row][col] = result;
	return result;
}