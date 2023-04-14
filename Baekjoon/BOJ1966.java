import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Deque;
import java.util.StringTokenizer;

public class BOJ1966 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        for (int i=0; i<N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int cnt = Integer.parseInt(st.nextToken());
            int target = Integer.parseInt(st.nextToken());
            Deque<Document> queue = new ArrayDeque();
            int[] scores = new int[cnt];
            st = new StringTokenizer(br.readLine());
            for (int j=0; j<cnt; j++) {
                int score = Integer.parseInt(st.nextToken());
                queue.addLast(new Document(j, score));
                scores[j] = score;
            }
            System.out.println(solution(queue, scores, cnt, target));
        }
    }

    static int solution(Deque<Document> queue, int[] scores, int cnt, int target) {
        Arrays.sort(scores);
        int result = 1;
        for (int i=cnt - 1; i>=0; i--) {
            int reqScore = scores[i];
            while (queue.peekFirst().score != reqScore) {
                queue.addLast(queue.removeFirst());
            }
            Document curr = queue.removeFirst();
            if (curr.index == target) {
                return result;
            }
            result++;
        }
        return result;
    }

    private static class Document {
        int index;
        int score;

        Document(int index, int score) {
            this.index = index;
            this.score = score;
        }
    }
}
