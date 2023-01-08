function maxPoints(points: Point[]): number {
  let max = 0;
  if (points.length === 1) {
    return 1;
  }
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      let cnt = 0;
      const point1 = points[i];
      const point2 = points[j];
      for (let k = 0; k < points.length; k++) {
        if (k === i || k === j) {
          cnt++;
          continue;
        }
        const point3 = points[k];
        if (checkOnLine(point1, point2, point3)) {
          cnt++;
        }
      }
      max = Math.max(cnt, max);
    }
  }
  return max;
}

function checkOnLine(point1: Point, point2: Point, point3: Point): boolean {
  return (
    (point1[1] - point2[1]) / (point1[0] - point2[0]) ===
    (point1[1] - point3[1]) / (point1[0] - point3[0])
  );
}

type Point = [number, number];
