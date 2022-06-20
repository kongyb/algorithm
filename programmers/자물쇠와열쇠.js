//https://programmers.co.kr/learn/courses/30/lessons/60059
function solution(key, lock) {
    let keySize = key.length;
    let lockSize = lock.length;
    for (let time = 0; time < 4; time++){
        for (let i= (-keySize + 1); i<lockSize; i++){
            for (let j= (-keySize + 1); j<lockSize; j++){
                if (putKey(i, j, key, lock))
                    return true;
            }
        }
        if (time !== 3)
            key = rotate(key);
    }
    return false;
}

function putKey(row, col, key, lock){
	console.log(`row: ${row}, col: ${col}`)
    for (let i=0; i<lock.length; i++){
        for (let j=0; j<lock.length; j++){
            let value;
            if (i < key.length + row && j < key.length + col && i >= row && j >= col)
                value = key[-row+i][-col+j] + lock[i][j]
            else
                value = lock[i][j]
			console.log(`i: ${i}, j: ${j}, value: ${value}`)
            if (value !== 1)
                return false;
        }
    }
    return true;
}

function rotate(key){
    let newKey = [];
    for (let i=key.length-1; i>=0; i--){
        let temp = [];
        for (let j=0; j<key.length; j++){
            temp.push(key[j][i]); 
        }
        newKey.push(temp);
    }
    return newKey;
}

solution([[0, 0, 0], [1, 0, 0], [0, 1, 1]], [[1, 1, 1], [1, 1, 0], [1, 0, 1]]);