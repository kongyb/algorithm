import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

// 백준 - 공유기 설치
// https://www.acmicpc.net/problem/2110
public class BOJ2110 {
    public static void main(String[] args) throws IOException {
        // parse
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int homeCnt = Integer.parseInt(st.nextToken());
        int routerCnt = Integer.parseInt(st.nextToken());
        int[] homes = new int[homeCnt];
        for (int i=0; i<homeCnt; i++) {
            st = new StringTokenizer(br.readLine());
            homes[i] = Integer.parseInt(st.nextToken());
        }
        System.out.println(solution(homes, routerCnt));
    }

    static int solution(int[] homes, int routerCnt) {
        Arrays.sort(homes);
        int left = 1;
        int right = 1000000001;
        while (left < right) {
            int mid = (left + right) / 2;
            if (check(homes, routerCnt, mid)) {
                left = mid + 1;
            }
            else {
                right = mid;
            }
        }
        return left - 1;
    }

    static boolean check(int[] homes, int routerCnt, int minDist) {
        int prev = homes[0];
        routerCnt--;
        for (int i=1; i<homes.length; i++) {
            int curr = homes[i];
            if (curr - prev >= minDist) {
                prev = curr;
                routerCnt--;
            }
            if (routerCnt == 0) {
                return true;
            }
        }
        return false;
    }
}
