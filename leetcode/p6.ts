function convert(s: string, numRows: number): string {
  if (numRows === 1 || numRows === s.length) {
    return s;
  }
  const chars: string[] = [];
  const dist = (numRows - 1) * 2;
  for (let i = 0; i < numRows; i++) {
    const steps = [dist - 2 * i, 2 * i];
    let index: number = i;
    let ptr: number = 0;
    while (index < s.length) {
      chars.push(s[index]);
      ptr = steps[ptr] === 0 ? (ptr + 1) % 2 : ptr;
      index += steps[ptr];
      ptr = (ptr + 1) % 2;
    }
  }
  return chars.join("");
}

console.log(convert("A", 1));
