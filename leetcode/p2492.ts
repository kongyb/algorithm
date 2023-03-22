function minScore(n: number, roads: number[][]): number {
  const paths: Path[][] = [];
  for (let i = 0; i <= n; i++) {
    paths.push([]);
  }

  for (const road of roads) {
    const [c1, c2, len] = road;
    paths[c1].push(new Path(c2, len));
    paths[c2].push(new Path(c1, len));
  }

  const union: number[] = [];
  for (let i = 0; i <= n; i++) {
    union.push(i);
  }
  const queue: number[] = [1];
  let index: number = 0;
  while (index < queue.length) {
    const curr = queue[index];
    for (const p of paths[curr]) {
      const next: number = p.dst;
      if (union[next] !== 1) {
        union[next] = 1;
        queue.push(next);
      }
    }
    index++;
  }

  let min: number = 10001;
  for (let i = 1; i <= n; i++) {
    if (union[i] === 1) {
      for (const p of paths[i]) {
        min = Math.min(p.len, min);
      }
    }
  }
  return min;
}

class Path {
  dst: number;
  len: number;

  constructor(dst: number, len: number) {
    this.dst = dst;
    this.len = len;
  }
}
