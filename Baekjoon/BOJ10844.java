import java.util.Scanner;

public class BOJ10844 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int DIV = 1000000000;
        int N = sc.nextInt();
        int[][] dp = new int[N][10];
        for (int i=1; i<10; i++) {
            dp[0][i] = 1;
        }
        for (int i=1; i<N; i++) {
            for (int j=0; j<10; j++) {
                if (j == 0) {
                    dp[i][j] = dp[i-1][1];
                }
                else if (j == 9) {
                    dp[i][j] = dp[i-1][8];
                }
                else {
                    dp[i][j] = (dp[i-1][j-1] + dp[i-1][j+1]) % DIV;
                }
            }
        }
        int sum = 0;
        for (int i=0; i<10; i++) {
            sum = (sum + dp[N-1][i]) % DIV;
        }
        System.out.println(sum);
    }
}
