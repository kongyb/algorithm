function closestMeetingNode(edges: number[], node1: number, node2: number): number {
  const points: Point[] = new Array(edges.length).fill(null).map((el, index) => new Point(index));
  let ptr: number = node1;
  let distance: number = 0;
  while (ptr !== -1) {
    const next = points[ptr];
    if (next.fromNode1 !== null && next.fromNode1 < distance) {
      ptr = -1;
      continue;
    }
    points[ptr].fromNode1 = distance;
    distance++;
    ptr = edges[ptr];
  }

  ptr = node2;
  distance = 0;
  while (ptr !== -1) {
    const next = points[ptr];
    if (next.fromNode2 !== null && next.fromNode2 < distance) {
      ptr = -1;
      continue;
    }
    points[ptr].fromNode2 = distance;
    distance++;
    ptr = edges[ptr];
  }

  let result: number = -1;
  let minMaximum = Number.MAX_SAFE_INTEGER;
  for (const point of points) {
    if (
      point.fromNode1 !== null &&
      point.fromNode2 !== null &&
      minMaximum > Math.max(point.fromNode1, point.fromNode2)
    ) {
      result = point.index;
      minMaximum = Math.max(point.fromNode1, point.fromNode2);
    }
  }
  return result;
}

class Point {
  index: number;
  fromNode1: number | null;
  fromNode2: number | null;

  constructor(index: number) {
    this.index = index;
    this.fromNode1 = null;
    this.fromNode2 = null;
  }
}

console.log(closestMeetingNode([2, 0, 0], 2, 0));
