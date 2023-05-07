function longestObstacleCourseAtEachPosition(obstacles: number[]): number[] {
  let arr: number[] = [obstacles[0]];
  const result: number[] = [1];
  for (let i = 1; i < obstacles.length; i++) {
    let index: number = binarySearch(arr, obstacles[i]);
    if (index === arr.length) {
      arr.push(obstacles[i]);
    } else {
      arr[index] = obstacles[i];
    }
    result.push(index + 1);
  }
  return result;
}

// 같은경우도 포함해야하므로
// val보다 큰 최초의 인덱스
function binarySearch(arr: number[], val: number): number {
  if (arr[arr.length - 1] < val) {
    return arr.length;
  }
  let left: number = 0;
  let right: number = arr.length;
  while (left < right) {
    const mid: number = Math.floor((left + right) / 2);
    if (arr[mid] <= val) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left;
}
