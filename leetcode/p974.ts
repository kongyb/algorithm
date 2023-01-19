function subarraysDivByK(nums: number[], k: number): number {
  const restArr: number[] = new Array(k).fill(0);
  let startIndex: number = 0;
  let sum: number;

  restArr[getRest(nums[0], k)] = 1;
  console.log(restArr);
  sum = restArr[0];
  for (let i = 1; i < nums.length; i++) {
    const num = nums[i];
    const rest = getRest(num, k);
    startIndex = (startIndex + (k - rest)) % k;
    restArr[(startIndex + rest) % k]++;
    sum += restArr[startIndex];
  }
  return sum;
}

function getRest(divider: number, divisor: number) {
  const rest = divider % divisor;
  return rest < 0 ? rest + divisor : rest;
}

console.log(subarraysDivByK([-1, 2, 9], 2));
