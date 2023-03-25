function countPairs(n: number, edges: number[][]): number {
  const nodes: number[] = [];
  for (let i = 0; i < n; i++) {
    nodes.push(i);
  }

  function find(num: number): number {
    if (nodes[num] !== num) {
      let parent: number = find(nodes[num]);
      nodes[num] = parent;
    }
    return nodes[num];
  }

  for (const edge of edges) {
    const [n1, n2] = edge;
    const [p1, p2] = [find(n1), find(n2)];
    nodes[Math.max(p1, p2)] = Math.min(p1, p2);
  }

  function selectTwo(cnt: number) {
    return (cnt * (cnt - 1)) / 2;
  }

  let cntArr: number[] = new Array(n).fill(0);
  nodes.forEach((num) => cntArr[find(num)]++);
  let result: number = selectTwo(n);
  cntArr.forEach((cnt) => (result -= selectTwo(cnt)));
  return result;
}
