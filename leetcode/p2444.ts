function countSubarrays(nums: number[], minK: number, maxK: number): number {
  let left: number = 0;
  let result: number = 0;
  while (left < nums.length) {
    let right: number = left;
    let minIndex: number[] = [];
    let maxIndex: number[] = [];
    while (right < nums.length && nums[right] <= maxK && nums[right] >= minK) {
      if (nums[right] === maxK) {
        maxIndex.push(right);
      }
      if (nums[right] === minK) {
        minIndex.push(right);
      }
      right++;
    }
    if (maxIndex.length !== 0 && minIndex.length !== 0) {
      result += getFixedBoundArrayCnt(left, right, maxIndex, minIndex);
    }
    left = right + 1;
  }
  return result;
}

function getFixedBoundArrayCnt(
  left: number,
  right: number,
  maxIndex: number[],
  minIndex: number[]
) {
  // left이상 right미만
  let result = getContinuousArrayCnt(right - left);
  // left이상
  for (let i = 0; i < maxIndex.length; i++) {
    const prev: number = i === 0 ? left : maxIndex[i - 1] + 1;
    result -= getContinuousArrayCnt(maxIndex[i] - prev);
  }
  result -= getContinuousArrayCnt(right - maxIndex[maxIndex.length - 1] - 1);

  for (let i = 0; i < minIndex.length; i++) {
    const prev: number = i === 0 ? left : minIndex[i - 1] + 1;
    result -= getContinuousArrayCnt(minIndex[i] - prev);
  }
  result -= getContinuousArrayCnt(right - minIndex[minIndex.length - 1] - 1);

  const mergedArr: number[] = merge(minIndex, maxIndex);
  for (let i = 0; i < mergedArr.length; i++) {
    const prev: number = i === 0 ? left : mergedArr[i - 1] + 1;
    result += getContinuousArrayCnt(mergedArr[i] - prev);
  }
  result += getContinuousArrayCnt(right - mergedArr[mergedArr.length - 1] - 1);

  return result;
}

function getContinuousArrayCnt(len: number) {
  return (len * (len + 1)) / 2;
}

function merge(arr1: number[], arr2: number[]) {
  let ptr1: number = 0;
  let ptr2: number = 0;
  const result: number[] = [];
  while (ptr1 < arr1.length || ptr2 < arr2.length) {
    if (ptr1 === arr1.length) {
      result.push(arr2[ptr2]);
      ptr2++;
      continue;
    }
    if (ptr2 === arr2.length) {
      result.push(arr1[ptr1]);
      ptr1++;
      continue;
    }
    if (arr1[ptr1] < arr2[ptr2]) {
      result.push(arr1[ptr1]);
      ptr1++;
      continue;
    }
    result.push(arr2[ptr2]);
    ptr2++;
  }
  return result;
}
