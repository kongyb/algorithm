// KMP복습하기

function strStr(haystack: string, needle: string): number {
  const pi: number[] = getPi(needle);
  let len: number = 0;
  for (let i = 0; i < haystack.length; i++) {
    while (len > 0 && haystack[i] !== needle[len]) {
      len = pi[len - 1];
    }
    if (needle[len] === haystack[i]) {
      len++;
    }
    if (len === needle.length) {
      return i - len + 1;
    }
  }
  return -1;
}

function getPi(str: string): number[] {
  const result: number[] = new Array(str.length).fill(0);
  let len: number = 0;
  for (let i = 1; i < str.length; i++) {
    while (len > 0 && str[len] !== str[i]) {
      len = result[len - 1];
    }
    if (str[len] === str[i]) {
      len++;
    }
    result[i] = len;
  }
  return result;
}

console.log(strStr("mississippi", "issip"));
