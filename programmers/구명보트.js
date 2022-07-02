function solution(people, limit) {
    people.sort((a,b) => a - b);
    let left = 0;
    let right = people.length - 1;
    let curr = 0;
    let result = 0;
    while (left <= right){
        while (left <= right && curr + people[right] <= limit){
            curr += people[right];
            right--;
        }
        while (left <=right && curr + people[left] <= limit){
            curr += people[left];
            left++;
        }
        result++;
        curr = 0;
    }
    return result;
}