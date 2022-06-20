import copy
from collections import deque

n = int(input())
peoples = [0] + list(map(int, input().split()))

city = [[] for _ in range(n + 1)]
for i in range(n):
    arr = list(map(int, input().split()))

    for c in range(arr[0]):
        city[i + 1].append(arr[c + 1])
        # city[arr[c+1]].append(i+1)

# print(city)
def bfs(temp_Visited):
    target = 0
    groupA = []
    groupB = []  # 방문 안한 쪽
    for i in range(1, len(temp_Visited)):
        if temp_Visited[i] != 1:  # 방문 안한 쪽
            groupB.append(i)
        else:
            groupA.append(i)
    if len(groupB) == 0 or len(groupA) == 0:
        return -1
    que = deque()
    temp = groupB[-1]
    que.append(temp)
    temp_Visited[temp] = 1
    while que:
        temp = que.popleft()
        for c in city[temp]:
            if temp_Visited[c] == 0:
                que.append(c)
                temp_Visited[c] = 1
    if 0 in temp_Visited:
        return -1
    else:
        groupASum = 0
        groupBSum = 0
        for a in groupA:
            groupASum += peoples[a]
        for b in groupB:
            groupBSum += peoples[b]
        return abs(groupASum - groupBSum)


result = 9999999
for i in range(1, n + 1):
    visited = [1] + ([0] * n)
    visited[i] = 1
    copyVisited = copy.deepcopy(visited)
    want = bfs(copyVisited)
    if want >= 0:
        result = min(want, result)
    for t in range(len(city[i])):  # 하나씩 늘려서 bfs 돌리기
        closeCity = city[i][t]
        visited[closeCity] = 1
        copyVisited = copy.deepcopy(visited)
        want = bfs(copyVisited)
        if want >= 0:
            result = min(want, result)
if result == 9999999:
    print("-1")
else:
    print(result)
