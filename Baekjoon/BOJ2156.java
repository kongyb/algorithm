import java.util.Scanner;

public class BOJ2156 {
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
        if (N >= 2) {
            dp[1] = nums[0] + nums[1];
        }
        if (N >= 3) {
            dp[2] = Math.max(nums[0] + nums[2], Math.max(nums[1] + nums[2], dp[1]));
        }
        for (int i=3; i<N; i++) {
            int max = dp[i-1];
            max = Math.max(dp[i-2] + nums[i], max);
            max = Math.max(dp[i-3] + nums[i-1] + nums[i], max);
            dp[i] = max;
        }
        return dp[N-1];
    }
}
