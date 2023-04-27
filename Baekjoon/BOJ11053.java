import java.util.Arrays;
import java.util.Scanner;

public class BOJ11053 {
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
        int[] increase = new int[N];
        increase[0] = nums[0];
        int len = 1;
        for (int i=1; i<N; i++) {
            int num = nums[i];
            if (num > increase[len - 1]) {
                increase[len] = num;
                len++;
                continue;
            }
            increase[binarySearch(increase, len, num)] = num;
        }
        return len;
    }

    static int binarySearch(int[] nums, int end, int target) {
        int left = 0;
        int right = end;
        while (left < right) {
            int mid = (left + right) / 2;
            if (nums[mid] >= target) {
                right = mid;
            }
            else {
                left = mid + 1;
            }
        }
        return left;
    }
}
