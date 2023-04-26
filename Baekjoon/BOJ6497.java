import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ6497 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        while (true) {
            st = new StringTokenizer(br.readLine());
            int nodeCnt = Integer.parseInt(st.nextToken());
            int edgeCnt = Integer.parseInt(st.nextToken());
            if (nodeCnt == 0 && edgeCnt == 0) {
                break;
            }
            Edge[] edges = new Edge[edgeCnt];
            int sum = 0;
            for (int i=0; i<edgeCnt; i++) {
                st = new StringTokenizer(br.readLine());
                int i1 = Integer.parseInt(st.nextToken());
                int i2 = Integer.parseInt(st.nextToken());
                int len = Integer.parseInt(st.nextToken());
                edges[i] = new Edge(i1, i2, len);
                sum += len;
            }
            System.out.println(sum - solution(edges, nodeCnt, edgeCnt));
        }
    }

    static int solution(Edge[] edges, int nodeCnt, int edgeCnt) {
        int[] union = new int[nodeCnt];
        for (int i=0; i<nodeCnt; i++) {
            union[i] = i;
        }
        Arrays.sort(edges, (a,b) -> a.len - b.len);

        int sum = 0;
        int cnt = 0;
        int index = 0;
        while (index < edgeCnt && cnt < nodeCnt - 1) {
            Edge edge = edges[index];
            int p1 = find(union,edge.i1);
            int p2 = find(union,edge.i2);
            if (p1 != p2) {
                sum += edge.len;
                cnt++;
                merge(union, p1, p2);
            }
            index++;
        }
        return sum;
    }

    static int find(int[] union, int start) {
        if (union[start] == start) {
            return start;
        }
        int p = find(union, union[start]);
        union[start] = p;
        return union[start];
    }

    static void merge(int[] union, int p1, int p2) {
        int min = Math.min(p1, p2);
        union[p1] = min;
        union[p2] = min;
        return;
    }

    static class Edge {
        int i1;
        int i2;
        int len;

        Edge(int i1, int i2, int len) {
            this.i1 = i1;
            this.i2 = i2;
            this.len = len;
        }
    }
}
