function maxIceCream(costs: number[], coins: number): number {
  costs.sort((a, b) => a - b);
  const sumArr: number[] = new Array(costs.length).fill(0);
  for (let i = 0; i < costs.length; i++) {
    const prevSum = i === 0 ? 0 : sumArr[i - 1];
    sumArr[i] = prevSum + costs[i];
    if (sumArr[i] > coins) {
      return i;
    }
  }
  return costs.length;
}
