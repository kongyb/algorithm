function bestTeamScore(scores: number[], ages: number[]): number {
  const len = scores.length;
  const players: Player[] = [];
  for (let i = 0; i < len; i++) {
    players.push(new Player(ages[i], scores[i]));
  }

  players.sort((a, b) => (a.age !== b.age ? a.age - b.age : a.score - b.score));
  let max = 0;
  // dp의 i번째 원소는 i번째 player가 포함된 conflict없는 팀이 가질 수 있는 score의 최댓값
  const dp: number[] = [];
  for (let i = 0; i < len; i++) {
    const p1: Player = players[i];
    let maxScore: number = p1.score;
    for (let j = 0; j < i; j++) {
      const p2: Player = players[j];
      if (compare(p1, p2)) {
        maxScore = Math.max(dp[j] + p1.score, maxScore);
      }
    }
    max = Math.max(max, maxScore);
    dp.push(maxScore);
  }
  return max;
}

function compare(p1: Player, p2: Player): boolean {
  return !(p1.age > p2.age && p1.score < p2.score);
}

class Player {
  age: number;
  score: number;

  constructor(age: number, score: number) {
    this.age = age;
    this.score = score;
  }
}
