const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let cnt;
let rowNum=0;
let max;
let min;

rl.on('line', function (line){
	if (rowNum === 0){
		cnt = Number(line);
		rowNum++;
	}
	else if (rowNum === 1){
		min = line.split(' ').map(el => Number(el));
		max = line.split(' ').map(el => Number(el));
		rowNum++;
	}
	else{
		let layer = line.split(' ').map(el => Number(el));
		minSum(min, layer);
		maxSum(max, layer);
	}
})
.on('close',function(){
	console.log(`${Math.max(...max)} ${Math.min(...min)}`);
	process.exit();
});

function minSum(min, layer){
	min[0] = Math.min(min[0] + layer[0], min[0] + layer[1]);
	min[1] = Math.min(min[1] + layer[0], min[1] + layer[1], min[1] + layer[2]);
	min[2] = Math.min(min[2] + layer[1], min[2] + layer[2]);
}

function maxSum(max, layer){
	max[0] = Math.max(max[0] + layer[0], max[0] + layer[1]);
	max[1] = Math.max(max[1] + layer[0], max[1] + layer[1], max[1] + layer[2]);
	max[2] = Math.max(max[2] + layer[1], max[2] + layer[2]);
}