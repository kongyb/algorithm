import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class B10942 {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int len = Integer.parseInt(st.nextToken());
        int[] arr = new int[len];
        st = new StringTokenizer(br.readLine());
        for (int i=0; i<len; i++)
            arr[i] = Integer.parseInt(st.nextToken());
        int cnt = Integer.parseInt(new StringTokenizer(br.readLine()).nextToken());
        int[][] matrix = new int[len][len];
        int start, end;
        for (int i=0; i<len; i++){
            matrix[i][i]=1;
            start = i-1;
            end = i+1;
            while (start >= 0 && end < len && arr[start]==arr[end]){
                matrix[start][end]=1;
                start--;
                end++;
            }
        }
        for (int i=0; i<len-1; i++){
            if (arr[i] == arr[i+1]){
                matrix[i][i+1] = 1;
                start = i-1;
                end = i+2;
                while (start >= 0 && end < len && arr[start] == arr[end]){
                    matrix[start][end] = 1;
                    start--;
                    end++;
                }
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int i=0; i<cnt; i++){
            st = new StringTokenizer(br.readLine());
            if (matrix[Integer.parseInt(st.nextToken())-1][Integer.parseInt(st.nextToken())-1] == 1)
                sb.append("1\n");
            else
                sb.append("0\n");
        }
        System.out.println(sb);
    }
}


//첫째 줄에 수열의 크기 N (1 ≤ N ≤ 2,000)이 주어진다.
//둘째 줄에는 홍준이가 칠판에 적은 수 N개가 순서대로 주어진다. 칠판에 적은 수는 100,000보다 작거나 같은 자연수이다.
//셋째 줄에는 홍준이가 한 질문의 개수 M (1 ≤ M ≤ 1,000,000)이 주어진다.
//넷째 줄부터 M개의 줄에는 홍준이가 명우에게 한 질문 S와 E가 한 줄에 하나씩 주어진다.
//7
//1 2 1 3 1 2 1
//4
//1 3
//2 5
//3 3
//5 7