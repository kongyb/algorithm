const R = "R";
const D = "D";

function predictPartyVictory(senate: string): string {
  const rIndex: number[] = [];
  const dIndex: number[] = [];
  const stateArr: State[] = new Array(senate.length).fill(0).map((el) => new State());
  for (let i = 0; i < senate.length; i++) {
    if (senate[i] === R) {
      rIndex.push(i);
    }
    if (senate[i] === D) {
      dIndex.push(i);
    }
  }
  let round = 0;
  let ptr: number = 0;
  while (true) {
    const s: State = stateArr[ptr];
    if (s.isAlive) {
      const char = senate[ptr];
      const target: number[] = char === R ? dIndex : rIndex;
      const targetIndex: number = getAliveIndex(target, stateArr, ptr);
      if (targetIndex == -1) {
        return char === R ? "Radiant" : "Dire";
      }
      stateArr[targetIndex].isAlive = false;
      stateArr[targetIndex].round = round + 2;
    }
    ptr++;
    if (ptr >= senate.length) {
      round++;
      ptr -= senate.length;
    }
  }
}

function refresh(stateArr: State[], round: number) {
  for (const s of stateArr) {
    if (s.round >= round) {
      s.isAlive = true;
    }
  }
  return;
}

function getAliveIndex(indexArr: number[], stateArr: State[], start: number): number {
  for (const index of indexArr) {
    if (index < start) {
      continue;
    }
    if (stateArr[index].isAlive) {
      return index;
    }
  }
  for (const index of indexArr) {
    if (index > start) {
      break;
    }
    if (stateArr[index].isAlive) {
      return index;
    }
  }
  return -1;
}

class State {
  isAlive: boolean;
  round: number;

  constructor() {
    this.isAlive = true;
    this.round = 0;
  }
}

console.log(predictPartyVictory("DRRDRDRDRDDRDRDR"));
