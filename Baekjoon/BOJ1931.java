import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ1931 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        Plan[] plans = new Plan[N];
        for (int i=0; i<N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int start = Integer.parseInt(st.nextToken());
            int end = Integer.parseInt(st.nextToken());
            plans[i] = new Plan(start, end);
        }
        System.out.println(solution(plans));
    }

    static int solution(Plan[] plans) {
        Arrays.sort(plans, (a,b) -> a.end == b.end ? a.start - b.start : a.end - b.end);
        int last = 0;
        int cnt = 0;
        for (Plan p : plans) {
            if (p.start >= last) {
                cnt++;
                last = p.end;
            }
        }
        return cnt;
    }

    static class Plan {
        int start;
        int end;

        Plan(int start, int end) {
            this.start = start;
            this.end = end;
        }
    }
}
