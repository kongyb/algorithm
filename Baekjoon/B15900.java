import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.StringTokenizer;

public class B15900 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int cnt = Integer.parseInt(st.nextToken());
        HashMap<Integer, ArrayList<Integer>> edges = new HashMap();
        for (int i = 0; i<cnt-1; i++){
            st = new StringTokenizer(br.readLine());
            int p1 = Integer.parseInt(st.nextToken());
            int p2 = Integer.parseInt(st.nextToken());
            if (!edges.containsKey(p1))
                edges.put(p1, new ArrayList<Integer>());
            if (!edges.containsKey(p2))
                edges.put(p2, new ArrayList());
            edges.get(p1).add(p2);
            edges.get(p2).add(p1);
        }
        System.out.println(solution(cnt, edges));
    }

    public static String solution(int cnt, HashMap<Integer, ArrayList<Integer>> edges){
        boolean[] isChecked = new boolean[cnt+1];
        int lenSum = dfs(edges, 1, 0, isChecked);
        return lenSum % 2 == 0 ? "No" : "Yes";
    }

    public static int dfs(HashMap<Integer, ArrayList<Integer>> edges, int index, int len, boolean[] isChecked){
        int result = 0;
        isChecked[index] = true;
        ArrayList<Integer> near = edges.get(index);
        for (int c : near){
            if (!isChecked[c])
                result += dfs(edges, c, len+1, isChecked);
        }
        return result == 0 ? len : result;
    }
}
