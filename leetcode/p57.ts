function insert(intervals: number[][], newInterval: number[]): number[][] {
  let index = 0;
  const newIntervals = [...intervals];
  while (index < intervals.length && intervals[index][0] < newInterval[0]) {
    index++;
  }
  newIntervals.splice(index, 0, newInterval);

  return getMergedArray(newIntervals);
}

function isIntersect(interval1: number[], interval2: number[]): boolean {
  return interval1[1] >= interval2[0];
}

function mergeIntervals(interval1: number[], interval2: number[]): number[] {
  return [Math.min(interval1[0], interval2[0]), Math.max(interval1[1], interval2[1])];
}

function getMergedArray(intervals: number[][]): number[][] {
  const result = [intervals[0]];
  let index = 1;
  while (index < intervals.length) {
    if (isIntersect(result[result.length - 1], intervals[index])) {
      result.push(mergeIntervals(result.pop() as number[], intervals[index]));
    } else {
      result.push(intervals[index]);
    }
    index++;
  }
  return result;
}
