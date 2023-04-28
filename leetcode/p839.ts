function numSimilarGroups(strs: string[]): number {
  const relations: number[][] = [];
  const len: number = strs.length;
  for (let i = 0; i < len; i++) {
    relations.push([]);
  }

  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (checkAnagram(strs[i], strs[j])) {
        relations[i].push(j);
        relations[j].push(i);
      }
    }
  }

  const rootArr: number[] = new Array(len).fill(-1);
  for (let i = 0; i < len; i++) {
    if (rootArr[i] !== -1) {
      continue;
    }
    bfs(relations, rootArr, i);
  }

  const set: Set<number> = new Set();
  for (const root of rootArr) {
    set.add(root);
  }
  return set.size;
}

function bfs(relations: number[][], rootArr: number[], start: number): void {
  rootArr[start] = start;
  const queue: number[] = [start];
  let index: number = 0;
  while (index < queue.length) {
    const curr: number = queue[index];
    const relation: number[] = relations[curr];
    for (const r of relation) {
      if (rootArr[r] === -1) {
        rootArr[r] = start;
        queue.push(r);
      }
    }
    index++;
  }
  return;
}

function checkAnagram(str1: string, str2: string): boolean {
  const indexArr: number[] = [];
  const len: number = str1.length;
  for (let i = 0; i < len; i++) {
    if (str1[i] !== str2[i]) {
      indexArr.push(i);
    }
    if (indexArr.length > 2) {
      return false;
    }
  }
  if (indexArr.length === 1) {
    return false;
  }
  if (indexArr.length === 0) {
    return true;
  }
  const [i1, i2] = indexArr;
  return str1[i1] === str2[i2] && str1[i2] === str2[i1];
}
