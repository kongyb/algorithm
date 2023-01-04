function minimumRounds(tasks: number[]): number {
  let maxCnt = 0;
  const cntMap = new Map<number, number>();
  tasks.forEach((task) => {
    if (!cntMap.has(task)) {
      cntMap.set(task, 0);
    }
    cntMap.set(task, getFromMap(cntMap, task) + 1);
    maxCnt = Math.max(maxCnt, getFromMap(cntMap, task));
  });

  let result: number = 0;
  const roundArray: number[] = getRoundArray(maxCnt);
  for (const task of cntMap.keys()) {
    if (cntMap.get(task) === 1) {
      return -1;
    }
    result += roundArray[getFromMap(cntMap, task)];
  }
  return result;
}

function getRoundArray(maxCnt: number): number[] {
  const len = Math.max(4, maxCnt);
  const roundArray: number[] = new Array(len).fill(0);
  roundArray[2] = 1;
  roundArray[3] = 1;
  roundArray[4] = 2;
  for (let i = 5; i <= maxCnt; i++) {
    roundArray[i] = Math.min(roundArray[i - 2], roundArray[i - 3]) + 1;
  }
  return roundArray;
}

function getFromMap(map: Map<number, number>, key: number): number {
  let result = map.get(key);
  return !result ? 0 : result;
}
