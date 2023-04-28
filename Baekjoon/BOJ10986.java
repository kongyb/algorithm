import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ10986 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());

        int[] nums = new int[N];
        st = new StringTokenizer(br.readLine());
        for (int i=0; i<N; i++) {
            nums[i] = Integer.parseInt(st.nextToken());
        }
        System.out.println(solution(nums, N, M));
    }

    static long solution(int[] nums, int N, int M) {
        int[] restArr = new int[N];
        restArr[0] = nums[0] % M;
        for (int i=1; i<N; i++) {
            restArr[i] = (restArr[i-1] + nums[i]) % M;
        }

        long[] cntArr = new long[M];
        cntArr[0] = 1;
        long result = 0;
        for (int i=0; i<N; i++) {
            result += cntArr[restArr[i]];
            cntArr[restArr[i]]++;
        }
        return result;
    }
}
