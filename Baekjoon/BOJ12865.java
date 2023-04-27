import java.util.Scanner;

public class BOJ12865 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int K = sc.nextInt();
        Artifact[] artifacts = new Artifact[N];

        for (int i=0; i<N; i++) {
            artifacts[i] = new Artifact(sc.nextInt(), sc.nextInt());
        }
        System.out.println(solution(artifacts, K));
    }

    static int solution(Artifact[] artifacts, int K) {
        int[] dp = new int[K + 1];
        for (Artifact a : artifacts) {
            int w = a.weight;
            int v = a.value;
            for (int i=K; i>=w; i--) {
                dp[i] = Math.max(dp[i],dp[i-w] + v);
            }
        }
        return dp[K];
    }

    static class Artifact {
        int value;
        int weight;

        Artifact(int weight, int value) {
            this.weight = weight;
            this.value = value;
        }
    }
}
