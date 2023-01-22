function partition(s: string): string[][] {
  if (s.length === 1) {
    return [[s]];
  }
  const result: string[][] = [];
  const splitPos: number[][] = getSplitPos(1, s.length - 1);
  console.log(splitPos);
  for (const arr of splitPos) {
    const strArr: string[] = toStringArr(arr, s);
    const isValid = strArr.reduce((bool, curr) => {
      return bool && checkPalindrome(curr);
    }, true);
    if (isValid) {
      result.push(strArr);
    }
  }
  return result;
}

function checkPalindrome(str: string): boolean {
  let left = 0;
  let right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}

function toStringArr(split: number[], s: string): string[] {
  const result: string[] = [];
  let left = 0;
  for (const num of split) {
    let right = num;
    result.push(s.slice(left, right));
    left = right;
  }
  result.push(s.slice(left));
  return result;
}

function getSplitPos(curr: number, max: number): number[][] {
  if (curr === max) {
    return [[], [curr]];
  }
  const temp: number[][] = getSplitPos(curr + 1, max);
  return [...temp.map((arr) => [curr, ...arr]), ...temp];
}

console.log(partition("aab"));
