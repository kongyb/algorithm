function canCompleteCircuit(gas: number[], cost: number[]): number {
  const diffs: number[] = gas.map((el, index) => el - cost[index]);
  let index: number = 0;
  let fromStart: number = 0;
  let toEnd: number = 0;
  for (let i = index; i < diffs.length; i++) {
    toEnd += diffs[i];
    if (toEnd < 0) {
      fromStart += toEnd;
      toEnd = 0;
      index = i + 1;
    }
  }
  return fromStart + toEnd < 0 ? -1 : index;
}
