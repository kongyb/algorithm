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
    
    add(job){
        this.arr.push(job);
        let child = this.len;
        this.len++;
        let parent = Math.floor((child - 1) / 2);
        while (parent >= 0 && this.arr[parent][1] > this.arr[child][1]){
            this.swap(child, parent);
            child = parent;
            parent = Math.floor((child - 1) / 2);
        }
        return;
    }
    
    poll(){
        if (this.len === 0)
            return null;
        if (this.len === 1){
            this.len--;
            return this.arr.pop();   
        }
        this.swap(0, this.len-1);
        let job = this.arr.pop();
        this.len--;
        let parent = 0;
        let left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
        let right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
        while (this.arr[parent][1] > Math.min(this.arr[left][1], this.arr[right][1])){
            if (this.arr[left][1] > this.arr[right][1]){
                this.swap(parent, right);
                parent = right;
            }
            else {
                this.swap(parent, left);
                parent = left;
            }
            left = parent * 2 + 1 >= this.len ? parent : parent * 2 + 1;
            right = parent * 2 + 2 >= this.len ? parent : parent * 2 + 2;
        }
        return job;
    }
}

function solution(jobs) {
    let times = [];
    let cnt = jobs.length;
    let taskQueue = new Heap();
    jobs.sort((a,b) => {
		if (a[0] - b[0] === 0)
			return a[1] - b[1];
		return a[0] - b[0];
	});
    let time = jobs[0][0];
    taskQueue.add(jobs.shift());
    while (times.length < cnt){
        let job = taskQueue.poll();
        if (job === null){
            time = jobs[0][0];
            taskQueue.add(jobs.shift());
            continue;
        }
        time += job[1];
        while (jobs.length > 0 && jobs[0][0] <= time)
            taskQueue.add(jobs.shift());
        times.push(time - job[0]);
    }
    let sum = times.reduce((acc, curr) => acc + curr);
    return Math.floor(sum/cnt);
}