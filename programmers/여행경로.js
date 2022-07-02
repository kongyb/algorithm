function solution(tickets) {
    let result = new Array(tickets.length + 1);
    tickets.sort((a,b) => a[1] > b[1] ? 1 : -1);
    let pathInfo = {};
    for (let [dep, des] of tickets){
        if (pathInfo[dep] === undefined)
            pathInfo[dep] = [[des,0]];
        else
            pathInfo[dep].push([des,0]);
    }
    result[0] = "ICN";
    findPath(pathInfo, result, 0);
    return result;
}

function findPath(pathInfo, result, index){
    if (index === result.length - 1)
        return 1;
    let curr = result[index];
	if (pathInfo[curr] === undefined)
		return -1;
    for (let i=0; i<pathInfo[curr].length; i++){
        if (pathInfo[curr][i][1] === 1)
            continue;
        result[index + 1] = pathInfo[curr][i][0];
        pathInfo[curr][i][1] = 1;
        let temp = findPath(pathInfo, result, index + 1);
        if (temp === 1)
            return 1;
        pathInfo[curr][i][1] = 0;
    }
    return -1;
}
