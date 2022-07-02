function solution(enroll, referral, seller, amount) {
    let moneyArr = new Array(enroll.length).fill(0);
    let parentArr = new Array(enroll.length).fill(-1);
    let nameObj = {};
    for (let i=0; i<enroll.length; i++){
        let name = enroll[i];
        nameObj[name] = i;
        if(referral[i] !== '-')
            parentArr[i] = nameObj[referral[i]];
    }
    for (let i=0; i<seller.length; i++)
        addMoney(moneyArr, parentArr, nameObj[seller[i]], 100 * amount[i]);
    return moneyArr;
}

function addMoney(moneyArr, parentArr, index, money){
    let ref = Math.floor(money / 10);
    moneyArr[index] += (money - ref);
    let parentIndex = parentArr[index];
    if (ref > 0 && parentIndex !== -1)
        addMoney(moneyArr, parentArr, parentIndex, ref);
}