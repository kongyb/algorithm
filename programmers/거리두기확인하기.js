function solution(places) {
    var answer = [];
	for (const room of places)
		answer.push(checkRoom(room));
    return answer;
}

// ["POOOP", "OXXOX", "OPXPX", "OOXOX", "POXXP"] - > room
// P 사람 
function checkRoom(room){
	for (let i=0; i<5; i++){
		for (let j=0; j<5; j++){
			if (room[i][j] === 'P' && !bfs(room, i, j))
				return 0;
		}
	}
	return 1;
}

function bfs(room, row, col){
	let isChecked = [];
	for (let i=0; i<5; i++)
		isChecked.push(new Array(5).fill(false));
	let dirs = [[1,0], [-1,0], [0,1], [0,-1]];
	let queue = [[row, col, 0]];
	isChecked[row][col] = true;
	while (queue.length > 0){
		let [y, x, len] = queue.shift();
        if (room[y][x] === 'X')
                continue;
		if (room[y][x] === 'P' && len > 0 && len <= 2)
			return false;
		for (const dir of dirs){
			let [nextY, nextX] = [y + dir[0], x + dir[1]];
			if (nextY < 0 || nextY > 4 || nextX < 0 || nextX > 4)
				continue;
			if (!isChecked[nextY][nextX]){
				isChecked[nextY][nextX] = true;
				queue.push([nextY, nextX, len + 1]);
			}
		}
	}
	return true;
}