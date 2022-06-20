import collections
import heapq
import copy
import collections


def solution(jobs):
    time = 0
    working_time = 0
    waiting = []
    length = len(jobs)
    jobs.sort()
    jobs = collections.deque(jobs)
    while jobs or waiting:
        if waiting:  # waiting에 들어있으면
            temp = heapq.heappop(waiting)
            time += temp[0]
            working_time += time - temp[1]
            while jobs and jobs[0][0] <= time:
                temp = jobs.popleft()
                heapq.heappush(waiting, [temp[1], temp[0]])
        else:
            temp = jobs.popleft()
            time = temp[0]
            kk = [temp[1], temp[0]]
            heapq.heappush(waiting, kk)
    return working_time // length


def solution2(jobs):
    answer = 0
    time = 0
    working_time = 0
    waiting = []
    length = len(jobs)
    jobs.sort()
    jobs = collections.deque(jobs)
    while jobs or waiting:
        if waiting:
            temp = heapq.heappop(waiting)
            time += temp[0]
            working_time += time - temp[1]
        else:
            while jobs:
                temp = jobs.popleft()
                input_time = temp[0]


input1 = [[0, 3], [1, 9], [2, 6]]
input2 = [[0, 9], [10, 3], [3, 6]]
input3 = [[0, 3], [1, 2], [9, 2]]
# 0초 ~ 3초 : 3
# 1초 ~ 3초 3초 ~5초 : 4
# 9초 ~ 11초 : 2   => 3
print(solution(input1))
