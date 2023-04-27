import java.util.Scanner;

public class BOJ11054 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int[] nums = new int[N];
        for (int i=0; i<N; i++) {
            nums[i] = sc.nextInt();
        }
        System.out.println(solution(nums, N));
    }

    static int solution(int[] nums, int N) {
        int[] straight = calculateLen(nums, N);
        int left = 0;
        int right = N-1;
        while (left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
        int[] reverse = calculateLen(nums, N);

        int max = 0;
        for (int i=0; i<N; i++) {
            max = Math.max(max, straight[i] + reverse[N-1 - i] - 1);
        }
        return max;
    }

    static int[] calculateLen(int[] nums, int N) {
        int[] increase = new int[N];
        int[] lenArr = new int[N];
        increase[0] = nums[0];
        int len = 1;
        lenArr[0] = len;

        for (int i=1; i<N; i++) {
            int num = nums[i];
            if (num > increase[len - 1]) {
                increase[len] = num;
                len++;
            }
            else {
                increase[binarySearch(increase, len, num)] = num;
            }
            lenArr[i] = len;
        }
        return lenArr;
    }

    static int binarySearch(int[] arr, int end, int target) {
        int left = 0;
        int right = end;
        while (left < right) {
            int mid = (left + right) / 2;
            if (arr[mid] >= target) {
                right = mid;
            }
            else {
                left = mid + 1;
            }
        }
        return left;
    }
}
