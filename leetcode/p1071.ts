function gcdOfStrings(str1: string, str2: string): string {
  const long: string = str1.length > str2.length ? str1 : str2;
  const short: string = str1.length <= str2.length ? str1 : str2;
  for (let i = 1; i <= short.length; i++) {
    const len = short.length / i;
    if (divisible(long, short.slice(0, len)) && divisible(short, short.slice(0, len))) {
      return short.slice(0, len);
    }
  }
  return "";
}

function divisible(dividend: string, divisor: string): boolean {
  if (dividend.length % divisor.length != 0) {
    return false;
  }
  for (let i = 0; i < dividend.length; i += divisor.length) {
    if (dividend.slice(i, i + divisor.length) != divisor) {
      return false;
    }
  }
  return true;
}
