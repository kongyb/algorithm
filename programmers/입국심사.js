// 심사가 끝나는 시간을 기준으로 최소힙
// 힙에서 뽑을 때마다 cnt++ 다시 심사시간을 더해 힙에 삽입한다.

class Heap{
	constructor(){
		this.arr = [];
		this.len = 0;
	}

	swap(index1, index2){
		let temp = this.arr[index1];
		this.arr[index1] = this.arr[index2];
		this.arr[index2] = temp;
		return;
	}

	// next : [다음심사가 끝나는 시간, 심사에 걸리는 시간]
	push(next){
		this.arr.push(next);
		this.len++;
		if (this.len === 1)
			return;
		let child = this.len - 1;
		let parent = Math.floor((child - 1) / 2);
		while (parent >=0 && this.arr[parent][0] > this.arr[child][0]){
			this.swap(parent, child);
			child = parent;
			parent = Math.floor((child - 1) / 2);
		}
		return;
	}

	pop(){
		this.swap(this.len - 1, 0);
		let value = this.arr.pop();
		this.len--;
		let parent = 0;
		let left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
		let right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
		while (this.arr[parent][0] > Math.min(this.arr[left][0], this.arr[right][0])){
			if (this.arr[left][0] < this.arr[right][0]){
				this.swap(parent, left);
				parent = left;
			}
			else{
				this.swap(parent, right);
				parent = right;
			}
			left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
			right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;	
		}
		return value;
	}
}

function solution(n, times) {
    let cnt = 0;
	let heap = new Heap();
	for (const time of times)
		heap.push([time, time]);
	while (true){
		let [next, during] = heap.pop();
		cnt++;
		if (cnt === n)
			return next;
		heap.push([next+during, during]);
	}
}

console.log(solution(6,[7,10]));