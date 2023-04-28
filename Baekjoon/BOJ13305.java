import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ13305 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine()) - 1;

        int[] lens = new int[N];
        int[] prices = new int[N];
        StringTokenizer st1 = new StringTokenizer(br.readLine());
        StringTokenizer st2 = new StringTokenizer(br.readLine());
        for (int i=0; i<N; i++) {
            lens[i] = Integer.parseInt(st1.nextToken());
            prices[i] = Integer.parseInt(st2.nextToken());
        }

        System.out.println(solution(N, lens, prices));
    }

    static long solution(int N, int[] lens, int[] prices) {
        long sum = 0;

        long minCost = prices[0];
        long distance = lens[0];
        for (int i=1; i<N; i++) {
            if (prices[i] < minCost) {
                sum += distance * minCost;
                minCost = prices[i];
                distance = lens[i];
            }
            else {
                distance += lens[i];
            }
        }
        return sum + (distance * minCost);
    }
}
