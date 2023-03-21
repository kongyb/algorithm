const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input = [];

rl.on("line", function (line) {
  input.push(line);
}).on("close", function () {
  //input에 입력값 한줄씩있음
  const [T, W] = input[0].split(" ").map((el) => Number(el));
  const info = new Array(T).fill(0);
  for (let i = 1; i <= T; i++) {
    info[i - 1] = Number(input[i]);
  }
  console.log(solution(T, W, info));
  process.exit();
});

/**
 *
 * @param {Number} T
 * @param {Number} W
 * @param {Number[]} info
 */
function solution(T, W, info) {
  // T * W * 2
  let dp = [];
  let max = 0;
  for (let i = 0; i < T; i++) {
    dp.push(new Array(W + 1).fill(0));
  }
  for (let i = 0; i < T; i++) {
    for (let j = 0; j <= W; j++) {
      const noMove = i > 0 ? dp[i - 1][j] : 0;
      const move = i > 0 && j > 0 ? dp[i - 1][j - 1] : 0;
      const curr = j % 2 === 0 ? 1 : 2;
      const add = curr === info[i] ? 1 : 0;
      dp[i][j] = Math.max(noMove, move) + add;
      max = Math.max(max, dp[i][j]);
    }
  }
  return max;
}

// dp[j][k]   j의 시간에 k만큼의 위치를 이동했을때의 보유한 자두의 최댓값
