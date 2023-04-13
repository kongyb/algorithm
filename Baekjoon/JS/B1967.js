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
  const cnt = Number(input[0]);
  const nodes = [];
  for (let i = 0; i <= cnt; i++) {
    nodes.push(new TreeNode());
  }
  for (let i = 1; i < cnt; i++) {
    const [p, c, len] = input[i].split(" ").map((el) => Number(el));
    const parentNode = nodes[p];
    const childNode = nodes[c];
    parentNode.addChild(childNode, len);
  }
  console.log(solution(nodes));
  process.exit();
});

function solution(nodes) {
  const root = nodes[1];
  root.calculate();
  let max = 0;
  for (let i = 1; i < nodes.length; i++) {
    max = Math.max(max, nodes[i].getMaxDiameter());
  }
  return max;
}

class TreeNode {
  constructor() {
    this.child = [];
    this.dist = [];
    this.maxDiameter = 0;
    this.maxPath = 0;
  }

  addChild(childNode, len) {
    this.child.push(childNode);
    this.dist.push(len);
  }

  calculate() {
    if (this.child.length === 0) {
      return;
    }
    const path = [];
    for (let i = 0; i < this.child.length; i++) {
      const c = this.child[i];
      c.calculate();
      path.push(c.getMaxPath() + this.dist[i]);
    }
    if (path.length === 1) {
      this.maxPath = path[0];
      this.maxDiameter = path[0];
      return;
    }
    path.sort((a, b) => b - a);
    this.maxPath = path[0];
    this.maxDiameter = path[1] + path[0];
    return;
  }

  getMaxPath() {
    return this.maxPath;
  }

  getMaxDiameter() {
    return this.maxDiameter;
  }
}
