function findMinArrowShots(points: number[][]): number {
  points.sort((a, b) => a[0] - b[0]);
  let cnt: number = 1;
  let interval: number[] = points[0];
  for (const point of points) {
    if (isIntersect(interval, point)) {
      interval = getIntersection(interval, point);
      continue;
    }
    cnt++;
    interval = point;
  }
  return cnt;
}

function isIntersect(interval1: number[], interval2: number[]): boolean {
  if (interval1[1] < interval2[0] || interval2[1] < interval1[0]) {
    return false;
  }
  return true;
}

function getIntersection(interval1: number[], interval2: number[]): number[] {
  return [Math.max(interval1[0], interval2[0]), Math.min(interval1[1], interval2[1])];
}
