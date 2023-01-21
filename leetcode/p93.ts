function restoreIpAddresses(s: string): string[] {
  const result: string[] = [];
  if (s.length > 12 || s.length < 4) {
    return result;
  }
  const dotsPos: number[][] = getCombination(1, s.length - 1, 3);
  for (const pos of dotsPos) {
    const IPAddr: string[] = toIPAddr(s, pos);
    if (checkVaild(IPAddr)) {
      result.push(IPAddr.join("."));
    }
  }
  return result;
}

function toIPAddr(s: string, pos: number[]): string[] {
  return [s.slice(0, pos[0]), s.slice(pos[0], pos[1]), s.slice(pos[1], pos[2]), s.slice(pos[2])];
}

function checkVaild(ipArr: string[]): boolean {
  for (const ip of ipArr) {
    const num = Number(ip);
    if (num > 255 || (ip.length !== 1 && ip[0] === "0")) {
      return false;
    }
  }

  return true;
}

function getCombination(curr: number, max: number, cnt: number): number[][] {
  if (cnt === 1) {
    return new Array(max - curr + 1)
      .fill(curr)
      .map((el, index) => el + index)
      .map((num) => [num]);
  }
  if (curr + cnt - 1 === max) {
    return [new Array(cnt).fill(curr).map((el, index) => el + index)];
  }
  const containArrs: number[][] = getCombination(curr + 1, max, cnt - 1);
  const notContainArrs: number[][] = getCombination(curr + 1, max, cnt);
  return [...containArrs.map((arr) => [curr, ...arr]), ...notContainArrs];
}

console.log(restoreIpAddresses("25525511135"));
console.log(restoreIpAddresses("0000"));
console.log(restoreIpAddresses("101023"));
console.log(restoreIpAddresses("010010"));
