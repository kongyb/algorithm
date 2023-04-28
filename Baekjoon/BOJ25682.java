import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ25682 {

    static Info EMPTY = new Info(0,0);

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int K = Integer.parseInt(st.nextToken());

        // W -> true  B -> false
        boolean[][] map = new boolean[N][M];
        for (int i=0; i<N; i++) {
            String line = br.readLine();
            for (int j=0; j<M; j++) {
                map[i][j] = line.charAt(j) == 'W';
            }
        }
        System.out.println(solution(map, N, M, K));

    }

    static int solution(boolean[][] map, int N, int M, int K) {
        // matrix[i][j] -> [0,0] 부터 [i,j]까지 체스판으로 칠하기 위해 다시칠해야하는 갯수정보
        // bStart 좌측상단B로시작 (false로 시작)
        // wStart 좌측상단W로시작 (true로 시작)
        Info[][] matrix = new Info[N][M];
        matrix[0][0] = new Info(map[0][0] ? 1 : 0, map[0][0] ? 0 : 1);
        for (int i=1; i<N; i++) {
            int bStart = ((i % 2 == 0) ^ map[i][0]) ? 0 : 1;
            int wStart = ((i % 2 == 0) ^ map[i][0]) ? 1 : 0;
            matrix[i][0] = new Info(bStart + matrix[i-1][0].bStart, wStart + matrix[i-1][0].wStart);
        }

        for (int j=1; j<M; j++) {
            int bStart = ((j % 2 == 0) ^ map[0][j]) ? 0 : 1;
            int wStart = ((j % 2 == 0) ^ map[0][j]) ? 1 : 0;
            matrix[0][j] = new Info(bStart + matrix[0][j-1].bStart, wStart + matrix[0][j-1].wStart);
        }

        for (int i=1; i<N; i++) {
            for (int j=1; j<M; j++) {
                int bStart = (((i+j) % 2 == 0) ^ map[i][j]) ? 0 : 1;
                int wStart = (((i+j) % 2 == 0) ^ map[i][j]) ? 1 : 0;
                Info top = matrix[i-1][j];
                Info left = matrix[i][j-1];
                Info topLeft = matrix[i-1][j-1];
                bStart = bStart + top.bStart + left.bStart - topLeft.bStart;
                wStart = wStart + top.wStart + left.wStart - topLeft.wStart;
                matrix[i][j] = new Info(bStart, wStart);
            }
        }

        int min = Integer.MAX_VALUE;
        for (int i=0; i<=N-K; i++) {
            for (int j=0; j<=M-K; j++) {
                min = Math.min(min, getCnt(matrix, i, j, K));
            }
        }
        return min;
    }

    static int getCnt(Info[][] matrix, int i, int j, int K) {
        Info total = matrix[i+K-1][j+K-1];
        Info left = j > 0 ? matrix[i+K-1][j-1] : EMPTY;
        Info top = i > 0 ? matrix[i-1][j+K-1] : EMPTY;
        Info topLeft = i > 0 && j > 0 ? matrix[i-1][j-1] : EMPTY;
        int bStart = total.bStart - left.bStart - top.bStart + topLeft.bStart;
        int wStart = total.wStart - left.wStart - top.wStart + topLeft.wStart;
        return Math.min(bStart, wStart);
    }

    static class Info {
        int bStart;
        int wStart;

        Info(int num1, int num2) {
            bStart = num1;
            wStart = num2;
        }
    }
}
