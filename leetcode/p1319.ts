function makeConnected(n: number, connections: number[][]): number {
  if (connections.length < n - 1) {
    return -1;
  }
  const union: number[] = [];
  for (let i = 0; i < n; i++) {
    union.push(i);
  }

  function find(n: number): number {
    if (n !== union[n]) {
      union[n] = find(union[n]);
    }
    return union[n];
  }

  function merge(n1: number, n2: number): void {
    const p1: number = find(n1);
    const p2: number = find(n2);
    if (p1 !== p2) {
      union[Math.max(p1, p2)] = Math.min(p1, p2);
    }
    return;
  }

  for (const conn of connections) {
    const [n1, n2] = conn;
    merge(n1, n2);
  }

  let cnt: number = 0;
  for (let i = 0; i < n; i++) {
    if (union[i] === i) {
      cnt++;
    }
  }

  return cnt - 1;
}
