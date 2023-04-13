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
  const [n, k] = input[0].split(" ").map((el) => Number(el));
  const coins = input.slice(1).map((el) => Number(el));
  console.log(solution(k, coins));
  process.exit();
});

function solution(k, coins) {
  const arr = new Array(k + 1).fill(Number.MAX_SAFE_INTEGER);
  for (let i = Math.min(...coins); i <= k; i++) {
    coins.forEach((coin) => {
      if (i - coin < 0) return;
      if (i === coin) {
        arr[coin] = 1;
        return;
      }
      if (arr[i - coin] !== Number.MAX_SAFE_INTEGER) {
        const temp = arr[i - coin] + 1;
        if (temp < arr[i]) {
          arr[i] = temp;
        }
      }
    });
  }
  return arr[k] === Number.MAX_SAFE_INTEGER ? -1 : arr[k];
}
