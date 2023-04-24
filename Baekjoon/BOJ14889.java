import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class BOJ14889 {

    static int min = Integer.MAX_VALUE;
    static int[][] scoreBoard;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        StringTokenizer st;
        scoreBoard = new int[N][N];
        for (int i=0; i<N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j=0; j<N; j++) {
                scoreBoard[i][j] = Integer.parseInt(st.nextToken());
            }
        }
        System.out.println(solution(scoreBoard, N));

    }

    static int solution(int[][] scoreBoard, int N) {
        boolean[] players = new boolean[N];
        recur(players, 0, N / 2);
        return min;
    }

    static void recur(boolean[] players, int index, int rest) {
        if (rest == 0) {
            min = Math.min(min,calculate(players));
        }
        if (index == players.length) {
            return;
        }
        players[index] = true;
        recur(players, index + 1, rest - 1);
        players[index] = false;
        recur(players, index + 1, rest);
    }

    static int calculate(boolean[] players) {
        int tSum = 0;
        int fSum = 0;
        for (int i=0; i<players.length; i++) {
            boolean team = players[i];
            for (int j=0; j<players.length; j++) {
                if (players[j] == team) {
                    if (team) {
                        tSum += scoreBoard[i][j];
                    }
                    else {
                        fSum += scoreBoard[i][j];
                    }
                }
            }
        }
        return Math.abs(tSum - fSum);
    }


}
