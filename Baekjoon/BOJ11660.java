import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ11660 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());

        int[][] nums = new int[N][N];
        for (int i=0; i<N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j=0; j<N; j++) {
                nums[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int[][] sumMatrix = getSumMatrix(nums, N);
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<M; i++) {
            st = new StringTokenizer(br.readLine());
            int y1 = Integer.parseInt(st.nextToken())-1;
            int x1 = Integer.parseInt(st.nextToken())-1;
            int y2 = Integer.parseInt(st.nextToken())-1;
            int x2 = Integer.parseInt(st.nextToken())-1;
            sb.append(getSum(sumMatrix, y1, x1, y2, x2));
            sb.append('\n');
        }
        System.out.println(sb);
    }

    static int getSum(int[][] sumMatrix, int y1, int x1, int y2, int x2) {
        int total = sumMatrix[y2][x2];
        int totalTop = y1 == 0 ? 0 : sumMatrix[y1- 1][x2];
        int totalLeft = x1 == 0 ? 0 : sumMatrix[y2][x1 - 1];
        int totalDiagonal = x1 == 0 || y1 == 0 ? 0 : sumMatrix[y1 - 1][x1 - 1];
        return total - totalTop - totalLeft + totalDiagonal;
    }

    static int[][] getSumMatrix(int[][] nums, int N) {
        int[][] matrix = new int[N][N];
        matrix[0][0] = nums[0][0];
        for (int i=1; i<N; i++) {
            matrix[i][0] = matrix[i-1][0] + nums[i][0];
            matrix[0][i] = matrix[0][i-1] + nums[0][i];
        }
        for (int i=1; i<N; i++) {
            for (int j=1; j<N; j++) {
                matrix[i][j] = matrix[i-1][j] + matrix[i][j-1] + nums[i][j] - matrix[i-1][j-1];
            }
        }
        return matrix;
    }
}
