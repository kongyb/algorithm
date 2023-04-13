const map = { "}": "{", ")": "(", "]": "[" };

function isValid(s: string): boolean {
  const stack: string[] = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(" || s[i] === "{" || s[i] === "[") {
      stack.push(s[i]);
      continue;
    }
    if (stack[stack.length - 1] === map[s[i]]) {
      stack.pop();
      continue;
    }
    return false;
  }
  return stack.length === 0;
}
