import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class BOJ16139 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        String str = br.readLine();
        int[][] cntArr = new int[str.length() + 1][26];
        int N = Integer.parseInt(br.readLine());

        for (int i=1; i<=str.length(); i++) {
            int c = str.charAt(i-1) - 'a';
            for (int j=0; j<26; j++) {
                cntArr[i][j] = cntArr[i-1][j] + (c == j ? 1 : 0);
            }
        }
        char[] charArr = new char[26];
        for (char c = 'a'; c<='z'; c++) {
            charArr[c-'a'] = c;
        }

        StringBuilder sb = new StringBuilder();
        for (int i=0; i<N; i++) {
            st = new StringTokenizer(br.readLine());
            int c = st.nextToken().charAt(0) - 'a';
            int start = Integer.parseInt(st.nextToken()) + 1;
            int end = Integer.parseInt(st.nextToken()) + 1;
            sb.append(cntArr[end][c] - cntArr[start - 1][c]);
            sb.append('\n');
        }
        System.out.println(sb);
    }
}
