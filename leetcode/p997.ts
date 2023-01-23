function findJudge(n: number, trust: number[][]): number {
  const people: Person[] = new Array(n + 1).fill(1).map((el) => new Person());

  for (const pair of trust) {
    people[pair[0]].trust++;
    people[pair[1]].trusted++;
  }

  for (let i = 1; i <= n; i++) {
    const p = people[i];
    if (p.trusted === n - 1 && p.trust === 0) {
      return i;
    }
  }
  return -1;
}

class Person {
  trusted: number;
  trust: number;

  constructor() {
    this.trusted = 0;
    this.trust = 0;
  }
}
