class DPQ{
	constructor(){
		this.arr=[];
		this.len=0;
		this.max=0;
		this.min=0;
	}

	add(num){
		if (this.len === 0 || num >= this.max)
			this.arr.push(num);
		else if (num <= this.min)
			this.arr.unshift(num);
		else {
			let start = 0;
			let end = this.len;
			while (start < end){
				let mid = Math.floor((start + end) / 2);
				if (num === this.arr[mid]){
					start = mid;
					break;
				}
				else if (num < this.arr[mid])
					end = mid;
				else
					start = mid+1;
			}
			this.arr.splice(start, 0, num);
		}
		this.len++;
		this.min = this.arr[0];
		this.max = this.arr[this.len - 1];
		return;
	}

	pop(){
		if (this.len === 0)
			return;
		let value = this.arr.pop();
		this.len--;
		this.max = this.len !== 0 ? this.arr[this.len-1] : 0;
		this.min = this.len !== 0 ? this.arr[0] : 0;
		return value;
	}

	shift(){
		if (this.len === 0)
			return;
		let value = this.arr.shift();
		this.len--;
		this.max = this.len !== 0 ? this.arr[0] : 0;
		this.min = this.len !== 0 ? this.arr[0] : 0;
		return value;
	}
}

function solution(operations){
	let queue = new DPQ();
	for (const word of operations){
		let temp=word.split(' ');
        if(temp[0] === 'I'){
            queue.add(Number(temp[1]))
        }
        else{
            if(temp[1] === '1')
                queue.pop();
            else
                queue.shift();
        }
	}
	return [queue.max, queue.min];
}


// function binarySearch(arr,num,start,end){
//     let mid=Math.floor((start+end)/2)
//     if(start===mid){
//         return mid+1;
//     }
//     if(arr[mid]===num){
//         return mid;
//     }
//     else if(arr[mid]<num){
//         return binarySearch(arr,num,mid,end);
//     }
//     else{
//         return binarySearch(arr,num,start,mid);
//     }
// }

// class DPQ{
//     constructor(){
//         this.data=[];
//     }
//     enqueue(num){
//         if(this.data.length===0){
//             this.data.push(num);
//             return;
//         }
//         if(num<this.data[0]){
//             this.data.unshift(num);
//         }
//         else if(num>this.data[this.data.length-1]){
//             this.data.push(num);
//         }
//         else{
//             this.data.splice(binarySearch(this.data,num,0,this.data.length-1),0,num);
//         }
//     }
//     shift(){
//         if(this.data.length!==0){
//             return this.data.shift();
//         }
//     }
//     pop(){
//         if(this.data.length!==0){
//             return this.data.pop();
//         }
//     }
// }

// function solution(operations) {
//     let queue=new DPQ();
//     for(const word of operations){
//         let temp=word.split(' ');
//         if(temp[0]==='I'){
//             queue.enqueue(Number(temp[1]))
//         }
//         else{
//             if(temp[1]==='1'){
//                 queue.pop();
//             }
//             else{
//                 queue.shift();
//             }
//         }
//     }
//     if(queue.data.length === 0)
//         return [0,0];
//     else if (queue.data.length === 1){
//         let temp = queue.pop();
//         return [temp, temp];
//     }
//     return [queue.pop(),queue.shift()];
// }