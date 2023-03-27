function longestCycle(edges: number[]): number {
  let result: number = -1;
  const isVisited: boolean[] = new Array(edges.length).fill(false);
  for (let i = 0; i < edges.length; i++) {
    if (!isVisited[i]) {
      result = Math.max(result, getCycleLength(i, isVisited, edges));
    }
  }
  return result;
}

function getCycleLength(start: number, isVisited: boolean[], edges: number[]): number {
  let result: number = -1;
  const map: Map<number, number> = new Map();
  let len: number = 0;
  let curr: number = start;
  map.set(curr, len);
  while (edges[curr] !== -1) {
    curr = edges[curr];
    len++;
    if (isVisited[curr]) {
      break;
    }
    if (map.has(curr)) {
      result = len - (map.get(curr) as number);
      break;
    }
    map.set(curr, len);
  }
  for (const key of map.keys()) {
    isVisited[key] = true;
  }
  return result;
}
