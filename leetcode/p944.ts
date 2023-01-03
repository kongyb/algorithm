function minDeletionSize(strs: string[]): number {
  const len: number = strs.length;
  let cnt: number = 0;
  for (let i = 0; i < strs[0].length; i++) {
    let char: string = strs[0][i];
    for (let j = 1; j < len; j++) {
      if (char > strs[j][i]) {
        cnt++;
        break;
      }
      char = strs[j][i];
    }
  }
  return cnt;
}
