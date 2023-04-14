import java.util.Arrays;
import java.util.Scanner;

public class BOJ1021 {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int N = sc.nextInt();
        int M = sc.nextInt();
        int[] targets = new int[M];
        for (int i=0; i<M; i++) {
            targets[i] = sc.nextInt() - 1;
        }
        System.out.println(solution(N, targets));

    }

    static int solution(int total, int[] targets) {
        int result = 0;
        for (int i=0; i<targets.length; i++) {
            int tIndex = targets[i];
            int toFront = tIndex;
            int toEnd = total - toFront;
            int min = toFront < toEnd ? -1 * toFront : toEnd;
            for (int j=i+1; j<targets.length; j++) {
                targets[j] = (targets[j] + total + min) % total;
                targets[j]--;
            }
            result += Math.abs(min);
            total--;

        }
        return result;
    }

}
