import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

public class B1325 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int pointCnt = Integer.parseInt(st.nextToken());
        int edgeCnt = Integer.parseInt(st.nextToken());
        ArrayList[] edgeInfo = new ArrayList[pointCnt];
        for (int i=0; i<pointCnt; i++)
            edgeInfo[i] = new ArrayList<Integer>();
        for (int i=0; i<edgeCnt; i++){
            st = new StringTokenizer(br.readLine());
            int child = Integer.parseInt(st.nextToken());
            int parent = Integer.parseInt(st.nextToken());
            edgeInfo[parent - 1].add(child - 1);
        }
        System.out.print(solution(edgeInfo, pointCnt));
    }

    public static String solution(ArrayList[] edgeInfo, int N){
        int max = 0;
        ArrayList<Integer> result = new ArrayList<>();
        for (int i=0; i<N; i++){
            int[] isChecked = new int[N];
            int cnt = dfs(edgeInfo, isChecked, i);
            if (cnt > max){
                result.clear();
                max = cnt;
                result.add(i + 1);
            }
            else if (cnt == max)
                result.add(i + 1);
        }
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<result.size(); i++){
            sb.append(result.get(i));
            if (i != result.size() - 1)
                sb.append(" ");
        }
        return sb.toString();
    }

    public static int dfs(ArrayList[] edgeInfo, int[] isChecked, int curr){
        int cnt = 1;
        isChecked[curr] = 1;
        for (int i=0; i<edgeInfo[curr].size(); i++){
            int next = (int) edgeInfo[curr].get(i);
            if (isChecked[next] == 0)
                cnt += dfs(edgeInfo, isChecked, next);
        }
        return cnt;
    }
}
