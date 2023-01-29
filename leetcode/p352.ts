class SummaryRanges {
  streams: Num[];

  constructor() {
    this.streams = [];
    for (let i = 0; i <= 10000; i++) {
      this.streams.push(new Num(i));
    }
  }

  addNum(value: number): void {
    if (this.streams[value].isFill) {
      return;
    }
    const num: Num = this.streams[value];
    num.isFill = true;
    this.merge(value);
  }

  getIntervals(): number[][] {
    let index: number = 0;
    const result: number[][] = [];
    while (index < this.streams.length) {
      const num: Num = this.streams[index];
      if (!num.isFill) {
        index++;
        continue;
      }
      result.push([num.start, num.end]);
      index = num.end + 1;
    }
    return result;
  }

  private merge(value: number): void {
    let start = value;
    let end = value;
    while (start >= 0 && this.streams[start].isFill) {
      start--;
    }
    while (end < this.streams.length && this.streams[end].isFill) {
      end++;
    }
    start++;
    end--;
    for (let i = start; i <= end; i++) {
      this.streams[i].start = start;
      this.streams[i].end = end;
    }
    return;
  }
}

class Num {
  value: number;
  isFill: boolean;
  start: number;
  end: number;

  constructor(value: number) {
    this.value = value;
    this.isFill = false;
    this.start = -1;
    this.end = -1;
  }
}
