class CombGen{
	constructor(len, max){
		this.arr = [];
		for (let i=0; i<len; i++)
			this.arr.push(i);
		this.len = len;
		this.max = max;
		this.status = true;
	}

	get(){
		let result = [...this.arr];
		this.next(this.len - 1);
		return result;
	}

	next(index){
		if (index === 0 && this.arr[0] === this.max - this.len){
			this.status = false;
			return;
		}
		this.arr[index]++;
		if (this.arr[index] > this.max - (this.len - index)){
			this.next(index - 1);
			this.arr[index] = this.arr[index - 1] + 1;
		}
		return;
	}
}

let c = new CombGen(10, 21);
let cnt = 0;
console.log(c.arr);
while (c.status){
	c.get();
	cnt++;
}
console.log(c.arr);
console.log(cnt);