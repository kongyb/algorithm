import java.util.Scanner;

public class BOJ1912 {
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
        int[] dp = new int[N];
        dp[0] = nums[0];
        int max = dp[0];
        for (int i=1; i<N; i++) {
            int sum = dp[i-1] + nums[i];
            dp[i] = sum > nums[i] ? sum : nums[i];
            max = dp[i] > max ? dp[i] : max;
        }
        return max;
    }
}
