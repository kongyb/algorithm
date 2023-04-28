import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ11399 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        int[] times = new int[N];
        StringTokenizer st = new StringTokenizer(br.readLine());
        for (int i=0; i<N; i++) {
            times[i] = Integer.parseInt(st.nextToken());
        }
        System.out.println(solution(times, N));
    }

    static int solution(int[] times, int N) {
        Arrays.sort(times);
        int sum = 0;
        for (int i=0; i<N; i++) {
            sum += times[i] * (N-i);
        }
        return sum;
    }
}
