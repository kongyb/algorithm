function totalFruit(fruits: number[]): number {
  let max: number = 0;
  let index: number = 0;
  while (index < fruits.length) {
    let next: number = index + 1;
    while (next < fruits.length && fruits[next] === fruits[index]) {
      next++;
    }
    let cnt: number = next - index;
    let ptr: number = next;
    while (ptr < fruits.length && (fruits[ptr] === fruits[index] || fruits[ptr] === fruits[next])) {
      ptr++;
      cnt++;
    }
    max = Math.max(max, cnt);
    index = next;
  }
  return max;
}
