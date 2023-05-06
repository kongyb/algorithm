const DIV = Math.pow(10, 9) + 7;

function numSubseq(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  const cntArr: number[] = getCntArr(nums.length);
  let result: number = 0;
  for (let i = 0; i < nums.length; i++) {
    const index: number = binarySearch(nums, target - nums[i]);
    if (index < i) {
      continue;
    }
    result = (result + cntArr[index - i]) % DIV;
  }
  return result;
}

function binarySearch(nums: number[], val: number): number {
  let left: number = 0;
  let right: number = nums.length;
  while (left < right) {
    const mid: number = Math.floor((left + right) / 2);
    if (nums[mid] <= val) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left - 1;
}

function getCntArr(len: number): number[] {
  const cntArr: number[] = new Array(len).fill(0);
  cntArr[0] = 1;
  for (let i = 1; i < len; i++) {
    cntArr[i] = (cntArr[i - 1] * 2) % DIV;
  }
  return cntArr;
}
