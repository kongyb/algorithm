import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ11659 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        st = new StringTokenizer(br.readLine());
        int[] sums = new int[N+1];
        for (int i=1; i<=N; i++) {
            int num = Integer.parseInt(st.nextToken());
            sums[i] = sums[i-1] + num;
        }
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<M; i++) {
            st = new StringTokenizer(br.readLine());
            int n1 = Integer.parseInt(st.nextToken());
            int n2 = Integer.parseInt(st.nextToken());
            sb.append(sums[n2] - sums[n1-1]);
            sb.append('\n');
        }
        System.out.println(sb);
    }
}
