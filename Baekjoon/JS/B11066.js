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
  const N = Number(input[0]);
  for (let i = 0; i < N; i++) {
    const cnt = Number(input[i * 2 + 1]);
    const chapters = input[i * 2 + 2].split(" ").map((el) => Number(el));
    console.log(solution(cnt, chapters));
  }
  process.exit();
});

function solution(cnt, chapters) {
  const heap = new Heap((a, b) => a < b);
  chapters.forEach((chapter) => heap.push(chapter));
  let sum = 0;
  while (heap.getLen() > 1) {
    const temp1 = heap.pop();
    const temp2 = heap.pop();
    sum += temp1 + temp2;
    heap.push(temp1 + temp2);
    console.log(temp1, temp2);
    console.log([...heap.data].sort((a, b) => a - b));
  }
  return sum;
}

class Heap {
  // compare = (a,b) => boolean
  // a가 우선순위 높으면 true,b가 우선순위 높다면 false
  constructor(compare) {
    this.data = [];
    this.len = 0;
    this.compare = compare;
  }

  push(value) {
    this.data.push(value);
    this.len++;
    let child = this.len - 1;
    let parent = Math.floor((child - 1) / 2);
    while (parent >= 0 && this.compare(this.data[child], this.data[parent])) {
      this.swap(child, parent);
      child = parent;
      parent = Math.floor((child - 1) / 2);
    }
    return;
  }

  pop() {
    if (this.len === 0) {
      return null;
    }
    if (this.len === 1) {
      this.len = 0;
      return this.data.pop();
    }
    this.swap(0, this.len - 1);
    const result = this.data.pop();
    this.len--;
    let parent = 0;
    let left = Math.min(parent * 2 + 1, this.len - 1);
    let right = Math.min(parent * 2 + 2, this.len - 1);
    while (
      this.compare(this.data[left], this.data[parent]) ||
      this.compare(this.data[right], this.data[parent])
    ) {
      let temp = this.compare(this.data[left], this.data[right]) ? left : right;
      this.swap(temp, parent);
      parent = temp;
      left = Math.min(parent * 2 + 1, this.len - 1);
      right = Math.min(parent * 2 + 2, this.len - 1);
    }
    return result;
  }

  swap(index1, index2) {
    let temp = this.data[index1];
    this.data[index1] = this.data[index2];
    this.data[index2] = temp;
    return;
  }

  getLen() {
    return this.len;
  }
}
